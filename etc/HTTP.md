# HTTP (HyperText Transfer Protocol)
- 브라우저가 웹 서버와 통신하기 위한 규약
- Browser에서 요청하면 응답하는 간단한 구조
- W3C, IETF 등에서 제정한 인터넷 표준 (RFC-2616)

<img src="https://github.com/in3166/TIL/blob/main/etc/img/http-protocol-1.jpg" />

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


<br><br><br>
<출처>
- https://searchadvisor.naver.com/guide/seo-basic-http
- https://hahahoho5915.tistory.com/32
