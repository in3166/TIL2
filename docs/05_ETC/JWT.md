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
  - `HMACSHA256( base64UrlEncode(header) + "." base64UrlEncode(payload), KEY)`

- Header와 Payload는 누구나 디코딩하여 확인할 수 있으므로 중요한 정보는 넣지 않는다.
<br>

  - 그럼 왜 동일한 내용을 `서명`에 넣는가?
    - 헤더와 페이로드 내용이 바뀌지 않았음을 확인하기 위해서 (위조 방지)
    - 그래서 `Secret` 키로 암호화하고 이 키는 서버만 알고 있으므로 다른 사람이 변조할 수 없다.
    - 만약 헤더와 페이로드를 변조한다고 해도 서명을 변조할 수 없다.
<br>

- `IANA JSON Web Token Claims`
  - `iss`: 토큰을 발급한 발급자(Issuer)
  - `sub`: Claim의 주제(Subject)로 토큰이 갖는 문맥을 의미한다.
  - `aud`: 이 토큰을 사용할 수신자(Audience)
  - `exp`: 만료시간(Expiration Time)은 만료시간이 지난 토큰은 거절해야 한다.
  - `nbf`: Not Before의 의미로 이 시간 이전에는 토큰을 처리하지 않아야 함을 의미한다.
  - `iat`: 토큰이 발급된 시간(Issued At)
  - `jti`: JWT ID로 토큰에 대한 식별자이다.

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

<br><br>

## Refresh Token

- 질문1
  - `Refresh Token` 의 `payload` 로만 `Access Token`의 발급여부를 판단할 경우 해커가 `Refresh Token` 을 탈취 후, 임의로 `payload`의 정보를 유사하게 변경하여 생성하여 탈취당한 유저의 정보뿐 아니라 다른 유저의 정보까지도 접근가능해짐

    - `payload`의 정보를 유사하게 변경하려면 `시크릿키`로 토큰을 복호화하고 변경해야한다. 즉, 유사하게 변경하는 것은 불가능
    - `JWT`를 변조 하려면 서버가 서명한 시크릿키를 알고 있어야 한다. 서버가 털리지 않는 이상 불가능

- `Refresh Token`를 서버에 저장하는 이유는?
  - 검증을 하기 위해서가 아닌 해당 계정의 `후속조치` 때문
  - 예를들어, 차단된 유저나 동일한 엑세스키를 사용해서 잘못된 접근하는 해킹 등이 발생하면 서버에 저장된 `Refresh Token`을 만료
  - 사용자가 `Refresh Token`으로  `Access Token`을 발급 받았는데 만료 기간이 되지 않았음에도 `Refresh Token`으로 재발급을 받으려는 시도가 있다면 탈취된 것으로 간주하여 만료시킨다.

<br>

### XSS 공격 방식

- 1) 웹 사이트가 XSS 공격에 취약한 경우
  - (게시판에 사용자가 `javascript` 구문을 넣으면 동작이 가능)

- 2) 공격자가 게시판에 js 코드를 작성
  - (자기의 서버에 리다이렉트 하고 세션 ID 값을 보낼 수 있도록, 이전에 공격자 서버에 php 코드로 세션 ID 값을 저장할 수 있도록 한다.)

- 3) '서버 관리자님 도와주세요' 라는 글로 게시판 어그로를 끌고 작성한 js 코드를 붙힌다.

- 4) 관리자가 게시판 글을 읽는 순간 세션 ID 값이 공격자에게 전달된다

그래서 글쓴이 분께서 보신 refresh 토큰에 대해서 한번 사용하면 다시 재발급 받고 보호하는 식으로 보완하는 것 같네요

<br><br><br>

<출처>

- <http://www.opennaru.com/opennaru-blog/jwt-json-web-token/>
