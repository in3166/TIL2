# iterable 객체
- 반복 가능한(iterable) 객체는 배열을 일반화한 객체
- 'iterable' 개념을 사용하면 어떤 객체에든 `for...of` 반복문 적용 가능
- 이터러블에는 배열, 문자열 외 다수의 내장 객체들이 있다.
- 배열이 아닌 객체가 어떤 컬렉션(목록, 집합)을 나타낼 경우, `for...of` 문법을 적용할 수 있다면 컬렉션 순회에 유용

## Symbol.iterator
- 직접 이터러블 객체 생성해보기
```js
let range = {
  from: 1,
  to: 5
};

// 아래와 같이 for..of가 동작할 수 있도록 하는 게 목표
// for(let num of range) ... num=1,2,3,4,5
```
- `range`를 이터러블로 만들기 위해(`for...of` 동작) 객체에 `Symbol.iterator`(특수 내장 심볼)라는 메서드를 추가해 아래의 일들 실행

  - 1) `for...of`가 시작되자마자 `for...of`는 `Symbol.iterator`를 호출.
    - `Symbol.iterator`는 반드시 이터레이터(메서드 `next`가 있는 객체) 반환
  - 2) `for...of`는 반환된 객체 이터레이터만을 대상으로 동작
  - 3) `for...of`에 다음 값이 필요하면, 이터레이터의 `next()` 메서드 호출
  - 4) `next()`의 반환 값은 `{done: Boolean, value: any}`와 같은 형태여야 한다. 
    - `done=true`는 반복이 종료됨을 의미한다.
    - `done=false`일땐 `value`에 다음 값이 저장된다.

- `range`를 반복 가능한 객체로 만들기
```js
let range = {
  from: 1,
  to: 5
};

// 1. for..of 최초 호출 시, Symbol.iterator가 호출됩니다.
range[Symbol.iterator] = function() {

  // Symbol.iterator는 이터레이터 객체를 반환합니다.
  // 2. 이후 for..of는 반환된 이터레이터 객체만을 대상으로 동작하는데, 이때 다음 값도 정해집니다.
  return {
    current: this.from,
    last: this.to,

    // 3. for..of 반복문에 의해 반복마다 next()가 호출됩니다.
    next() {
      // 4. next()는 값을 객체 {done:.., value :...}형태로 반환해야 합니다.
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// 이제 의도한 대로 동작
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```
- 'iterable' 객체의 핵심 **관심사의 분리(Separation of concern, SOC)**
  - 이터레이터 객체와 반복 대상인 객체의 분리
  - `range`엔 메서드 `next()`가 없다.
  - 대신 `range[Symbol.iterator]()`를 호출해서 만든 '이터레이터' 객체와 이 객체의 메서드 `next()`에서 반복에 사용될 값을 만든다.
<br>

- 두 객체를 합쳐서 `range` 자체를 이터레어터로 만들면 코드 간결해진다.
  - 단점: 두 개의 `for...of` 반복문을 하나의 객체에 동시에 사용할 수 없다. (반복 상태 공유)
```js
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this; // range 자체를 반환하게 됨
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```
<br><br>

## 문자열은 이터러블이다.
```js
for (let char of "test") {
  // 글자 하나당 한 번 실행됩니다(4회 호출).
  alert( char ); // t, e, s, t가 차례대로 출력됨
}
```

## 이터레이터 명시적 호출
- 직접 호출을 통한 순회
- 문자열 이터레이터를 만들고 값을 '수동'으로 가져오기
```js
let str = "Hello";

// for..of를 사용한 것과 동일한 작업을 합니다.
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // 글자가 하나씩 출력
}
```
- 반복 과정 통제 가능
- 반복 중간에 잠시 멈추고 다른 작업 가능 (반복 과정 쪼개기)

## 이터러블과 유사 배열
- 이터러블(iterable)은 메서드 `Symbol.iterator`가 구현된 객체
- 유사 배열(array-like)은 인덱스와 `length` 프로퍼티가 있어서 배열처럼 보이는 객체

- 이터러블 객체(`for...of`사용 가능)이면서 유사배열 객체(숫자 인덱스와 `length` 프로퍼티가 있음)인 '문자열'이 대표적
- 위 `range`객체는 이터러블 객체지만 '인덱스', `length`가 없으므로 유사 배열 객체가 아님
- 유사 배열 객체이긴 하지만 이터러블 객체가 아닌 예
```js
let arrayLike = { // 인덱스와 length프로퍼티가 있음 => 유사 배열
  0: "Hello",
  1: "World",
  length: 2
};

// Symbol.iterator가 없으므로 에러 발생
for (let item of arrayLike) {}
```

<br>

## Array.from
- 범용 메서드 `Array.from`은 이터러블이나 유사 배열을 받아 진짜 `Array`를 만들어 준다.
- 배열 메서드 `pop`, `push` 등을 사용할 수 있게 해준다.
```js
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

let arr = Array.from(arrayLike); // 이터러블이나 유사 배열인지 조사 후 새로운 배열로 복사
arr.pop();
```

- 매핑(mapping) 함수 선택적 넘겨주기 가능
  `Array.from(obj[, mapFn, thisArg])`
  - 새로운 배열에 `obj` 요소를 추가하기 전에 각 요소를 대상으로 `mapFn`을 적용하고 반환된 값이 추가
  - 세 번째 인수 `thisArg`는 각 요소의 `this`를 지정
  ```js
  let araa = Array.from(range, num => num * num);
  ```

- 문자열을 배열로 만들기
  ```js
  let str = '𝒳😂';
  // 서로게이트 쌍(surrogate pair)에도 잘 동작
  // str를 분해해 글자가 담긴 배열로 만듦
  let chars = Array.from(str);
  
  // 위와 동일하게 동작
  let str = '𝒳😂';

  let chars = []; // Array.from 내부에선 아래와 동일한 반복문이 돌아갑니다.
  for (let char of str) {
   chars.push(char);
  }
  ```
  - `str.split`와 달리, 문자열 자체가 가진 이터러블 속성을 이용해 동작
  - 따라서, `for...of`처럼 서로게이트 쌍에도 제대로 작동
  
<br><br><br>
<출처>
- https://ko.javascript.info/iterable
