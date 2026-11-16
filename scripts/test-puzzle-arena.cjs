// Uses the jsdom and PostCSS already installed with react-scripts; no new dependencies.
// Run: node scripts/test-puzzle-arena.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { JSDOM } = require('jsdom');
const postcss = require('postcss');

const directory = path.join(__dirname, '../public/games/puzzle-arena');
const html = fs.readFileSync(path.join(directory, 'index.html'), 'utf8');
const script = fs.readFileSync(path.join(directory, 'script.js'), 'utf8');
const recordsKey = 'akmaui-game-records-v1';
const languageKey = 'akmaui-game-language-v1';
const legacyRecords = {
  played: 8, correct: 6, currentStreak: 2, bestStreak: 4,
  history: [
    { timestamp: '2026-02-16T04:00:00.000Z', game: 'cubes', size: 3, target: null, answer: 20, solution: 20, correct: true, hintUsed: true },
    { date: '2/15 12:00', size: 4, target: 12, answer: 3, solution: 3, correct: true, hintUsed: false },
  ],
};

function withGame(callback, { language = 'ko', blogLanguage, blockedStorage = false, records = legacyRecords } = {}) {
  const dom = new JSDOM(html, { url: 'https://hs-kang-developer.github.io/games/puzzle-arena/', runScripts: 'outside-only' });
  const window = dom.window;
  const scrolls = [];
  window.scrollTo = options => scrolls.push(options);
  window.matchMedia = () => ({ matches: true });
  const originalStorage = JSON.stringify(records, null, 2);
  if (blockedStorage) {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage disabled'); } });
  } else {
    window.localStorage.setItem(recordsKey, originalStorage);
    if (language) window.localStorage.setItem(languageKey, language);
    if (blogLanguage) window.localStorage.setItem('i18nextLng', blogLanguage);
  }
  const context = dom.getInternalVMContext();
  vm.runInContext(script, context);
  const evaluate = source => vm.runInContext(source, context);
  const value = source => JSON.parse(evaluate('JSON.stringify(' + source + ')'));
  const query = selector => window.document.querySelector(selector);
  try {
    callback({ window, query, evaluate, value, originalStorage, scrolls });
  } finally {
    window.close();
  }
}

// Deliberately counts every cell of every rectangle, independently of the game's
// optimized column-sum implementation.
function countRectangles(board, target) {
  let count = 0;
  for (let top = 0; top < board.length; top++) {
    for (let left = 0; left < board.length; left++) {
      for (let bottom = top; bottom < board.length; bottom++) {
        for (let right = left; right < board.length; right++) {
          let sum = 0;
          for (let row = top; row <= bottom; row++) {
            for (let column = left; column <= right; column++) sum += board[row][column] ?? 0;
          }
          if (sum === target) count++;
        }
      }
    }
  }
  return count;
}

test('existing counts, streaks, old-format history and storage bytes survive initialization', () => {
  withGame(({ query, value, window, originalStorage }) => {
    assert.deepEqual(value('records'), legacyRecords);
    assert.equal(query('#stat-played').textContent, '8');
    assert.equal(query('#stat-best-streak').textContent, '4');
    assert.equal(query('#stat-accuracy').textContent, '75');
    assert.equal(query('#history-list').children.length, 2);
    assert.equal(window.localStorage.getItem(recordsKey), originalStorage);
    query('#language-ja').click();
    assert.equal(window.localStorage.getItem(recordsKey), originalStorage);
    assert.match(query('#history-list').textContent, /キューブ/);
  });
});

test('squares: every board size, correct answer, hint, duplicate submit and record preservation', () => {
  withGame(({ query, window, value, evaluate, scrolls }) => {
    query('#open-squares').click();
    assert.equal(query('#game-screen').hidden, false);
    assert.equal(window.document.activeElement.id, 'game-title');
    assert.equal(scrolls.at(-1).behavior, 'auto');
    for (const size of [4, 5, 6]) {
      query('#board-size').value = String(size);
      query('#board-size').dispatchEvent(new window.Event('change'));
      assert.equal(query('#board').children.length, size * size);
      assert.equal(query('#show-hint').getAttribute('aria-expanded'), 'false');
      const board = value('currentBoard');
      const target = Number(query('#target-number').textContent);
      const answer = countRectangles(board, target);
      assert.equal(value('currentAnswer'), answer);
      query('#show-hint').click();
      assert.equal(query('#hint-box').hidden, false);
      assert.equal(query('#show-hint').getAttribute('aria-expanded'), 'true');
      const hint = value('currentHint');
      let hintedSum = 0;
      for (let row = hint.top; row <= hint.bottom; row++) {
        for (let column = hint.left; column <= hint.right; column++) hintedSum += board[row][column] ?? 0;
      }
      assert.equal(hintedSum, target);
      query('#answer-input').value = String(answer);
      query('#answer-input').dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      assert.equal(query('#answer-input').disabled, true);
      assert.equal(query('#next-puzzle').hidden, false);
      const played = value('records.played');
      evaluate('submitAnswer()');
      assert.equal(value('records.played'), played);
      assert.equal(value('records.history[0].hintUsed'), true);
    }
    const stored = JSON.parse(window.localStorage.getItem(recordsKey));
    assert.equal(stored.played, 11);
    assert.equal(stored.correct, 9);
    assert.equal(stored.currentStreak, 5);
    assert.equal(stored.bestStreak, 5);
    assert.deepEqual(stored.history.slice(-2), legacyRecords.history);
  });
});

