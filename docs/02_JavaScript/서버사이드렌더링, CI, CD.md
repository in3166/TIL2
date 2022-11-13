# Static Sites

- 서버에 HTML 문서들이 존재하고 사용자가 주소로 접속하면 파일을 불러와 보여주는 형식
- 다른 페이지를 갈 경우 다시 서버에서 파일을 받아오기 때문에 페이지 전체가 업데이트 - 사용성 하락

# iFrame

- 페이지 내에서 부분적으로 업데이트 가능
<br>

# XMLHttpRequest

- HTML 문서 전체가 아니라 JSON 같은 포멧으로 필요한 데이터만 가져와 JS로 동적으로 HTML 요소 생성 후 페이지에 업데이트

# AJAX

- 공식적으로 위의 방식 명칭

## SPA (Single Page Application)

- 한 페이지 내에 머물며 필요한 데이터만 서버에서 받아와 부분적 업데이트
- 사용성 향상

<br>

# CSR(Client Side Rendering)

- 서버에서 아주 간단한 빈 HTML을 가져온다.

```HTML
<body>
  <div id="root"></div>
  <script src="app.js"></script>
</body>
```

- HTML 파일에 링크된 어플리케이션 JS를 다시 서버에서 받아온다
  - 어플리케이션에서 필요한 로직과 함께 App을 구동하는 프레임워크, 라이브러리 소스코드도 포함되어 사이즈가 크다. (react, vue ...)
  - 추가적 필요한 데이터는 서버에서 데이터를 받아 동적으로 업데이트
  
- 단점
  - 사용자가 처음 화면을 보기까지 시간이 오래걸린다.
  - Low SEO (Search Engine Optimizaion): 검색 엔진들은 서버에 등록된 웹사이트의 HTML을 분석해 검색어, 링크들을 등록해 빠른 검색 도와준다.
    - CSR은 빈 HTML 파일을 가지므로 분석하기 어려움이 있다.
<br>

# SSR (Server Side Rendering)

- 웹사이트에서 접속하면 서버에서 필요한 데이터를 가져와 HTML을 서버에서 만들고 동적으로 조금 제어할 수 있는 JS파일과 함께 Client에게 전달
- Client는 바로 HTML을 사용자에게 보여준다.

- 장점
  - 초기 로딩이 빨라진다.
  - Great SEO: 모든 컨텐츠가 HTML에 담겨있음.

- 단점
  - Blinking issue: static site처럼 사용자가 클릭하면 전체적 웹사이트를 서버에서 받아오는 것과 동일하기 때문
  - Non-rich site interactions: 서버가 과부하 걸리기 쉽다.
  - Need to wait before interacting: 사용자가 동적으로 처리하는 JS파일을 받지 못해서 사이트 여기저기 클릭하면 반응이 없을 수 있다.

## TTV (Time To View)와 TTI (Time To Interact)

- 서버 성능 분석에도 중요한 요소

### CSR의 경우 시간 순 처리 과정

- 1. Client가 서버에 주소 요청 (사이트 접속)
- 2. JS링크가 담긴 빈 HTML 파일 전송
- 3. JS파일 요청
- 4. JS 파일과 함께 모든 동적이 처리가 가능한 소스코드 전송 (사용자가 웹사이트를 볼 수 있게 된다.)

- 즉, CSR은 `TTV`가 된 순간 `TTI`가 가능하다.
- 최종적 번들링해 Client에 보내주는 JS파일을 어떻게 효과적으로 분할해서 첫번째로 사용자가 보기위해 필요한 필수적 파일을 보낼 수 있게 고민

### SSR의 경우 시간 순 처리 과정

- 1. Client가 서버에 주소 요청 (사이트 접속)
- 2. Server가 잘 만들어진 index.html 파일을 보낸다.
- 3. Client는 사이트를 볼 수 있게 된다. (TTV)
- 4. 동적으로 처리할 수 있는 JS 파일을 서버에 요청한다.
- 5. 서버에서 JS파일을 전송해주면 이 때 동적인 Interact가 가능해진다. (TTI)

- 시간의 단차를 줄이는게 필요

<br>

# SSG (Static Site Generation)

