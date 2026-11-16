const STORAGE_KEY = 'akmaui-game-records-v1';
const LANGUAGE_KEY = 'akmaui-game-language-v1';

const copy = {
  ko: {
    title: '악마의 게임 | 두뇌 퍼즐',
    description: '악마의 게임 — 두뇌 퍼즐을 풀고 기록에 도전하세요.',
    brand: '악마의 게임', offline: '서버 없이, 나만의 페이스로', languageLabel: '언어 선택', backBlog: '블로그로',
    homeEyebrow: 'CHOOSE YOUR GAME', homeTitle: '오늘의 두뇌를<br /><em>시험해 보세요.</em>',
    homeDescription: '게임을 선택하고, 기록을 쌓아 최고 연속 기록에 도전하세요.',
    played: '총 도전', accuracy: '정답률', bestStreak: '최고 연속 정답', currentStreak: '현재 연속 정답',
    countUnit: '회', libraryKicker: 'GAME LIBRARY', libraryTitle: '게임 선택', availableCount: '개 플레이 가능',
    gameIndex: 'GAME 01', gameIndex2: 'GAME 02', gameIndex3: 'GAME 03', available: '플레이 가능', squaresTitle: '네모 세기',
    squaresDescription: '목표 숫자를 만드는 직사각형의 개수를 찾으세요.', squaresTags: '숫자 · 관찰력',
    cubesTitle: '큐브 세기', cubesDescription: '쌓인 큐브 구조의 전체 개수를 세어보세요.', cubesTags: '공간감각 · 관찰력',
    coming: '준비 중', comingTitle: '새로운 게임', comingDescription1: '다음 두뇌 게임을 추가할 예정입니다.',
    comingBottom: 'COMING SOON', historyKicker: 'RECENT ACTIVITY', historyTitle: '최근 기록',
    localLabel: '이 기기에 저장', emptyHistory: '아직 기록이 없습니다. 첫 문제에 도전해 보세요.',
    back: '게임 선택', gameKicker: 'GAME 01 · NUMBER PUZZLE', cubeKicker: 'GAME 02 · SPATIAL PUZZLE', sizeLabel: '격자 크기',
    newPuzzle: '새 문제', blank: '빈칸', boardNote: '격자 선을 따라 만든 직사각형을 셉니다. 한 칸짜리도 포함돼요.',
    targetLabel: 'TARGET NUMBER', targetCaption: '네모 안 숫자의 합', totalCubesLabel: 'TOTAL CUBES', cubeCaption: '쌓인 큐브의 전체 개수',
    cubeBoardNote: '가려진 큐브까지 포함해 구조물의 큐브 전체 개수를 세어보세요.', answerLabel: '정답 입력', answerPlaceholder: '개수', answerUnit: '개',
    submit: '확인', hint: '힌트 보기', hideHint: '힌트 숨기기', next: '다음 문제',
    streakKicker: 'STREAK CHALLENGE', streakUnit: '연속 정답', bestLabel: '최고 기록',
    streakDescription: '정답을 이어가며<br />나만의 기록을 세워보세요.',
    rulesTitle: '게임 방법', rule1: '격자에서 직사각형을 찾습니다.', rule2: '네모 안의 숫자를 모두 더합니다.',
    rule3: '합이 목표 숫자와 같은 네모의 개수를 입력합니다.', cubeRule1: '기둥의 높이와 앞뒤로 가려진 큐브를 살펴봅니다.',
    cubeRule2: '층별 또는 기둥별로 큐브 수를 나눠 세어봅니다.', cubeRule3: '구조 전체에 있는 큐브의 개수를 입력합니다.', tipLabel: 'TIP',
    tipText: '같은 네모를 두 번 세지 않도록 위치와 크기를 확인하세요.',
    cubeTipText: '기둥별 큐브 수를 더하거나, 맨 위층부터 한 층씩 세어보세요.',
    gameFooter: '기록은 이 브라우저에만 저장됩니다.', homeFooter: '관찰하고, 생각하고, 풀어보세요.',
    ready: '빈칸은 합계에 포함되지 않습니다. 정답 연속 기록에 도전해 보세요.',
    cubeReady: '가려진 큐브도 포함해 전체 개수를 세어보세요.',
    invalid: '0 이상의 정수를 입력해 주세요.',
    correct: ({ answer, streak }) => `정답입니다! ${answer}개예요. 현재 ${streak}회 연속 정답!`,
    incorrect: ({ answer }) => `정답은 ${answer}개예요. 다음 문제에서 연속 기록에 다시 도전해 보세요.`,
    storageError: '기록을 저장하지 못했지만 문제는 계속 풀 수 있어요.',
    hintText: ({ startRow, startColumn, endRow, endColumn }) => `예시 네모 하나: ${startRow}행 ${startColumn}열부터 ${endRow}행 ${endColumn}열까지 더하면 목표 숫자가 됩니다. 나머지 네모도 크기와 위치를 달리해 찾아보세요.`,
    historySolution: ({ solution, hintUsed }) => `정답 ${solution}개${hintUsed ? ' · 힌트 사용' : ''}`,
    resultCorrect: '정답', resultIncorrect: '오답', rowsCols: ({ size }) => `${size} ROWS · ${size} COLUMNS`,
    boardAria: ({ size }) => `${size} 곱하기 ${size} 숫자 격자`,
    cell: ({ row, column, value }) => value === null ? `${row}행 ${column}열, 빈칸` : `${row}행 ${column}열, ${value}`,
    cubeDimensions: ({ size }) => `${size}×${size} CUBE STACK`, cubeAria: ({ size }) => `${size} 곱하기 ${size} 큐브 기둥 구조`,
    cubeHintText: ({ height, count }) => `힌트: 가장 높은 ${height}층에는 큐브가 ${count}개 있어요. 맨 위층부터 세고 아래층으로 내려가며 빠진 부분을 확인해 보세요.`,
    historyDetail: ({ game, size, target, answer }) => game === 'cubes' ? `큐브 세기 · ${size}×${size} · 입력 ${answer}` : `네모 세기 · ${size}×${size} · 목표 ${target} · 입력 ${answer}`,
  },
  ja: {
    title: '悪魔のゲーム | 脳トレパズル',
    description: '悪魔のゲーム — 脳トレパズルに挑戦して記録を伸ばそう。',
    brand: '悪魔のゲーム', offline: 'サーバー不要、自分のペースで', languageLabel: '言語選択', backBlog: 'ブログへ',
    homeEyebrow: 'ゲームを選ぶ', homeTitle: '今日の頭脳に<br /><em>挑戦してみよう。</em>',
    homeDescription: 'ゲームを選んで記録を重ね、連続正解の記録に挑戦しましょう。',
    played: 'チャレンジ回数', accuracy: '正解率', bestStreak: '最高連続正解', currentStreak: '現在の連続正解',
    countUnit: '回', libraryKicker: 'GAME LIBRARY', libraryTitle: 'ゲームを選ぶ', availableCount: ' ゲーム公開中',
    gameIndex: 'GAME 01', gameIndex2: 'GAME 02', gameIndex3: 'GAME 03', available: 'プレイ可能', squaresTitle: '四角を数えよう',
    squaresDescription: '目標の数字になる長方形を、すべて見つけましょう。', squaresTags: '数字・観察力',
    cubesTitle: 'キューブを数えよう', cubesDescription: '積み上がったキューブの総数を数えましょう。', cubesTags: '空間認識・観察力',
    coming: '準備中', comingTitle: '新しいゲーム', comingDescription1: '次の頭脳ゲームを追加予定です。',
    comingBottom: 'COMING SOON', historyKicker: 'RECENT ACTIVITY', historyTitle: '最近の記録',
    localLabel: 'この端末に保存', emptyHistory: 'まだ記録がありません。最初の問題に挑戦しましょう。',
    back: 'ゲーム選択', gameKicker: 'GAME 01 · 数字パズル', cubeKicker: 'GAME 02 · 空間パズル', sizeLabel: 'マス目の大きさ',
    newPuzzle: '新しい問題', blank: '空白', boardNote: 'マス目の線に沿った長方形を数えます。1マスも含みます。',
    targetLabel: '目標の数字', targetCaption: '四角の中の数字の合計', totalCubesLabel: 'キューブの総数', cubeCaption: '積み上がったキューブの数',
    cubeBoardNote: '隠れているキューブも含めて、構造全体の数を数えましょう。', answerLabel: '答えを入力', answerPlaceholder: '個数', answerUnit: '個',
    submit: '回答する', hint: 'ヒントを見る', hideHint: 'ヒントを閉じる', next: '次の問題へ',
    streakKicker: '連続正解チャレンジ', streakUnit: '連続正解', bestLabel: 'ベスト記録',
    streakDescription: '正解を続けて、<br />自己ベストを更新しましょう。',
    rulesTitle: '遊び方', rule1: 'マス目の中から長方形を見つけます。', rule2: '四角の中の数字をすべて足します。',
    rule3: '合計が目標と同じになる四角の数を入力します。', cubeRule1: '柱の高さと、前後に隠れたキューブを確認します。',
    cubeRule2: '段ごと、または柱ごとに分けて数えましょう。', cubeRule3: '構造全体のキューブ数を入力します。', tipLabel: 'TIP',
    tipText: '同じ四角を二度数えないように、位置と大きさを確認しましょう。',
    cubeTipText: '柱ごとに足すか、一番上の段から一段ずつ数えてみましょう。',
    gameFooter: '記録はこのブラウザーにのみ保存されます。', homeFooter: '観察して、考えて、解いてみよう。',
    ready: '空白は合計に含まれません。連続正解に挑戦しましょう。',
    cubeReady: '隠れているキューブも含めて全体の数を数えましょう。',
    invalid: '0以上の整数を入力してください。',
    correct: ({ answer, streak }) => `正解！ ${answer}個です。${streak}問連続正解中！`,
    incorrect: ({ answer }) => `正解は${answer}個です。次の問題で連続記録に再挑戦しましょう。`,
    storageError: '記録を保存できませんでしたが、ゲームは続けられます。',
    hintText: ({ startRow, startColumn, endRow, endColumn }) => `ヒントになる四角の例：${startRow}行${startColumn}列から${endRow}行${endColumn}列までの合計が目標の数字になります。他の位置や大きさの四角も探してみましょう。`,
    historySolution: ({ solution, hintUsed }) => `正解 ${solution}個${hintUsed ? ' · ヒント使用' : ''}`,
    resultCorrect: '正解', resultIncorrect: '不正解', rowsCols: ({ size }) => `${size}行 · ${size}列`,
    boardAria: ({ size }) => `${size}かける${size}の数字のマス目`,
    cell: ({ row, column, value }) => value === null ? `${row}行${column}列、空白` : `${row}行${column}列、${value}`,
    cubeDimensions: ({ size }) => `${size}×${size}のキューブ構造`, cubeAria: ({ size }) => `${size}かける${size}のキューブの塔`,
    cubeHintText: ({ height, count }) => `ヒント：最上段の${height}段目には${count}個あります。上の段から数えて、下の段へ順に確認しましょう。`,
    historyDetail: ({ game, size, target, answer }) => game === 'cubes' ? `キューブを数えよう · ${size}×${size} · 回答 ${answer}` : `四角を数えよう · ${size}×${size} · 目標 ${target} · 回答 ${answer}`,
  },
};

