# Using the State Hook
- Hook은 함수 컴포넌트 안에서 React State를 사용할 수 있게 해준다.

```javascript
// Hook을 React에서 가져온다.
import React, { useState } from 'react';

function Example() {
  // 새로운 state 변수를 선언하고, count라 부르겠습니다.
  // state 변수와 갱신 함수 반환
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      // 버튼 클릭 시 setCount 함수 호출하여 state 변수 갱신
      // React는 새로운 count 변수를 Example 컴포넌트에 넘기며 해당 컴포넌트를 리렌더링
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
- Class와 비교
```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
...
```
<br><br>
## State 변수 선언하기
- Class에서 constructoe 안에 `this.state`를 {count:0} 으로 초기화
- 함수 컴포넌트는 this를 가질 수 없어 ***`useState` Hook을 직접 컴포넌트에서 호출***
- 컴포넌트 렌더링 시 처음 한번만 생성되고 이후에는 현재 state를 준다.
  - useState는 무엇?
    - 'state 변수' 선언 가능, this.state 기능과 동일
    - 일반적으로 일반 변수는 함수 종료 시 사라지지만, state 변수는 React에 의해 사라지지 않음.
    
  - useState 인자
    - state의 초기값
    - 객체일 필요 없고, 숫자 타입과 문자 타입을 가질 수 있다.
    - 두 개의 다른 변수 저장을 위해선 useState()를 두 번 호출
    
  - useState 반환
    - `state 변수`와 `해당 변수를 갱신할 함수` 두 가지 쌍을 반환

<br><br>
## State 가져오기
- Class Componenet는 `this.state.count` 사용
- 함수 컴포넌트는 `count` 직접 사용
```javascript
 <p>You clicked {count} times</p>
```

<br><br>
## State 갱신하기
- Class Component눈 `this.setState()` 사용
```javscript
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Click me
  </button>
```
- 함숫 컴포넌트는 this를 호출하지 않아도 됨
```javscript
  <button onClick={() => setCount(count + 1)}>
    Click me
  </button>
```

<br><br>
## * 팁 *
### 대괄호의 의미
- 배열 구조 분해
```javscript
const [count, setCount] = useState(0); 
```
- 동일
```javascript
  var fruitStateVariable = useState('banana'); // 두 개의 아이템이 있는 쌍을 반환
  var fruit = fruitStateVariable[0]; // 첫 번째 아이템
  var setFruit = fruitStateVariable[1]; // 두 번째 아이템
```

### this 없이 어떻게 특정 컴포넌트와 연결하는가
- https://ko.reactjs.org/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components

### 여러 개의 state 변수 사용
- 개별적인 지역 변수 생성 및 갱신 가능
```javscript
function ExampleWithManyStates() {
  // 여러 개의 state를 선언할 수 있습니다!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

- 객체와 배열 사용 가능
```javascript
function Box() {
  const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });
  // ...
}
```
- but `this.setState`와 달리 state를 갱신하는 것이 아니라 `대체`하는 것
- https://ko.reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables


<br><br><br>
<출처>
- https://ko.reactjs.org/docs/hooks-state.html