- 렌더링 로직 최소화, 스크립트 다운로드와 로딩 시간이 짧아진다.
- 하지만, 어플리케이션이 커지고 Interact 요소가 많아지면 CSR, SSR과 큰 차이가 없다.
- CI/CD 환경 구축 시점에 빌드에 많은 리소스가 요구되는 특성이 있어 개발 파이프라인에 빌드용 클라우드 컴퓨터가 따로 있는데 이 컴퓨터의 성능이 좋지 못해 deploy까지 오래걸린다.

## Gatsby (개츠비)

- React (CSR 특화 라이브러리) + Gatsby (Static Site Generation)
- React로 만든 어플리케이션을 정적으로 웹페이지를 미리 생성하여 서버에 배포할 수 있다.
- 추가적으로 데이터를 요청하거나 동적으로 처리할 로직이 있다면 HTML파일과 JS 파일을 함께 가지고 있을 수 있어 동적인 요소 추가 가능

## Next.js

- React + Next.js
- 원래 SSR 지원하는 라이브러리였지만 요샌 SSG도 지원
- CSR과 SSR을 조합하여 유연한 어플리케이션 생성 가능

<br><br>

## TIP

### Rendering 선택 요소

- 로그인이 필요없는 페이지는 SEO를 고려해 SSR로 구현
- 로그인이 필요한 페이지는 CSR로 구현 후 ServiceWorker를 붙이는 방식
- 로그인 필요한 경우 CSR + SSR로 구현할 수도 있다.
  - 로그인까지만 SSR로 만든 후 로그인 이후 페이지들을 특정 경로로 묶은 후 CSR을 섞는 방법 (`<domain>/login/`, `<domain>/app/`)
  - 로그인 후 토큰을 query에 붙여 다른 도메인으로 넘겨주는 방법, 로그인까진 SSR, CSR로 구현된 다른 웹싸이트에 토큰 정보 넘겨주기(보안 주의)
- 한 페이지 안에 특정 구역에만 CSR로 구현된 컨텐츠를 붙여야 할 경우
  - `iframe`
  - `webComponent`
  - 처음 셋팅 복잡, reverse proxy 서버도 필요할 가능성 존재
  
## Service Worker

- 모듈화된 JS들은 빌드 시 이름과 디렉토리를 기억
- 첫 스크립트 로딩 직후 ServiceWorker로 미리 JS를 받아와 캐싱해두는 형태로 사용하면 성능상 더 좋을 수 있다.
- [ServiceWorder best practice와 보일러플레이트 코드](https://developers.google.com/web/tools/workbox)

## CI/CD

- 애플리케이션 개발 단계를 자동화하여 애플리케이션을 보다 짧은 주기로 고객에게 제공하는 방법
- 지속적인 통합, 지속적인 서비스 제공, 지속적인 배포
<img src="02_JavaScript/img/cicd.jpg" />
  
### CI (Continuous Integration)

- 지속적인 통합
- 어플리케이션의 새로운 코드 변경 사항이 정기적으로 빌드 및 테스트되어 공유 레포지토리에 통합하는 것
- CI가 필요한 환경
  - 다수의 개발자가 형상관리 툴을 공유하여 사용하는 환경: 자동화된 빌드&테스트는 원천 소스코드의 충돌 등을 방어
  - MSA(Micro Service Archietecture)
    - 작은 기능별로 서비스를 잘게 쪼개어 개발하는 형태의 아키텍처 모델
    - Agile 방법론 적용: 기능 추가 빈번 - 기능 충돌 방지

### CD (Continuous Delivery & Continuous Deployment)

- 지속적인 서비스 제공: 공유 레포지토리로 자동으로 Release하는 것
- 지속적인 배포: Production 레벨까지 자동으로 deploy 하는 것
<img src="02_JavaScript/img/cicd2.png" />

- CI가 새로운 소스코드의 빌드, 테스트, 병합을 의미한다면
- CD는 개발자의 변경 사항이 레포지토리를 넘어 고개의 프로덕션 환경까지 릴리즈 되는 것

- 예
  - CI에서 MSA같은 Agile이 적용된 경우, 서비스의 사용자는 최대한 빨리 최신 버전의 Production을 제공받을 필요가 있다.
  - 이 때, 소프트웨어가 언제든 신뢰 가능한 수준의 버전을 유지할 수 있도록 도와주는 것이 CD 이다.
  
<br><br><br>
<출처>

- [드림코딩](https://www.youtube.com/watch?v=iZ9csAfU5Os)
- <https://www.redhat.com/ko/topics/devops/what-is-ci-cd>
- <https://artist-developer.tistory.com/24>
