# React Context를 이용한 상품 가격 처리

- 여행 상품과 옵션의 개수에 따라 가격 계산하기

- 컴포넌트 간의 데이터 전달 방법
  - `props`를 이용하기
  - `React Context`를 이용하기
  - `mobx`를 이용하기
  - `redux`를 이용하기 등이 존재

<br>

- 테스트 작성
  - 상품의 개수에 따른 총 가격

```js
import userEvent from "@testing-library/user-event";

test("update product's total when products change", async () => {
  render(<Type orderType="products" />);
  // 여행 상품 가격은 0원부터 시작
  const productsTotal = screen.getByText("상품 총 가격:", { exact: false });
  expect(productsTotal).toHaveTextContent(0);

  // 아메리카 여행 상품 한개 올리기
  const americaInput = await screen.findByText("spinbutton", {
    name: "America",
  });

  // input이나 textarea에 텍스트를 선택해 제거해준다.
  // 만약 이전에 같은 엘리먼트에 userEvent를 사용했다면 clear 해줘야한다.
  userEvent.clear(americaInput);
  userEvent.type(americaInput, "1");

  expect(productsTotal).toHaveTextContent("1000");
});
```

- Role='spinbutton'
  - 범위 입력으로 값을 제한하는 입력 위젯으로 증가/감소 기능을 함께 제공

  ```html
  <input
  type="number"
  value="1"
  aria-valuetext="first"
  min="1"
  max="31"
  id="day" />
  ```

## React Context

- 단계별로 `props`를 넘겨주지 않고 컴포넌트 트리 전체에 데이터를 제공할 수 있다.

### Context 사용 방법

1. Context 생성

```js
// contexts/Context.js
const OrderContext = createContext();
```

2. Provider 생성 (Context는 Provider안에서 사용 가능하기 때문)

```js
// App.js
// value: App 컴포넌트에서 사용할 데이터 혹은 데이터를 업데이트하는 함수
<OrderContext.Provider value={?}>
  <App />
</OrderContext.Provider>
```

3. Provider을 위한 함수 생성 (더 복잡한 로직 구현을 위해)

- value로 사용할 데이터가 복잡하고 복잡한 로직이 필요할 때 App 상단 등에 넣지 않고 함수로 빼서 사용
  - 함수 생성 후 Provider 반환  
  - value로 넣을 데이터를 만들기 (필요한 데이터와 데이터를 업데이트할 함수)
    - 필요한 데이터 형식

```js
// contexts/Context.js
const OrderContext = createContext();

export function ContextProvider(props) {
  // ... useState, useEffect ...
  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, orderType) {
      const newOrderCounts = { ...orderCounts };
      const orderCountsMap = orderCounts[orderType];
      orderCountsMap.set(itemName, parseInt(newItemCount));
      setOrderCounts(newOrderCounts);
    }
    return [{ ...orderCounts, totals }, updateItemCount];
  }, [orderCounts, totals]);


  return <Context.Provider value {...props} />;
}
```

<br>

## Custom Render

- 테스트 코드에도 컨텍스트로 감싸주기
  - 실제 코드에선 `<App/>`컴포넌트를 컨텍스트 프로바이더로 감싸주어 컨텍스트를 사용할 수 있게 해줬는데
  - 테스트 코드에선 그러지 않아 오류 발생

```JS
test("update product's total when products change", async () => {
  render(<Type orderType="products" />, {wrapper: OrderContextProvider});
  //...
});
```

- 위와 같이 일일이 `wrapper`로 감싸주는 것은 비효율적이므로, Custom Render을 사용

```js
// `src/test-util.js` 파일 생성 후 CustomRender 작성
const AllTheProvider = ({children}) => {
  return (
    <ThemeProvider theme="light">
      <TranslationProvider message={defaultString}>
        {children}
      </TranslationProvider>
    </ThemeProvider>
  )
}

// ui: 렌더하고자 하는 jsx, options: wrapper 옵션 이외 주고자하는 다른 옵션들
const customRender = (ui, options) => {
  render(ui, {wrapper: AllTheProviders, ...options});
}

// 다시 다 export
export * from '@testing-library/react'
// ovewrite
export {customRender as render}


// ...
// Test Code에서 사용
import { render, screen } from "../../../test-util";
// ...
```

