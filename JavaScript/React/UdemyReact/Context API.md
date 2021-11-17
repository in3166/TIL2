# Context API
- props이 많은 컴포넌트를 지나갈 때
```
                <App />
<Auth />        <Shop />      <Cart />*   
<LoginForm/>    <Products/>   
                <Product />*
```
- `<Product />` 컴포넌트에서 Add to Cart를 실행했다고 한다면,
- `<Cart />` 에서는 로그인 정보와 상품 정보가 있어야 한다. 하지만, `<Product />`와 `<Cart />`는 직접 연결되어 있지 않다.

- 그래서, porps로 내려받은 핸들러로 state를 끌어올려 다시 전달해야 한다. (간접적 연결)
  - 중간에 거치는 컴포넌트는 해당 데이터가 필요없어도 거쳐가야만 한다.
  
<br>

- Long Props Chain - 앱이 커질수록 불편해진다.
- React 안에 Component-wide, 'behind-the-scenes' State Storage가 존재: **`React Context`**

- 그래서 `<Cart />`에서 로그인 정보와 상품 정보가 필요하다면
  - `<LoginForm/>` 과 `<Product/>`에서 직접 state를 Component-wide State Storage에 저장하고
  - `<Cart />`에서 직접 받을 수 있게 된다.
<br><br>

## 사용하기
- `/src/component` 폴더 안에 `/context` 폴더 생성 후 `auth-context.js` 파일 생성
  - `AuthContext.js`처럼 Pascal Case Notation을 사용할 수 있지만 이렇게 사용하면 여기에 컴포넌트를 저장할 것이라고 암시하는 것일 수 있어서 Kebab Case Notation 사용.

```js
// auth-context.js
import React from 'react'

// context 객체 생성
// 반환: 컴포넌트 or 객체
const AuthContext = React.createContext({
    isLoggedIn: false, // default 값: Provider없이 Consumner 사용했을 때 이 기본값을 사용할 수 있다.
}); 
//AuthContext는 그 자체로 컴포넌트는 아니고 컴포넌트를 가지는 객체.

export default AuthContext;
```
<br>

- 1. **Providing: JSX code로 다른 컴포넌트 묶기 (wrap)**
  - 모든 컴포넌트 can tabs in to that context 
  - so, all components able to listen to that context

  - JSX Code 내에서 감싸진 모든 컴포넌트는 컨텍스트에 접근할 수 있게 된다.
    - Provider를 통해서 값을 설정해야 Context 값을 바꿀 수 있다.
    - Default Value는 바꿀 수 없음.
    - props로 하나 하나 내려보내지 않고, Provider에 설정하면 모든 자식 컴포넌트가 listen 할 수 있다.
  ```js
  // App.js
    return (
        <AuthContext.Provider value={{isLoggedIn: isLoggedIn}}>
        <MainHeader isAuthenticated={isLoggedIn}<-삭제 가능 onLogout={logoutHandler} />
        <main>
          ...
        </main>
        </AuthContext.Provider>
    );
  ```
<br>

- 2. **Listening: 2가지 방법**
  - **`Consumer` 사용**
 
    - `Navigation.js`에서 isAuthentication 확인하기
    - Consumer는 하나의 함수 자식을 갖고, 인자로 Context 데이터를 받는다.

  ```js
    return (
        <AuthContext.Consumer>
          {(ctx) => {
            return (
              <nav className={classes.nav}>
                <ul>
                  {ctx.isLoggedIn && (
                    <li>
                      <a href="/">Admin</a>
                    </li>
                  )}
                </ul>
              </nav>
            );
          }}
        </AuthContext.Consumer>
    )    
  ```
<br>

  - **`Context Hook` 사용**
    ```js
    const Navigation = (props) => {
      const ctx = useContext(AuthContext);
      
      return (
      //...
    ```

### Context 동적으로 만들기
```js
// App.js
<AuthContext.Provider
    value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }} // context value에 추가
>
  <MainHeader />
  <main>
     {!isLoggedIn && <Login onLogin={loginHandler} />}
     {isLoggedIn && <Home onLogout={logoutHandler} />}
  </main>
</AuthContext.Provider>
```

