# 함수의 `this` 키워드
- 일반적으로 객체지향에서 객체 자신을 가리킴
- 함수의 호출 방법에 의해 결정 (실행 컨텍스트를 가리킴)
  - 내가 함수를 호출한 시점에 나는 어떤 객체에 위치해있었는가
  
- bind 메서드로 함수의 호출과 관계없이 설정 가능
- 스스로의 this 바인딩을 제공하지 않는 화살표함수

## 전역 문맥
- `window` 객체: 브라우저 상 자바스크립트의 전역 객체
- 전역 실행 문맥(Global Execution Context)에서 this는 엄격 모드 여부에 관계없이 전역 객체를 참조

```javascript
// 웹 브라우저에서는 window 객체가 전역 객체
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b)  // "MDN"
console.log(b)         // "MDN"
```

## 함수 문맥
1. 단순 호출
- 비엄격 모드, this의 값이 호출에 의해 설정되지 않으므로 기본값으로 브라우저에서 window 전역 객체

```javascript
function f1() {
  return this;
}

// 브라우저
f1() === window; // true

// Node.js
f1() === global; // true
```


- 엄격 모드에서 `this` 값은 실행 문맥에 진입하며 설정되는 값을 유지, `undefined`
- `f2`를 객체의 메서드나 속성(`obj.f2()`)가 아닌 직접 호출해서 this는 `undefined`

```javascript
function f2(){
  "use strict"; // 엄격 모드 참고
  return this;
}

f2() === undefined; // true
```


<br><br>

# this가 window 객체를 가리키지 않으려면..?
- `this`의 값을 다른 문맥으로 넘기려면
## 바인딩 이용
- `call`, `apply`, `bind` 같은 메서드를 사용

### 'bind' 사용
- `f.bind(Object)` 호출하면 'f'와 같은 본문(코드)과 같은 범위를 가졌지만 this는 원본 함수를 가진 새로운 함수를 생성
- 새 함수의 `this`는 호출 방식과 상관없이 영구적으로 `bind()`의 첫 번째 매개변수로 고정

```javascript
function f() {
  return this.a;
}

var g = f.bind({a: 'azerty'});
console.log(g()); // azerty

var h = g.bind({a: 'yoo'}); // bind는 한 번만 동작함!
console.log(h()); // azerty

var o = {a: 37, f: f, g: g, h: h};
console.log(o.a, o.f(), o.g(), o.h()); // 37, 37, azerty, azerty
```

### 'call' 사용
- 앞의 인자는 `this`로 사용될 인자(Arg)이고, 뒤의 인자는 원래 함수의 인자

```js
function thisTest(arg){
    console.log(arg, this);
}

thisTest('test'); // test, Window 객체 출력

let customThis = {
    message: 'it is custom this!!'
}
// 함수의 this 객체는 'customThis' 객체를 넣고, 함수의 인자로 'test' 문자열을 넣음
thisTest.call(customThis, 'test');  // test {message: "it is custom this!!"}
```

### 'apply' 사용
- `[인자1, 인자2]` 형식으로 사용

```js
thisTest.apply(customThis, ['test']);
```


```js
// call 또는 apply의 첫 번째 인자로 객체가 전달될 수 있으며 this가 그 객체에 묶임
var obj = {a: 'Custom'};

// 변수를 선언하고 변수에 프로퍼티로 전역 window를 할당
var a = 'Global';

function whatsThis() {
  return this.a;  // 함수 호출 방식에 따라 값이 달라짐
}

whatsThis();          // this는 'Global'. 함수 내에서 설정되지 않았으므로 global/window 객체로 초기값을 설정한다.
whatsThis.call(obj);  // this는 'Custom'. 함수 내에서 obj로 설정한다.
whatsThis.apply(obj); // this는 'Custom'. 함수 내에서 obj로 설정한다.
```

