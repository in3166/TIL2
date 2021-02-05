# Why Do We Write super(props)?
```javascript
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: true };
  }
  // ...
}
```

## super
- 부모클래스 생성자의 참조
- JavaScript는 언어저 제약사항으로 생성자에서 `super`를 호출하기 전에 `this`를 사용할 수 없다.
```javascript
class Checkbox extends React.Component {
  constructor(props) {
    // 🔴 Can’t use `this` yet
    super(props);
    // ✅ Now it’s okay though
    this.state = { isOn: true };
  }
  // ...
}
```

  ### Why?
  ```javascript
  class Person {
    constructor(name) {
      this.name = name;
    }
  }

  class PolitePerson extends Person {
    constructor(name) {
      this.greetColleagues(); // 🔴 This is disallowed, read below why
      super(name);
    }
    greetColleagues() {
      alert('Good morning folks!');
      alert('My name is ' + this.name + ', nice to meet you!');
    }
  }
  ```
  - super 호출 전에 this를 사용할 수 있다고 가정
  - `greetColleagues` 함수가 `super` 전에 선언되어 this.name이 아직 초기화되지 않은 상태에서 호출되는 문제 발생!

*** => super를 사용하는 이유는 Ok ***
<br><br>

## Props를 인자로 전달하는 이유
- `React.Componenet` 객체가 생성될 때 `props`속성을 초기화 하기 위해서 ? => Yes 초기화한다.
- 하지만, `props` 전달 없이 `super`를 호출해도 `render`함수나 메서드에서 `this.props`를 사용할 수 있다.

  - React는 우리가 작성한 컴포넌트의 생성자 호출 이후 해당 객체에 `props` 속성을 세팅해 준다. => 정상 작동 가능
  ```javascript
  // Inside React
  const instance = new YourComponent(props);
  instance.props = props;
  ```
  - 문제점은 생성자 호출 이후에 `props`를 셋팅해준다는 것이다. => 생성자 안에서 `this.props`를 사용하지 못한다.


<br><br><br>
<출처>
- https://min9nim.github.io/2018/12/super-props/
