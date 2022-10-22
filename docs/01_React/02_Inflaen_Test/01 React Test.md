# React Test

## React Testing Library

- React Component를 테스트하는 가벼운 솔루션
  - 구현 주도 테스트 (Implementation Driven Test)를 하는 `Enzyme` 라이브러리를 대체
  - RTL은 `행위 주도 테스트(Behavior Driven Test)`를 한다.

<br>

- 구현 주도 테스트
  - 컴포넌트 내의 `state`의 흐름이나 컴포넌트 사이의 `props` 교환 등에 초점을 맞춰 테스트

- 행위 주도 테스트
  - 어떤 행위(기능)들이 잘 작동하는지에 초점

<br>

- `Create React App`으로 React 앱 생성 시 기본적으로 `React Testing Library`를 사용한다.
- React 구성 요소 작업을 위한 API를 추가하여 `DOM Testing Library` 위에 구축된다.
  - **DOM Testing Library**
    - DOM 노드를 테스트하기 위한 가벼운 솔루션

- 직접 추가: `npm install --save-dev @testing-library/react`

<br><br>

## DOM (Document Object Model) - 문서 객체 모델

- XML, HTML 문서의 각 항목을 계층으로 표현하여 생성, 변형, 삭제할 수 있도록 돕는 인터페이스
- HTML이 브라우저 렌더링 엔진에 의해 분석된 결과물로 HTML 요소들의 구조화(*내용과 구조가 객체 모델로*)된 표현

### 웹 페이지 빌드 과정 (Critical Rendering Path, CRP)

- 브라우저가 서버에서 페이지에 대한 HTML 응답을 받고 화면에 표시하기 전의 단계
  - 브라우저 주소창에 URL을 입력하면 서버에서 HTML 문서를 받는다.
  - 받은 문서를 파싱해서 `Bytes` -> `Characters` -> `Tokens` -> `Nodes` -> `DOM` 순으로 만든다.

    <img src="01_React/img/rendering_test1.PNG" width="77%" />

