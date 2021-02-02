# Using the Effect Hook
- 함수 컴포넌트에서 side effect 수행 가능
  - `Side Effect`
  - 데이터 가져오기, 구독 설정하기, 수동으로 리액트 컴포넌트의 DOM 수정하기 등
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
}
```


### Hook을 이용하는 예시


### 상세 설명



## 정리(Clean-up)을 이용하는 Effects

### Class를 사용하는 예시


### Hook을 이용하는 예시


### 상세 설명





<br><br><br>

<출처>
- https://ko.reactjs.org/docs/hooks-effect.html
