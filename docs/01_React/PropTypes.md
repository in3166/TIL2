# prop-types
- React 타입 체크 라이브러리
- 컴포넌트의 props에 타입 확인 하기 위해 특별한 프로퍼티인 `propTypes` 선언 가능

```js
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```
- 함수 컴포넌트에도 동일하게 적용 가능
- `PropTypes`는 전달받은 데이터의 유효성을 검증하기 위해 다양한 유효성 검사기(Validator)를 내보낸다.
- prop에 유효하지 않은 값이 전달 받으면 경고문이 콘솔에 찍힌다.
- `porpTypes`는 성능상의 이유로 개발 모드에서만 
<br>

## 예제
- prop의 종류로 `children, color, textColor, size, onClick`이 있을 때
- 아래와 같이 정의하고 타입 규칙이 어긋나면 React는 콘솔에 경고메세지를 출력한다.
```js
App.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  color: PropTypes.string,
  textColor: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
}
```
<br><br>

## 유효성 검사기 (Vaildator)
```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // prop가 특정 JS 형식임을 선언할 수 있습니다.
  // 모두 선택 사항
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 랜더링 될 수 있는 것들은 다음과 같습니다.
  // 숫자(numbers), 문자(strings), 엘리먼트(elements), 또는 이러한 타입들(types)을 포함하고 있는 배열(array) (혹은 배열의 fragment)
  optionalNode: PropTypes.node,

  // React 엘리먼트.
  optionalElement: PropTypes.element,

  // React 엘리먼트 타입 (ie. MyComponent)
  optionalElementType: PropTypes.elementType,

  // prop가 클래스의 인스턴스임을 선언할 수 있습니다.
  // 이 경우 JavaScript의 instanceof 연산자를 사용합니다.
  optionalMessage: PropTypes.instanceOf(Message),

  // 열거형(enum)으로 처리하여 prop가 특정 값들로 제한되도록 할 수 있습니다.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 여러 종류중 하나의 종류가 될 수 있는 객체
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 특정 타입의 행렬
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 특정 타입의 프로퍼티 값들을 갖는 객체
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 특정 형태를 갖는 객체
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),

  // 위에 있는 것 모두 `isRequired`와 연결하여 prop가 제공되지 않았을 때
  // 경고가 보이도록 할 수 있습니다.
  requiredFunc: PropTypes.func.isRequired,

  // 모든 데이터 타입이 가능한 필수값
  requiredAny: PropTypes.any.isRequired,

  // 사용자 정의 유효성 검사기를 지정할 수도 있습니다.
  // 검사 실패 시에는 에러(Error) 객체를 반환해야 합니다.
  // `oneOfType`안에서는 작동하지 않으므로 `console.warn` 혹은 throw 하지 마세요.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // `arrayOf` 와 `objectOf 에 사용자 정의 유효성 검사기를 적용할 수 있습니다.
  // 검사 실패 시에는 에러(Error) 객체를 반환해야 합니다.
  // 유효성 검사기는 배열(array) 혹은 객체의 각 키(key)에 대하여 호출될 것입니다.
  // 유효성 검사기의 첫 두 개의 변수는 배열 혹은 객체 자신과 현재 아이템의 키입니다.

  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```
<br><br>

## 하나의 자식만 요구하기
- `PropTypes.element`를 이용하여 컴포넌트의 자식들(Children)에 단 하나의 자식(Child)만이 전달되도록 명시 가능
```js
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // 이것은 반드시 하나의 엘리먼트여야 합니다. 아니라면, 경고(warn)가 일어날 것입니다.
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```
<br>

## 초기 Prop 값
- `defaultProps` 프로퍼티 할당하여 `props`의 초깃값 설정
- `this.props.name`의 값이 부포 컴포넌트에 의해 명시되지 않았을 때 값을 값도록 한다.
- `propTypes`의 타입 확인은 `defaultProps` 처리 후에 일어난다.
```js
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// props의 초깃값을 정의합니다.
Greeting.defaultProps = {
  name: 'Stranger'
};

// "Hello, Stranger"를 랜더링 합니다.
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```
<br><br>

## Function Components
- PropTypes 적절히 적용할 수 있도록 몇 가지 변경사항을 만들 수 있다.
```js
export default function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}
```
- 위의 컴포넌트에 `PropTypes`를 추가하려면 컴포넌트를 외부에 노출시키기 전에 별도의 함수로 컴포넌트 선언
- 그러면, 컴포넌트에 직접 `PropTypes` 추가 가능
```js
import PropTypes from 'prop-types'

function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string
}

export default HelloWorldComponent
```

<br><br><br>
<출처>
- https://ko.reactjs.org/docs/typechecking-with-proptypes.html
- https://velog.io/@eassy/ReactPropType%EC%9C%BC%EB%A1%9C-%ED%83%80%EC%9E%85-%EC%B2%B4%ED%81%AC