- `<main>`에서 `onLoginHandler`와 `onLogoutHandler`를 직접 보내준다.
  - 이 핸들러를 `<Login/>`과 `<Home/>`에서 직접 사용하기 때문이다. (다른 곳으로 forwarding 하지 않고 직접적 참조하여 사용)
  ```js
  // Home.js
  <Button onClick={props.onLogout}>Logout</Button>
  ```
  - 위처럼 버튼 안에서 Context를 쓰지 않음 => 버튼 안에서 Context를 사용하면 로그아웃 기능 밖에 사용 못함 (버튼을 다른 컴포넌트에서 사용하더라도)
  - so, Context는 특정한 일을 하는 다수의 컴포넌트들에게 forwarding 할 떄 사용?
    - *only if you have something which would forward through a lot of components and you are forwarding it to a components that does something very specific*

<br>

### Context 업그레이드 하기
- Default Context에 함수도 추가해 놓기 (for IDE Auto-Completion)

- `AuthContext`안에 Provider 만들어 놓기
  - 모든 Authentication state를 안에 모아 관리할 수 있게 된다.
  - 즉, `App.js` 안에 있는 로직들을 분리하여 사용할 수 있게 된다.

```js
// auth-context.js
const AuthContext = React.createContext({
    isLoggedIn: false, 
    onLogout: () => {}, // 더미 함수
    onLogout: (email, password) => {},    
}); 

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
```

```js
// index.js
import { AuthContextProvider } from "./components/context/auth-context";

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);
```

```js
// App.js
function App() {
  const ctx = useContext(AuthContext);
  return (
    <>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </>
  );
}
```
- 다른 컴포넌트 들에서 Context를 사용할 때, `useContext`를 사용하면 된다.

- 이렇게 로직을 한 곳으로 모으는것은 선택 사항으로, 
  - `App.js`을 가볍게 만들고 JSX에 집중하게 하여 스크린에 무엇을 보여줄 지(가져올 지)에 집중할 수 있게 해주고
  - state 관리와, context 관리를 하나의 파일에서 해결할 수 있게 해준다.
<br><br>

## Context Limitations
- App-Wide, Component-Wide state 일 때는 사용하기 좋다.
 - state가 여러 구성요소에 영향을 줄 때,
 
- 그렇지만, 컴포넌트가 재사용되고 용도(?)가 동적인 경우에는 자제
  - 예) Button 컴포넌트는 prop를 받아 다양한 기능을 할 수 있는데, 여기서 Context로 기능을 고정시키면 다른 기능을 쓸 수 없다.

### 한계
- `Context`는 높은 빈도의 변경에는 최적화되어 있지 않다. (몇 초에 한 번씩 기능한다던지..) 
  - App-Wide/Component-Wide state인데 high-frequency면? => `Redux` 사용

- 모든 Props 대신 Context를 사용하면 안된다.
  - Props는 Component Configuration할 때 매우 중요하다.
<br><br>

# Rules of Hooks
- React Function 내부 or Custom Hook 내부에서만 호출하기

- Top Level 에서만 호출하기
  - 중첩 함수 내부에서 호출 금지
  - block statements에서 호출 금지

- `useEffect()` 내부에서 참조된 모든 것을 dependency에 추가하기

<br><br>

# Forward Refs
- `useRef()`는 prop으로 내려줘서 사용할 수 없다.

### 예제: input을 하나의 컴포넌트로 재구성
- 만약 Input의 값이 비었으면 Focus 해주는 기능 추가
- `useImperativeHandle()`: 컴포넌트나 함수를 imperatively(명령적?) 사용할 수 있게 해준다.
  - 일반적인 state props management, 부모 컴포넌트의 state를 통한 컴포넌트 제어가 아니라 직접 컴포넌트안에서 호출하거나 조작하는 방법

- focus, Scrolling 같은 경우에는 유용하지만 자주 쓰진 말자.

```js
// Input.js - input을 하나의 컴포넌트로 재구성
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const activate = () => {
    inputRef.current.focus();
  };
  useImperativeHandle(ref, () => {
    return { focus: activate };
  });
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        //value={enteredEmail}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});
```
```js
// Login.js
const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // ...
  
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) authCtx.onLogin(emailState.value, passwordState.value);
    else if (!emailIsValid) {
      emailInputRef.curren.focus();
    } else {
      passwordInputRef.curren.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          ref={emailInputRef}
        />
        // ...
    </Card>
  );
};
```

- 
<br><br><br>
<출처>
- Udemy: React 완벽 가이드
