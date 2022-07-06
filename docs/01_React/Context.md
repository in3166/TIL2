# Context
- props를 일일이 넘겨주지 않아도 컴포넌트 트리 전체에 데이터 제공 가능
- 일반적 React App은 데이터를 위에서 아래로 props로 전달
- Context 이용 시 명시적으로 props를 넘겨주지 않아도 많은 컴포넌트가 값 공유 가능
<br>

# When
- React 컴포넌트 트리 안에서 `전역적(global)` 데이터를 공유할 수 있도록 고안된 방법 
- 같은 데이터를 트리 안 여러 레벨의 많은 컴포넌트에 주어야 할 
- Ex. 로그인한 유저, 테마, 선호 언어
<br>

- 예제: 버튼 컴포넌트 꾸미기 위한 테마 props 넘겨주기

```javascript
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // Toolbar 컴포넌트는 불필요한 테마 prop를 받아서
  // ThemeButton에 전달해야 합니다.
  // 앱 안의 모든 버튼이 테마를 알아야 한다면
  // 이 정보를 일일이 넘기는 과정은 매우 곤혹스러울 수 있습니다.
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
```

- Context 사용 

```javascript
// context를 사용하면 모든 컴포넌트를 일일이 통하지 않고도
// 원하는 값을 컴포넌트 트리 깊숙한 곳까지 보낼 수 있습니다.
// light를 기본값으로 하는 테마 context를 만들어 봅시다.
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // Provider를 이용해 하위 트리에 테마 값을 보내줍니다.
    // 아무리 깊숙히 있어도, 모든 컴포넌트가 이 값을 읽을 수 있습니다.
    // 아래 예시에서는 dark를 현재 선택된 테마 값으로 보내고 있습니다.
    return (
      <ThemeContext.Provider value="dark"> 
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 이젠 중간에 있는 컴포넌트가 일일이 테마를 넘겨줄 필요가 없습니다.
function Toolbar() {
  return (
    <div>
      <ThemedButton />  //<ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 현재 선택된 테마 값을 읽기 위해 contextType을 지정합니다.
  // React는 가장 가까이 있는 테마 Provider를 찾아 그 값을 사용할 것입니다.
  // 이 예시에서 현재 선택된 테마는 dark입니다.
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

<br><br>

# 고려 사항
- Context 사용 시 컴포넌트 재사용 어려움
- 여러 레벨에 걸쳐 props 전달하기 위해 `컴포넌트 합성`이 더 나을 수 있다.
<br>

- `제어의 역전 (inversion of control)`
- 예제: `Link`와 `Avatar` 컴포넌트에 `user`와 `avaatarSize` 전달

```javascript
<Page user={user} avatarSize={avatarSize} />
// ... 그 아래에 ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... 그 아래에 ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... 그 아래에 ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```
  - props를 여러 단계에 걸쳐 보내야 함.
  - `Avatar` 컴포넌트 자체를 넘겨주면, 중간 컴포넌트들이 `user`나 `avatarSize`를 알 필요 없음

```javascript
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// 이제 이렇게 쓸 수 있습니다.
<Page user={user} avatarSize={avatarSize} />
// ... 그 아래에 ...
<PageLayout userLink={...} />
// ... 그 아래에 ...
<NavigationBar userLink={...} />
// ... 그 아래에 ...
{props.userLink}
```

- 넘겨 줘야 할 props는 줄고 최상위 컴포넌트의 제어력은 커진다.
- 하지만, 복잡한 컴포넌트를 상위로 옮기면 난해해질 수 있음.

<br><Br>
  
# API
## React.createContext
`const MyContext = React.createContext(defaultValue);`
- Context 객체를 구독하고 있는 컴포넌트 렌더링 시 React는 트리 상위에서 가장 가까이 있는 짝이 맞는 `Provider`로부터 현재 값 읽음
- `defaultValue` 매개변수는 트리 안에서 적절한 Provider를 못 찾으면 사용 (provider가 존재하고 `undefined` 전달해도 이 값으 읽진 않음)

## Context.Provider
`<MyContext.Provider value={/* 어떤 값 */}>`
- Context를 구독하는 컴포넌트들에게 context 변화를 알림.
- `value` prop을 받아 이 값을 하위 컴포넌트에 전달 (값이 변경되면 리렌더링)