const boardElement = document.querySelector('#board');
const targetElement = document.querySelector('#target-number');
const answerInput = document.querySelector('#answer-input');
const feedbackElement = document.querySelector('#answer-feedback');
const sizeSelect = document.querySelector('#board-size');
const puzzleNumberElement = document.querySelector('#puzzle-number');
const dimensionsElement = document.querySelector('#board-dimensions');
const hintBox = document.querySelector('#hint-box');
const hintButton = document.querySelector('#show-hint');
const nextButton = document.querySelector('#next-puzzle');

let puzzleNumber = 0;
let currentGame = 'squares';
let currentBoard = null;
let currentAnswer = 0;
let currentSolutions = [];
let currentHint = null;
let currentFeedback = { key: 'ready', values: {} };
let hasAnswered = false;
let hintUsed = false;
let language = loadLanguage();
let records = loadRecords();

function t(key, values = {}) {
  const value = copy[language][key];
  return typeof value === 'function' ? value(values) : value;
}

function loadLanguage() {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved === 'ko' || saved === 'ja') return saved;
    // Use the blog's locale only until the player chooses a game language.
    return /^ja(?:[-_]|$)/i.test(localStorage.getItem('i18nextLng') || '') ? 'ja' : 'ko';
  } catch {
    return 'ko';
  }
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  try {
    localStorage.setItem(LANGUAGE_KEY, language);
  } catch {
    // Language switching still works if browser storage is unavailable.
  }
  applyLanguage();
  renderRecords();
  if (currentBoard) {
    if (currentGame === 'cubes') renderCubeStack(currentBoard);
    else renderBoard(currentBoard);
  }
  setFeedback(currentFeedback.key, currentFeedback.values);
  renderHint();
}

