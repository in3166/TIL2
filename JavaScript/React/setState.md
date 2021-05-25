# 동일한 state를 변경하는 setState() 연속 사용 
## 1. setState()는 비동기로 처리된다.
- `setState()` 함수가 호출되면 React는 전달받은 state로 값을 바로 바꾸는 것이 아니라 
- 이전의 React 엘리먼트 트리와 전달받은 state가 적용된 엘리먼트 트리를 비교하는 작업을 거치고, 
- 최종적으로 변경된 부분만 DOM에 적용한다.
- 전달받은 각각의 state를 **합치는 작업(merging)**을 수행 한 뒤 한 번에 `setState()`를 수행

## 2. setState()를 연속적으로 호출하면 Bactch 처리를 한다.
## 3. state는 객체이다.
<br><br>

## 예제: 사이드 메뉴 고르기
- 메뉴는 복수 선택 가능
- 선택하지 않음 클릭 시 전에 선택한 메뉴 삭제

```js
export default function App() {
  const sideMenus = [
    "감자 튀김",
    "콜라",
    "애플 파이",
    "소프트 아이스크림",
    "선택하지 않음"
  ];
  const [orders, setOrders] = useState([]);

  const onClickHandler = selectedItem => {
    if (selectedItem === "선택하지 않음") {
      setOrders([]);
    }

    if (orders.includes(selectedItem)) {
      setOrders(orders.filter(order => order !== selectedItem));
      return;
    }

    if (orders.includes("선택하지 않음")) {
      setOrders(orders.filter(order => order !== "선택하지 않음"));
    }
    setOrders([...orders, selectedItem]);
  };

  return (
    <div className="App">
      <h3>사이드 메뉴를 선택하세요.</h3>
      <ul className="menu-group">
        {sideMenus.map((sideMenu, idx) => (
          <li
            className={
              orders.find(order => order === sideMenu)
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => onClickHandler(sideMenu)}
            key={idx}
          >
            {sideMenu}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 이상 작동1: 감자튀김과 콜라를 선택하고 선택하지 않음을 클릭하면
- ‘선택하지 않음’을 클릭하면 주문한 모든 메뉴가 삭제되고, ‘선택하지 않음’이 추가되기를 예상
  - `setOrder([])` 로 배열을 초기화 하고, `setOrders([...orders, selectedItem]);`로 ‘선택하지 않음’이 들어간다.

- 실제 결과
  - 배열이 초기화 되지 않고, ‘선택하지 않음’이 추가된다.


- **merging**
  - 현재 oreders에 ['감자튀김', '콜라'] 이 있다.
  - 배열을 초기화하고(`setOreder([])`), '선택하지 않음'을 추가하는 부분(`setOrders([...orders, selectedItem])`) 부분
  ```js
  const newState = Object.assign(
    { orders : ["감자 튀김 🍟", "콜라 🥤"] },
    { orders : [] },
    { orders : [ ...orders, "선택하지 않음"]}
  )

  setOrders(newState)
  ```
  - `Object.assign()`으로 여러 개의 객체를 합칠 때, **같은 key를 가지고 있으면 이전의 값이 덮어씌어진다.**

### 해결
- setState() 함수 인자를 사용
  - 1) 새로운 state 객체를 받기
  - 2) 이전 state 객체를 인자로 받고 새로운 state 객체를 반환하는 함수를 받기 (*)

- 2번 인자를 사용하면 `setState()`가 비동기로 작동하는 것은 같지만, 인자로 넘겨 받은 함수들은 Queue에 저장되어 순서되로 실행된다.
- 그래서, 첫번째 함수가 실행된 후 리턴하는 업데이트 된 state가 두 번째 함수의 인자로 들어가는 방식으로 state가 최신으로 유지된다.
```js
  const onClickHandler = selectedItem => {
    if (selectedItem === "선택하지 않음") {
      setOrders(orders => []);
    }

    if (orders.includes(selectedItem)) {
      setOrders(orders => orders.filter(order => order !== selectedItem));
      return;
    }

    if (orders.includes("선택하지 않음")) {
      setOrders(orders => orders.filter(order => order !== "선택하지 않음"));
    }
    setOrders(orders => [...orders, selectedItem]);
  };
```


<br><br>
# setState()를 실행한 뒤에 곧 바로 api 호출을 보냈을 때
- `setState()`도 비동기, `POST 요청`도 비동기로 처리되며 심지어 POST 요청의 우선 순위가 더 높아 업데이트된 state 값이 전달되지 않는 문제
- 따라서 setState()를 굳이 실행하지 않고 일반 객체로 만들어 전달하여 해결


<br><br><br>
- https://leehwarang.github.io/2020/07/28/setState.html
