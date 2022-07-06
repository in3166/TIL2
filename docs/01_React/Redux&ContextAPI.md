# Redux
- a predictable state container
- 상태 관리 라이브러리
- `전역 상태`를 생성하고 관리하기 위한 라이브러리

- `Single Source of Truth`: 하나의 상태를 갖는다. (하나의 객체안에 모든 데이터를 넣음) -> 복잡성 낮춤
- `Dispatcher`, `reducer` 등을 통해서만 state 접근 가능 (외부 직접 제어 불가)
- 해당 데이터가 변경되면 그와 관련된 app들은 각자 자기 할 일을 한다.

<img src="01_React/img/redux-flow.png" />

## Props
- properties 줄임말
- 컴포넌트 간의 데이터 교환하는데 상위 컴포넌트에서 하위 컴포넌트로만 전달
- 자식 컴포넌트가 받느 Props는 변하지 않음 (변하기 위해선 부모 컴포넌트에서 다시 전달해줘야 함)
<br>

## State
- 컴포넌트 내에서 데이터 교환하기 위해 사용
- State는 mutable
- State가 변하면 re-render


### Redux는 State를 관리하는 것

<img src="01_React/img/redux1.JPG" />

- 굳이 상위 컴포넌트로 올라가지 않고 (왔다갔다하는 과정 삭제)


## Redux 데이터 Flow (strict unidirectional data flow)

***`[ Action ] -> [ Reducer ] -> [ Store ] - Subscribe -> [ React Component] - Dispatch(action) -> [ Action ]`***
<img src="01_React/img/redux2.PNG" />


### Store: 전체적인 어플리케이션의 state을 감쌈
  - 전역 상태 보관 (자바스크립트 객체 형태)
  - 리듀서로 접근 가능 (state는 직접 접근 불가)
  - 하나의 애플리케이션에 하나의 저장소만 존재 (react 주로 index.js) -> Reucer도 하나
  - immutable
  - 여러 메서드들 존재
  - state 변경: Dispatch로 action으로 변경

  ```javascript
  // index.js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';
 
  import { createStore } from 'redux';
  import { Provider } from 'react-redux';

  const store = createStore(/*your root reducer*/);

  ReactDOM.render(
    <Provider store={store}>
    	<App />
    </Provider>,
    document.getElementById('root')
  );
  ```
  
### Reducer: Action을 함으로 인해 변한 것을 설명
  - 상태 저장소 접근, 저장소에 유일하게 접근가능한 객체
  - 들어오는 Action에 따라 행동
  - 이전 state와 action object를 받아 변한 next state을 return
  - 리듀서 함수 내에서 반환되는 값을 상태 저장소에 저장
  - 상태 추가가 아닌 덮어씌우기 때문에 전체 상태를 복사하여 상태 갱신 후 반환

  ```js
  // 기본 상태값을 지정할 수 있습니다. (initState)
  const rootReducer = (state = initState, action) => {
    if (action.type === 'DELETE_POST') {
      const newPosts = state.posts.filter((post) => post.id !== action.id);
      return {
        ...state,
        posts: newPosts,
      };
    }
    return state;
  };
  ```
  
### Action: 무엇이 일어나는지 설명하는 객체
  - Reducer에 행동 지시
  - 트리거(trigger) 역할
  
  - Mary liked Article 42

  ```js
  { type: 'LIKE_ARTICLE', articleId: 42 }
    { type: 'Fetch_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
    {type: 'ADD_TODO', text: 'Read the Redux docs.' }
  ```

  ```js
  export const deletePost = (id) => {
    return {
     type: 'DELETE_POST',
      id: id,
    };
  };
  ```

### subScription
  - 저장소에 보관된 전역 상태 가져오기
  - 어느 컴포넌트에서도 저장소의 상태 값을 얻을 수 있다.

  ```javascript
  // Post.js
  import { connect } from 'react-redux';

  const mapStateToProps = (state, ownProps) => {
    return {
      posts: state.posts,
    };
  };

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      deletePost: (id) => {
        dispatch(deletePost(id));
      },
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Post);
  ```

  - HOC(connect)를 통해 전역상태와 액션을 위한 Dispatch를 컴포넌트에 전달합니다.
  - 이 컴포넌트에서는 props를 통해 전역상태와 Dispatch를 사용할 수 있습니다.

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
<br>

## React - Redux 라이브러리
- redux
  - store에 state 변경을 하려면 dispatch(action)으로 하는데 `Action`은 plain object(객체 형식)
  - 그런데 store은 항상 객체 형식으로 받지 않고 'Promise'나 'function' 등의 형태로도 받음
- react-redux
- redux-promise: dispatch에게 `Promise`을 받는 방법을 알려주는 미들웨어
- redux-thunk: dispatch에게 `function`을 받는 방법을 알려주는 미들웨어

<br><br>

# ContextAPI
- Redux와 같이 상태의 중앙 관리를 위한 <h3>상태 관리 도구</h3>
- Redux와 달리 여러 저장소 존재 가능

### context: 전역 상태 저장
- 컴포넌트가 Provide한 상태가 저장됨
- Consumer는 이 context를 통해 전역 상태에 접근 가능
- 여러 context 존재 가능, 하지만 하나의 context만 존재하면 성능상 이슈 발생 가능
- context 안에는 Provider와 Consumer가 정의되어 있고 다른 컴포넌트에선 이것들을 사용해 상태에 접근

```javscript
// ./contexts/root.js
import React from 'react'

export default React.createContext({}) // 함수의 인자에는 상태의 초기값이 들어갑니다.
```