## Context.contextType

```javascript
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* MyContext의 값을 이용한 코드 */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* ... */
  }
}
MyClass.contextType = MyContext;
```

```javascript
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* context 값을 이용한 렌더링 */
  }
}
```

`React.createContext()로 생성한 Context 객체를 원하는 클래스의 contextType 프로퍼티로 지정할 수 있습니다. 이 프로퍼티를 활용해 클래스 안에서 this.context를 이용해 해당 Context의 가장 가까운 Provider를 찾아 그 값을 읽을 수 있게됩니다. 이 값은 render를 포함한 모든 컴포넌트 생명주기 매서드에서 사용할 수 있습니다.

주의
이 API를 사용하면 하나의 context만 구독할 수 있습니다. 여러 context를 구독하기 위해서는 여러 context 구독하기를 참조하세요.
실험적 기능인 public class fields syntax를 사용하고 있다면 정적 클래스 프로퍼티로 contextType을 지정할 수 있습니다.`

<br>

## Context.Consumer

```javascript
<MyContext.Consumer>
  {value => /* context 값을 이용한 렌더링 */}
</MyContext.Consumer>
```

- context 변화를 구독하는 React 컴포넌트
- 자식은 `함수`여야 하는데 이 함수는 context의 현재값을 받고 React 노드를 반환
- 이 함수의 `value` 매개변수는 해당 context의 Provider 중 상위 트리에서 가장 가까운 Provider의 `value`

## Context.displayName
- Context 객체는 `displayName` 문자열 속성 설정 가능

```javascript
// 개발자 도구에서 MyDisplayName로 표시
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools
```

<br><br><br>

# 예시: theme
## 값이 변하는 Context
`theme-context.js`

```javasciprt
export const thems = {
  light: {
    foreground: '#000000',
    background: '#EEEEEE',
   },
   dark: {
    foreground: '#FFFFFF',
    background: '#222222',
   },
};
export const ThemeContext = React.createContext(
  themes.dark // 기본값
);
```

`theme-button.js`

```javascript
import {ThemeContext} from './theme-context';

class ThemeButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      />
    );
  }
}
```

`app.js`

```javascript
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// ThemedButton를 사용하는 중간에 있는 컴포넌트
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // ThemeProvider 안에 있는 ThemedButton은 state로부터 theme 값을 읽지만
    // Provider 밖에 있는 ThemedButton는 기본값인 dark를 사용합니다.
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}

ReactDOM.render(<App />, document.root);
```

## 하위 컴포넌트에서 context 업데이트하기
- 트리 하위의 컴포넌트에서 context를 업데이트 해야 할 때 context를 통해 메서드를 보낸다.
`theme-context.js`

```javascript
// createContext에 보내는 기본값의 모양을
// 하위 컴포넌트가 받고 있는 매개변수 모양과 동일하게 만드는 것 잊지마세요!
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
```

`theme-toggler-button.js`

```javascript
import {ThemeContext} from './theme-context';

function ThemeTogglerButton() {
  // ThemeTogglerButton는 context로부터
  // theme 값과 함께 toggleTheme 매서드도 받고 있습니다.
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;
```

app.js

```javascript
import {ThemeContext, themes} from './theme-context';
import ThemeTogglerButton from './theme-toggler-button';
Class App extends React.Component{
  constructor(props) {
    super(props);
    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
    
    // state에 업데이트 메서드도 포함되어있으므로
    // 이 또한 context Provider를 통해 전달될것입니다.
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // Provider에 state 전체를 넘겨줍니다.
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

ReactDOM.render(<App />, document.root);
```

## 여러 context 구독하기
- 각 context마다 Consumer를 개별 노드로 만들게 설계되어 있는데, 이는 context 변화로 다시 렌더링하는 과정을 빠르게 유지하기 위함

```js
// 기본값이 light인  ThemeContext
const ThemeContext = React.createContext('light');

// 로그인한 유저 정보를 담는 UserContext
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // context 초기값을 제공하는 App 컴포넌트
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// 여러 context의 값을 받는 컴포넌트
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```



  
<br><br><br>
<출처>
- https://ko.reactjs.org/docs/context.html
