# Authentication vs Authorization

### Authentication (인증)

- 로그인할 때 유효한 사용자인지 인증하는 것을 말함

### Authorization (권한 부여)

- 로그인한 사용자의 로그인 상태를 유지
- 권한을 부여하여 로그인 상태의 사용자만 사용 가능한 기능을 사용할 수 있다.
  - 매번 어떤 기능을 사용할 때마다 로그인할 수 없으니 권한을 부여
<br>

- 권한 부여를 위해 세션이나 JWT를 사용한다.

<br>

## HTTP 요청

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99E892345B53368707"  width="17%"/>

- HTTP 통신은 과거에 보낸 정보가 전혀 담겨있지 않다.
- 그래서, HTTP 요청을 누가 보냈는지에 대한 정보가 있어야 한다. (인증이 필요한 경우)
- `Header`에는 요청에 대한 정보가 들어간다.
  - 인증 수단을 헤더에 넣어 보낸다.

- `Body`에는 서버로 보낼 데이터가 들어간다.

<br>

## 계정 정보를 헤더에 넣는 인증 방식

- 헤더에 비밀번호 등 사용자 정보를 넣고 요청을 보낸다.
- 보안에 정말 취약
- 인증 테스트를 빠르게 시도할 때 사용

<br>

## 세션 ( +[쿠키](https://github.com/in3166/TIL2/blob/main/etc/LocalStorage,SessionStroage,Cookie.md) ) 기반 인증

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F994BEA345B53368401" />

### 서버 세션을 이용한 인증

- 1. 사용자 로그인
- 2. 서버에서 사용자 정보를 확인 후, 서버가 유저 세션을 생성, 사용자 고유의 ID를 부여해 세션 저장소에 저장
  - `Memory`
    - **빠른 속도**를 위해(아무 설정도 하지 않았다면) 메모리에 저장
    - 많은 요청 시 **서버 메모리 점유율**이 높아져 부하가 걸릴 수 있다.
    - Application이 재시작되면 쿠키는 그대로지만 Session이 변경된다. (초기화) -> 사용자가 무엇을 했는지 정보 손실
    - 확장 시 모든 서버가 접근할 수 있는 별도의 중앙 세션 관리 시스템 필요
<br>

  - `File Storage`
    - 서버가 재시작 되어도 정보 유지
    - 사용자의 증가로 로드밸런서에 의해 서버 2대에 분할되어 접속된다고 했을 때, 서버마다 다른 쿠키와 세션이 생성되어 공유가 안됨
<br>

  - `Database Stroage`
    - Session 대신 DB에 사용자 정보 저장
    - 동일한 유저가 **여러 디바이스**에서 장바구니를 사용해도 공유 가능
    - Session은 생명주기 관리를 위해서 사용
    - ex) MongoDB 컬렉션에 `sessionToken`과 `만료시간` 속성을 두고 Token과 만료시간을 비교하여 확인
<br>

- 3. 서버가 클라이언트에 `Session ID`를 전송
  - `HTTP Only`: 어떤 자바스크립트로도 읽을 수 없음
  - `secure cookie with sessionId`: 변형 등이 되지 않음
<br>
  
- 4. 클라이언트의 브라우저에`Session ID`를 쿠키에 저장
- 5. 사용자는 인증이 필요할 때 쿠키를 헤더에 실어 전송
- 6. 서버는 받은 쿠키를 세션 저장소와 대조
<br>

- 세션 ID는 브라우저 당 하나씩 생성되어 웹 컨테이너에 저장
- 로그아웃 시 새로운 사용자로 인식해 새로운 세션 생성

## 단점

- 중앙 세션 관리 시스템 없이 시스템 확장의 어려움
- 중앙 세션 관리 시스템 장애 시 시스템 전체 문제
- 메모리 낭비
- 쿠키를 탈취해 클라이언트로 위장 가능 위험
  - 해결책: `HTTPS`
  - 암호화되어 있어 안의 정보를 읽기 힘듦
  - 세션에 유효시간 넣기

<br><br>
  
# JWT (JSON Web Token)

`
JSON 웹 토큰(JWT)은 당사자 간에 정보를 JSON 개체로 안전하게 전송하는 컴팩트하고 독립적인 방법을 정의하는 개방형 표준(RFC 7519)입니다.
이 정보는 디지털 로 서명되어 있기 때문에 확인하고 신뢰할 수 있습니다.
`
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99329E345B53368603" />

