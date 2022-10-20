## 브라우저의 리소스 우선순위를 정할 수 있는 `<link>` 태그의 속성들

- 기본적으로 `<head>` 태그 안의 `<script>` 태그는 높은 우선순위로 로드 (CSS 다음)
- `defer` 속성이 있으면 낮음으로 우선순위 변경
<br>

# preload

- 현재 페이지에서 **사용될 것이 확실한 리소스**들을 지정
- 브라우저에게 현재 페이지에서 필요한 리소스를 빠르게 가져온다.

```html
<link rel="preload" as="script" href="script.js" >
<link rel="preload" as="script" href="style.css" >
```

## 주의 사항

- `as` 속성
  - 리소스의 유형을 브라우저에게 알려줘야 한다.
  - 올바른 유형이 설정되어 있지 않다면 브라우저는 해당 리소스를 사용하지 않는다.

- 중복 리소스 참조
  - `preload`는 브라우저가 반드시 리소스를 가져오게 하므로 중복 참조하면 중복된 개수만크 가져온다.

- 반드시 사용되는 리소스에만 사용
  - 리소스를 가져와 3초 이내로 사용되지 않으면 경로를 포함한 경고가 출력된다.

  ```
  The resource http://~/script.js was preloaded using link preload but not used within a few seconds from the window's load event. 
  Please make sure it wasn't preloaded for nothing.
  ```
  
## 사례

- 폰트
  - 사용자가 사이트의 폰트를 기다리는 시간 감소, 시스템 폰트와 선언되 폰트 간 충돌 해결

  ```html
  <link rel="preload" as="font" crossorigin="crossorigin" type="font/woff2" href="font.woff2">
  ```
  
- Critical Rendering Path의 CSS/JavaScript
  - `Critical Rendering Path`: 초기 렌더링 전 반드시 로드되어야 할 리소스

  ```html
  <link rel="preload" as="script" href="important.js">
  <link rel="preload" as="style" href="critical.css">
  ```

<br><br>

# preconnect

- 현재 페이지에서 외부 도메인의 리소스를 참조하는 것을 브라우저에 알려 **미리 외부 도메일과 연결 설정**
- 브라우저가 사이트에 필요한 연결을 미리 예상해 필요한 소켓을 미리 설정할 수 있어 DNS, TCP, TLS 왕복에 필요한 시간 감소

```HTML
<link rel="preconnect" href="https://example.com">
```

## 주의 사항

- 외부 도메인과 연결을 구축하므로 CPU 시간을 많이 차지할 수 있다. (보안 연결의 경우 더 많은 시간을 차지)
- 10초 이내로 브라우저가 닫히면, 이전의 모든 연결 작업이 낭비되므로 빨리 닫힐 수 있는 페이지에서는 지양한다.

## 사례

- 정확한 경로를 알 수 없을 때
  - 주어진 CDN으로 리소스를 가져와야 하는 것은 알지만 정확한 결로를 모르는 상황 존재
  - 예를 들어, 브라우저 별로 가져와야할 라이브러리의 리소스 버전이 다를 때 CDN 주소는 알지만 정확한 경로는 모름
  - 브라우저는 리소스를 가져오진 않지만 미리 서버에 연결하여 시간 절약
  - 파일이 필요하기 전에 리소스를 가져오진 않지만 미리 연결을 처리하여 리소스 요청 시 여러 번의 왕복을 기다리지 않아도 된다.

- 미디어 스트리밍
  - 스크립트가 로드되고 스트리밍 데이터를 처리할 준비가 될 때까지 스트리밍을 기다리고 싶을 때
  - 미리 연결하여 시간을 절약하고 스트리밍 콘텐츠를 가져올 준비가 되면 단일 왕복으로 가져와 시간을 줄인다.

<br><br>

# prefetch

- 사용자가 탐색이나 상호작용으로 향후 사용될 수 있는 리소스를 브라우저에 알림
- 즉, 미래에 **사용될 것이라고 예상되는 리소스**를 알림
- 사용자가 다음에 할 행동을 미리 준비한다. (ex. 페이지 번호가 있는 콘텐츠의 다음 페이지를 가져오는 것)

```html
<link rel="prefetch" href="page-2.html">
```

## 주의 사항

- 재귀적으로 동작하지 않음
  - 위의 예에서 `prefetch`된 페이지에 필요한 리소스는 명시적으로 가져오지 않는 한 다운로드 되지 않는다.

- Override 목적으로 사용하지 않음
  - 재정의 목적(우선순위를 낮추는 방식)으로 사용하면 안된다.

  ```html
  <head>
    <link rel="prefetch" href="optional.css">
    <link rel="stylesheet" href="optional.css">
  </head>
  ```

  - 스타일을 두 번 가져오게 되어 낭비 발생

## 사례

<br><br>

<br><br><br>
<출처>

- <https://beomy.github.io/tech/browser/preload-preconnect-prefetch/>
- <https://www.keycdn.com/blog/resource-hints>
- <https://github.com/im-d-team/Dev-Docs/blob/master/HTML/preload%26prefetch.md>
