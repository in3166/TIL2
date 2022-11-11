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

```js
// contexts/Context.js
export function ContextProvider(props) {
  return <Context.Provider value {...props} />;
}
```

- value로 넣을 데이터를 만들기 (필요한 데이터와 데이터를 업데이트할 함수)
  - 필요한 데이터 형식
  -

-

- 테스트 코드에 맞는 실제 코드 작성

<br><br><br>

<출처>

- [따라하며 배우는 리액트 테스트](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8)