<br>

## describe

- `test`들이 비슷한 경우이면 `describe`로 그룹을 묶을 수 있다.
  - 테스트 많으면 가독성이 떨어지므로 같이 묶어 가독성을 높힌다.

<br><br>

## 페이지마다 스텝 주기

- 주문 페이지에서 확인 페이지, 완료 페이지로 이동하는데 각각을 'step0, 1, 2'로 명시
- 주문 페이지에서 주문하고 주문 버튼 클릭하면 주문 확인페이지로 이동

### Array.from

- 유사 배열 객체나 반복 가능 객체를 얕게 복사해 새로운 Array 객체를 만든다.

```js
// map을 배열로 만들기
const m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); // [[1, 2], [2, 4], [4, 8]]
```

<br>

## 테스트 Waring: Not wrapped in act

```md
Warning: An update to Type inside a test was not wrapped in act(...).
When testing, code that causes React state updates should be wrapped into act(...):
```

- React의 `act` 경고는 우리 컴포넌트에 아무일도 일어나지 않을 것으로 예상하고 있을 경우,
- 이 컴포넌트에 어떤 일이 일어나면 경고 발생

<br/>

- 원래 **컴포넌트에서 무언가 일어난다**라고 해주려면 `act` 함수로 감싸야 한다.

```js
act(() => {
  /* fire events that update state */
});
/* assert on the output */
```

- 위 처럼 감싸주면 이 컴포넌트에서 어떤 일이 일어난다고 가정하며,
- 만약 아무일도 일어나지 않으면 경고를 보낸다.

### 지금까지 Test 코드를 작성하면서 act를 사용하지 않았는데?

- `react-testing-library` 내부 API에서 `act`를 이미 내포하고 있다.
- 일부러 `act`로 감싸 호출하지 않아도 렌더링과 업데이트가 가능하다. (React call stack 안에 위치할 때)

```js
if("shoul render and update a counter", () => {
  // 컴포넌트 렌더링
  act(() => {
    ReactDOM.render(<Counter />, container);
  });

  // 컴포넌트 업데이트 이벤트 발생
  act(() => 
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
 );
})

// RTL 사용 시: render, fireEvent 등은 RTL API를 사용하는 것
it("shoul render and update a counter", () => {
  // 컴포넌트 렌더링
  const { getByText } = render(<Counter />);
  // 이벤트 발생
  fireEvent.click(getByText("Save"));
})
```

- 그래서 왜 에러가 나는가?
  - '컴포넌트가 비동기 API 호출' 할 때나, '렌더링' 혹은 '어떤 것이 업데이트' **되기 전에 테스트가 종료될 때**는 따로 `act`로 감싸주어야 한다. (콜스택 바깥에 위치할 때)
  - 이 때 `waitFor` API를 사용해 테스트 종료 전에 컴포넌트가 다 업데이트 되기를 기다려야 한다.

<br>

- 주문 확인을 한 후 테스트가 종료되는 경우

```js
// 첫페이지로 버튼 클릭
const firstPageButton = screen.getByRole("button", { name: "첫페이지로" });
userEvent.click(firstPageButton);
```

- 위의 테스트는 종료되었으나 실제론 첫 번째 페이지로가 다시 컴포넌트를 렌더링한다.
  - React는 첫 페이지에서 어떤 일이 발생할 것이라 생각한다.(상품, 옵션 등을 불러오는..)
  - 하지만 테스트 코드는 버튼을 누르고 바로 테스트가 끝난다.

```js
// act 경고 해결
await waitFor(() => {
  screen.getByRole("spinbutton", { name: "america" });
});

// 혹은 아래처럼 - waitFor + get.. = find..
await screen.findByRole('spinbutton', {name: 'america'})
```

<br>

- 다른 예제: 회원가입 시 데이터베이스와 비동기 요청하는 경우
  - '정보 저장 중' 이란 로딩 문구가 뜨고 있는 경우
  - 엘리먼트가 돔에서 사라지기를 기다려줘야 한다.

```js
// 아래 처럼 해결
await waitForElementToBeRemoved(() => screen.getByText("정보를 저장 중입니다."));
```

<br><br><br>

<출처>

- [따라하며 배우는 리액트 테스트](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8)