function applyLanguage() {
  const elements = {
    'brand-title': 'brand', 'offline-label': 'offline', 'back-blog-label': 'backBlog', 'home-eyebrow': 'homeEyebrow',
    'home-description': 'homeDescription', 'label-played': 'played', 'label-accuracy': 'accuracy',
    'label-best-streak': 'bestStreak', 'label-current-streak': 'currentStreak',
    'library-kicker': 'libraryKicker', 'library-title': 'libraryTitle', 'available-count': 'availableCount',
    'game-card-index': 'gameIndex', 'available-label': 'available', 'card-squares-title': 'squaresTitle',
    'card-squares-desc': 'squaresDescription', 'card-squares-tags': 'squaresTags',
    'game-card-index-2': 'gameIndex2', 'game-card-index-3': 'gameIndex3', 'available-label-2': 'available',
    'card-cubes-title': 'cubesTitle', 'card-cubes-desc': 'cubesDescription', 'card-cubes-tags': 'cubesTags',
    'coming-label-1': 'coming', 'coming-title-1': 'comingTitle',
    'coming-desc-1': 'comingDescription1', 'coming-bottom-1': 'comingBottom',
    'history-kicker': 'historyKicker', 'history-title': 'historyTitle', 'local-label': 'localLabel',
    'back-label': 'back', 'game-kicker': 'gameKicker', 'size-label': 'sizeLabel',
    'new-puzzle-label': 'newPuzzle', 'blank-label': 'blank', 'board-note': 'boardNote',
    'target-label': 'targetLabel', 'target-caption': 'targetCaption', 'answer-label': 'answerLabel',
    'submit-label': 'submit', 'next-label': 'next', 'streak-kicker': 'streakKicker', 'streak-unit': 'streakUnit',
    'best-line-label': 'bestLabel', 'rules-title': 'rulesTitle', 'rule-1': 'rule1', 'rule-2': 'rule2',
    'rule-3': 'rule3', 'tip-label': 'tipLabel', 'rule-tip-text': 'tipText',
    'home-footer-label': 'homeFooter', 'game-footer-label': 'gameFooter',
  };
  Object.entries(elements).forEach(([id, key]) => {
    document.getElementById(id).textContent = t(key);
  });
  document.querySelectorAll('.unit-count').forEach((element) => { element.textContent = t('countUnit'); });
  document.querySelectorAll('.footer-brand').forEach((element) => { element.textContent = t('brand'); });
  document.querySelector('#home-title').innerHTML = t('homeTitle');
  document.querySelector('#streak-description').innerHTML = t('streakDescription');
  document.querySelector('#answer-input').placeholder = t('answerPlaceholder');
  document.querySelector('#answer-unit').textContent = t('answerUnit');
  document.querySelector('#board-size').setAttribute('aria-label', t('sizeLabel'));
  document.querySelector('#brand-home').setAttribute('aria-label', `${t('brand')} ${language === 'ja' ? 'ホーム' : '홈'}`);
  document.querySelector('#offline-label').parentElement.setAttribute('aria-label', t('offline'));
  document.querySelector('.language-switch').setAttribute('aria-label', t('languageLabel'));
  document.querySelector('.records-overview').setAttribute('aria-label', language === 'ja' ? 'プレイ記録の概要' : '플레이 기록 요약');
  document.querySelector('#board').setAttribute('aria-label', language === 'ja' ? '数字のマス目' : '숫자 격자');
  document.querySelectorAll('.locked-card').forEach((card) => card.setAttribute('aria-label', language === 'ja' ? '新しいゲーム、準備中' : '새 게임 준비 중'));
  document.querySelector('#language-ko').setAttribute('aria-pressed', String(language === 'ko'));
  document.querySelector('#language-ja').setAttribute('aria-pressed', String(language === 'ja'));
  document.documentElement.lang = language;
  document.title = t('title');
  document.querySelector('meta[name="description"]').content = t('description');
  if (hintBox.hidden) hintButton.querySelector('#hint-label').textContent = t('hint');
  else hintButton.querySelector('#hint-label').textContent = t('hideHint');
  updateGameLabels();
  updateBoardDimensions();
}

