# HOC (Higher-order component)
- 다른 컴포넌트를 받아 새로운 컴포넌트를 반환하는 함수
- 백엔드에 사용자 상태 정보를 가져와서 HOC 포함된 컴포넌트 페이지에 해당 사용자가 권한이 있는지 판단

<img src="https://github.com/in3166/TIL/blob/main/JavaScript/React/img/hoc.JPG" />

- HOC를 만들어 준다.
```javascript
import { useDispatch } from 'react-redux';
import {auth} from '../_action/user_action';

export default function (SpecifiComponent, option, adminRoute = null) {
    function AuthenticationCheck(params) {
        const dispatch = useDispatch(); // redux hook

        useEffect(() => {
            //axios.get('/api/users/auth') 대신 redux 사용
            // 서버 middleware/auth.js에서 토큰을 이용해 권한 확인
            dispatch(auth()).then(response => {
                response
            })
            return () => {
                cleanup
            }
        }, [input])
    }
    return AuthenticationCheck
}
```
 ### option
    - null: 아무나 출입 가능한 페이지
    - true: 로그인한 유저만 출입이 가능한 페이지
    - false: 로그인한 유저는 출입 불가능한 페이지
    
  - adminRoute: admin 유저만 출입 가능한 페이지 true를 넣어준다.
 <br>
 
 ## 처리
- Auth (HOC) 컴포넌트애 다른 모든 컴포넌트를 넣는다. <br> (만든 HOC를 App.js에서 import한 후 페이지 연결 부분에서 감싸준다 - Auth(LandingPage))
- HOC 컴포넌트(프론트에 존재)가 백엔드에 Request를 날린다.
- 현재 페이지의 상태 정보를 백엔드에서 HOC에 가져온다.
  - Login이 되어 있는가, 관리자 계정인가 등 ...
- 특정한 권한이 있는 사용자만 들어갈 수 있는 페이지이면 상태 정보를 받아와 판단을 하고 막는다.


<출처>
- https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8