test('cubes: all sizes, correct totals, hints, wrong answers and next puzzle', () => {
  withGame(({ query, window, value }) => {
    query('#open-cubes').click();
    assert.equal(query('.legend').hidden, true);
    assert.deepEqual(Array.from(query('#board-size').options, option => option.value), ['3', '4', '5']);
    for (const size of [3, 4, 5]) {
      query('#board-size').value = String(size);
      query('#board-size').dispatchEvent(new window.Event('change'));
      const board = value('currentBoard');
      const answer = board.flat().reduce((sum, height) => sum + height, 0);
      assert.equal(value('currentAnswer'), answer);
      assert.equal(query('#board').getAttribute('role'), 'img');
      assert.ok(query('#board svg polygon'));
      query('#show-hint').click();
      const highest = Math.max(...board.flat());
      assert.deepEqual(value('currentHint'), { height: highest, count: board.flat().filter(height => height === highest).length });
      query('#answer-input').value = String(answer + 1);
      query('#submit-answer').click();
      assert.equal(value('records.currentStreak'), 0);
      assert.equal(value('records.history[0].correct'), false);
      assert.equal(value('records.history[0].game'), 'cubes');
      assert.equal(value('records.history[0].solution'), answer);
      query('#next-puzzle').click();
      assert.equal(query('#answer-input').disabled, false);
      assert.equal(query('#hint-box').hidden, true);
      query('#answer-input').value = String(value('currentAnswer'));
      query('#submit-answer').click();
      assert.equal(value('records.currentStreak'), 1);
    }
    assert.equal(value('records.played'), 14);
    assert.equal(value('records.correct'), 9);
    assert.equal(value('records.bestStreak'), 4);
  });
});

test('invalid answers never change or overwrite records', () => {
  withGame(({ query, window, originalStorage }) => {
    query('#open-squares').click();
    for (const input of ['', '-1', '1.5']) {
      query('#answer-input').value = input;
      query('#submit-answer').click();
      assert.equal(query('#answer-input').disabled, false);
      assert.equal(window.localStorage.getItem(recordsKey), originalStorage);
      assert.match(query('#answer-feedback').className, /error/);
    }
  });
});

test('language switching preserves the active puzzle, entered answer and hint', () => {
  withGame(({ query, value, window }) => {
    query('#open-cubes').click();
    query('#show-hint').click();
    query('#answer-input').value = '12';
    const before = value('({ currentBoard, currentAnswer, currentHint, puzzleNumber })');
    query('#language-ja').click();
    assert.equal(window.document.documentElement.lang, 'ja');
    assert.equal(query('#game-title').textContent, 'キューブを数えよう');
    assert.match(query('#rule-tip-text').textContent, /柱/);
    assert.equal(query('#next-label').textContent, '次の問題へ');
    assert.equal(query('#back-blog-label').textContent, 'ブログへ');
    assert.equal(query('#answer-input').value, '12');
    assert.equal(query('#hint-box').hidden, false);
    assert.deepEqual(value('({ currentBoard, currentAnswer, currentHint, puzzleNumber })'), before);
    assert.equal(window.localStorage.getItem(languageKey), 'ja');
    query('#back-home').click();
    assert.equal(window.document.activeElement.id, 'home-title');
    query('#language-ko').click();
    assert.equal(window.document.documentElement.lang, 'ko');
    assert.equal(query('#back-blog-label').textContent, '블로그로');
  });
});

test('saved game language takes precedence; blog language is only an initial fallback', () => {
  withGame(({ window }) => assert.equal(window.document.documentElement.lang, 'ja'), { language: 'ja', blogLanguage: 'ko' });
  withGame(({ query, window }) => {
    assert.equal(window.document.documentElement.lang, 'ja');
    query('#language-ko').click();
    assert.equal(window.localStorage.getItem(languageKey), 'ko');
  }, { language: null, blogLanguage: 'ja-JP' });
});

test('storage disabled: both games and language switching remain playable', () => {
  withGame(({ query, value }) => {
    for (const selector of ['#open-squares', '#open-cubes']) {
      query(selector).click();
      query('#language-ja').click();
      query('#answer-input').value = String(value('currentAnswer'));
      query('#submit-answer').click();
      assert.equal(query('#answer-input').disabled, true);
      assert.match(query('#answer-feedback').textContent, /保存/);
      query('#back-home').click();
    }
  }, { blockedStorage: true });
});

test('same-origin reload reads the saved result and language without resetting them', () => {
  let saved;
  withGame(({ query, value, window }) => {
    query('#open-cubes').click();
    query('#answer-input').value = String(value('currentAnswer'));
    query('#submit-answer').click();
    saved = JSON.parse(window.localStorage.getItem(recordsKey));
  });
  withGame(({ query, value }) => {
    assert.deepEqual(value('records'), saved);
    assert.equal(query('#stat-played').textContent, '9');
    assert.equal(query('#stat-current-streak').textContent, '3');
  }, { records: saved, language: 'ja' });
});

test('styles stay scoped, IDs are unique and the blog link resolves to the blog root', () => {
  const css = postcss.parse(fs.readFileSync(path.join(directory, 'style.css'), 'utf8'));
  css.walkRules(rule => {
    for (const selector of rule.selectors) assert.match(selector, /^\.devil-game(?:$|[\s:])/);
  });
  css.walkAtRules(rule => assert.notEqual(rule.name, 'import'));
  withGame(({ window, query }) => {
    const ids = Array.from(window.document.querySelectorAll('[id]'), element => element.id);
    assert.equal(new Set(ids).size, ids.length);
    assert.equal(query('#back-blog').href, 'https://hs-kang-developer.github.io/#/');
    assert.equal(query('#show-hint').getAttribute('aria-controls'), 'hint-box');
  });
});
