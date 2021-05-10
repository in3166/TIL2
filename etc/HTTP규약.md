# HTTP 규약 (Protocol)
- Browser가 web server와 통신하기 위한 규약
- Browser에서 요청하면 응답하는 간단한 구조
- W3C, IETF 등에서 제정한 인터넷 표준 (RFC-2616)

<img src="https://github.com/in3166/TIL/blob/main/etc/img/http-protocol-1.jpg" />

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
