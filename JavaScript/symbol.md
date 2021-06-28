# Symbol
- ES6에서 Symbol 타입 추가
- `유일한 식별자(unique identifier)`를 만들 때 사용
- 이름의 충돌 위험이 없는 **유일한 객체의 프로퍼티 키(property key)**를 만들기 위해 사용
- 고유한 심볼 테이블들이 심볼들을 가지고 있다.
 
`let id = Symbol();`: id는 새로운 심볼
- 심볼 이름
```javascript
// 심볼 id에 "id"라는 설명이 붙음
let id = Symbol('id');
```

- 동일한 심볼 이름 가능
- 심볼 자체는 서로 다름
```javascript
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 == id2); // false
```

- 심볼은 문자형으로 자동 형 변환 불가
- JavaScript는 암시적 형 변환이 자유롭지만 심볼형 값은 자동 형 변환이 되지 않는다.
- 출력을 위해선 `.toString()` 사용
```javascript
let id = Symbol("id");
alert(id); // TypeError: Cannot convert a Symbol value to a string
alert(id.toString()); // Symbol(id)가 얼럿 창에 출력됨
```
- `symbol.description` 프로퍼티를 이용하면 설명만 출력 가능
```javascript
let id = Symbol("id");
alert(id.description); // id
```
<br>

# '숨김' 프로퍼티
- 외부 코드에서 **접근이 불가능**하고 값도 덮어쓸 수 없는 프로퍼티
- 예시1
  - 서드파티 코드에서 가져 온 `user` 객체
  ```javascript
   let user = {
      name: "John"
   };
   
   let id = Symbol("id");
   user[id] = 1;
   alert(user[id]); // 1
  ```
  - 문자열 `"id"` 대신 심볼 `Symbol("id")`을 사용한 이유
    - 서드파티에서 가져 온 `user`에 함부로 새로운 프로퍼티를 추가할 수 없다.
    - 심볼을 서드파티에 접근할 수 없어서 서드파티 모르게 식별자 부여 가능.

- 예시2
  - 제 3의 스크립트(라이브러리 등)에서 `user`를 식별
  - `user`의 원천인 서드파티 코드, 현재 작성 중인 스크립트, 제 3의 스크립트가 각자 서로 모른 채 `user` 식별해야 하는 상황
  - 제 3의 스크립트에선 `Symbol("id")`을 이용해 **전용 식별자**를 만들어 사용할 수 있다.
  ```javascript
  let id = Symbol("id");
  user[id] = "제 3의 스크립트 id 값";
  ```
  - 심볼은 유일성이 보장되므로 현재 작성 중인 스크립트에서 우리가 만든 식별자와 제3의 스크립트에서 만든 식별자가 충돌하지 않음.
<br>

## 심볼형 프로퍼티 숨기기
- 키가 심볼인 프로퍼티는 `for...in` **반복문에서 배제**됨.
```javascript
let id = Symbol("id");
let user = {
  name: 'John',
  age: 30,
  [id]:  123
};
for(let key in user) alert(key); // name과 age만 출력
// 직접 접근
alert("직접 접근: ", user[id]);
```

- `Object.keys(user)에서도 심볼인 키는 배제
- `Object.assign`은 키가 심볼인 프로퍼티 배제하지 않고 모든 프로퍼티 복사
```javascript
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

## 전역 심볼
- 이름(설명)이 같은 심볼이 같은 개체를 가리키는 경우
- 애플리케이션 곳곳에서 심볼 "id"를 이용해 특정 프로퍼티 접근하는 경우
- `전역 심볼 레지스트리(global symbol registry)`안에 심볼을 만들고 접근하면 같은 이름은 항상 동일한 심볼 반환
- 레지스트리에 심볼을 읽거나, 생성하려면 `Symbol.for(key)`를 사용, 이름이 `key`인 심볼을 반환
- 조건에 맞는 심볼이 없으면 새로운 심볼 생성
```javascript
let id = Symbol.for("id");
let idAgain = Symbol.for("id");
alert(id === idAgain);  // true
```

## Symbol.keyFor
- 전역 심볼을 찾는 `Symbol.for(key)`에 반대되는 메서드
- 전역 레지스트리 안 심볼의 이름을 얻기
```javascript
// 이름을 사용해 심볼을 찾음
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");
// 심볼을 이용해 이름을 얻음
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```
- 전역 심볼을 제외한 모든 심볼은 `description` 프로퍼티가 존재하여 이를 사용

## 시스텝 심볼
- 자바스크립트 내부에서 사용되는 심볼
- 객체를 미세 조정 가능
- `Symbole.hasInstance`
- `Symbole.iterator`
- `Symbole.toPrimitive`
- `Symbole.isConcatSpreadable`
- 등등

<hr>

<br><br><br>

## 목적
- for in loop / Object.keys와 같은 기존 메소드를 변경 과정 없이 새로 객체에 프로퍼티를 추가

```javascript
var myObject = {
  firstName: 'gjdf',
  lastName: 'go',
}
```
  - myObject에 새로운 프로퍼티 추가해도 Object.keys(myObject)의 값이 추가된 값을 제외한 [firstName, lastName]을 보여줌

