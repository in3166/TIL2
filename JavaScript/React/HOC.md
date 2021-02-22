# HOC (Higher-order component)
- 다른 컴포넌트를 받아 새로운 컴포넌트를 반환하는 함수 (받은 컴포넌트에 특정 기능을 부여)
- 반복되는 코드 해결, 컴포넌트 재사용
- 백엔드에 사용자 상태 정보를 가져와서 HOC 포함된 컴포넌트 페이지에 해당 사용자가 권한이 있는지 판단

<img src="https://github.com/in3166/TIL/blob/main/JavaScript/React/img/hoc.JPG" />


### 예제1: 페이지 이동 시 권한 확인

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

<br><br>

### 예제2: post, comment 컴포넌트
- 둘 다 단순히 axios 통신으로 데이터를 받아와 화면에 출력해주는 컴포넌트
- 중복되는 코드가 많다.
- post.js
```javascript
import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
  state = {
    data: null
  }
  
  async initialize() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      this.setState({
        data: response.data
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.initialize();  
  }


  render() {
    const { data } = this.state;
    
    if (!data) return null;

    return (
      <div>
        { JSON.stringify(data) }    
      </div>
    );
  }
}


export default Post;
```
- comment.js
```javascript
import React, { Component } from 'react';
import axios from 'axios';

class Comments extends Component {
  state = {
    data: null
  }

  async initialize() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/comments?postId=1');
      this.setState({
        data: response.data
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.initialize();
  }


  render() {
    const { data } = this.state;

    if (!data) return null;

    return (
      <div>
        {JSON.stringify(data)}
      </div>
    );
  }
}


export default Comments;
```

- HOC 작성하기
- 반복되는 코드를 없애기 위한 하나의 함수를 작성한다.
- 일반적인 HOC이름 `with____` 형식

- 원리
  - 파라미터로 컴포넌트를 받아오고
  - 함수 내부에서 새 컴포넌트를 만든 다음
  - 해당 컴포넌트 안에서 파라미터로 받은 컴포넌트를 렌더링
  - 자신이 받아온 props 들은 그대로 파라미터로 받아온 컴포넌트에 다시 주입
  - 필요에 따라 추가 props도 추가로 넣어준다.


- withRequest.js
- axios 를 통하여 받은 data 를 파라미터로 받은 컴포넌트에 넣어주도록 설정
```javascript
import React, { Component } from 'react';
import axios from 'axios';

const withRequest = (url) => (WrappedComponen) => {
  return class extends Component {

    state = {
      data: null
    }

    async initialize() {
      try {
        const response = await axios.get(url);
        this.setState({
          data: response.data
        });
      } catch (e) {
        console.log(e);
      }
    }

    componentDidMount() {
      this.initialize();
    }

    render() {
      const { data } = this.state;
      return (
        <WrappedComponent {...this.props} data={data}/>
      )
    }
  }
}

export default withRequest;
```
<BR><BR>
    
## HOC 사용
```javascript
import React, { Component } from 'react';
import withRequest from './withRequest';

class Post extends Component {
  render() {
    const { data } = this.props;
    
    if (!data) return null;

    return (
      <div>
        { JSON.stringify(this.props.data) }    
      </div>
    );
  }
}


export default withRequest('https://jsonplaceholder.typicode.com/posts/1')(Post);
```


<br><br>

<출처>
- https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8
- https://velopert.com/3537