- 웹 브라우저가 HTML 문서를 읽고, 스타일을 입힌 후 뷰포트에 표시하기까지의 과정
- [브라우저 렌더링 정리](https://github.com/in3166/TIL2/blob/main/docs/05_ETC/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80_%EB%A0%8C%EB%8D%94%EB%A7%81.md)

<img src="01_React/img/cra_path.PNG" width="77%" />

<br>

- 과정 요약
  - DOM 트리까지
    - 문서를 읽어 파싱하고 어떤 내용을 페이지에 렌더링할지 결정
    - HTML, CSS + JavaScript

  - 렌더 트리 단계
    - 브라우저가 DOM과 CSSOM을 결합
    - 화면에 보이는 모든 콘텐츠와 스타일 정보를 포함하는 최종 렌더링 트리를 출력
    - 화면에 표시되는 모든 노드의 콘텐츠 및 스타일 정보를 포함
  
  - 레이아웃
    - 브라우저가 페이지에 표시되는 각 요소의 크기와 위치를 계산하는 단계
  
  - 페인트
    - 브라우저는 레이아웃 결과를 선택하고 픽셀을 화면에 표시한다.

<br>

## 프로젝트 생성하기

`npm create-react-app <project-directory>`

- `babel`, `webpack` 등을 따로 설정해주지 않아도 된다.
  - `babel`: 최신 자바스크립트 문법을 지원하지 않는 브라우저에서도 코드가 실행될 수 있게 변환
  - `webpack`: modern JavaScript application을 위한 `static module bundler`
    - 웹팩이 앱을 처리하면 내부적으로 프로젝트가 필요한 모든 모듈을 맵핑한 `dependency graph`를 빌드하고 하나 이상의 번들을 생성한다.

<br><br>

## Jest

- FaceBook에서 만든 테스팅 프레임 워크
- 최소한의 설정으로 동작, Test Case를 만들어 애플리케이션 코드가 잘 돌아가는지 확인한다.
- 단위(unit) 테스트를 위해 사용

<br>

- `React Testing Library`을 사용해 DOM을 렌더링하고 그 DOM을 `Jest`로 테스팅한다.
- 또한, 테스트 코드를 짠 파일을 찾는 역할도 한다.
  - `filename.test.js`, `filename.spec.js`, `/tests`
  - 파일명에 `test`나 `spec`이 있거나 폴더명을 `tests`라고 설정 시 찾을 수 있다.

### Jest 시작하기

- Jest 라이브러리 설치: `npm install jest --save-dev`
- Test 스크립트 변경: `"test": "jest" or "jest --watchAll"`

- 테스트를 작성할 폴더 및 파일 기본 구조 생성

  ```md
  Test -> 단위 테스트 폴더 -> 단위 테스트 파일 '<대상 이름>.test.js'
       -> 통합 테스트 폴더 -> 통합 테스트 파일 '<대상이름>.test.init.js'
  ```

- `CRA`로 프로젝트 생성 시 이미 설치되어 있다.

<br>

### Jest 파일 구조 및 사용법

- `describe`: 여러 관련 테스트를 그룹화
- `it (= test)`: 개별 테스트를 수행하는 곳, 각 테스트를 작은 문장처럼 설명
- `expect`: expect 함수는 값을 테스트할 때마다 사용, matcher와 함께 사용됨
- `matcher`: 다른 방법으로 값을 테스트 하도록 사용 (`toBeTruthy()`, `toStringEqual`() 등)

```js

describe
  test (it){
    expect <-> matcher  
  }

  test (it){
    expect <-> matcher
  }
  //...

// 실제 예제
describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });

  it("should have a createProduct function", () => {
    expect(typeof productController.createProduct).tobe("function");
  });
  // ...
});
```

<br><br>

## React Testing Library 주요 API

- 프로젝트에서 기본 테스트 해보기
`npm test`

```js
// App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  // const {getByText} = render(<App />); 추천하지 않음
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument(); // element가 document에 존재하는지
});
```

- `render` 함수: DOM에 컴포넌트를 렌더링하느 함수
  - 인자로 렌더링할 컴포넌트를 받음
  - return: RTL에서 제공하는 쿼리함수와 기타 유틸리티 함수를 가진 객체 반환
  - Destructing 문법으로 원하는 쿼리만 가져올 수 있지만 소스 코드가 복잡해질 수 있어 `screen` 객체를 사용한다.
  - 쿼리 함수를 이용해 테스트를 진행

<br>

### 쿼리 함수

- 쿼리: 페이지에서 요소를 찾기 위해 테스트 라이브러리가 제공하는 방법
  - 여러 유형의 쿼리(`get`, `find`, `query`)가 존재
  - 유형 별로 요소의 발견되는지에 따라 오류를 발생시키는지 혹은 `Promise`를 반환하고 다시 시도하는지 다르다.

<br>

- `getBy...`
  - 쿼리에 일치하는 노드 반환
  - 요소가 없거나 둘 이상 일치하면 오류 발생
  - 둘 이상이 예상 되면 `getAllBy` 사용

- `queryBy...`
  - 쿼리에 일치하는 노드를 반환
  - 요소가 없으면 `null` 반환
  - 둘 이상 일치 시 오류 반환
  - 둘 이상 예상 시 `queryAllBy` 사용

- `findBy...`
  - 쿼리에 일치하는 요소 발견되면 `solved`되는 `Promise` 반환
  - 요소가 없거나 기본 제한 시간(1000ms) 후에 둘 이상 요소 발견 시 `reject`된다.
  - 둘 이상 예상 시 `findAllBy` 사용
  - `getBy` + `waitFor`

- `waitFor`: 일정 기간 기다려야 할 때 사용하여 기대가 통과할 때까지 기다릴 수 있다.

| 쿼리 유형 | 0 Matches | 1 Match | > 1 Matches | Retry(Async/Await) |
| -|-|-|-|-|
|`getBy...` | Throw Error | Return Element | Throw Error | X |
|`queryBy...`| Return Null | Return Element | Throw Error | X |
|`findBy...`| Throw Error | Return Element | Throw Error | O |
|Muliple Elements
|`getAllBy...`| Throw Error | Return Array | Return Array | X |
|`queryAllBy...`| Return `[]` | Return Array | Return Array | X |
|`findAllBy...`| Throw Error | Return Array | Return Array | O |

<br><br>

## ESLint Plugins

- 개발자가 규칙을 가지고 코드를 짤 수 있게 도와주는 라이브러리
- 가이드 라인 제시, 문법에 오류 발생 시 알려주는 역할
- 포멧터(Formatter) 역할도 하지만 주요 기능은 문법 오류를 잡아준다.

### ESLint 설치하기

- VSCode에서 `ESLint 익스텐션` 설치
  - CRA 프로젝트는 기본으로 eslint가 설정되어 있지만 VSCode에서 바로 확인할 수 없고 터미널에서 확인 가능

- eslint 설정파일 생성
  - `package.json`의 `eslintConfig` 부분 삭제 후 `.eslintrc.json` 파일 생성

- Testing을 위한 ESLint Plugins 설치
  - Plugins?
    - eslint에서 기본으로 제공하지 않는 규칙들을 플러그인을 통해 사용

  ```terminal
  npm install eslint-plugin-testing-library eslint-plugin-jest-dom --save-dev
  ```

- esilint 설정 파일 추가
  - 'plugins' 항목: 플러그인 추가
  - 'extends' 항목: 추가한 플러그인을 사용하겠다고 규칙 설정
  - 'rule` 항목: 규칙을 직접 변경하고자 할 때 설정

```json
{
  "plugins": ["testing-library", "jest-dom"],
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended"
  ]
}
```

<br>

## Prettier 설치 및 설정

- 주로 코드 형식을 맞추는데 사용
- 코드 포멧터 역할

### Prettier 설치하기

- `npm`으로 설치: 포맷을 공유하면 같이 개발하기 용이
- `VSCode` 익스텐션으로 설치: 혼자 편하게 사용가능

<br><br>

## Test Driven Development (TDD)

- 실제 코드 작성 전 테스트 코드를 먼저 작성
- 그 후, 테스트 코드를 Pass할 수 있는 실제 코드를 작성

### TDD 장점

- 많은 기능을 테스트하기에 코드에 안정성 부여
- 실제 개발하면서 많은 시간이 소요되는 부분은 디버깅 부분이다. TDD를 사용하면 디버깅 시간이 줄어들고 개발 시간도 줄어든다.
- 소스 코드를 신중히 짜게 되므로 께끗하고 간결한 코드가 나올 확률이 높다.

<br><br><br>

<출처>

- [따라하며 배우는 리액트 테스트](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8)
