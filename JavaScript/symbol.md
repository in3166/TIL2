# Symbol
- ES6에서 Symbol 타입 추가
- 객체의 고유한 식별자 의미
- 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키(property key)를 만들기 위해 사용
- 고유한 심볼 테이블들이 심볼들을 가지고 있다.


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


<출처>
- https://poiemaweb.com/es6-symbol
- https://pks2974.medium.com/javascript%EC%99%80-%EC%8B%AC%EB%B3%BC-symbol-bbdf3251aa28
- https://medium.com/@hyunwoojo/javascript-symbol-%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-6aa5903fb6f1
