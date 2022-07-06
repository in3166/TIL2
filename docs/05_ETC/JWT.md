# JWT (Json Web Token)
- 전자 서명된 URL-safe (URL로 이용할 수 있는 문자로만 구성된)의 JSON
- 전자 서명은 JSON의 변조를 체크할 수 있음
- 서버와 클라이언트 간 정보 교환 시 HTTP 리퀘스트 헤더에 JSON 토큰을 넣은 후 서버는 별도의 인증 과정없이 JWT 정보 인증


## 토큰 구성
`aaaaaa.bbbbbb.cccccc` - `header.payload.signature`
- 헤더(Header): 토큰의 타입, 해시 암호화 알고리즘으로 구성
- 페이로드(Payload): 토큰에 담을 클레임(속성) 정보를 포함, 정보의 한 조각: 클레임 - name/value
- 서명 (Signature): Secret Key를 포함하여 암호화


## 처리 과정
1. 사용자가 ID와 Password 입력하여 로그인 시도
2. 서버 요청 확인, Secret Key를 통해 Access Token 발급
3. JWT 토큰을 클라이언트에 전달
4. 클라이언트에서 API 요펑 시 클라이언트가 Authorization Header에 Access Token 담아 보냄
5. 서버는 JWT Signature 체크 후 Payload로부터 사용자 정보 확인해 데이터 반환
6. 클라이언트의 요청에 대한 응답 전달

- 클라이언트의 로그인 정보를 서버 메모리에 저장하지 않기 때문에 토큰기반 인증 메커니즘 제공
  - 인증이 필요한 경로 접근 시 서버 측은 Authorization 헤더에 유효한 JWT 존재 유무 확인


### 장점
- 별도의 인증 저장소 필요 없음
- 인증 서버와 데이터베이스에 의존하지 않음
- 트래픽 부담 낮고 디버깅 및 관리 용이


### 단점
- 토큰은 클라이언트에 저장되어 데이터베이스에서 사용자 정보를 조작하더라도 토큰에 직접 적용할 수 없습니다.
- 더 많은 필드가 추가되면 토큰이 커질 수 있습니다.
- 비상태 애플리케이션에서 토큰은 거의 모든 요청에 대해 전송되므로 데이터 트래픽 크기에 영향을 미칠 수 있습니다



<출처>
- http://www.opennaru.com/opennaru-blog/jwt-json-web-token/
