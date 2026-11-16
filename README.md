## 📝 プロジェクト情報

| 項目 | 内容 |
|------|------|
| バージョン | 1.0 |
| 説明 | ChatGPT適用|
| 最終更新日 | 2026-02-16 |

## 악마의 게임 / 悪魔のゲーム

게임 소스와 배포는 [MiniGames 저장소](https://github.com/HS-Kang-Developer/MiniGames)에서 관리합니다.

- 공개 주소: https://hs-kang-developer.github.io/MiniGames/puzzle-arena/
- 한국어·일본어 공부용 프로젝트 카드는 위 주소로 연결됩니다.
- 기존 /games/puzzle-arena/는 새 게임으로 이동하는 정적 리디렉션만 제공합니다.
- 게임 회귀 검사는 MiniGames의 tests/puzzle-arena.html에서 실행합니다.

### 블로그 로컬 확인

~~~sh
node --test scripts/test-portfolio-refresh.cjs
npm run build
~~~

빌드에는 게임 엔진이나 게임 CSS의 중복본을 포함하지 않습니다. 블로그 디자인·프로젝트·연락처 코드는 유지합니다.

### 기록 보존과 이전

기존 키 akmaui-game-records-v1과 akmaui-game-language-v1, 기록 JSON 형식을 유지합니다.
같은 출처(프로토콜·도메인·포트)의 기존 기록은 그대로 읽으며, 초기 화면 진입이나 언어 변경으로 기록을 초기화하지 않습니다.
file://·localhost·GitHub Pages는 저장 공간이 다릅니다. 원본을 직접 열어 플레이한 기록은 자동 이전되지 않습니다.

필요하면 원본 게임을 열었던 브라우저의 개발자 도구 콘솔에서 아래를 실행하고 반환된 문자열을 보관합니다.
다른 주소로 이동하기 전에 기록을 백업하고, 목적지에 기존 기록이 있다면 그 기록도 먼저 백업합니다.

~~~js
JSON.stringify({
  records: localStorage.getItem('akmaui-game-records-v1'),
  language: localStorage.getItem('akmaui-game-language-v1')
})
~~~

목적지 게임의 콘솔에서 아래를 실행하고 앞서 보관한 JSON을 붙여 넣습니다.
유효한 백업만 받으며, 목적지의 기록을 대체하기 전에 확인합니다.

~~~js
(() => {
  const input = prompt('기록 백업 JSON을 붙여 넣으세요 / 記録のJSONを貼り付けてください');
  if (!input) return;
  const backup = JSON.parse(input);
  if (typeof backup.records !== 'string') throw new Error('No records');
  const records = JSON.parse(backup.records);
  if (!records || !Array.isArray(records.history) ||
      !['played', 'correct', 'currentStreak', 'bestStreak'].every(
        key => Number.isInteger(records[key]) && records[key] >= 0
      )) throw new Error('Invalid records');
  if (!confirm('현재 기록을 백업 데이터로 대체할까요? / 現在の記録を置き換えますか？')) return;
  localStorage.setItem('akmaui-game-records-v1', backup.records);
  if (['ko', 'ja'].includes(backup.language)) {
    localStorage.setItem('akmaui-game-language-v1', backup.language);
  }
  location.reload();
})();
~~~
