# Using the Effect Hook
- 함수 컴포넌트에서 side effect 수행 가능
  - `Side Effect`
  - *데이터 가져오기, 구독 설정하기, 수동으로 리액트 컴포넌트의 DOM 수정하기 등* ??
  - 실행 중 어떤 객체를 접근해서 변화가 일어나는 행위
  - 요구되어지지 않은 다른 이펙트가 발생하는 현상
  - 함수의 출력값에 영향을 미치지 않는 모든 작업들
  
- class 생명주기 메서드인 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 가 합쳐진 거라 생각해도 좋다.

- 카운터 예시에 문서의 타이틀에 클릭 횟수 포함한 문장 표현을 추가
```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount, componentDidUpdate와 같은 방식으로
  useEffect(() => {  
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
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

- React 컴포넌트는 일반적으로 두 종류의 `side effects`가 존재
  - 정리(clean-up) 필요한 것과 아닌 것
  
<br><br>

## 정리(Clean-up)를 이용하지 않는 Effects
- React가 DOM을 업데이트한 뒤 추가로 코드를 실행해야 하는 경우 존재
  - 네트워크 리퀘스트, DOM 수동 조작, 로깅 등 - 정리가 필요없는 경우들
  - 실행 이후 신경 쓸 것이 없다.
  
### Class를 사용하는 예시
- `render` 메서드 자체는 side effect를 발생시키지 않음.
- effect 수행은 React가 DOM을 업데이트하고 난 이후 (side effect를 `componentDidMount`와 `componenetDidUpdate`에 두는 이유)

<br />

- 친구의 온라인 상태를 구독할 수 있는 ChatAPI 모듈
- React Class는 흔히 `componentDidMount`에 구독을 설정한 뒤 `componentWillUnmount`에서 이를 정리 (clean-up)
```javascript
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatChange
  }
  
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```
- `componentDidMount`와 `componentDidUpdate`에 동일 코드: 컴포넌트가 이제 막 마운트된 단계인지 업데이트인지 상관없이 같은 side effect 수행해야 하기 떄문
  - 즉, 렌더링 이후에는 같은 코드가 수행되어야 한다.

### Hook을 이용하는 예시
- 코드는 제일 위에 예시와 동일
- ***useEffect가 하는 일***
  - 리액트에게 컴포넌트 렌더링 이후 어떤 일을 수행할 지 말한다.
  - 리액트는 넘긴 함수(effect)를 기억했다 DOM 업데이트 수행 이후에 호출한다.

- ***useEffect를 컴포넌트 안에서 불러낸 이유***
  - effect를 통해 state 변수 (prop)에 접근 가능
  
- ***useEffect는 렌더링 이후 매번 수행될까?***
  - 첫 번째 렌더링과 이후의 모든 업데이트에서 수행됨

### 상세 설명
```js
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
}
```
- `useEffect` Hook에 함수를 전달하는데 이 함수 = effect
- 컴포넌트를 렌더링할 때 React는 우리가 이용한 effect를 기억하다가 DOM 업데이트 후 실행 (맨 처음과 이후 모든 렌더링에서)

- `useEffect`에 전달된 함수는 모든 렌더링에서 다르다. 
- 값이 제대로 업데이트 되는지 걱정없이 effect 내부에서 그 값을 읽을 수 있게 하는 부분
-  리렌더링마다 이전과 다른 effect로 교체하여 전달 -> 렌더링의 결과의 한 부분이 되게 만드는 점 (각각의 effect는 특정 렌더링에 속한다.)



<br><br>

## 정리(Clean-up)을 이용하는 Effects
- 외부 데이터에 구독을 설정해야 하는 경우
- 메모리 누수가 발생하지 않도록 정리(clean-up)해야한다.

### Class를 사용하는 예시
- class에선 흔히 `componentDidMount`에서 구독을 설정하고 `componentWillUnmount`에서 이를 정리한다.
- 친구가 온라인 상태인지 구독(지켜보다가 종료 시 구독 해제)
```javascript
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() { // 구독 설정
    ChatAPI.subscribeToFriendStatus(  // 친구의 온라인 상태를 구독할 수 있는 모듈
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  componentWillUnmount() { // 정리 (Clean-up)
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```

### Hook을 이용하는 예시
- 구독의 추가와 제거를 위한 코드는 결합도가 높아 useEffect는 함께 다룬다.
- effect가 함수를 반환하면 React는 함수를 정리가 필요한 때에 실행
```js
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // effect 이후에 어떻게 정리(clean-up)할 것인지 표시합니다.
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
- effect에서 함수를 반환하는 이유
  - effect를 위한 추가적인 정리 메커니즘
  - 모든 effect는 정리를 위한 함수를 반환할 수 있어서 구독의 추가, 제거 로직을 가까이 묶을 수 있음.
  - 구독의 추가, 제거가 모두 하나의 effect를 구성

- React가 effect를 정리하는 정확한 시점
  - React는 컴포넌트가 `마운트 해제`될 때 정리(clean-up)를 실행 (여기서 정리는 반환된 함수?)
  - 다음 차례의 effect를 실행하기 전에 이전의 렌더링에서 파생된 effect를 정리하는 이유가 이 때문이다.
  

### 요약
- `useEffect`는 컴포넌트의 렌더링 이후 다양한 side effect를 표현 가능
- effect에 정리가 필요한 경우 **함수를 반환**

<br><br>

# 팁
## 관심사를 구분하려면 Multiple Effect를 사용
- 생명주기 class 메서드가 관련 는 로직들은 모아놓고, 관련 있는 로직들은 여러 개의 메서드에 나누어 놓는 경우 존재(문제)
```js
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```
- `document.title` 설정 로직이 `componentDidMount`와 `compoenetDidUpdate`에 나뉘어져 있다.
- 구독 로직도 `componentDidMount`와 `componentWillUnmout`에 나뉘어져 있다.
- 즉, `componentDidMount`가 두 작업을 위한 코드를 가진다.

### Effect Hook을 여러번 사용하여 관련 없는 로직을 나눈다.
```js
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```
<br>

## effect가 업데이트 마다 실행되는 이유
- effect 정리(clean-up)가 마운트 해제할 때 한번만이 아닌 모든 리렌더링 시에 실행되는 이유
```js
// 친구의 온라인 여부 컴포넌트
componentDidMount() { // 친구의 온라인 여부 상태 구독
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id, 
      this.handleStatusChange
    );
  }

  componentWillUnmount() { // 친구의 온라인 여부 상태 구독 해제
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```
- 컴포넌트 화면에 표시되는 동안 friend prop이 변하면 컴포넌트는 다른 친구의 온라인 상태를 계속 표시 (버그)
- 마운트 해제 시 구독 해지 호출이 다른 친구 ID를 사용하여 메모리 누수나 충돌 발생 가능
  - class는 이런 경우를 다루기 위해 `coponenetDidUpdate` 사용
  ```js
  componentDidUpdate(prevProps) {
    // 이전 friend.id에서 구독을 해지합니다.
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // 다음 friend.id를 구독합니다.
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  ```

### Hook을 사용하면 이런 버그 없음
```js
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```
- `useEffect`는 기본적으로 업데이트를 다룸
- 다음의 effect를 적용하기 전 이전의 effect는 정리(clean-up)한다.
  - 구독과 해지 호출을 반복해서 만들어내는 컴포넌트 가시화
  ```js
  // { friend: { id: 100 } } state을 사용하여 마운트합니다.
  ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // 첫번째 effect가 작동합니다.

  // { friend: { id: 200 } } state로 업데이트합니다.
  ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // 이전의 effect를 정리(clean-up)합니다.
  ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // 다음 effect가 작동합니다.

  // { friend: { id: 300 } } state로 업데이트합니다.
  ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // 이전의 effect를 정리(clean-up)합니다.
  ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // 다음 effect가 작동합니다.

  // 마운트를 해제합니다.
  ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // 마지막 effect를 정리(clean-up)합니다.
  ```

<br><br>

## Effect를 건너뛰어 성능 최적화하기
- 모든 렌더링 이후 매번 effect를 정리하거나 적요하는 것은 때때로 성능 저하 발생
- class의 경우 `componenetDidUpdate`에서 `prevProps`나 `prevState`와의 비교로 해결
```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

- `useEffect` Hook API에 내재
- 특정 값들이 리렌더링 시 변경되지 않으면 React로 하여금 effect를 건너뛰게 할 수 있다.
- `useEffect`의 선택적 인수인 `두 번째 인수`로 **배열**을 넘긴다.
```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // count가 바뀔 때만 effect를 재실행합니다.
```

- 정리(clean-up) 사용 effect에도 동일
```js
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // props.friend.id가 바뀔 때만 재구독합니다.
```

### 주의
- 배열이 컴포넌트 범위 내에서 바뀌는 값들과 effect에 의해 사용되는 값들을 모두 포함한다.
  - 그렇지 않으면 현재 값이 아닌 이전의 렌더링 때의 값을 참고
  
- effect를 정리하는 과정을 마운트와 마운트 해제 시 딱 한 번씩만 실행 시키고 싶을 때
  - 빈 배열(`[]`)을 두 번째 인수로 넘긴다.
  - React로 하여금 effect가 prop이나 state의 어떤 값에도 의존하지 않으면 재실행 필요가 없음을 알림
  - *의존성 배열의 작동 방법을 그대로 따라서 사용하는 것*

- 
<br><br><br>

<출처>
- https://ko.reactjs.org/docs/hooks-effect.html
