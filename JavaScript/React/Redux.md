# Redux
- a predictable state container
- 상태 관리 라이브러리


## Props
- properties 줄임말
- 컴포넌트 간의 데이터 교환하는데 상위 컴포넌트에서 하위 컴포넌트로만 전달
- 자식 컴포넌트가 받느 Props는 변하지 않음 (변하기 위해선 부모 컴포넌트에서 다시 전달해줘야 함)


## State
- 컴포넌트 내에서 데이터 교환하기 위해 사용
- State는 mutable
- State가 변하면 re-render


### Redux는 State를 관리하는 것

<img src="https://github.com/in3166/TIL/blob/main/JavaScript/React/img/redux1.JPG" />
- 굳이 상위 컴포넌트로 올라가지 않고 (왔다갔다하는 과정 삭제)


## Redux 데이터 Flow (strict unidirectional data flow)

***`[ Action ] -> [ Reducer ] -> [ Store ] - Subscribe -> [ React Component] - Dispatch(action) -> [ Action ]`***
- Action: 무엇이 일어나는지 설명하는 객체
  - Mary liked Article 42
  ```javascript
  { type: 'LIKE_ARTICLE', articleId: 42 }
    { type: 'Fetch_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
    {type: 'ADD_TODO', text: 'Read the Redux docs.' }
  ```

- Reducer: Action을 함으로 인해 변한 것을 설명
  - 이전 state와 action object를 받아 변한 next state을 return
  
- Store: 전체적인 어플리케이션의 state을 감쌈
  - 여러 메서드들 존재
  - state 변경: Dispatch로 action으로 변경


## React Redux 설치
- `npm install redux react-redux redux-promis redux-thunk --save`
- redux-promise와 redux-thunk
  - 리덕스를 잘 쓸 수 있게 도와주는 미들웨어
```javascript
import { Provider } from 'react-redux';
// 적용

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

  - Redux Store에서 모든 State를 관리하는데 State를 변경하고자 할 때 Dispatch Action으로 하는데
  - Action은 Plain Object(객체 형식이어야 함.) 
  - 어쩔 때는 Action을 Promise 형식이나 Function 형식으로 받기도 한다.
  - Redux-thunk: Dispatch한테 Function을 받는 방법을 알려줌
  - Redux-Promise: '' promise ''

  <br><br>
  ```javascript
  //  src/_reducers/index.js
  import { combineReducers } from 'redux';

  import user from './user_reducer';
  import comment from './comment_reducer';
  
   const rootReducer = combineReducers({
       user,
       comment
       ...
   })

   export default rootReducer;
  ```
  ### combineReducers
    - Stroe 안에 여러가지의 Reducer 존재 (기능별 Reducer / 여러가지 state - user, post, comment, ...)
    - Reducer: 어떻게 state가 변하는지 보여주고 변한 마지막 값을 리턴
    - 위의 여러 Reducer을 CombineReducer로 RootReducer로 하나로 통합


<출처>
- https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/lecture/37088?tab=curriculum
