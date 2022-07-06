# HTTP (HyperText Transfer Protocol)
- 브라우저가 웹 서버와 통신하기 위한 규약
- Browser에서 요청하면 응답하는 간단한 구조
- W3C, IETF 등에서 제정한 인터넷 표준 (RFC-2616)

<img src="05_ETC/img/http-protocol-1.jpg" />

<br>

## HTTP 특징
- Connectionless (비연결)
  - 클라이언트가 서버에 요청했을 때, 요청에 맞는 응답을 보낸 후 연결을 끊는 처리 방식
  - HTTP 1.1에선 연결을 유치하고 재활용하는 기능이 추가됨
  
- Stateless (무상태성)
  - 클라이언트의 상태 정보를 가지고 있지 않는 서버 처리 방식
  - 이전의 통신에서의 데이터를 유지하지 않음
    - 로그인 유지, 장바구니 등 이전의 정보를 유지해야 하는 경우를 대처하여 쿠키와 세션을 사용

## HTTP 요청 메서드
- `GET`: 존재하는 자원에 대한 요청
- `POST`: 새로운 자원을 생성
- `PUT`: 존재하는 자원에 대한 수정
- `DELETE`: 존재하는 자원에 대한 삭제

- 기타 메서드
  - `HEAD`: 서버 헤더 정보 획득, `GET`과 비슷하나 Response Body 반환 안 함.
  - `OPTIONS`: 서버 옵션들을 확인하기 위한 요청, `CORS`에서 사용
  
  - `TRACE`: 클라이언트가 요청한 자원에 도달하기 까지의 경로를 기록하는 루프백(loop back) 검사용.
    - 클라이언트가 요청 자원에 도달하기 까지 거쳐가는 프록시나 게이트웨이의 중간 경로부터 최종 수진 서버까지의 경로를 알아낼때 사용.


<br><br>

## HTTP 응답코드
| | 응답 코드 그룹 | 응답 코드 | 설명|
|--|---------------|-----------|------|
|1xx|Informational| | |
|2xx|Successful| 200 OK | 가장 일반적인 경우, 요청된 웹 페이지를 반환 |
|3xx| Redirection | 301 Moved Permanently | 요청된 URL이 URL(Location: Header 지정)로 완전히 전환, Client는 요청된 URL을 지우던가 새로 바꿔치기 한다.
||| 302 Found | HTTP/1.0과 초기 HTTP/1.1과 호환성 유지를 위해 남겨진 코드 |
||| 303 See Other | 요청된 URL이 잠시 다른 URL로 바뀐 것을 알림, 바뀐 URL은 GET 메서드로 접근 |
||| 307 Temporary Redirect | 요청된 URL이 잠시 다른 URL로 바뀐 것을 알림, 바뀐 URL은 GET 메서드로 접근 |
|4xx| Client Error | 400 Bad Request | HTTP 요청, 특히 문법 잘못된 경우 |
||| 403 Forbidden | 권한이 없는 웹 페이지 접근했을 경우 |
||| 404 Not Found | 없는 페이지에 접근했을 경우 |
|5xx| Server Error | 500 Internal Server Error | 웹 서버 설정이 잘못 되었거나 서버 프로그램에 오류가 있을 때 |
||| 503 Service Unavailable | 웹 서버에 너무 많은 요청이 몰리거나 웹 서버에 부하가 걸려 응답하지 못할 때 |

<br><br>

## Header
### 공통 헤더
- 요청과 응답에 모두 사용
- `Date`
  - HTTP 메시지가 만들어진 시각으로 자동 생성
  
- `Connection`
  - 일반적으로 HTTP/1.1을 사용하며 기본적으로 Keep-Alive

- `Content-length`
  - 요청과 응답 메시지의 본문 크기를 바이트 단우로 표시, 자동 생성

- [`Cache-Control`](https://github.com/in3166/TIL/edit/main/etc/%EC%9B%B9%EC%BA%90%EC%8B%9C.md)

- `Content-Type`
  - 콘텐츠의 타입(MIME)과 문자열 인코딩 등을 명시
  - ex) `Content-Type: text/html; charset=utf-8` (메시지 내용이 text/html 타입,문자열은 utf-8 문자열)

- `Contetnt-Language`
  - 사용자 언어

- `Content-Encoding`
  - 응답 콘텐츠를 `br`, `gzip`, `deflate` 등의 알고리즘으로 압축해 보내면, 브라우저가 해제하여 사용
  - 요청, 응답 전송 속도 상승, 데이터 소모량 감소

### 요청 헤더
- `Host`
  - 서버의 도메인 이름

- `User-Agent`
  - 현재 사용자가 어떤 클라이언트(운영체제, 브라우저 등)으로 요청을 보냈는지에 대한 정보
  - ex) `User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36`
    - Window, Chorme 브라우저를 통해 접속
    
- `Accept`
  - 클라이언트가 허용할 수 있는 파일 형식(MIME Type)
  - ex) `Accept: text/html`: HTML 형식의 응답을 처리하겠다.
  - ex) `Accept: image/png, image/gif`: `,`로 여러 타입 지정 가능
  - ex) `Accept: text/*`

- `Cookie`
  - 웹 서버가 클라이언트에 쿠키를 저장해 놓았다면 해당 쿠키의 정보르 key/value 쌍으로 웹 서버에 전송

- `Origin`
  - `POST` 등의 요청 시, 어느 주소에서 시작되었는지에 대한 정보로 이 때 보낸 주소와 받는 주소가 다르면 `CORS` 문제 발생

- `If-Modified-Since`
  - 페이지가 수정되었으면 최신 버전 페이지 요청
  - 만일 요청한 페이지가 이 필드에 저장된 시간 이후로 변경되지 않았다면 데이터를 받지 않음

- `Authorization`
  - 인증 토큰을 서버로 보낼 때 사용
  - API 요청을 할 때 토큰이 없으면 거절당하므로 주로 JWT을 사용한 인증에서 사용

### 응답 헤더
- `Server`
  - 웹 서버 정보

- `Access-Control-Allow-Origin`
  - 요청 HOST와 응답 HOST가 다르면 `CORS` 에러 발생
  - 서버에서 응답 메시지의 `Access-Control-Allow-Origin` 헤더에 프론트 주소를 적어주면 에러 발생 안함

- `Allow`
  - ex) `Allow: GET`: `GET` 요청만 받는다. -> `POST` 요청 시 `405 Method Not Allowed` 리턴

- `Content-Disposition`
  - 응답 본문을 브라우저가 어떻게 표시해야할 지 알려주는 헤더
  - ex) `Content-Disposition: inline`: 웹페이지 화면에 표시
  - ex) `Content-Disposition: attachment; filename='filename.json'`: 다운로드

- `Location`
  - 300번대 응답이나 201 Created 응답일 때 어느 페이지로 이동할디 알려주는 헤더
  - ex) HTTP/1.1 302 Found  | Location: /login

- `Content-Security-Policy`
  - 다른 외부 파일들을 불러오는 경우, 차단할 리소스와 불러올 리소스 명시
  - `Content-Security-Policy: default-src 'self'`: 자신의 도메인의 파일들만 가져올 수 있다.
  - `Content-Security-Policy: default-src https`: https를 통해서만 파일을 가져올 수 있다.
  - `Content-Security-Policy: default-src 'none'`: 못가져 오게 만듦

<br><br><br>
<출처>
- https://searchadvisor.naver.com/guide/seo-basic-http
- https://hahahoho5915.tistory.com/32
- https://goddaehee.tistory.com/169
