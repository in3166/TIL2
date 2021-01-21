# Symbol
- ES6에서 Symbol 타입 추가
- 객체의 고유한 식별자 의미
- 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키(property key)를 만들기 위해 사용
- 고유한 심볼 테이블들이 심볼들을 가지고 있다.

## 특징
- 객체 속성(Object Property)을 만들 수 있는 원시 데이터 형식(Primitive data type)-Boolean/null/undefined/Number/String
- 문자열을 인자로 허용: 설명으로 디버깅 용도 (let mySymbol = Symbol('des');)


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



<출처>
- https://poiemaweb.com/es6-symbol
- https://pks2974.medium.com/javascript%EC%99%80-%EC%8B%AC%EB%B3%BC-symbol-bbdf3251aa28