- 토큰 기반 인증
  - 인증에 필요한 정보들을 암호화시킨 토큰
  
- 필요한 정보를 Token의 body에 저장해 **클라이언트가 가지고 있다가 증명서**처럼 활용
  - 쿠키/세션 방식과 유사하게 **HTTP 헤더에 JWT 토큰(Access Token)** 을 실어 서버가 클라이언트 식별
  - Sessions State를 클라이언트 쪽에서 유지한다!
  
- 간편, 확정 용이
<br>

`xxxxx.yyyyy.zzzzz`

- `Header(xxxxx)`: 토큰 유형(`type`), 사용된 해시 알고리즘 등 정보(`alg`) 등이 Base64Url로 인코딩되어 있다.
- `Payload(yyyyy)`: 클라이언트 정보(유저의 고유 ID, 유효 기간), meta Data 등의 정보, Base64Url로 인코딩되어 있다.
- `Signature(zzzzz)`: Header에 저장한 '알고리즘'과 'secret Key', '서명'으로 Payload와 Header를 암호화해 담는다.

- Header와 Payload는 누구나 디코딩하여 확인할 수 있으므로 중요한 정보는 넣지 않는다.
<br>

## 작동 방식

1. 사용자 로그인 요청
2. 서버 계정정보를 읽어 사용자를 확인 후, 사용자의 고유한 ID값을 부여한 후, 기타 정보와 함께 `Payload`에 넣는다.
3. `JWT 토큰`의 유효기간을 설정
4. 암호화할 `Srcret Key`를 이용해 `Access Token`을 발급
5. 사용자는 `Access Token`을 받아 저장한 후, 인증이 필요한 요청마다 토큰을 헤더에 실어 보낸다.
6. 서버에서는 해당 토큰의 `Verify Signature`를 `Secret Key`로 복호화한 후, 조작 여부, 유효기간을 확인한다.
7. 검증이 완료된다면, `Payload`를 디코딩하여 사용자의 ID에 맞는 데이터를 가져온다.  

## 장점

- `Header`와 `Payload`를 가지고 `Signature`를 생성하므로 데이터 위변조 방지
- 별도의 저장소 필요없음
- `JWT`는 토큰 기본 정보와 전달할 정보 및 검증 증명하는 서명 등 모든 정보를 자체적으로 가짐
- 서버는 무상태가 되고 확장성이 우수하다.
  - `OAuth`의 경우 소셜 계정을 이용해 다른 웹서비스에서도 로그인 가능
- 모바일 환경에서도 잘 작동
- to overcome CSRF and to ensure better mobile support

## 단점

- 로컬 스토리지와 세션 스토리지 같은 `브라우저 저장소에 JWT를 저장`한다면 스크립트 공격(XSS)에 취약해진다.

- `쿠키에 저장`할 때 `http-only` 를 사용한다면 `HTTPS`로만 쿠키가 전달되기 때문에 보안을 강화할 수 있고, CSRF 문제에 대해서는 CSURF같은 라이브러리를 사용함으로 해결
<br>

- 악의적 사용자의 탈취, 해킹 등을 당해도 대응 못함.
  - 서버가 이미 발급된 `JWT`를 처리하지 못한다.
  - `JWT`는 유효기간이 완료될 때까지 계속 사용 가능

- 특정 사용자 접속을 강제로 만료하기 어렵다.
  - 쿠키/세션 방식은 서버 쪽에서 세션을 삭제하면 가능

- `Payload` 정보 제한적
  - `Payload` 자체는 암호화되지 않아 중요한 정보를 담을 수 없다.
  
- 세션/쿠키 방식에 비해 토큰의 길이가 길어 자원 낭비
  - 인증 요청이 많을수록 네트워크 부하 심화
<br>

## 해결책

- 기존 `Access Token`의 유효기간을 짧게 하고 유효기간이 긴 `Refresh Token`을 발행
  - `Access Token`이 만료되면 `Refresh Token`과 함께 서버로 보내 `Access Token`을 재발급 받는다.
  - 서버는 DB에 저장된 `Refresh Token`과 비교 확인
  - 서버가 강제로 `Refresh Toekn`을 만료시킬 수 있다.
  - 대신, 추가적인 I/O 작업으로 기존의 빠른 인증 처리 장점이 줄어든다.

