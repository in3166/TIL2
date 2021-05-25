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

<br><br>

# useState
```js
export default function App() {
  const [count, setCount] = useState(0);

  const increase1 = () => {
    setCount(count+1);
    setCount(count+1);
    setCount(count+1);
  }

  const increase2 = () => {
    setCount(count => count + 1);
    setCount(count => count + 1);
    setCount(count => count + 1);
  }

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={increase1}>increase fn 1</button>
      <button onClick={increase2}>increase fn 2</button>
    </div>
  );
}
```
- 첫 번째 함수 클릭 결과: 1
- 두 번째 함수 클릭 결과: 3
<br>

## 이유
- 차이: 변수를 넣었는가, 함수를 넣었는가
- 새로운 상태가 바로 이전 상태를 사용해서 계산되어야 한다면, '함수'를 인자로 넣어라.
- 함수는 바로 이전 상태의 값을 바탕으로 새로운 값을 계산한다.

### 이전 상태
- React의 Bactch Process
  - 동기적인 하나의 Lifecycle Method나 이벤트 핸들러 안의 여러 업데이트들을 한 번에 묶어 처리하나다.
  - 이 후 '마지막으로 Update 된 값으로 state을 결정'하고 단 한번만 렌더링 한다.
  - 다음 함수의 결과는 '10'
  ```js
  const increase = () => {
    setCount(count+1);
    setCount(count+1);
    setCount(count+10);
  }
  ```
  <br>
  
## useState의 내부 구현
- Initialize Hook: 컴포넌트가 마운트되면 Hook을 초기화하는 함수
```js
function mountState(initialState) {
  var hook = mountWorkInProgressHook();

  if (typeof initialState === 'function') {
    initialState = initialState();
  }

  hook.memoizedState = hook.baseState = initialState;
  var queue = hook.queue = {
    last: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState
  };
  var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue);
  return [hook.memoizedState, dispatch];
}
```
<br>

- `mountWorkInProgressHook()`을 실행하여 hook 변수에 할당, 초기 null, 함수의 끝에는 다음의 포맷
```js
{
  memoizedState: 0, 
  baseState: 0, 
  queue: {
    last: null,
    dispatch: dispatchAction.bind(null, currentlyRenderingFiber$1, queue),
    lastRenderedReducer: basicStateReducer(state, action),
    lastRenderedState: 0, 
  },
  baseUpdate: null,
  next: null,
}
```
- `useState`에 초기값이 들어오면 이 함수로 설정
- `memoizedState`와 `dispatch`를 리턴하여 초기 설정 완료
- `next`는 LinkedList의 일종, 하나의 컴포넌트 안에서 여러개의 hook 사용 시 이를 연결(hook을 조건문에 넣지 말고 최상위에 위치시켜야하는 이유)
- 컴포넌트 마운트 시 hook이 여러 개 있으면 다음과 같이 next를 통해 연결되는 구조
```js
{
  memoizedState: 0, // first hook
  baseState: 0,
  queue: { /* ... */},
  baseUpdate: null,
  next: { // second hook
    memoizedState: false, 
    baseState: false,
    queue: { /* ... */},
    baseUpdate: null,
    next: { // third hook
      memoizedState: {
        tag: 192,
        create: () => {},
        destory: undefined,
        deps: [0, false],
        next: { /* ... */}
      }, 
      baseState: null,
      queue: null,
      baseUpdate: null,
      next: null
    }
  }
}
```
<br><Br>
  
## Update Hook
- 위와 같은 상태구조에서 hook 구조에 상태 변경이 일어날 때 (setState 호출 시) 구조 변경
  - 1. update 일어나기전 hook 상태
  ```js
  {
    memoizedState: 0, 
    baseState: 0,
    queue: {
      last: null,
      dispatch: dispatchAction.bind(bull, currenctlyRenderingFiber$1, queue),
      lastRenderedReducer: basicStateReducer(state, action),
      lastRenderedState: 0,
    },
    baseUpdate: null,
    next: null
  }
  ```
  
  - 2. queue의 last 값 할당
  ```js
  {
    memoizedState: 0, 
    baseState: 0,
    queue: {
     last: {
        expirationTime: 1073741823,
        suspenseConfig: null,
        action: 1, // setCount를 통해 설정한 값.
        eagerReducer: basicStateReducer(state, action),
        eagerState: 1, // 실제로 상태 업데이트를 마치고 렌더링되는 값.
        next: { /* ... */},
        priority: 98
      },
      dispatch: dispatchAction.bind(bull, currenctlyRenderingFiber$1, queue),
      lastRenderedReducer: basicStateReducer(state, action),
      lastRenderedState: 0,
    },
    baseUpdate: null,
    next: null
  }
  ```
  
  - last에 setCount를 통해 넘어온 'action'과 최종적으로 update될 상태를 담은 `eagerState` 변수, action으로부터 `eagerState`변수를 계산하는 `eagerReducer` 값 세팅
  - 사용자가 넘긴 action으로부터 Bacth Process 이후 최종 반환될 `eagerState`를 계산하는 함수 `eagerReducer`
  - 이 Reducer에 넘기는 action은 함수일 경우 이전 상태를 파라미터로 넘겨주어 함수를 실행한 값을 리턴, 값일 경우 값을 리턴
  - Reducer로 값을 할당하기 때문에 action에 함수를 넣어주면 update 시 함수를 이요해 eagerState를 계산하고 다음 update에 넘어가므로 지속적 값 업데이트 가능
  ```js
  function basicStateReducer(state, action) {
    return typeof action === 'function' ? action(state) : action;
  }
  ```

### 초반 Counter 예제
- queue: (setCount(count+1));
```js
last: {
	  ...other options // 필요한 부분만 남겨놓고 생략하였음.
      action: count + 1,
      eagerReducer: basicStateReducer(state, action),
      eagerState: count + 1, 
      next: {
      	last: {
        	... otherOptions,
            action: count + 1,
            eagerReducer: basicStateReducer(state, action),
            eagerState: count + 1, 
            next: null
        }
      }
 },
```

- queue: (setCount(count => count + 1))
```js
last: {
	  ...other options // 필요한 부분만 남겨놓고 생략하였음.
      action: count => count + 1,
      eagerReducer: basicStateReducer(state, action),
      eagerState: count + 1, 
      next: {
      	last: {
        	... otherOptions,
            action: count => count + 1,
            eagerReducer: basicStateReducer(state, action),
            eagerState: (count + 1) + 1, 
            next: null
        }
      }
 },
```

<br><br><br>
<출처>
- https://leehwarang.github.io/2020/07/28/setState.html
- https://yeoulcoding.tistory.com/169
