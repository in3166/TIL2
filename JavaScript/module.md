# Module
- 애플리케이션을 구성하는 개별적 요소로 재사용 가능한 코드 조각
- 기능별로 묶어논 코드 뭉치 (파일 단위 분리)
- 세부사항을 캡슐화하고 공개가 필요한 API 만을 외부에 노출
<br/>
- 기존 자바스크립트는 `script` 태그를 사용하여 외부 스크립트 파일을 가져올 순 있지만, 
- JS 파일을 여러개로 분리하여 태그로 로드해도 결국 하나의 JS 파일 내에 있는 것처럼 하나의 전역 객체를 공유한다.
- 전역 변수 중복 등의 문제 발생, 모듈화 구현 불가

## Module 사용
- ES6에서 클라이언트 사이드 자바스크립트에서도 동작하는 모듈 기능이 추가
- `<script type="module" src="lib.mjs"></script>`, module 속성 추가하면 파일이 모듈로 동작
  - JS 파일이 곧 모듈, 모듈에서 다른 모듈을 가져와 사용할 수 있고 반대도 가능
  - 항상 `엄격모드`로 실행 (최상위 레벨의 this는 undefined)
  - 


- 현재는 몇 가지 이유로 `Webpack` 등의 모듈 번들러 사용
  - 구형 브라우저는 ES6 모듈을 지원하지 않음
  - ES6 모듈 기능을 사용해도 트랜스파일링이나 번들링 필요


## 모듈 스코프
`ES6 모듈 기능 사용 X`
```javascript
// foo.js
var x = 'foo';

// 변수 x는 전역 변수이다.
console.log(window.x); // foo
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


## export 키워드
- 모듈 안에 선언한 식별자를 외부에 공개하여 다른 모둘 참조 가능하게 하려면 `export` 키워드 사용 (변수, 함수, 클래스 모두 가능)
- 선언문 앞에 export 키워드 사용
```javacript
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

<br><br><br>
<출처>
- https://2dubbing.tistory.com/83
- https://poiemaweb.com/es6-module
