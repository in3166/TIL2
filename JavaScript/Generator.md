# Generator
- 일반 함수는 하나의 값(or 0) 반환
- `제너레이터`는 여러 개의 값을 필요에 따라 하나씩 반환(yield) 가능
- `제너레이터`와 이터러블 객체를 사용하면 데이터 스트림 생성 가능

## Generator 함수
- 제너레이터를 만들기 위해 '제너레이터 함수'라는 특별한 문법 구조 `function*`이 필요
```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();
alert(generator); // [object Generator]
```
- 동작 방식
  - Generator 함수 호출 시 코드 실행 대신, 실행을 처리하는 특별 객체 `제너레이터 객체`가 반환
  - `제너레이터 객체`가 생성되도 함수 본문 코드는 아직 실행 전
  <img src="" />

- `next()` 메서드
  - `value`: 산출 값
  - `done`: 함수 코드 실행이 끝나면 `true`, 아니면 `false`
<br>

### `Generator` 생성 후 첫 번째 산출 값 받기
```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

let one = generator.next();

alert(JSON.stringify(one)); // {value: 1, done: false}
```
<img src="" />

<br><br>

## Generator와 Iterable
- `Generator`는 `Iteravle` 이다.
- `for...of` 반복문 사용 가능
```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, 2가 출력됨
}
```
- '3'은 출력되지 않는다. -> `for..of` Iteration은 `done: true`일 때 마지막 `value`를 무시
- 마지막에 `yield`로 반환해야 모두 출력가능
```js
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}
```

- 전개 문법도 사용 가능
```js
let sequence = [0, ...generateSequence()[;
alert(sequence); // 0, 1, 2, 3
```
<br>

### 이터러블 대신 제너레이터 사용하기



<br><br><br>
<출처>
- https://ko.javascript.info/generators
