# Module

- 애플리케이션을 구성하는 개별적 요소로 재사용 가능한 코드 조각
- 기능별로 묶어논 코드 뭉치 (파일 단위 분리)
- 세부사항을 캡슐화하고 공개가 필요한 API 만을 외부에 노출
<br>

- 기존 자바스크립트는 `script` 태그를 사용하여 외부 스크립트 파일을 가져올 순 있지만,
- JS 파일을 여러개로 분리하여 태그로 로드해도 결국 하나의 JS 파일 내에 있는 것처럼 하나의 전역 객체를 공유한다.
- 전역 변수 중복 등의 문제 발생, 모듈화 구현 불가

## Module 사용

- ES6에서 클라이언트 사이드 자바스크립트에서도 동작하는 모듈 기능이 추가
- `<script type="module" src="lib.mjs"></script>`, module 속성 추가하면 파일이 모듈로 동작
  - JS 파일이 곧 모듈, 모듈에서 다른 모듈을 가져와 사용할 수 있고 반대도 가능
  - 항상 `엄격모드`로 실행 (최상위 레벨의 this는 undefined)

<br>

## 모듈 스코프

`ES6 모듈 기능 사용 X`

```javascript
// foo.js
var x = 'foo';

// 변수 x는 전역 변수이다.
console.
log(window.x); // foo
```

```javascript
// bar.js
// foo.js에서 선언한 전역 변수 x와 중복된 선언이다.
var x = 'bar';

// 변수 x는 전역 변수이다.
// foo.js에서 선언한 전역 변수 x의 값이 재할당되었다.
console.log(window.x); // bar
```

```html
<html>
<body>
  <script src="foo.js"></script>
  <script src="bar.js"></script>
</body>
</html>
```

- 하나의 전역을 공유, 하나의 전역 스코프

`ES6 모듈 기능 사용 O`

```javascript
// foo.mjs
var x = 'foo';

console.log(x); // foo
// 변수 x는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.
console.log(window.x); // undefined
```

```javascript
// bar.mjs
// 변수 x는 foo.mjs에서 선언한 변수 x와 스코프가 다른 변수이다.
var x = 'bar';

console.log(x); // bar
// 변수 x는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.
console.log(window.x); // undefined
```

```html
<html>
<body>
  <script type="module" src="foo.mjs"></script>
  <script type="module" src="bar.mjs"></script>
</body>
</html>
```

- 파일 자체의 스코프 제공, 독자적인 ***모듈 스코프***
- var 코드로 선언 변수는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.

<br>
  
## export 키워드

- 모듈 안에 선언한 식별자를 외부에 공개하여 다른 모둘 참조 가능하게 하려면 `export` 키워드 사용 (변수, 함수, 클래스 모두 가능)
- 선언문 앞에 export 키워드 사용

```js
// lib.mjs
const pi = Math.PI;

function square(x) {
  return x * x;
}

class Person {
  constructor(name) {
    this.name = name;
  }
}

// 변수, 함수 클래스를 하나의 객체로 구성하여 공개
export { pi, square, Person };
```

<br/>

## 현재 ES6 Module 사용을 위해 컴파일러 필요 (Babel, Traceur)

- 현재는 몇 가지 이유로 `Webpack` 등의 모듈 번들러 사용
  - 구형 브라우저는 ES6 모듈을 지원하지 않음
  - ES6 모듈 기능을 사용해도 트랜스파일링이나 번들링 필요
  - 지원하지 않는 기능, 몇 가지 이슈 등
<br/>

## Babel & Webpack

### 트랜스파일러(Transfiler) Babel

- 구형 브라우저에서 지원하지 않는 기능을 ES5 이하 버전으로 변환

  ```JAVASCRIPT
  // ES6 화살표 함수와 ES7 지수 연산자
  [1, 2, 3].map(n => n ** n); 
  ```

  ```JAVASCRIPT
  // ES5
  "use strict";

  [1, 2, 3].map(function (n) {
   return Math.pow(n, n);
  });
  ```
  
