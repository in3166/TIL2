# NaN (Not-A-Number)

- Number.NaN와 동일한 숫자 값
- 숫자가 아님을 나타
- 전역 객체의 속성으로 전역 범위의 변

## NaN을 반환하는 연산

- 숫자로 변환 실패

  ```js
  parseInt("string");
  Number(undefined);
  Math.abs(undefined);
  ```

- 결과가 허수인 수학 계산식

  ```js
  Math.sqrt(-1);
  ```

- 정의할 수 없는 계산식

  ```js
  0 * Infinity;
  1 ** Infinity;
  Infinity / Infinity;
  Infinity - Infinity;
  ```

- 피연산자가 `NaN` 이거나 `NaN`으로 강제 변환되는 메서드 또는 표현식

  ```js
  7 ** NaN;
  7 * "blabla";
  ```

- 유효하지 않은 값이 숫자로 표시되는 경우
  ```js
  new Date("blabla").getTime();
  "".charCodeAt(1);
  ```

## Q1 "NaN!==NaN" return true

- `NaN`은 어떤 값과도 **not equal!**

```js
const x = NaN;
if (x !== x) {
  console.log("HELLO!");
}
```

<br>

### 가능한 다른 값들?

- `Object.defineProperty`: 객체의 속성을 정의하거나 수정

```js
window.x = 0; // Any value is OK
Object.defineProperty(window, "x", {
  get() {
    // get 메서드로 x 가 호출될 때마다 무작위 값을 반환한다!
    return Math.random();
  },
});
console.log(x); // 0.12259077808826002
console.log(x === x); // false
console.log(x !== x); // true
```

<br>

## Q2. "x === x + 1"

- `Number.MAX_SAFE_INTEGER`: safe integer in JavaScript (2⁵³ — 1).”

```js
const x = Number.MAX_SAFE_INTEGER + 1; // Please fill in the value of "x?
if (x === x + 1) {
  console.log("hello");
}
```

<br>

## Q3. "x > x"

- `Symbol.toPrimitive`: 사용자 정의 객체의 원시 값 변환 방법을 지정
  - 위의 `Object.defineProperty`를 사용해서도 가능
  - `symbol`이 정의되어 있는 객체(객체의 프로퍼티로 할당)라면 해당 `symbol`이 언어 자체에서 자동으로 호출된다.

```js
const x = {
  value: 1,
  [Symbol.toPrimitive]() {
    console.log("x", this.value);
    return --this.value;
  },
};

if (x > x) {
  console.log("hello");
}
```

<br>

## typeof x === ‘undefined’ && x.length > 0

- `document.all`:

```js
const x = document.all;
if (typeof x === "undefined" && x.length > 0) {
  console.log("hello fatfish");
}

console.log(x);
console.log(typeof x);
console.log(x === undefined);
```

<br>
<br>

### `Symbol.toPrimitive` vs `Object.defineProperty`

- `Object.defineProperty`를 사용하여 속성에 `getter`나 `setter`를 추가하면 해당 속성에 접근할 때에만 해당 함수가 호출
- `Symbol.toPrimitive`은 JavaScript 언어의 내부 동작 메커니즘 중 하나
  - Symbol이 정의된 객체에 대해 일정한 규칙에 따라 자동으로 호출됩니다. 이는 명시적인 접근이 아니라, JavaScript 엔진이 객체를 원시 값으로 변환해야 할 때 자동으로 발생
  - 즉, 개발자가 명시적으로 호출하지 않아도, JavaScript 엔진이 적절한 시점에 자동으로 호출함.

<br>
<br>
<br>

<출처>

- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/NaN
- https://javascript.plainenglish.io/interviewer-can-x-x-return-true-in-javascript-7e1d1fa7b5cd