```javascript
function add(c, d) {
  return this.a + this.b + c + d;
}

var o = {a: 1, b: 3};

// 첫 번째 인자는 'this'로 사용할 객체이고,
// 이어지는 인자들은 함수 호출에서 인수로 전달된다.
add.call(o, 5, 7); // 16

// 첫 번째 인자는 'this'로 사용할 객체이고,
// 두 번째 인자는 함수 호출에서 인수로 사용될 멤버들이 위치한 배열이다.
add.apply(o, [10, 20]); // 34
```

- 비엄격 모드에서 `this`로 전달된 값이 객체가 아닌 경우
- `call()`과 `apply()`는 이를 객체로 변환 시도
- `null`, `undefined` 값은 전역 객체가 됨
- 7 이나 'foo' 같은 원시값은 관련된 생성자를 사용해 객체로 변환
  - 7 -> new Number(7), 'foo' -> new String('foo') 객체로 변환

  ```javascript
  function bar() {
    console.log(Object.prototype.toString.call(this));
  }

  bar.call(7);     // [object Number]
  bar.call('foo'); // [object String]
  bar.call(undefined); // [object global]
  ```
  
<br><br>

## 2. new 키워드 사용
- 생성자로 

```js
function thisTest2(something){
	this.something = something; 
}

thisTest2('abcd'); // undefined
window.something; // 'abcd'

const newObj = new thisTest2('ABCD');
newObj; // thisTest2 {something: 'ABCD'}
```


<br><br>

## 화살표 함수
- `this`는 자신을 감싼 `정적 범위(Lexical Context)`
- `this` 값을 재정의하지 않고 밖의 값을 갖고옴
- 전역 코드에서는 전역 객체를 가리킴
- `call()`, `bind()`, `apply()`로 호출 시 `this` 무시, 매개변수 지정은 가능하지만 첫번째 매개변수는 `null`로 지정

```js
var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject); // true  , window
```

```javascript
// 객체로서 메서드 호출
var obj = {func: foo};
console.log(obj.func() === globalObject); // true

// call을 사용한 this 설정 시도
console.log(foo.call(obj) === globalObject); // true

// bind를 사용한 this 설정 시도
foo = foo.bind(obj);
console.log(foo() === globalObject); // true

// foo의 this는 생성 시점의 것으로 설정(global 객체)
// this는 싸여진 렉시컬 컨텍스트의 것으로 유지
```

- 예시

```javascript
// this를 반환하는 메소드 bar를 갖는 obj를 생성합니다.
// 반환된 함수는 화살표 함수로 생성되었으므로,
// this는 감싸진 함수의 this로 영구적으로 묶입니다.
// bar의 값은 호출에서 설정될 수 있으며, 이는 반환된 함수의 값을 설정하는 것입니다.
var obj = {
  bar: function() {
    var x = (() => this);
    return x;
  }
};

// obj의 메소드로써 bar를 호출하고, this를 obj로 설정
// 반환된 함수로의 참조를 fn에 할당
var fn = obj.bar();

// this 설정 없이 fn을 호출하면,
// 기본값으로 global 객체 또는 엄격 모드에서는 undefined
console.log(fn() === obj); // true

// 호출 없이 obj의 메소드를 참조한다면 주의하세요.
var fn2 = obj.bar;
// 화살표 함수의 this를 bar 메소드 내부에서 호출하면
// fn2의 this를 따르므로 window를 반환할것입니다.
console.log(fn2()() == window); // true
```

- obj.bar 함수에 this 설정 유지


```js
// forEach의 콜백은 그냥 일반 함수로 this === window
let obj = {
  names: [1],
  func: function () {
     console.log("func this: ", this); // obj
  },
  func2: function () {
     console.log("func2 this: ", this); // window
  },
};
obj.func();
obj.func2();
```

<br><br>

## 객체의 메서드로서 `this` 호출
- this 값: 그 객체

```javascript
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};
// 객체 o가 함수 내부의 this완 연결
console.log(o.f()); // 37
```

- 함수가 정의된 방법이나 위치와 상관 x
- 함수 먼저 정의하고 추가해도 동일