- Babel CLI 설치

  ```
  # 프로젝트 폴더 생성
  $ mkdir es6-project && cd es6-project
  # package.json 생성
  $ npm init -y
  # babel-core, babel-cli 설치
  $ npm install --save-dev @babel/core @babel/cli
  ```

- .babelrc 설정 파일 작성
  - Babel 사용을 위해 `@babel/preset-env` 설치 - Babel 플로그인 모아 둔 것 (Babel이 제공하는 공식 Babel 프리셋 중 하나)
  - Babel이 제공하는 공식 Babel Preset
  - `.browserslistrc`에 설정 가능, 설정 생략 시 기본값으로 설정
  - 기본값으로 설정 하기

    ```
    # 섪치
    npm install --save-dev @babel/preset-env
    ```

    ```
    # package.json
    {
      {
      "name": "es6-project",
      "version": "1.0.0",
      "devDependencies": {
      "@babel/cli": "^7.7.0",
      "@babel/core": "^7.7.2",
      "@babel/preset-env": "^7.7.1"
      }
    }
    ```

  - 설치 완료 후 루드 디렉토리에 .babelrc 파일을 생성

    ```

    #babel.config.js
    {
     "presets": ["@babel/preset-env"]
    }
    ```

- 트랜스파일링
  - Babel CLI 명령어 사용하거나 `npm script` 사용  
  - package.json에 scripts 추가\
  - src/js 폴더(타깃 폴더)에 있는 모든 ES6+ 파일들을 트랜스파일링한 후, 그 결과물을 dist/js 폴더에 저장

    ```
    {
     "name": "es6-project",
     "version": "1.0.0",
     "scripts": {
        "build": "babel src/js -w -d dist/js"
      },
     "devDependencies": {
        "@babel/cli": "^7.7.0",
        "@babel/core": "^7.7.2",
        "@babel/preset-env": "^7.7.1"
      }
    }
    ```

### 모듈 번들러(Module Bundler)

- 의존 관계에 있는 모듈들을 하나의 자바스크립트 파일로 번들링
- 다수의 자바스크립트 파일을 하나의 파일로 번들링하므로 html 파일에서 script 태그로 다수의 자바스크립트 파일을 로드해야 하는 번거로움도 사라진다.

- Webpack 설치

```
# Webpack V4는 webpack-cli를 요구한다
$ npm install --save-dev webpack webpack-cli
```

- babel-loader: Webpack이 모듈 번들링 시 Babel을 사용하여 ES6+ 코드를 트랜스파일링 하도록 설치

```
npm install --save-dev babel-loader
```

- npm script 변경하여 Babel 대신 Webpack 실행하도록 수정

```
{
  "name": "es6-project",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack -w"
  },
  "devDependencies": {
    "@babel/cli": "^7.7.0",
    "@babel/core": "^7.7.2",
    "@babel/plugin-proposal-class-properties": "^7.7.0",
    "@babel/preset-env": "^7.7.1",
    "babel-loader": "^8.0.6",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10"
  }
}
```

- webpack.config.js
- Webpack이 실행될 때 참조하는 설정 파일

```javascript
const path = require('path');

module.exports = {
  // enntry file
  entry: './src/js/main.js',
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
};
```

- babel-polyfill
  - 대체할 수없는 기능, 추가된 객체나 메소드는 트랜스파일링이 안됨, 이를 해결 `@babel/polyfill`

  ```
  npm install @babel/polyfill
  ```

  ```javascript
  // src/js/main.js
  import "@babel/polyfill";
  ...
  ```

  - webpack 사용 시 위 과정 대신 webpack.config.js 파일의 entry 배열에 추가
  
  ```javacript
  // webpack.config.js
  const path = require('path');

  module.exports = {
    // entry files
    entry: ['@babel/polyfill', './src/js/main.js'],
   ...
  ```
  
<br><br><br>
<출처>

- <https://2dubbing.tistory.com/83>
- <https://poiemaweb.com/es6-module>