- `Sliding Session`
  - 글 작성 중 토큰이 만료된다면, 글이 날아가는 등의 불편함 존재
  - 서비스를 지속적으로 이용하는 클라이언트에게 자동으로 토큰 만료 기한을 늘려주는 방법 (글 작성, 결제 등을 할 때)

<img src="05_ETC/img/jwt1.png" />

<br><br>

## Session vs JWT

- `Session`은 사용자 정보를 세션 저장소에 넣지만 `JWT`는 토큰 안에 넣는다.
  - `Session` 별도의 저장소를 이용하고, `JWT` 암호화를 이용한다.

<br><br>

## 추천되는 인증 조합

1. `server side sessions` + `HTTPS` + `httpOnly` + `SameSite`

- Strict cookies for browser based clients (just don't support older browsers at all) + Only support application/json based POST/PUT requests

2. `Access tokens` + `refresh tokens` + `PKCE for mobile clients`

<br><br><br>
<출처>

- <https://tansfil.tistory.com/58>
- <https://yonghyunlee.gitlab.io/node/jwt/>
- <https://devhaks.github.io/2019/04/20/session-strategy/#Session%EC%9D%98-%EC%A0%80%EC%9E%A5-%EB%B0%A9%EC%8B%9D>
- <https://tecoble.techcourse.co.kr/post/2021-05-22-cookie-session-jwt/>
- <https://stackoverflow.com/questions/34280049/could-jwtjson-web-token-totally-replace-session>
- <https://stackoverflow.com/questions/70643645/session-vs-access-token-refresh-token>

<br><br>

# Server side Session VS Client side Session

- `server-side Session`은 세션 식벽자를(identifier) 데이터베이스나 메모리에 저장해야하고 클라이언트가 항상 동일한 서버에 접속하도록 해야한다.

  - 데이터베이스(중앙 집중 스토리지)는 병목 현상이 발생하고
  - 모든 request와 함께 추가적인 query가 수행되어야 한다.
  - With an in-memory solution, 수평 확장을 제한하고 세션은 네트워크 문제(Wifi와 모바일 데이터 간 로밍 클라이언트, 서버 재부팅 등)의 영향을 받습니다.
<br>

- 세션을 클라이언트 쪽으로 옮긴다는 의미는 server-side session에 대한 종속성을 제거하는 것이지만 몇가지 문제가 있다. (JWT를 포함한 다른 Client-side session)

  - 토큰을 안전하게 저장하는 것: 다른 종류의 XSS 공격을 완화하기 위해 사용되는 것과 동일한 전략을 사용하여 완화
  - 안전하게 전송하는 것: https 사용
  - JWT 세션은 때론 무효화(파기)하기 힘들다.
    - Storing a per-user epoch for only users who have requested to have their "other sessions terminated" -  "killed tokens" table
  - Client의 claim을 신뢰하는 것
<br>

- 인증에 관한 한 세션+쿠키를 대체하는 데 JWT를 사용할 수 있다.
- 하지만, 세션은 인증에만 사용되기 위한 것이 아니라 더 큰 컨텍스트 내에 HTTP 요청 및 응답을 배치하기위한 것이다. (JWT는 크기 제한이 있음)
  - 인증은 사용자별 정보가 되어야 하기 때문에 세션의 사용 사례 중 하나
  - 서버 세션 대신 JWT를 쓴다면 JWT를 HTTP 헤더로 저장할 수 있는데 이건 쿠키일 가능성이 높다.
  - 하지만, 헤더에 사이즈 제한이 있고 쿠기는 4k이다. (서버 세션은 제한이 없다.)
<br>

- 몇 개의 클라이언트만 있고 도메인 간 인증 요구 사항이 없는 경우 이전의 세션 + 쿠키 접근 방식을 포기할 이유는 없다.

- [Stop using JWT for sessions](https://hackernoon.com/auth-headers-vs-jwt-vs-sessions-how-to-choose-the-right-auth-technique-for-apis-57e15edd053)
- [How to choose](https://hackernoon.com/auth-headers-vs-jwt-vs-sessions-how-to-choose-the-right-auth-technique-for-apis-57e15edd053)
