# 함수의 `this` 키워드
- 함수의 호출 방법에 의해 결정
- bind 메서드로 함수의 호출과 관계없이 설정 가능
- 스스로의 this 바인딩을 제공하지 않는 화살표함수


## 전역 문맥
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


- 엄격 모드에서 this 값은 실행 문맥에 진입하며 설정되는 값을 유지, undefined
- f2를 객체의 메서드나 속성(window.f2())가 아닌 직접 호출해서 this는 undefined
```javascript
function f2(){
  "use strict"; // 엄격 모드 참고
  return this;
}

f2() === undefined; // true
```


- this의 값을 다른 문맥으로 넘기려면 call(), apply()
```javascript
call 또는 apply의 첫 번째 인자로 객체가 전달될 수 있으며 this가 그 객체에 묶임
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


- 비엄격 모드에서 this로 전달된 값이 객체가 아닌 경우
- call과 apply는 이를 객체로 변환 시도
- null, undefined 값은 전역 객체가 됨
- 7이나 'foo' 같은 원시값은 관련된 생성자를 사용해 객체로 변환
  - 7 -> new Number(7), 'foo' -> new String('foo') 객체로 변환
  ```javascript
  function bar() {
    console.log(Object.prototype.toString.call(this));
  }

  bar.call(7);     // [object Number]
  bar.call('foo'); // [object String]
  bar.call(undefined); // [object global]
  ```

<Br><br>
## bind 메서드
- f.bind(Object) 호출하면 f와 같은 본문(코드)과 범위를 가졌지만 this는 ㅜ언본 함수를 가진 새로운 함수를 생성
- 새 함수의 this는 호출 방식과 상관없이 영구적으로 bind()의 첫 번째 매개변수로 고정
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
<br><br>
## 화살표 함수
- this는 자신을 감싼 정적 범위(lexical context)
- 전역 코드에서는 전역 객체를 가리킴
- call(), bind(), apply()로 호출 시 this 무시, 매개변수 지정은 가능하지만 첫번째 매개변수는 null로 지정
```javacript
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
- 

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

- 

## 생성자로서
- 함수를 new 키워드와 함께 생성자로 사용하면 this 새로 생긴 객체에 묶임
```javascript
/*
 * Constructors work like this:
 *
 * function MyConstructor(){
 *   // Actual function body code goes here.
 *   // Create properties on |this| as
 *   // desired by assigning to them.  E.g.,
 *   this.fum = "nom";
 *   // et cetera...
 *
 *   // If the function has a return statement that
 *   // returns an object, that object will be the
 *   // result of the |new| expression.  Otherwise,
 *   // the result of the expression is the object
 *   // currently bound to |this|
 *   // (i.e., the common case most usually seen).
 * }
 */

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

## DOM 이벤트 처리기로서
- 함수를 이벤트 처리기로 사용하면 this는 이벤트를 발사한 요소로 설정
```javascript
// 처리기로 호출하면 관련 객체를 파랗게 만듦
function bluify(e) {
  // 언제나 true
  console.log(this === e.currentTarget);
  // currentTarget과 target이 같은 객체면 true
  console.log(this === e.target);
  this.style.backgroundColor = '#A5D9F3';
}

// 문서 내 모든 요소의 목록
var elements = document.getElementsByTagName('*');

// 어떤 요소를 클릭하면 파랗게 변하도록
// bluify를 클릭 처리기로 등록
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', bluify, false);
}
```

## 인라인 이벤트 핸들러에서
- 코드를 인라인 이벤트 처리기로 사용하면 this는 처리기를 배치한 DOM 요소로 설정
```javascript
<button onclick="alert(this.tagName.toLowerCase());">
  this 표시
</button>

<button onclick="alert((function() { return this; })());">
  내부 this 표시
</button>
```

<출처>
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this
