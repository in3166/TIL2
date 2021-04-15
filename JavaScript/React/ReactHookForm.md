# React Hook Form 모듈
- Formik+ Yup 보다 깔끔한 syntax, 간결한 코드
- 좋은 성능


## 예제: 회원가입
<img src="https://github.com/in3166/TIL/blob/main/JavaScript/React/img/reacthookform.JPG" width="55%" />
- 튜토리얼 사이트: https://react-hook-form.com/kr/get-started/

### 설치
```
npm install react-hook-form
```

### 기본 코드
```javascript
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

export default function App() {
  // 관찰하기
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data); // input에 입력한 데이터들이 들어옴 { email: "123@123.cdom", name:"a", ...}
  /* 만약 db에 전송한다고 하면
  const onSubmit = (data) => {
    axios.post('/', data)
  }
  */
  const password = useRef();
  password.current = watch("password");
  console.log(watch("email")); // watch input value by passing the name of it

  return (
    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)}>
    
    {/* register your input into the hook by invoking the "register" function */}
      <lable>Email</label>
      <input name="email" type="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
      {errors.email && errors.email.type === "required" && <span>This field is required</span>}
      {errors.email && errors.email.type === "pattern" && <span>이메일 형식에 맞지 않습니다.</span>}
      
      {/* include validation with required or other standard HTML validation rules */}
      <lable>Name</label>
      <input name="name" ref={register({ required: true, maxLength: 10 })} />
      {/* errors will return when field validation fails  */}
      {errors.name && errors.name.type === "required"  && <span>This field is required</span>}
       {errors.name && errors.name.type === "pattern"  && <span>Your input exceed maximum length</span>}
      
      <lable>Password</label>
      <input name="password" type="password" ref={register({ required: true, minLength: 6  })} />
      {errors.password && errors.password.type === "required"  && <span>This field is required</span>}
      {errors.password && errors.password.type === "pattern"  && <span>Password must have at least 6 characters</span>}
      
      <lable>Password Confirm</label>
      <input name="Password_Confirm" type="password" ref={register({ required: true, 
                                                                     validate: (value) => 
                                                                        value === password.current
                                                                     })} />
      {errors.Password_Confirm && errors.Password_Confirm.type === "required"  && <span>This field is required</span>}
      {errors.Password_Confirm && errors.Password_Confirm.type === "validate"  && <span>The passwords do not match</span>}
      <input type="submit" />
    </form>
  );
}
```
<br>

### 유효성 체크
<img src="https://github.com/in3166/TIL/blob/main/JavaScript/React/img/reacthookform2.JPG"  />

- (1): Element의 name이 'example'인 `input`(2)에 입력하면 watch로 관찰하여 출력, (3) ref에 `register`를 등록해줘야 관찰 가능
  - 버전 업: ref 대신 `{...register("email")}`로 변경
- 어떤 것이 입력되고 있는지 알아야 유효성 체크 가능
- (4): 유효성 체크 시 조건 주기
- (5): (4)의 유효성 체크(error)에 걸리면 `출력(렌더링)`을 해준다.

-  const password = useRef();
  - useRef?
    - 원래 특정 DOM 선택 시 사용 (vanilla에선 getElementId, querySelector)
    - React에선 ref 이용해 DOM 선택 (div 넣어줘서 선택) - 엘리먼트 크기 가져올때, 스크롤바 위치, 포커스 설정 등에 쓰임
      - 클래스 컴포넌트: React.createRef
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
      
      - 함수형 컴포넌트: useRef
      ```javascript
      function MyComponenet() {
        const myRef = useRef(null);
        
        return (
          <div ref={myRef} />
        );
      }
      ```

- validate: (value) => value === password.current

- react hook form을 사용하지 않는다면
```javascript
const [email, setName] = useState()
const handleChange = (e) => {
  setName(e.target.value);
}

return (
  <inpu name="email" onChange={handleChange} value={name} />
)
```
<br><br><br>

<출처>
- https://www.youtube.com/watch?v=tWOn7g_3wKU&list=PL9a7QRYt5fqlnuhU_Zgj2jKu6Ldw6UUCW