function updateGameLabels() {
  const cubes = currentGame === 'cubes';
  document.querySelector('.legend').hidden = cubes;
  document.querySelector('#game-title').textContent = t(cubes ? 'cubesTitle' : 'squaresTitle');
  document.querySelector('#game-kicker').textContent = t(cubes ? 'cubeKicker' : 'gameKicker');
  document.querySelector('#selected-game-index').textContent = cubes ? '02' : '01';
  document.querySelector('#target-label').textContent = t(cubes ? 'totalCubesLabel' : 'targetLabel');
  document.querySelector('#target-caption').textContent = t(cubes ? 'cubeCaption' : 'targetCaption');
  document.querySelector('#board-note').textContent = t(cubes ? 'cubeBoardNote' : 'boardNote');
  document.querySelector('#rule-1').textContent = t(cubes ? 'cubeRule1' : 'rule1');
  document.querySelector('#rule-2').textContent = t(cubes ? 'cubeRule2' : 'rule2');
  document.querySelector('#rule-3').textContent = t(cubes ? 'cubeRule3' : 'rule3');
  document.querySelector('#rule-tip-text').textContent = t(cubes ? 'cubeTipText' : 'tipText');
  document.querySelector('#board').setAttribute('aria-label', t(cubes ? 'cubeAria' : 'boardAria', { size: Number(sizeSelect.value) }));
}

