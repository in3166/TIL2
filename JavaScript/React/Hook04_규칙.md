# Hook의 규칙
## 최상위(at the Top Level)에서만 Hook을 호출
- 반복문, 조건문, 중첩된 함수 내에서 Hook 호출하지 말자.
- 컴포넌트가 렌더링 될 때마다 항상 동일한 순서로 Hook이 호출되는 것 보장
- `usseState`, `useEffect`가 여러 번 호출되는 중에도 Hook의 상태를 올바르게 유지 가능

## 오직 React 함수 내에서 Hook을 호출
- Hook을 일반적인 JavaScript 함수에서 호출하지 말자.
- 컴포넌트의 모든 상태 관련 로직을 소스코드에서 명확히 보이도록 할 수 있다.

<br>

# ESLint 플러그인
- 위 두 규칙을 강제하는 `eslint-plugin-react-hooks`라는 ESLint 플러그인을 프로젝트에 추가
- `Create React App`에 기본적으로 포함되어 있다.
`npm install eslint-plugin-react-hooks --save-dev`

## 여러개 사용하는 State, Effect Hook
```js
function Form() {
  // 1. name이라는 state 변수를 사용하세요.
  const [name, setName] = useState('Mary');

  // 2. Effect를 사용해 폼 데이터를 저장하세요.
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. surname이라는 state 변수를 사용하세요.
  const [surname, setSurname] = useState('Poppins');

  // 4. Effect를 사용해서 제목을 업데이트합니다.
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}
```

- React는 특정 state가 어떤 useState 호출에 해당하는지 알 수 있는 방법은 **React가 Hook이 호출되는 순서에 의존한다.**는 것이다.
- 위 예제의 호출 순서
```js
// 첫 번째 렌더링
// ------------
useState('Mary')           // 1. 'Mary'라는 name state 변수를 선언합니다.
useEffect(persistForm)     // 2. 폼 데이터를 저장하기 위한 effect를 추가합니다.
useState('Poppins')        // 3. 'Poppins'라는 surname state 변수를 선언합니다.
useEffect(updateTitle)     // 4. 제목을 업데이트하기 위한 effect를 추가합니다.

// 두 번째 렌더링
// -------------
useState('Mary')           // 1. name state 변수를 읽습니다.(인자는 무시됩니다)
useEffect(persistForm)     // 2. 폼 데이터를 저장하기 위한 effect가 대체됩니다.
useState('Poppins')        // 3. surname state 변수를 읽습니다.(인자는 무시됩니다)
useEffect(updateTitle)     // 4. 제목을 업데이트하기 위한 effect가 대체됩니다.
// ...
```
- 호출 순서가 렌더링 간에 동일 -> React는 지역적인 state를 각 Hook에 연동시킬 수 있다.

### 만약 조건문에 Hook이 들어간다면?\
```js
  // 🔴 조건문에 Hook을 사용함으로써 첫 번째 규칙을 깼습니다
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
```
- 호출 순서
```js
useState('Mary')           // 1. name state 변수를 읽습니다. (인자는 무시됩니다)
// useEffect(persistForm)  // 🔴 Hook을 건너뛰었습니다!
useState('Poppins')        // 🔴 2 (3이었던). surname state 변수를 읽는 데 실패했습니다.
useEffect(updateTitle)     // 🔴 3 (4였던). 제목을 업데이트하기 위한 effect가 대체되는 데 실패했습니다.
```
- 두 번째 조건이 `false`가 되어 Hook 건너뛰게 됨으로 호출 순서가 달라진다.
- 두 번째 Hook 호출이 `persistForm`가 될 것이라 React는 생각하지만 그렇지 않고 호출이 하나씩 밀리게 된다.
<br>

- **만약 조건부로 effect를 실행하기를 원한다면 조건뭉르 Hook 내부에 넣을 수 있다.**
```js
  useEffect(function persistForm() {
    // 👍 더 이상 첫 번째 규칙을 어기지 않습니다
    if (name !== '') {
      localStorage.setItem('formData', name);
    }
  });
```
