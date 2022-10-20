## HTTP 응답 상태 코드 종류

- 1xx (Informational)
  - 정보 제공 응답
  - 요청이 수신되어 처리중

- 2xx (Successful)
  - 성공적인 응답

- 3xx (Redirection)
  - 리다이렉트
  - 요청을 완료하려면 추가적인 행동이 필요

- 4xx (Client Error)
  - 클라이언트 에러
  - 요청을 보낸쪽에 문제
  - 잘못된 문법

- 5xx (Server Error)
  - 서버 에러
  - 서버가 정상 요청을 처리하지 못함

<br><br>

# 1xx (Informational)

- 정보 제공 응답

## `100 Continue`

- 임시적 응답
- 지금까지 상태가 괜찮으며 클라이언트가 계속해서 요청을 하거나 이미 요청을 완료한 경우 무시해도 되는 것을 알림.

### 101 Switching Protocol

- 클라이언트가 보낸 Upgrade 요청 헤더에 대한 응답
- 서버에서 프로토콜을 변경할 것임을 알림 (HTTP 1.1 -> HTTP 2.0 or HTTP/HTTPS -> WebSocket)

### *102 Processing*

- 서버가 요청을 수신했지만 제대로 된 응답 알려줄 수 없음

### 103 Early Hints

- Link 헤더와 함께 사용되어 서버가 응답을 준비하는 동안 사용자 에이전트가 사전 로딩 시작할 수 있도록 한다.

<br><br>

# 2xx (Successful)

- 클라이언트 요청을 성공적으로 처리

## `200 OK`

- 요청 성공
- 성공의 의미
  - GET: 리소스를 불러와 메시지 바디에 전송됨.
  - HEAD: 개체 헤더가 메시지 바디에 있음.
  - PUT/POST: 수행 결과에 대한 리소스가 메시지 바디에 전송됨.
  - TRACE: 메시지 바디는 서버에서 수신한 요청 메시지를 포함.

## `201 Created`

- 요청이 성곡적이었으며 그 결과 새로운 리소스 생성
- 처리가 완료되지 않았을 경우.

## `202 Accepted`

- 요청을 수신했지만 그에 응하여 행동 불가.
- 다른 프로세스에서 치리 혹은 서버가 용청을 다루고 있거나 배치 프로세스 사용하는 경우를 위해 사용

## `204 No Content`

- 클라이언트가 서버로 요청을 보낸것이 성공적으로 수행됐지만, 응답에 보낼 데이터가 없을 경우
- ex) 웹문서의 편집기에 저장버튼을 눌렀을 경우 저장하긴 했지만 응답을 받을건 따로 없는 경우
- 어떤 버튼의 결과로 아무 내용이 없어도 될 때
- 헤더는 의미있을 수 있다.

### 205 Reset Content

- 요청을 완수한 후 사용자 에이전트에 이 요청을 보낸 뷰를 리셋하라고 알림.

### 206 Partial Content

- 클라이언트에서 복수의 스트림을 분할 다운로드를 하고자 범위 헤더를 전송했기 때문에 사용

### *207 Multi-Status*

### *208 Multi-Status*

### *226 IM Used*

<br><br>

# 3xx (Redirection)

- 요청을 완료하기 위해서 클라이언트 프로그램의 추가적인 조치가 필요할 때

1. 영구 리다이렉션

- 기존 URI를 사용하지 않기 때문에, 클라이언트에서도 변경을 인지할 수 있다.

## `301 Moved Permanently`

- 요청한 리소스의 `URI`가 변경되었음을 의미 (새로운 `URI`가 응답에서 주어질 수 있다.)
- 리다이렉트 요청 시, 메서드가 get으로 변하고 본문이 제거될 수도 있다.
- 처음에 POST로 보내면 메서드를 GET으로 변경시킨다.
- body부분이 삭제될 수도 있다.
- 클라이언트에서 요청파라미터로 name과 age를 보내는데 이 name과 age가 삭제될 수 도 있다.

## `308 Permanent Redirect`

- 리소스가 HTTP 응답 헤더의 `Location`과 전혀 다른 `URI`에 존재
- 301과 기능은 같지만, 요청 메서드와 본문을 유지시킨다.

<br>

2. 일시적인 리다이렉션

- 리소스 uri가 일시적으로 변경된다.
- 검색엔진 등에서 `URI`를 아예 변경하면 안된다.

## `302 Found`

- 요청한 리소스릐 `URI`가 일시적으로 변경됨.
- 새롭게 변경된 `URI`는 나중에 만들어질 수 있으므로 클라이언트는 향후의 요청도 반드시 동일한 `URI`로 해야한다.
- 리다이렉트 시 요청 메서드가 `GET`으로 변하고,
- `body`가 제거될 수 도 있다.

## `307 Temporary Redirect`

- 클라이언트가 요청한 리소스가 다른 `URI`에 존재하며 이전 요청과 동일한 메소드를 사용하여 요청해야 할 때
- `302 Found`와 동일한 의미를 가지며, HTTP 메소드를 변경하지 말아야 하는 점만 다르다.
- 리다이렉트시 요청 메서드와 `body`를 유지한다.

## `303 See Other`

