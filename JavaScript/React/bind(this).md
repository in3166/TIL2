# React 컴포넌트에 이벤트 연결(binding)

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Basic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
    this.onClickButton = this.onClickButton.bind(this);
  }

  onClickButton() {
    this.setState(() => ({ hidden: true }));
  }

  render() {
    return (
      <div>
        <span>저는 {this.props.lang} 전문 {this.props.name}입니다!</span>
        {!this.state.hidden && <span>{this.props.birth}년에 태어났습니다.</span>}
        <button onClick={this.onClickButton}>숨기기</button>
      </div>
    );
  }
}

Basic.defaultProps = {
  lang: 'Javascript',
};

export default Basic;
```

### `this.onClickButton = this.onClickButton.bind(this)`
- bind하지 않으면 `<button onClick={this.onClickButton}>숨기기</button>` 부분에서 this는 `window`나 `undefined`가 된다.
  - why?
  - `this.onClickButton`이 실행되는 순간 (function() { this.setState(() => {{ hidden: true })); })();가 실행된다. <br> -> 이 때, this는 window
  - JavaScript 엔진은 this가 뭔지 모르기 때문에 최상위와 연결
- this.onClickButton.bind(this);
  -> Basic 컴포넌트의 onClcikButton 함수의 this를 현재 this로 bind 한다는 뜻.
  
  
  
<br><br><br>
<출처>  
- https://www.zerocho.com/category/React/post/578232e7a479306028f43393
