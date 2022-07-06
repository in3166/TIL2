# body-parser
- 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해줌
- request의 body 부분을 쉽게 추출, parsing 해주는 middleware 모듈 (ex. 객체 -> JSON)
```javascript
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));  // application/x-www-form-urlencoded 데이터를 분석해서 가져옴
app.use(bodyParser.json()); // application/json 데이터를 분석해서 가져옴
```

<BR>

## urlencoded({extended : }) 옵션
- 자바스크립트의 데이터를 교환하는 형식: 객체
- `extended: true`: 객체 형태로 전달된 데이터 내에 다른 중첩 객체 허용 / `false`: 허용하지 않음.
- false: node.js 기본 내장 queryString 
- true: 설치가 필요한 npm qs 라이브러리 사용
- 둘 다 url 퀖리 스트링을 파싱해주지만 qs가 추가적인 보안 기능을 가진 확장 형태이다. (기본적으로 false를 사용)

<br><br>
### 현재 deprecated!
- express 자체 라이브러리에서 사용 가능  
  
  
<BR><BR>

<출처>
- https://velog.io/@hyunju-song/body-parser%EC%9D%98-urlencoded%EB%8A%94-%EB%8F%84%EB%8C%80%EC%B2%B4-%EC%96%B4%EB%96%A4-%EC%97%AD%ED%95%A0%EC%9D%84-%ED%95%98%EB%8A%94-%EA%B1%B8%EA%B9%8C