### Provider: 전역 상태 제공
- context에 상태 제공
- 다른 컴포넌트가 해당 상태에 접근하여 사용 가능
- 제공된 상태에 접근하기 위해선 Provider의 하위 컴포넌트에 포함되어야 한다.
  - 모든 컴포넌트에 접근해야하는 상태 제공하기 위해선 루트 컴포넌트 `index.js` or `app.js`에 Provider 정의

```javascript
import ShopContext from './path/to/shop-context'; // React.createContext() 객체

class App extends Component {
  render() {
    return (
      <ShopContext.Provider value={{
          products: [],
          cart: []
        }
      }>
        {/* 이곳 Provider 사이에 있는 컴포넌트는 전역 상태에 접근할 수 있습니다. */}
      </ShopContext.Provider />
    );
  }
}
```


### Consumer: 전역 상태를 받아 사용
- 제공된 상태에 접근하는 방법 중 하나
- context는 Consumer 사이에 있는 처음의 객체를 context에 인자로 전달하기 때문에 바로 JSX를 작성하는 것이 아닌 빈 객체를 작성하고 나서 JSX를 작성해야한다.

```JAVASCRIPT
import ShopContext from '../context/shop-context' // React.createContext() 객체

class ProductsPage extends Component {
  render() {
    return (
      <ShopContext.Consumer>  { }
        {context => (
          <React.Fragment>
            <MainNavigation
              cartItemNumber={context.cart.reduce((count, curItem) => {
                return count + curItem.quantity
              }, 0)}
            />
            <main className="products">...</main>
          </React.Fragment>
        )}
      </ShopContext.Consumer>
    )
  }
}

export default ProductsPage
```


### contextType
- 


<br><br>

# Redux VS ContextAPI
- 전역 상태 관리 측면에서 거의 비슷하다.
- ContextAPI는 High-Frequency Updates에 좋지 않은 성능

  ### Redux는 ContextAPI와 다르게 상태 관리외에 다양한 기능 제공
  - 로컬 저장소 상태를 영속적으로 저장하고 시작할 때 다시 불러오는데 뛰어남.
  - 상태를 서버에서 미리 채워 HTML에 담아 클라이언트로 보내고 앱을 시작할 때 다시 불러오는데 뛰어남.
  - 사용자의 액션을 직렬화해서 상태와 함께 자동으로 버그 리포트에 첨부 가능, 이로 에러 재현 가능
  - 액션 객체를 네트워크를 통해 보내면 코드를 크게 바꾸지 않고 협업 환경 구현 가능
  - 실행취소 내역 관리, 낙관적인 변경(optimistic mutations)을 코드를 크게 바꾸지 않고 구현 가능
  - 개발할 때 상태 내역 사이를 오가고 액션 내역에서 현재 상태를 다시 계산하는 일을 TDD 스타일로 할 수 있다.
  - 개발자 도구에게 완전한 조사와 제어를 가능하게 해서 개발자들이 자신의 앱을 위한 도구를 직접 만들 수 있다.
  - 비즈니스 로직 대부분을 재사용하면서 UI 변경 가능
  
    - *직렬화: 인스턴스 상태를 어느 순간 상태를 그대로 저장/전송*
    - *낙관적인 변경(optimistic updates)*
      - UI는 서버로부터 실제로 변경되었다는 확인을 받기 전에 변경이 성공적으로 완료된 것처럼 동작한다.
      - 결국 오류보다는 confirmation을 받을 것이라고 낙관하고 있다.
      - reponsive user experience 환경을 얻는다.
      - ex) 공감, 비공갑 버튼을 누르면 바로 적용된다.
    - *TDD 스타일 (Test-driven development)*
      - 테스트 주도 개발
      - 매우 짧은 개발 사이클 반복하는 SW 개발 프로세스 ( 설계 -> 테스트(코드작성) -> 개발(코드작성성) )

<br>

***오직 전역 상태 관리만 한다. -> Context API***
***상태 관리 외 여러 기능 필요 -> Redux***
- 앱이 많은 상태관리를 저장할 필요가 없거나, 컴포넌트 구조가 과도한 prop drilling을 피할 수 있을만큼 단순하다면 <br> -> 상태 관리 라이브러리를 쓸 필요는 없다.

### Hooks
- 함수 컴포넌트로 대체 가능
- 메서드들: useState, useReducer, useContext(prop drilling없이 컴포넌트 간 앱 상태 공유 가능) 등은 더 좋은 상태 관리 방법 제공

- Hooks 개발 이유
  - 클래스 컴포넌트는 로직들을 재사용하기 어려움
  - 구현한 LifeCycle 메서드들에 관련 없는 로직 포함되곤 함.
  - 클래스는 컴퓨터와 인간 모두에게 이해하기 어려운 개념
`=> 상태 관리가 편해졌다고 상태 관리 라이브러리가 필요없게 된 것은 아니다.` 


<br><br><Br>

<출처>
- https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/lecture/37088?tab=curriculum
- https://velog.io/@cada/React-Redux-vs-Context-API
- https://m.blog.naver.com/suresofttech/221569611618
- https://stackoverflow.com/questions/33009657/what-is-optimistic-updates-in-front-end-development
- https://delivan.dev/react/stop-asking-if-react-hooks-replace-redux-kr/#redux%EB%8A%94-%EC%84%A0%ED%83%9D%EC%82%AC%ED%95%AD%EC%9D%B4%EB%8B%A4
- 생활코딩-redux
