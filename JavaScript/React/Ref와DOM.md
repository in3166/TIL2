# Ref
- render 메서드에서 생성된 DOM 노드나 React 엘리먼트에 접근하는 방법 제공
<br>

- 일반적 React Data Flow는 props는 부모 컴포넌트가 자식과 상호작용하는 유일한 방법
- 자식을 수정하려면 새로운 props을 전달하여 자식을 리렌더링
- 자식(React 컴포넌트||DOM 엘리먼트)을 직접적 수정해야 하는 경우 존재

# When
- 포커스, 텍스트 선택영역, 미디어 재생 관리할 때
- 애니메이션 직접 실행시킬 때
- 서드 파티 DOM 라이브러리를 React와 같이 사용할 때

# 남용 금지
- 선언적 해결이 가능할 때는 Ref 지양 (메서드를 두는 대신 props을 전달)


## Ref 생성하기
- `React.createRef()`
- `ref` 속성을 통해 React 엘리먼트에 부착
- 컴포넌트 인스턴스가 생성될 때 Ref 프로퍼티로서 추가하면 컴포넌트 인스턴스의 어느 곳에서도 Ref 접근 가능
```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

## Ref에 접근
- `render` 메서드 안에서 ref 엘리먼트에 전달되었을 때, 그 노드 참조는 ref의 `current` 어트리뷰트에 담김
```javascript
const node = this.myRef.current;
```
- 노드 유형에 따른 ref 값
  - HTML 엘리먼트에 쓰였을 때: 생성자에서 React.createRef()로 생성된 ref는 자신을 전달받은 DOM 엘리먼트를 current 프로퍼티의 값으로 받음
  - 커스텀 클래스 컴포넌트에 쓰였을 때:ref 객체는 마운트된 컴포넌트의 인스턴스를 current 프로퍼티의 값으로서 받음
  - 함수 컴포넌트는 인스턴스가 없으므로 Ref 어트리뷰트 사용 불가

## 함수 컴포넌트에서 Ref
- `forwardRef`를 사용해야 하거나 클래스 컴포넌트로 변경할 수 있다
- DOM 엘리먼트나 클래스 컴포넌트의 인스턴스에 접근하기 위해 ref 어트리뷰트를 사용할 수 있다.
```javascript
function CustomTextInput(props){
  const textInput = useRef(null);
  
  function handleClick() {
    textInput.current.focus();
  }
  
  return (
    <div>
      <input type="text" ref={textInput} />
      <input type="button" value="Focus the text Input" onClick={handleClick} />
    </div>
  )
}
```
<br><br>

## 콜백 ref
- ref 설정, 해제되는 상황을 세세하게 다룰 수 있는 '콜백 ref' 제공
- `ref` 어트리뷰트에 `React.createRef()`를 통해 생성된 `ref`를 전달하는 대신 `함수`를 전달
- 전달된 함수는 다른 곳에 저장되고 접근될 수 있는 React 컴포넌트의 인스턴스나 DOM 엘리먼트를 인자로 받는다.

- 예시: 애

<br><br><br>

<출처>
- https://ko.reactjs.org/docs/refs-and-the-dom.html
