# Hook
- 기존 Class 바탕의 코드를 작성할 필요 없이 상태 값과 여러 React의 기능을 사용 가능 (클래스 없이 React 사용 가능)
- 함수 컴포넌트에서 `React state`와 `생명주기 기능(lifecycle features)`을 '연동(hookinto)' 해주는 함수

- 특징
  - `선택적 사용`: 기존의 코드를 다시 작성할 필요 없이 일부의 컴포넌트들 안에서 `Hook`을 사용
  - `직관적인 API`: `Hook`은 알고 있는 React 컨셉을 대체하지 않습니다. 대신에, `Hook`은 `props`, `state`, `context`, `refs`, `lifecycle` 같은 React 개념에 좀 더 직관적인 API를 제공합

- 예시: `userState`
```js
import React, { useState } from 'react';

function Example() {
  // "count"라는 새로운 상태 값을 정의합니다.
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- 만든 이유
  - 컴포넌트 사이에서 상태 로직을 재사용하기 어렵다.
    - `render props`이나 `고차 컴포넌트`와 같은 패턴을 통해 이러한 문제를 해결해왔다.
    - 컴포넌트 재구성을 강요, 코드 추적 힘듦
    - `Hook` 사용 시 컴포넌트로부터 **상태 로직 추상화** 가능
    - 이를 이용해 독립적인 테스트와 재사용 가능, 계층의 변화 없이 상태 로직 재사용
  
  - 복잡한 컴포넌트들은 이해하기 어렵다.
    - `Hook`을 통해 서로 비슷한 것을 하는 작은 함수의 묶음으로 컴포넌트를 나누는 방법을 사용 가능

<br><br>

# State Hook
- 예시: 버튼 클릭 시 카운터 증가
```js
import React, { useState } from 'react';

function Example() {
  // "count"라는 새 상태 변수를 선언합니다
  const [count, setCount] = useState(0); // 배열 구조 분해(destructuring)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- `useState`
  - Hook을 호출해 함수 컴포넌트 안에 `state` 추가, 컴포넌트가 다시 렌더링 되어도 유지
  - 현재의 `state` 값과 이 값을 `업데이트하는 함수` 쌍을 제공 (이 함수를 이벤트 핸들러난 다른 곳에서 호출 가능)
  - class의 `this.setState`와 비슷하지만 이전 `state`와 새로운 `state`를 합치지 않는다는 차이점 존재
  - 인자로 초기 `state` 값을 받음 (위는 '0')
  - `this.setState`와 달리 `state`가 객체일 필요 없음

<br><br>

# Effect Hook
- `Side Effect`: React 컴포넌트 안에서 데이터를 가져오거나 구독하고, DOM을 직접 조작하는 작업 <br> (다른  컴포넌트에 영향 끼칠 수 있고, 렌더링 과정에선 구현할 수 없는 작업이기 때문에)

- `useEffect`는 함수 컴포넌트 내에서 이런 `side effects`를 수행하게 해준다.
- 즉, React class의 `componentDidMount` 나 `componentDidUpdate`, `componentWillUnmount`와 같은 목적으로 제공되지만, 하나의 API로 통합된 것

<br>

## 예시: React가 DOM을 업데이트한 뒤에 문서의 타이틀을 바꾸는 컴포넌트
```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount, componentDidUpdate와 비슷합니다
  useEffect(() => {
    // 브라우저 API를 이용해 문서의 타이틀을 업데이트합니다
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
- `useEffect`를 사용하면, React는 DOM을 바꾼 뒤에 “effect” 함수를 실행
- 'Effects'는 컴포넌트 안에 선언되었기 때문에 `props`와 `state`에 접근 가능
- React는 매 렌더링 이후 `effects` 실행 (첫 번째 렌더링 포함)
<br>

- `Effect`를 해제하고 싶으면, 해제하는 함수 반환 (선택적)
```js
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
- 접속 상태를 구독하는 `effect`를 사용하고, 구독을 해지함으로써 해제
- unmount될 때 React는 `ChatAPI`에서 구독 해지
- 또한 재 렌더링이 일어나 `effect`를 재실행하기 전에도 마찬가지로 구독을 해지 (원한다면 `props.friend.id`가 바뀌지 않았을 때 재구독을 건너뛰도록 설정할 수 있습니다.))


<br><br>

# Hook 사용 규칙
- `최상위(at the top level)` 에서만 Hook 호출
  - 반복문, 조건문, 중첩된 함수 내에서 실행 x

- `React 함수 컴포넌트` 내에서만 Hook 호출
  - 일반 JavaScript 함수에서 호출 x
  - 직접 작성한 `custom Hook` 내에서는 사용 가능

<br><br><br>

# 나만의 Hook 만들기 (Custom Hook)
- 상태 관련 로직을 재사용하고 싶을 때, 컴포넌트 트리에 새 컴포넌트를 추가하지 않고 가능하게 해준다.

- 위의 접속 상태 구독하기 위해 `useState`와 `useEffect` Hook을 사용한 `FriendStatus`를 다른 컴포넌트에서도 재사용하게 하기
- 이 로직을 `useFriendStatus`라는 `custom Hook`으로 뽑아냅니다.
```js
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

- 이 Hook은 `friendID`를 인자로 받아 접속 상태 반환
- 아래 처럼 재사용 가능
```JS
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

- 각 컴포넌트의 state는 완전히 독립적
- `Custom Hook`은 기능이라기보다는 `컨벤션(convention)`에 가깝다.
  -  이름이 ”use“로 시작하고, 안에서 다른 Hook을 호출한다면 그 함수를 `custom Hook`이라고 부를 수 있다.

<br><br>

## 다른 내장 Hook
- [`userContext`](https://ko.reactjs.org/docs/hooks-reference.html#usecontext)
  - 컴포넌트를 중첩하지 않고도 React context 구독 가능
  ```js
  function Example() {
    const locale = useContext(LocaleContext);
    const theme = useContext(ThemeContext);
    // ...
  }
  ```

- [`useReducer`](https://ko.reactjs.org/docs/hooks-reference.html#usereducer)
  - 복잡한 컴포넌트들의 `state`를 `reducer`로 관리
  ```js
  function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
  ```


<br><br><br>
<출처>
- https://ko.reactjs.org/docs/hooks-state.html
