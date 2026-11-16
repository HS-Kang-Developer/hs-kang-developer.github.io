## 📝 プロジェクト情報

| 項目 | 内容 |
|------|------|
| バージョン | 1.0 |
| 説明 | ChatGPT適用|
| 最終更新日 | 2026-02-16 |

## 악마의 게임 / 悪魔のゲーム

- 실행 파일: public/games/puzzle-arena/{index.html,script.js,style.css}
- 원본: C:\Users\auden\Desktop\vs_code\neomo-segi-practice (원본은 수정하지 않음)
- 블로그의 개인 공부용 프로젝트 카드 → /games/puzzle-arena/에서 플레이합니다.
- 모든 게임 스타일은 .devil-game 안으로 제한됩니다. 외부 라이브러리·폰트·API는 사용하지 않습니다.
- 게임 언어 선택이 없으면 같은 도메인의 블로그 언어를 참고합니다. 이후에는 게임에서 선택한 언어를 유지합니다.

### 로컬 확인

~~~sh
npm start
# http://localhost:3000/games/puzzle-arena/
node scripts/test-puzzle-arena.cjs
node --test scripts/test-portfolio-refresh.cjs
npm run build
~~~

이 저장소는 WSL에 있으므로 WSL 터미널에서 위 명령을 실행합니다.
Windows의 UNC 경로에서는 Jest의 테스트 경로 탐색과 CRA 빌드가 실패할 수 있습니다.

한국어·일본어로 게임 선택 → 두 게임의 크기 변경 → 힌트 → 오답·정답 확인 → 다음 문제를 확인합니다.
새로고침 후 기록 유지, 터치 조작, 320px 이상 모바일 화면, 블로그로 돌아가기와 기존 Sudoku 링크도 확인합니다.

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

### GitHub Pages

기존 npm run deploy는 빌드 후 gh-pages 브랜치에 커밋·푸시합니다.
public/games/puzzle-arena/도 빌드에 함께 복사되므로 별도 게임 배포는 필요하지 않습니다.
배포 시 현재 작업 트리의 기존 수정 사항도 포함됩니다. 배포할 변경 범위를 먼저 확인하세요.
웹 배포본의 오프라인 재접속을 보장하는 서비스 워커는 추가하지 않았습니다.
