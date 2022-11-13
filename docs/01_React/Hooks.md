# useInput 만들기

- 기본적으로 input을 업데이트

```js
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialvalue);
  const onChange = event => {
    // console.log(event.target);
    
  };
  return { value, onChnage };
}

const App = () => {
  const name = useInput("Mr.");
  return (
     <div className="app">
        <h1>Hello</h1>
        //<input placeholder="Name" value={name.value (or) ...name} /> // ...name은 안에 모든 것을 풀어줌 -> Mr.가 input에
        //<input placeholder="Name" value={name.value} onChange={name.onChange} />
        <input placeholder="Name" {...name} /> // 위와 동일
     </div>
  )
};
```

## useInput 확장

- useInput의 인자에 유효성 검증 기능 포함

```js
export const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialvalue);
  const onChange = event => {
    const { target : { value } } = event;   // const value = event.target.value;
    let willUpdate = true;
    if(typeof validator === "function"){
      willUpdate = validator(value);
    }
    if(willUpdate){
      setValue(value);
    }
  };
  return { value, onChnage };
}
```

```js
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import useInput

const App = () => {
const maxLen = (value) =>{
  value.length <= 10; // 10개 이상 입력하면 안변함
}
  const name = useInput("Mr.", maxLen);
  return (
     <div className="app">
        <h1>Hello</h1>
        //<input placeholder="Name" value={name.value (or) ...name} /> // ...name은 안에 모든 것을 풀어줌 -> Mr.가 input에
        //<input placeholder="Name" value={name.value} onChange={name.onChange} />
        <input placeholder="Name" {...name} /> // 위와 동일
     </div>
  )
}; 
```

<br><br>

# useTab 만들기

```js
const content = [
  {
    tab: "Section 1",
    content: "I'm the content of the section1"
  },
  {
    tab: "Section 2",
    content: "I'm the content of the section2"
  }
]
```

<br><br><br>
<출처>

- <https://nomadcoders.co/react-hooks-introduction/lectures/1592>