- 클라이언트가 요청한 리소스를 다른 `URI`에서 `GET` 요청을 통해 얻어야 할 때, 서버가 클라이언트로 직접 보내는 응답
- 명확하게 리다이렉트 시 요청 메서드가 `GET`으로 변경된다.

## `304 Not Modified`

- 캐시를 목적으로 사용
- 클라리언트에게 응답이 수정되지 않았음을 알림.
- 그래서 클라이언트는 로컬PC에 저장된 캐시를 재사용한다.
  - 캐시로 리다이렉트한다.
- 304는 로컬 캐시를 사용해야하기 때문에 응답에 메시지 바디를 포함하면 안된다.
- 조건부 GET, HEAD 요청시 사용한다.

### *300 Multiple Choice (en-US)*

### *305 Use Proxy*

### *306 unused*

<br><br>

# 4xx (Client Error)

- 클라이언트 오류, 오류의 원인이 클라이언트에게 있음.
- 클라이언트가 요청이 잘못주는거라서 계속 시도해도 계속실패함.
- 요청 자체를 수정해야 하기 때문에 복구가 불가능하다

## `400 Bad Request`

- 클라이언트가 잘못된 문법으로 요청을 해서 서버가 요청을 처리할 수 없는 경우.
- 요청 구문, 메시지 등등 오류
- 예) 요청 파라미터가 잘못되거나, API 스펙이 맞지 않을 때

## `401 Unauthorized`

- 클라이언트가 해당 리소스에 대한 인증이 필요한 경우

### *402 Payment Required*

## `403 Forbidden`

- 서버가 요청은 이해했지만, 승인을 거부한경우
- 클라이언트가 콘텐츠에 접근할 권리를 가지고 있지 않음 (인증은 완료)

## `404 Not Found`

- 요청 리소스를 찾을 수 없음
- 요청 리소스(or 페이지)가 서버에 없음
- `URI`를 잘못 입력, 또는 클라이언트가 권한이 부족한 리소스에 접근할 때 해당 리소스를 숨길 경우

## `405 Mehod not Allowed`

- 요청한 메소드는 서버에서 알고 있지만, 제거되어 사용 불가
- ex) 어떤 API에서 리소스 삭제 금지, 필수적인 메소드인 `GET`, `HEAD`는 제거될 수 없으면 이 에러 코드를 리턴할 수 없다.

### *406 Not Acceptable*

### *407 Proxy Authentication Required*

## `408 Request Timeout`

- 요청을 한지 시간이 오래된 연결에 일부 서버가 전송하며,
- 어떤 땐 이전에 클라이언트가 어떤 요청이 없다고 해도 보내지기도 한다.
- 서버가 사용되지 않는 연결을 끊고 싶어한다는 것을 의미.

## `409 Conflict`

- 요청이 현재 서버의 상태와 충돌

### *410 Gone*

## `411 Length Required`

- 서버에서 필요로 하는 `Content-Length` 헤더 필드가 정의되지 않은 요청이 들와왔기 때문에 요청을 거절

### *412 Precondition Failed*

## `413 Payload Too Large`

- `Range` 헤더 필드에 요청한 지정 범위를 만족시킬 수 없습니다.

### *414 URI Too Long*

### *415 Unsupported Media Type*

### *416 Requested Range Not Satisfiable*

### *417 Expectation Failed*

### *418 I'm a teapot*

### *421 Misdirected Request*

### *422 Unprocessable Entity*

### *423 Locked*

### *424 Failed Dependency*

### *426 Upgrade Required*

### *428 Precondition Required*

### *429 Too Many Requests*

### *431 Request Header Fields Too Large*

### *451 Unavailable For Legal Reasons*

<br><br>

# 5xx (Server Error)

- 서버 문제로 오류가 발생했을 때. 애매하면 다 500 오류가 발생한다.
- 서버 내부문제로 오류가 발생한 것.

## `500 Internal Server Error`

- 서버가 처리 방법을 모르는 상황 발생

## `501 Not Implemented`

- 요청 방법은 서버에서 지원되지 않으므로 처리 불가.
- 서버가 지원해야 하는 필수적? 메소드는 `GET`, `HEAD`이다.

## `502 Bad Gateway`

- 서버가 요청을 처리하는 데 필요한 응답을 얻기 위해 게이트웨이로 작업하는 동안 잘못된 응답을 수신했음을 알림.

## `503 Service Unavailable`

- 서버가 요청을 처리할 준비가 되지 않음.
- 서비스 이용 불가
- `Retry-After` 헤더 필드로 얼마뒤에 복구되는지 보낼 수도 있음
- 일반적으로 유지보수를 위해 작동 중단, 과부하

## `504 Gateway Timeout`

- 서버가 게이트웨이 역할을 하고 있으며 적시에 응답을 받을 수 없음

## `505 HTTP Version Not Supported`

- 요청에 사용된 HTTP 버전은 서버에서 지원되지 않습니다.

### *506 Variant Also Negotiates*

### *507 Insufficient Storage*

### *508 Loop Detected*

### *510 Not Extended*

### *511 Network Authentication Required*

<br><br><br>
<출처>

- <https://developer.mozilla.org/ko/docs/Web/HTTP/Status>
- <https://blog.naver.com/jjsair0412/222457421051>