function loadRecords() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.history)) {
      return {
        played: Number(saved.played) || 0,
        correct: Number(saved.correct) || 0,
        currentStreak: Number(saved.currentStreak) || 0,
        bestStreak: Number(saved.bestStreak) || 0,
        history: saved.history.slice(0, 10),
      };
    }
  } catch {
    // The game still works if browser storage is disabled or unavailable.
  }
  return { played: 0, correct: 0, currentStreak: 0, bestStreak: 0, history: [] };
}

function saveRecords() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    setFeedback('storageError');
  }
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createBoard(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => (Math.random() < 0.13 ? null : randomInteger(1, 9))),
  );
}

function findRectangles(board, target = null) {
  const rows = board.length;
  const columns = board[0].length;
  const rectangles = [];

  for (let top = 0; top < rows; top += 1) {
    const columnSums = Array(columns).fill(0);
    for (let bottom = top; bottom < rows; bottom += 1) {
      for (let column = 0; column < columns; column += 1) {
        columnSums[column] += board[bottom][column] ?? 0;
      }
      for (let left = 0; left < columns; left += 1) {
        let sum = 0;
        for (let right = left; right < columns; right += 1) {
          sum += columnSums[right];
          if (target === null ? sum > 0 : sum === target) {
            rectangles.push({ top, left, bottom, right, sum });
          }
        }
      }
    }
  }
  return rectangles;
}

