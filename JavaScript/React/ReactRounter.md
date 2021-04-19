## React Router 없이 라우팅 구현
```javsacript
import React, { useState } from "react"
import Home from "./Home"
import About from "./About"
import NotFound from "./NotFound"

function App() {
  const [comp, setComp] = useState(Home)

  return (
    <>
      <header>
        <button onClick={() => setComp(Home)}>Home</button>
        <button onClick={() => setComp(About)}>About</button>
        <button onClick={() => setComp(NotFound)}>Users</button>
      </header>
      <hr />
      <main children={comp} />
    </>
  )
}
```
### 문제점
- 페이지 이동 시 URL 고정 (히스토리 관리X)
- 뒤로 가기 시 그 전에 서핑하던 다른 웹사이트로 이동
- 새로 고침 시 무조건 최초에 렌더링된 Home 컴포넌트로 이동
- SEO(검색 엔진 최적화) 측면 검색 엔진에 의해 원치 않게 색인
<br>

# React Router
- 위의 SPA 라우팅 문제 해결을 위한 네비게이션 라이브러리
- 앱에서 발생하는 라우팅이 `location`/`history`등의 브라우저 내장 API와 연동 가능
- 그래서, SPA에서 제공하는 다이나믹한 사용자 경험과 기존 웹사이트의 매끈한 라우팅 제공 가능

## 설치
`npm i react-router-dom`

## 핵심 컴포넌트
### Link
- `<a>`태그와 유사 기능
- `to` prop을 통해 이동 경로 지정
- 주로 네비게이션 바 구현 시 사용
```javascript
<Link to="/about">About</Link>
```


### Route
- 현재 주소창의 경로와 매치될 경우 보여줄 컴포넌트 지정
- `path` prop으로 매치시킬 경로 지정, `component` prop으로 보여줄 컴포넌트 지정
```javascript
<Route path="/about" component={About} />
```

### Router 
- `<Route>`와 `<Link>`가 유기적 동작하도록 묶어줌
- DOM트리 상에서 할상 `<Router>`를 공통 상위 컴포넌트로 가져아함
```javascript
<Router>
  ...
  <Link />
  <Link />
  ...
  <Router />
  <Router />
  ...
</Router>
```

<br>

## React Router 라우팅 구현
```javascript
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/users">
          <button>Users</button>
        </Link>
      </header>
      <hr />
      <main>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/users" component={NotFound} />
      </main>
    </Router>
  )
}
```
- `/` 경로인 `<Route>`에만 `exact` prop이 사용된 이유는 React Router의 Default Matching 규칙 때문
  - `path`의 경로와 현재 브라우저의 주소창의 URL 경로(location.pathname)와 비교
  - 현재 URL 경로 값이 `path` 값의 앞부분 일부만 일치해도 매치되는 것으로 간주
  - URL 전체가 완벽히 일치하는 경우에만 매치 처리


### 404 페이지 처리
- `<Switch>` 컴포넌트로 모든 `<Route>`를 묶어주면 하위 컴포넌트 중 제일 첫번째와 매칭되는 컴포넌트만 보여주고 이후에 매치되도 무시
- 여기에 `path`가 없는 `<Route>`컴포넌트를 하나 추가하면 모든 경로에 매치가 가능, 여기에 404 컴포넌트 할당
```javascript
<main>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route component={NotFound} />
  </Switch>
</main>
```
<br><br>

# 중첩 라우팅
- 라우팅 맵핑을 최상위 컴포넌트 뿐만 아니라 여러 개의 컴포넌트에 걸쳐 단계별로 정의하는 라우팅 기법
- 예: `https://www.your-site.com/articles/1/comments`
- 각 하위 컴포넌트 레벨에서도 더 하위 경로에 대한 라우팅을 모듈화하면, 유지 보수가 쉬워지고 좀 더 유연한 라우팅 구현이 가능

## Route의 prop
- ReactRouter의 `<Route>` 컴포넌트의 prop으로 넘어오는 값들?
```javascript
<Router>
  <Route path="/about" component={About} />
</Router>
```
- ReactRouter는 `match`, `location`, `history` 3개의 prop을 `<About>` 컴포넌트에 넘겨준다.
```import React from "react"

function About({ match, location, history }) {
  return (
    <>
      <h1>About</h1>
      <pre>{JSON.stringify(match, null, 2)}</pre>
      <pre>{JSON.stringify(location, null, 2)}</pre>
      <pre>{JSON.stringify(history, null, 2)}</pre>
    </>
  )
}

export default Aboutjavascript
```
- `match.url`: `<Link>` 컴포넌트를 위해 사용, 실제로 매칭된 URL 문자열을 담고 있음(`article/1`)
- `match.path`: `<Route>` 컴포넌트를 위해 사용, 매칭에 사용된 경로의 패턴을 담고 있음(`article`:id`)

## 중첩 라우팅 구현
- `/user`: 유저 목록 페이지
- `/user/:id`: 유저 상세 페이지
### App 컴포넌트
- 최상위 컴포넌트에서 메뉴의 경로에 대응되는 컴포넌트 맵핑하는 기본 라우팅 구현
```javsacript
import React from "react"
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import Home from "./Home"
import About from "./About"
import Users from "./Users"
import NotFound from "./NotFound"

function App() {
  return (
    <Router>
      <header>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/users">
          <button>Users</button>
        </Link>
      </header>
      <hr />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/users" component={Users} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
```
<br>

### User 컴포넌트






<br><br><br>
<출처>
- https://www.daleseo.com/react-router-basic/