```javascript
var myObject = {};
myObject["prop1"] = 1;
myObject["prop2"] = 2;

var prop3 = Symbol("prop3");
var prop4 = Symbol("prop4");
myObject[prop3] = 3;
myObject[prop4] = 4;

for (var key in myObject){
  console.log('key'); //prop1 prop2,/  prop3 prop4는 나오지 않음!
}

console.log(myObject[prop3]) // 3
console.log(myObject[prop4]) // 4
```

- 프로퍼티 name 충돌 방지

<br><br>

## 특징
- 객체 속성(Object Property)을 만들 수 있는 원시 데이터 형식(Primitive data type)-Boolean/null/undefined/Number/String
- 문자열을 인자로 허용: 설명으로 디버깅 용도 (let mySymbol = Symbol('des');)
- 같은 문자열로 정의해도 독립적인 값이 됨

```javascript
var symbolProperty1  = Symbol('key'); // Symbol(key)
var symbolProperty2  = Symbol('key'); // Symbol(key)
var ob = {};

ob[symbolProperty1] = 'value1'
ob[symbolProperty2] = 'value2'

console.log(ob[symbolProperty1] === 'value1');
console.log(ob[symbolProperty2] === 'value2');
console.log(symbolProperty1 !== symbolProperty2);

console.log(ob); // {Symbol(key): "value1", Symbol(key): "value2"}
```

## 사용
- 객체의 프로퍼티 키는 빈 문자열을 포함하는 모든 문자열 가능
```javascript
const obj = {};

obj.prop = 'myProp'; 
obj[123] = 123;
// obj.123 = 123;  // SyntaxError: Unexpected number
obj['prop' + 123 ] = false;
console.log(obj);  // { '123': 123, prop: 'myProp', prop123: false }
```

- Symbol 값도 객체의 프로퍼티로 사용 가능
- Symbol 값은 유일한 값이므로 다른 프로퍼티와 충돌하지 않는다.
```javascript
const obj = {};

const mySymbol = Symbol('mySymbol');
obj[mySymbol] = 123;

console.log(obj); // { [Symbol(mySymbol)]: 123 }
console.log(obj[mySymbol]); // 123
```
### 'well-known' Symbol을 통해 core method 접근 가능
- length와 prototype을 제외한 Symbol 함수 객체의 프로퍼티 (iterator, replace, search ...)
- 자바스크립트 엔진에 상수로 존재하며 참조하여 일정한 처리를 함


## 생성
1. Symbol()

2. Symbol.for()
- 인자로 전달받은 문자열을 키로 Symbol 값들이 저장된 전역 Symbol 레지스트리에서 해당 키와 일치하는 Symbol 값 검색
- 성공 시 Symbol 값 반환, 실패 시 새로 생성하여 해당 키로 전역 Symbol 레지스트리에 저장 후 Symbol 값 반환
```javascript
// 전역 Symbol 레지스트리에 foo라는 키로 저장된 Symbol이 없으면 새로운 Symbol 생성
const s1 = Symbol.for('foo');
// 전역 Symbol 레지스트리에 foo라는 키로 저장된 Symbol이 있으면 해당 Symbol을 반환
const s2 = Symbol.for('foo');

console.log(s1 === s2); // true
```

- Symbol()은 매번 다른 값 생성하지만 Symbol.for는 하나의 Symbol 생성하여 여러 모듈이 키를 통해 공유 가능
- Symbol.for()로 생성된 Symbol은 반드시 키를 갖지만 Symbol()로 생성된 Symbol 값은 키가 없다

3. Symbol.iterator
- 어떤 객체가 Symbol.iterator를 프로퍼티 key로 사용한 메소드를 가지고 있으면 엔진은 이 객체가 이터레이션 프로토콜을 따르는 것으로 간주하고 이터레이터 동작 수행
- Symbol.iteratior를 프로퍼티 key로 사용하여 메소드를 구현한 빈트인 객체들
  - Array, String, Map, Set, DOM data structores, arguments
  ```javascript
  // 이터러블
  // Symbol.iterator를 프로퍼티 key로 사용한 메소드를 구현하여야 한다.
  // 배열에는 Array.prototype[Symbol.iterator] 메소드가 구현되어 있다.
  const iterable = ['a', 'b', 'c'];

  // 이터레이터
  // 이터러블의 Symbol.iterator를 프로퍼티 key로 사용한 메소드는 이터레이터를 반환한다.
  const iterator = iterable[Symbol.iterator]();

  // 이터레이터는 순회 가능한 자료 구조인 이터러블의 요소를 탐색하기 위한 포인터로서 
  // value, done 프로퍼티를 갖는 객체를 반환하는 next() 함수를 메소드로 갖는 객체이다. 
  // 이터레이터의 next() 메소드를 통해 이터러블 객체를 순회할 수 있다.
  console.log(iterator.next()); // { value: 'a', done: false }
  console.log(iterator.next()); // { value: 'b', done: false }
  console.log(iterator.next()); // { value: 'c', done: false }
  console.log(iterator.next()); // { value: undefined, done: true }
  ```
<br><br><br>

<출처>
- https://ko.javascript.info/symbol
- https://poiemaweb.com/es6-symbol
- https://pks2974.medium.com/javascript%EC%99%80-%EC%8B%AC%EB%B3%BC-symbol-bbdf3251aa28
- https://medium.com/@hyunwoojo/javascript-symbol-%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-6aa5903fb6f1
