# Redux
- a predictable state container
- 상태 관리 라이브러리
- `전역 상태`를 생성하고 관리하기 위한 라이브러리


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

### Store: 전체적인 어플리케이션의 state을 감쌈
  - 전역 상태 보관 (자바스크립트 객체 형태)
  - 리듀서로 접근 가능
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
  ```javscript
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
  ```javascript
  { type: 'LIKE_ARTICLE', articleId: 42 }
    { type: 'Fetch_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
    {type: 'ADD_TODO', text: 'Read the Redux docs.' }
  ```
  ```javscript
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
  - 
  - 




<br><br><Br>

<출처>
- https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/lecture/37088?tab=curriculum
- https://velog.io/@cada/React-Redux-vs-Context-API