```javascript
var o = {prop: 37};

function independent() {
  return this.prop;
}

o.f = independent;
// 함수 o의 멤버 f로 부터 호출된 것만이 중요
console.log(o.f()); // logs 37
```

- this 바인딩은 가장 즉각으로 멤버 대상에 영향

```javascript
o.b = {g: independent, prop: 42};
console.log(o.b.g()); // logs 42
```

- 객체 메서드로서 화살표 함수

```js
var obj = {
  f1: () => {
    return this; // window
  }
}
obj.f1();
}
```

<br>

## 객체의 프로토타입 체인에서 `this`
- 객체의 포로토타입 체인 어딘가에 정의한 메서드도 마찬가지로 어떤 객체의 프로토타입 체인 위에 메서드가 존재하면, this의 값은 그 객체가 메서드를 가진 것 마냥 설정

```javascript
var o = {
  f:function() { return this.a + this.b; }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```

<br>

## 접근자와 설정자의 `this`
- 접근자나 설정자로 사용하느 함수의 this는 접근하거나 설정하는 속성을 가진 객체로 묶임

```javascript
function sum() {
  return this.a + this.b + this.c;
}

var o = {
  a: 1,
  b: 2,
  c: 3,
  get average() {
    return (this.a + this.b + this.c) / 3;
  }
};

Object.defineProperty(o, 'sum', {
    get: sum, enumerable: true, configurable: true});

console.log(o.average, o.sum); // 2, 6
```

<br>

## 생성자로서
- 함수를 new 키워드와 함께 생성자로 사용하면 this 새로 생긴 객체에 묶임

```javascript
function C() {
  this.a = 37;
}

var o = new C();
console.log(o.a); // 37


function C2() {
  this.a = 37;
  return {a: 38};
}

o = new C2();
console.log(o.a); // 38
```

<br>

## DOM 이벤트 처리기로서
- `addEventListener`의 콜백으로 등록한 함수의 `this`는 해당 이벤트 요소(e.CurrentTarget Element)이다.
- `addEventListener`의 콜백 함수는 `button.onclick = function`와 비슷

```js
document.getElementById("labe").addEventListener("click", function (e) {
   console.log(this); // e.currentTarget
   
   let arr = [1, 2, 3];
   arr.forEach(function (a) {
     console.log(this); // window
   });
   
   arr.forEach(() => {
     console.log(this); // <label>... lexical context
   });
});

// 위 처럼 콜백 함수를 이벤트 리스너에 등록하면
// 아래처럼 this를 event target에 설정
for (var i = 0, l = stack.length; i < l; i++) {
   stack[i].call(this, event); // stack array = callback function
}

// 화살표 함수는 함수가 생성된 context와 동일한 값을 갖는다.
document.getElementById("labe").addEventListener("click", () => {
  console.log(this);
}); // window
```

<br>

## 인라인 이벤트 핸들러에서
- 코드를 인라인 이벤트 처리기로 사용하면 this는 처리기를 배치한 DOM 요소로 설정

```html
<button onclick="alert(this.tagName.toLowerCase());">
  this 표시
</button>

<button onclick="alert((function() { return this; })());">
  내부 this 표시
</button>
```

<br><br>

# 참조 타입

```js
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John 

// name에 따라 user.hi나 user.bye가 호출
(user.name == "John" ? user.hi : user.bye)(); // TypeError: Cannot read property 'name' of undefined

```
- `obj.method()` 연산 2가지
  - 1. 점 `.`은 객체 프로퍼티 `obj.method`에 접근
  - 2. 괄호 `()`는 접근한 프로퍼티(메서드)를 실행
- 위를 쪼개보면

```js
// 메서드 접근과 호출을 별도의 줄에서 실행함
let hi = user.hi;
hi(); // this가 undefined이기 때문에 에러가 발생.
```