function renderBoard(board) {
  const size = board.length;
  boardElement.className = 'board';
  boardElement.setAttribute('role', 'grid');
  boardElement.setAttribute('aria-label', t('boardAria', { size }));
  boardElement.style.setProperty('--cols', size);
  boardElement.replaceChildren();
  board.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      const cell = document.createElement('div');
      cell.className = value === null ? 'cell blank' : 'cell';
      cell.setAttribute('role', 'gridcell');
      cell.setAttribute('aria-label', t('cell', { row: rowIndex + 1, column: columnIndex + 1, value }));
      cell.textContent = value ?? '';
      boardElement.append(cell);
    });
  });
}

function renderCubeStack(heights) {
  const size = heights.length;
  const cellWidth = 36;
  const cellDepth = 20;
  const maxHeight = Math.max(...heights.flat());
  const margin = 18;
  const width = size * cellWidth + margin * 2;
  const height = (size - 1) * cellDepth + maxHeight * cellDepth + cellDepth + margin * 2;
  const pieces = [];
  const columns = [];
  heights.forEach((row, rowIndex) => row.forEach((stackHeight, columnIndex) => {
    columns.push({ row: rowIndex, column: columnIndex, stackHeight });
  }));
  columns.sort((a, b) => (a.row + a.column) - (b.row + b.column) || a.row - b.row);

  const halfWidth = cellWidth / 2;
  const halfDepth = cellDepth / 2;
  for (const column of columns) {
    const { row, column: col, stackHeight } = column;
    const centerX = margin + halfWidth + ((col - row + size - 1) * halfWidth);
    const baseY = margin + ((row + col) * halfDepth) + maxHeight * cellDepth;
    const topY = baseY - stackHeight * cellDepth;

    for (let level = 0; level < stackHeight; level += 1) {
      const y = topY + level * cellDepth;
      const leftFace = `${centerX - halfWidth},${y + halfDepth} ${centerX},${y + cellDepth} ${centerX},${y + cellDepth * 2} ${centerX - halfWidth},${y + halfDepth + cellDepth}`;
      const rightFace = `${centerX},${y + cellDepth} ${centerX + halfWidth},${y + halfDepth} ${centerX + halfWidth},${y + halfDepth + cellDepth} ${centerX},${y + cellDepth * 2}`;
      pieces.push(`<polygon class="cube-left-face" points="${leftFace}" />`);
      pieces.push(`<polygon class="cube-right-face" points="${rightFace}" />`);
    }

    const top = `${centerX},${topY} ${centerX + halfWidth},${topY + halfDepth} ${centerX},${topY + cellDepth} ${centerX - halfWidth},${topY + halfDepth}`;
    const accent = (row + col) % 5 === 0 ? ' accent' : '';
    pieces.push(`<polygon class="cube-top-face${accent}" points="${top}" />`);
  }

  boardElement.className = 'cube-board';
  boardElement.setAttribute('role', 'img');
  boardElement.setAttribute('aria-label', t('cubeAria', { size }));
  boardElement.style.removeProperty('--cols');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.innerHTML = pieces.join('');
  boardElement.replaceChildren(svg);
}

function setFeedback(key, values = {}) {
  currentFeedback = { key, values };
  const state = key === 'correct' ? 'success' : ['invalid', 'incorrect', 'storageError'].includes(key) ? 'error' : '';
  feedbackElement.textContent = t(key, values);
  feedbackElement.className = `feedback${state ? ` ${state}` : ''}`;
}

function updateBoardDimensions() {
  const size = Number(sizeSelect.value);
  dimensionsElement.textContent = t(currentGame === 'cubes' ? 'cubeDimensions' : 'rowsCols', { size });
}

