# 간단한 애플리케이션 TDD로 작성하기

- 추가, 증가 버튼 예제, COUNTER

## 테스트 코드 작성

### 1. 해야 할 일: Counter는 0부터 시작

- 테스트 코드 작성
  - ID로 엘리먼트에 접근해서 0으로 시작하는지 확인
- 테스트 실행

```js
test("the counter starts a 0", () => {
  // 테스트할 코드가 있는 컴포넌트를 우선 렌더링해줘야 한다.
  render(<App />);
  // screen object를 이용해 원하는 엘리먼트에 접근
  const counterElement = screen.getByTestId("counter");
  expect(counterElement).toHaveTextContent(0);
});
```

### 2. 해야 할 일: +, - 버튼 2개 생성

- 테스트 코드 작성
  - ID로 엘리먼트에 접근해서 +, - 인지 확인
- 테스트 실행

### 3. 해야 할 일: 버튼 클릭 시 1씩 증가, 감소

- 버튼의 클릭 이벤트 테스트를 위해 `FireEvent API` 사용
  - 유저가 발생시키는 이벤트에 대한 테스트를 위해 사용

```js
test("When the - button is pressed, the counter changes to -1", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("minus-button");
  fireEvent.click(buttonElement);
  const counterElement = screen.getByTestId("counter");
  expect(counterElement).toHaveTextContent(-1);
});
```

### 4. 해야 할 일: on/off 버튼을 파란색으로 만들기

- 버튼의 클릭 이벤트 테스트를 위해 `FireEvent API` 사용
  - 유저가 발생시키는 이벤트에 대한 테스트를 위해 사용

```js
test("on/off button has blue color", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("on/off-button");
  expect(buttonElement).toHaveStyle({backgroundColor: "blue"});
});
```

### 5. 해야 할 일: on/off 버튼 클릭 시 추가/증가 버튼 비활성화/활성화

```js
test("Prevent the -, + button from being pressed when the on/off button is clicked", () => {
  render(<App />);
  const onoffButtonElement = screen.getByTestId("on/off-button");
  fireEvent.click(onoffButtonElement);
  const plusButtonElement = screen.getByTestId("plus-button");
  expect(plusButtonElement).toBeDisabled();
});
```

### test.only

- 이 테스트만 실행

```js
test.only("~~~" () => {})
```

### test.skip

- 이 테스트만 실행하지 않음

```js
test.skip("~~~" () => {})
```

<br><br>

## Query 사용 우선 순위

[Testing Library](https://testing-library.com/docs/queries/about/#priority)

- 테스트는 사용자가 코드(컴포넌트나 페이지 등)와 상호작용하는 방식과 닮아야 한다.

### 1. **Queries Accessible to Everyone**

- 보조 기술을 사용하는 사용자뿐만 아니라 시각/마우스 사용자의 경험을 반영하는 쿼리

  1. `getByRole`: accessibility tree에 노출된 모든 요소를 쿼리할 수 있다.
      - `naem` 옵션으로 반환되는 요소를 필터할 수 있다.
      - `getByRole('button', {name: /submit/i})`

  2. `getByLabelText`: form 필드에 사용하기 좋다.
  3. `getByPlaceholderText`
  4. `getByText`: non-interacive 요소를 찾는데 사용될 수 있다.
  5. `getByDisplayValue`

### 2. **Semantic Queries**

- HTML5 및 ARIA 호환 selector

  6. `getByAltText`: `alt`를 지원하는 element
  7. `getByTitle`: title attribute는 화면 판독기로 일관되게 읽히지 않는다. (visual user에게 사용되지 않음)

### 3. **Test IDs**

  8. `getByTestId`: 사용자가 보거나 들을 수 없다

<br>

## userEvent > fireEvent

### userEvent

- `fireEvent`를 사용해 만들어졌다.
- 내부 구현을 보면 엘리먼트 타입(label, radio 등)에 따라 `fireEvent`를 사용해 적절한 반응을 보여준다.
  - `fireEvent`는 엘리먼트의 타입과 상관없이 똑같은 반응을 보여준다.
  - `button` 클릭 시 `fireEvent`는 'focus'되지 않는데 `userEvent`는 'focus'된다.
  - 테스트는 사용자가 실제 사용하는 것처럼 해야하기 때문에 `userEvent`를 사용한다.

<br><br><br>

<출처>

- [따라하며 배우는 리액트 테스트](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8)
