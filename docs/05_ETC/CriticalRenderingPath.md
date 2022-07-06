# Critical Rendering Path
- 브라우저가 초기 페이지 출력을 위해 실행해야 하는 순서
  - DOM 트리 구축
  - CSSOM 트리 구출
  - JavaScript 실행
  - Render 트리 구축
  - Layout 생성
  - Painting

## CRP 최적화 방법

### CSS 미디어 유형, 미디어 쿼리 사용
- 특수한 경우에만 사용하는 CSS는 렌더링을 차단하지 않도록 한다.

```HTML
<link href="style.css"    rel="stylesheet">
<link href="style.css"    rel="stylesheet" media="all">
<link href="print.css"    rel="stylesheet" media="print">
<link href="portrait.css" rel="stylesheet" media="orientation:landscape">
<link href="other.css"    rel="stylesheet" media="min-width: 40em">
```

- 1. 모든 경우에 적요
- 2. 첫 번째와 동일
- 3. 콘텐츠가 인쇄될 때만 적용되어 처음 로드 시 페이지 렌더링을 차단하지 않음
- 4. 기기의 방향이 가로일 때 렌더링을 차단
- 5. 기기의 너비 조건이 해당될 대 렌더링 차단

### JavaScript
- 불필요한 JavaScript 제거
- 비동기 `async` 설정

### 리소스 우선순위 설정
- `preload`
- `prefetch`

...

<br><br><br>
<출처>
- https://beomy.github.io/tech/browser/critical-rendering-path/#%EB%A6%AC%EC%86%8C%EC%8A%A4-%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84-%EC%A7%80%EC%A0%95