function renderRecords() {
  const accuracy = records.played ? Math.round((records.correct / records.played) * 100) : 0;
  document.querySelector('#stat-played').textContent = records.played;
  document.querySelector('#stat-accuracy').textContent = accuracy;
  document.querySelector('#stat-best-streak').textContent = records.bestStreak;
  document.querySelector('#stat-current-streak').textContent = records.currentStreak;
  document.querySelector('#game-current-streak').textContent = records.currentStreak;
  document.querySelector('#game-best-streak').textContent = `${records.bestStreak}${t('countUnit')}`;

  const historyList = document.querySelector('#history-list');
  historyList.replaceChildren();
  if (records.history.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'history-empty';
    empty.textContent = t('emptyHistory');
    historyList.append(empty);
    return;
  }

  records.history.slice(0, 5).forEach((entry) => {
    const row = document.createElement('div');
    row.className = 'history-row';
    const date = document.createElement('span');
    date.className = 'history-date';
    date.textContent = entry.timestamp
      ? new Date(entry.timestamp).toLocaleString(language === 'ja' ? 'ja-JP' : 'ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      : entry.date;
    const detail = document.createElement('span');
    detail.className = 'history-detail';
    detail.textContent = t('historyDetail', { game: entry.game ?? 'squares', size: entry.size, target: entry.target, answer: entry.answer });
    const count = document.createElement('span');
    count.className = 'history-detail';
    count.textContent = t('historySolution', { solution: entry.solution, hintUsed: entry.hintUsed });
    const result = document.createElement('span');
    result.className = `history-result ${entry.correct ? 'correct' : 'incorrect'}`;
    result.textContent = t(entry.correct ? 'resultCorrect' : 'resultIncorrect');
    row.append(date, detail, count, result);
    historyList.append(row);
  });
}

function renderHint() {
  if (!currentHint || hintBox.hidden) return;
  if (currentGame === 'cubes') {
    hintBox.textContent = t('cubeHintText', currentHint);
    return;
  }
  hintBox.textContent = t('hintText', {
    startRow: currentHint.top + 1,
    startColumn: currentHint.left + 1,
    endRow: currentHint.bottom + 1,
    endColumn: currentHint.right + 1,
  });
}

function startPuzzle() {
  if (currentGame === 'cubes') startCubePuzzle();
  else startSquaresPuzzle();
}

function startSquaresPuzzle() {
  const size = Number(sizeSelect.value);
  let board = createBoard(size);
  let possibilities = findRectangles(board);
  while (possibilities.length === 0) {
    board = createBoard(size);
    possibilities = findRectangles(board);
  }

  currentBoard = board;
  const target = possibilities[randomInteger(0, possibilities.length - 1)].sum;
  currentSolutions = findRectangles(board, target);
  currentAnswer = currentSolutions.length;
  hasAnswered = false;
  hintUsed = false;
  currentHint = null;
  puzzleNumber += 1;
  puzzleNumberElement.textContent = String(puzzleNumber).padStart(2, '0');
  updateBoardDimensions();
  targetElement.textContent = target;
  answerInput.value = '';
  answerInput.disabled = false;
  document.querySelector('#submit-answer').disabled = false;
  nextButton.hidden = true;
  hintBox.hidden = true;
  hintButton.setAttribute('aria-expanded', 'false');
  hintBox.textContent = '';
  hintButton.querySelector('#hint-label').textContent = t('hint');
  renderBoard(board);
  setFeedback('ready');
  renderRecords();
}

function startCubePuzzle() {
  const size = Number(sizeSelect.value);
  const maximumHeight = size + 1;
  const heights = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => randomInteger(1, maximumHeight)),
  );
  currentBoard = heights;
  currentAnswer = heights.flat().reduce((sum, stackHeight) => sum + stackHeight, 0);
  currentSolutions = [];
  currentHint = null;
  hasAnswered = false;
  hintUsed = false;
  puzzleNumber += 1;
  puzzleNumberElement.textContent = String(puzzleNumber).padStart(2, '0');
  updateBoardDimensions();
  targetElement.textContent = '?';
  answerInput.value = '';
  answerInput.disabled = false;
  document.querySelector('#submit-answer').disabled = false;
  nextButton.hidden = true;
  hintBox.hidden = true;
  hintButton.setAttribute('aria-expanded', 'false');
  hintBox.textContent = '';
  hintButton.querySelector('#hint-label').textContent = t('hint');
  renderCubeStack(heights);
  setFeedback('cubeReady');
  renderRecords();
}