- `user.hi()`를 의도한 대로 동작시키기 위해 JS는 `.`이 함수가 아닌, **참조 타입(Reference T)** 값을 반환
  - 참조 타입: '명세서' 에서만 사용디는 타입, 개발자 실제 사용 불가
  - 참조 타입 값: `(base, name, strict)` 조합
    - `base`: 객체
    - `name`: 프로퍼티 이름
    - `strict`: 엄격 모드에선 true
    
  - `user.hi`로 프로퍼티에 접근하면 참조 타입 반환: `(user, "hi", true)`
  - 참조형 값에 괄호 `()`를 붙여 호출하면 객체, 객체의 메서드와 연관된 정보를 받는덷 이 정보를 기반 `this(=user)`가 결정
  - 참조 타입은 점 `.` 연산에서 알아낸 정보를 괄호`()`에 절단해주는 '중개인' 역할
  - 그런데 점 연산 이외의 연산(할당 등)은 참조 타입을 통째로 버리고 `user.hi`값(함수)만 받아 전달, 이 때문에 점 이외의 연산에서 `this`가 사라진다.
  - 그래서 `obj.method()` 같이 점을 사용하거나, `obj[method]()` 같이 대괄호를 사용해 함수를 호출했을 때만 this 값이 의도한 대로 전달

### 예제1

```js
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)()
```

- 에러 발생 이유
  - `let user = {}` 뒤에 **'세미콜론'**이 없다.
  - 자바스크립트는 괄호(`(user.go)`) 앞에 세미콜론을 자동으로 넣어주지 않는다.
  ```js
  let user = { go:... }(user.go)()
  ```
  - 위와 같아지므로 인수가 `(user.go)`인 객체 형태의 함수를 호출한 것처럼 된다.
  - 또한 객체 `user`가 정의되지 않은 채로 같은 줄에 `let user`를 사용하고 있어 에러가 발생한다.

- `(user.go)`처럼 괄호를 감싸는 것은 아무런 역할을 하지 않는다.
- 괄호는 대개 연산자 우선순위를 바꾸는 데 사용되는데, 위에선 점 `.` 연산자가 먼저 동작하므로 의미가 없다.

### 예제2

```js
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]  - 일반적인 메서드 호출
(obj.go)();             // (2) [object Object]  - 괄호가 추가되엇지만 연산 우선순위를 바꾸진 않으므로 점 연산자가 먼저 실행
(method = obj.go)();    // (3) undefined  - `(expression).method()`
(obj.go || obj.stop)(); // (4) undefined  - (3)과 동일한 패턴의 호출. expression이 obj.go || obj.stop라는 차이점만
```

- (3)은 아래와 같이 쪼갤 수 있다.

```js
f = obj.go; // 표현식 계산하기
f();        // 저장된 것 호출하기 - f()는 (메서드가 아닌) 함수로써 호출, this 정보 없음
```

**`메서드 호출을 제외하고, 참조 타입 값에 행해지는 모든 연산은 참조 타입 값을 일반 값으로 변환시킨다!`**


<br><br>

## 예제들

```js
let user = {
    firstName: "John",
    sayHi() {
      console.log(`Hello, ${this.firstName}!`);
    }
  };
  
  function b() {
    let h1 = user.sayHi; // 아직 호출하지 않음.
    let h2 = user.sayHi(); // 호출을 user 에서 함
      function c() {
          user.sayHi(); // Hello, John!
          h1();
          h2;
      }
      c();
  }

b();

  setTimeout(function() {
    user.sayHi(); // Hello, John!
  }, 1000);
  
// Hello, John!
// Hello, John!
// h1(): Hello, undefined!
// Hello, John! 


  let obj1 = {
    outer: function () {
      console.log("outer this: ", this); // outer
      let inner = function () {
        console.log('inner this: ', this); // window
      }
      inner();
    }
  } 

  obj1.outer();
  
  // outer this:  { outer: [Function: outer] }
  // inner this:  Object [global]
```


<br><br><br>
<출처>
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this
- https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%8C%81-This-%EC%A0%95%EB%A6%AC-x4k5upn6i6
- https://ko.javascript.info/reference-type
