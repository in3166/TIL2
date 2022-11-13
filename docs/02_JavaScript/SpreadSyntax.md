# Spread Syntax (전개 구문)

- 반복 가능한 문자(배열, 문자열)를 0개 이상의 인수(함수 호출) 또는 요소로 확장하여
- 0개 이상의 키-값의 쌍으로 객체로 확장 가능

- 전개 구문

```javascript
function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction(...args);
```

<br>

## `apply()` 대체

- 배열의 엘리먼트를 인수로 사용하고자 할 때

```javascript
function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction.apply(null, args);
```

<br><br>

## 배열 리터럴

- 0개 이상의 식(expression) 목록
- 전개 구문 사용하면 `push()`, `splice()`, `concat()` 등 조합할 필요 없음.

```javascript
var parts = ['shoulders', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes'];
// ["head", "shoulders", "knees", "and", "toes"]
```

## 배열 복사

```javascript
var arr = [1, 2, 3];
var arr2 = [...arr]; // arr.slice() 와 유사
arr2.push(4); // arr은 영향 받지 않음
```

- 다차원 배열에선 원래 배열에도 영향이 갈 수 있다.

```javascript
var a = [[1], [2], [3]];
var b = [...a];
b.shift().shift(); // 1
// 이제 배열 a 도 영향을 받음: [[], [2], [3]]
```

## 배열 연결

- `concat()` 대체

```javscript
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1 = [...arr1, ...arr2]; // arr1 은 이제 [0, 1, 2, 3, 4, 5]
```

<br><br>

## 객체 리터럴 전개

```js
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };

var clonedObj = { ...obj1 };
// Object { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 };
// Object { foo: "baz", x: 42, y: 13 }
```

<br><Br><br>

- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax>
