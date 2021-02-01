# Using the Effect Hook
- 함수 컴포넌트에서 side effect 수행 가능
  - 데이터 가져오기, 구독 설정하기, 수동으로 리액트 컴포넌트의 DOM 수정하기 등
  - React 컴포넌트는 일반적으로 두 종류의 side effects 존재
    - 정리(clean-up) 필요한 것과 아닌 것
- `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 가 합쳐진 거라 생각해도 좋다.

- 카운터 예시에 문서의 타이틀을 클릭 횟수 포함 문장 표현 추가
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
<br><br>

## 정리(Clean-up)를 이용하지 않는 Effects

### Class를 사용하는 예시

### Hook을 이용하는 예시

### 상세 설명


## 정리(Clean-up)을 이용하는 Effects

### Class를 사용하는 예시

### Hook을 이용하는 예시

### 상세 설명




<br><br><br>
<출처>
- https://ko.reactjs.org/docs/hooks-effect.html
