# null 병합 연산자 '??'
- `nullish coalescing operator`
- `leftExpr ?? rightExpr`: `value`가 아니라 `expression` (`getA() ?? fetchB()`처럼 함수도 사용 가능)
- 여러 피연산자 중 값이 '확정'되어 있는 변수 찾기 가능
- `a ?? b`의 평가 결과
  - `a`가 `null`, `undefined`가 아니면 `a`
  - 그 외 `b`

```js
x = a ?? b; // 동일
x = ( a !== null & a !== undefined) ? a : b;
```

- 사용
```js
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// null이나 undefined가 아닌 첫 번째 피연산자
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
```
```
function printMessage(text) {
  let message = text;
  if (text == null || text == undefined) {
    message = 'nothing';
  }
  console.log(message);
}

// 수정
function printMessage(text) {
  const message = text ?? 'nothing';
  console.log(message);
}
```

## Logical Parameter '||'와 차이
- `||`는 첫 번째 `truthy` 값을 반환 - `falsy`인 경우 모두 오른쪽이 실행 (`null`, `undefined`, `false`, `0`, `-0`, `NaN`, `''`, `""`)
- `??`는 첫 번째 정의(defined)된 값을 반환 - `null`, `undefined`인 경우에만 오른족이 실행

- `null`, `undefined`, `0`을 구분 지을 때 중요
```js
let height = 0;

alert(height || 100); // 100: 0을 false로 취급
alert(height ?? 100); // 0: '0'이 할당될 수 있는 변수를 사용해 기능을 개발할 때 유용
```

## 'Default Parameter'와의 차이점
```js
function printMessage(text = 'nothing') {
  console.log(text);
}
console.log(printMessage(null)); // null
console.log(printMessage(undefined)); // nothing
```
- `undefined`인 경우에만 default 값이 할당된다.

<br>

## 연산자의 우선순위
- 우선순위 `5`
- `=`, `?` 보다는 먼저, 대부분 연산자보단 나중
```js
let height = null;
let width = null;

// 괄호를 추가!
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

### 안정성 관련 이슈 때문에 '??'는 '&&'나 '||'와 함께 사용하지 못합니다.
```js
let x = 1 && 2 ?? 3; // SyntaxError: Unexpected token '??'
```
- 제약을 피하려면 괄호 사용


<br><br><br>
<출처>
- https://ko.javascript.info/nullish-coalescing-operator
- https://www.youtube.com/watch?v=BUAhpB3FmS4