function submitAnswer() {
  if (hasAnswered) return;
  const rawAnswer = answerInput.value.trim();
  if (rawAnswer === '' || !Number.isInteger(Number(rawAnswer)) || Number(rawAnswer) < 0) {
    setFeedback('invalid');
    answerInput.focus();
    return;
  }

  hasAnswered = true;
  const enteredAnswer = Number(rawAnswer);
  const isCorrect = enteredAnswer === currentAnswer;
  records.played += 1;
  if (isCorrect) {
    records.correct += 1;
    records.currentStreak += 1;
    records.bestStreak = Math.max(records.bestStreak, records.currentStreak);
    setFeedback('correct', { answer: currentAnswer, streak: records.currentStreak });
  } else {
    records.currentStreak = 0;
    setFeedback('incorrect', { answer: currentAnswer });
  }

  records.history.unshift({
    timestamp: new Date().toISOString(),
    game: currentGame,
    size: Number(sizeSelect.value),
    target: currentGame === 'cubes' ? null : Number(targetElement.textContent),
    answer: enteredAnswer,
    solution: currentAnswer,
    correct: isCorrect,
    hintUsed,
  });
  records.history = records.history.slice(0, 10);
  saveRecords();
  renderRecords();
  answerInput.disabled = true;
  document.querySelector('#submit-answer').disabled = true;
  nextButton.hidden = false;
}

function showHint() {
  if (hintBox.hidden) {
    if (currentGame === 'cubes') {
      const highest = Math.max(...currentBoard.flat());
      const countAtHighest = currentBoard.flat().filter((stackHeight) => stackHeight === highest).length;
      currentHint = { height: highest, count: countAtHighest };
    } else {
      currentHint = currentSolutions[randomInteger(0, currentSolutions.length - 1)];
    }
    hintBox.hidden = false;
    hintButton.setAttribute('aria-expanded', 'true');
    hintButton.querySelector('#hint-label').textContent = t('hideHint');
    hintUsed = true;
    renderHint();
  } else {
    hintBox.hidden = true;
    hintButton.setAttribute('aria-expanded', 'false');
    hintButton.querySelector('#hint-label').textContent = t('hint');
  }
}

function showScreen(screenName) {
  const home = screenName === 'home';
  document.querySelector('#home-screen').hidden = !home;
  document.querySelector('#game-screen').hidden = home;
  if (home) renderRecords();
  else startPuzzle();
  document.querySelector(home ? '#home-title' : '#game-title').focus({ preventScroll: true });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
}

function openGame(game) {
  currentGame = game;
  const availableSizes = game === 'cubes' ? [3, 4, 5] : [4, 5, 6];
  const preferredSize = game === 'cubes' ? 4 : 5;
  sizeSelect.replaceChildren();
  availableSizes.forEach((size) => {
    const option = document.createElement('option');
    option.value = String(size);
    option.textContent = `${size} × ${size}`;
    sizeSelect.append(option);
  });
  sizeSelect.value = String(preferredSize);
  updateGameLabels();
  showScreen('game');
}

document.querySelector('#open-squares').addEventListener('click', () => openGame('squares'));
document.querySelector('#open-cubes').addEventListener('click', () => openGame('cubes'));
document.querySelector('#back-home').addEventListener('click', () => showScreen('home'));
document.querySelector('#brand-home').addEventListener('click', (event) => {
  event.preventDefault();
  showScreen('home');
});
document.querySelector('#new-puzzle').addEventListener('click', startPuzzle);
nextButton.addEventListener('click', startPuzzle);
document.querySelector('#submit-answer').addEventListener('click', submitAnswer);
hintButton.addEventListener('click', showHint);
sizeSelect.addEventListener('change', startPuzzle);
answerInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') submitAnswer();
});
document.querySelector('#language-ko').addEventListener('click', () => setLanguage('ko'));
document.querySelector('#language-ja').addEventListener('click', () => setLanguage('ja'));

applyLanguage();
renderRecords();
