- 최근 인터넷 서비스는 그 자체가 `SaaS(Software as a Service)` 형태
- 서비스 중 사용자가 필요한 일부만 사용할 수 있게 한다.
- 예: 외부서비스에서도 이용가능한 Facebook, Twitter 등

# OAuth
- 인증을 위한 오픈 스탠더드 프로토콜로 사용자가 인터넷 서비스(트위터 등)의 기능을 다른 애플리케이션(웹, 모바일 등)에서 사용가능하도록 한다.
- OAuth 이전에도 다른 애플리케이션에서 사용자의 아이디, 암호가 노출되지 않도록 하면서 API 접근 위임이 가능한 방법들이 존재했다. (API Access Delegation)

## OAuth와 로그인
- `OAuth`와 `로그인`은 별개
- 예: 회사 사원이 건물에 출입 - 로그인 / 외부인이 방문증을 수령한 후 회사에 출입 - OAuth
- 'Auth'는 'Authentication'(인증)뿐만 아니라 'Authorization'(허가) 또한 포함: 서비스 제공자는 어떤 정보나 서비스에 사용자의 권한으로 접근하는 것에 허용하는가

## OpenID와 OAuth
- `OpenID`도 인증을 위한 프로토콜이고 'HTTP'를 사용하는 점에서 `OAuth`와 동일
- `OpenID`에 주요 목적은 `인증(Authentication)`이자만, `OAuth`의 주요 목적은 `허가(Authorization)`이다.
- 즉, `OpenID`의 사용은 로그인하는 것과 동일
- `OpenID`는 `OpenID Provider`에서 사용자의 인증 과정을 처리(인증을 위임)

## OAuth Dance, OAuth 1.0 인증 과정
- `OAuth`의 사용자 인증 과정 = `OAuth Dance`
- 대표 용어
  - `User`: 'Service Provider'에 계정을 가지고 있으면서, Consumer를 이용하려는 사용자
  - `Service Provider`: 'OAuth를 사용하는 Open API를 제공하는 서비스
  - `Consumer`: OAuth 인증을 사용해 Service Provider의 기능을 사용하려는 애플리케이션이나 웹 서비스
  - `Request Token`: Consumer가 Service Provider에게 접근 권한을 인증받기 위해 사용하는 값. 인증이 완료된 후에는 Access Token으로 교환한다.
  - `Access Token`: 인증 후 Consumer가 Service Provider의 자원에 접근하기 위한 키를 포함한 값

- 회사 방문과 OAuth 인증 과정 비교

회사 방문 과정 | OAuth 인증 과정
---------------|------------------
|1.	나방문씨가 안내 데스크에서 업무적인 목적으로 김목적씨를 만나러 왔다고 말한다.|	Request Token의 요청과 발급|
|2.	안내 데스크에서는 김목적씨에게 나방문씨가 방문했다고 연락한다.	| 사용자 인증 페이지 호출|
|3.	김목적씨가 안내 데스크로 찾아와 나방문씨의 신원을 확인해 준다.	| 사용자 로그인 완료|
|4.	김목적씨는 업무 목적과 인적 사항을 안내 데스크에서 기록한다.	| 사용자의 권한 요청 및 수락|
|5.	안내 데스크에서 나방문 씨에게 방문증을 발급해 준다. |	Access Token 발급|
|6.	김목적씨와 나방문씨는 정해진 장소로 이동해 업무를 진행한다. |	Access Token을 이용해 서비스 정보 요청 |

- Accss Token을 가지고 있는 Consumer는 사전에 호출이 허락된 Service Provider의 오픈 API를 호출할 수 있다.

### Request Token
- 네이버 OAuth API로 Request Token 요청 예시
```
GET /naver.oauth?mode=req_req_token&
oauth_callback=http://example.com/OAuthRequestToken.do&
oauth_consumer_key=WEhGuJZWUasHg&oauth_nonce=zSs4RFI7lakpADpSsv&
oauth_signature=wz9+ZO5OLUnTors7HlyaKat1Mo0=&
oauth_signature_method=HMAC-SHA1&
oauth_timestamp=1330442419&
oauth_version=1.0 HTTP/1.1  
Accept-Encoding: gzip, deflate  
Connection: Keep-Alive  
Host: nid.naver.com  
```

- Request Token 발급 요청 매개변수

|매개변수 | 설명|
|---------|-------|
|oauth_callback |	Service Provider가 인증을 완료한 후 `리다이렉트할 Consumer의 웹 주소`. 만약 Consumer가 웹 애플리케이션이 아니라 리다이렉트할 주소가 없다면 소문자로 'oob'(Out Of Band라는 뜻)를 값으로 사용한다.|
|oauth_consumer_key |	`Consumer를 구별`하는 키 값. Service Provider는 이 키 값으로 Consumer를 구분한다.|
|oauth_nonce |	Consumer에서 `임시로 생성한 임의의 문자열`. oauth_timestamp의 값이 같은 요청에서는 유일한 값이어야 한다. 이는 악의적인 목적으로 계속 요청을 보내는 것을 막기 위해서이다.|
|oauth_signature |	OAuth 인증 정보를 암호화하고 인코딩하여 `서명 값`. OAuth 인증 정보는 매개변수 중에서 oauth_signature를 제외한 나머지 매개변수와 HTTP 요청 방식을 문자열로 조합한 값이다. 암화 방식은 oauth_signature_method에 정의된다.|
|oauth_signature_method |	oauth_signature를 `암호화하는 방법`. HMAC-SHA1, HMAC-MD5 등을 사용할 수 있다.|
|oauth_timestamp |	요청을 생성한 시점의 `타임스탬프`. 1970년1월 1일 00시 00분 00초 이후의 시간을 초로 환산한 초 단위의 누적 시간이다.|
|oauth_version |	`OAuth 사용 버전`. 1.0a는 1.0이라고 명시하면 된다.|

### oauth_signature 만들기
-  `Consumer`와 `Service Provider`가 같은 암호화(signing) 알고리즘을 이용하여 `oauth_signature`를 만들어야 한다.

1. 요청 매개변수를 모두 모은다.
- 'oauth_'로 시작하는 OAuth 관련 매개변수를 모은다.
2. 개변수를 정규화(Normalize)
- 사전순으로 정렬하고 각각의 키(key)와 값(value)에 URL 인코딩(rfc3986)을 적용
- URL 인코딩을 실시한 결과를 `=` 형태로 나열하고 각 쌍 사이에는 `&`을 넣는다. 
- 이렇게 나온 결과 전체에 또 URL 인코딩을 적용
3. Signature Base String을 만든다.
- `HTTP method 명(GET 또는 POST)`, `Consumer가 호출한 HTTP URL 주소(매개변수 제외)`, 정규화한 매개변수를 '&'를 사용해 결합
- `[GET|POST] + & + [URL 문자열로 매개변수는 제외] + & + [정규화한 매개변수]` 형태
4. 키 생성
- 3번 과정까지 거쳐 생성한 문자열을 암호화
- 암호화할 때 `Consumer Secret Key`를 사용
-` Consumer Secret Key`는 `Consumer`가 `Service Provider`에 사용 등록을 할 때 발급받은 값

### 사용자 인증 페이지의 호출
- `OAuth`에서 '사용자 인증 페이지를 호출'하는 단계는 '안내데스크에서 김목적씨에게 방문한 손님이 있으니 안내 데스크로와서 확인을 요청하는 것'에 비유
- `Request Token`을 요청하면, `Service Provider`는 `Consumer`에 `Request Token`으로 사용할 `oauth_token`과 `oauth_token_secret`을 전달
-  `Access Token`을 요청할 때는 `Request Token`의 요청에 대한 응답 값으로 받은 `oauth_token_secret`을 사용
-  `Consumer`가 웹 애플리케이션이라면 `HTTP 세션`이나 `쿠키` 또는 `DBMS` 등에 `oauth_token_secret`를 저장
-  `oauth_token`을 이용해 `Service Provider`가 정해 놓은 `사용자 인증 페이지`를 User에게 보여 주도록 한다.
-  `Service Provider`에서 User를 인증
-  인증이 완료되면 앞에서 어떤 권한을 요청
-  인증을 마치면 `Consumer`가 `oauth_callback`에 지정한 URL로 리다이렉트
-  Service Provider는 새로운 `oauth_token`과 `oauth_verifier`를 Consumer에 전달 (Access Token을 요청할 때 사용)

### Access Token 요청하기
- `Request Token`을 요청하는 방법과 유사 
- 다만, 사용하는 매개변수의 종류가 약간 다르고 `oauth_signature`를 생성할 때 사용하는 '키'가 다르다. 
- `Access Token` 을 요청할 때에는 매개변수 oauth_callback는 없고, `oauth_token`와 `oauth_verifer`가 있다.
- Access Token 발급을 요청할 때에는 `Consumer Secret Key`에 `oauth_token_secret`을 결합한 값(Consumer Secret Key + & + oauth_token_secret)을 사용해 `oauth_token_secret`를 생성

- 매개변수

|매개변수|	설명|
|-------|-------|
|oauth_consumer_key |	Consumer를 구별하는 키 값. Service Provider는 이 키 값으로 Consumer를 구분한다.|
|oauth_nonce |	Consumer에서 임시로 생성한 임의의 문자열. oauth_timestamp의 값이 같은 요청에서는 유일한 값이어야 한다. 이는 악의적인 목적으로 계속 요청을 보내는 것을 막기 위해서이다.|
|oauth_signature |	OAuth 인증 정보를 암호화하고 인코딩하여 서명 값. OAuth 인증 정보는 매개변수 중에서 oauth_signature를 제외한 나머지 매개변수와 HTTP 요청 방식을 문자열로 조합한 값이다. 암화 방식은 oauth_signature_method에 정의된다.|
|oauth_signature_method |	oauth_signature를 암호화하는 방법. HMAC-SHA1, HMAC-MD5 등을 사용할 수 있다.|
|oauth_timestamp	| 요청을 생성한 시점의 타임스탬프. 1970년1월 1일 00시 00분 00초 이후의 시간을 초로 환산한 초 단위의 누적 시간이다.|
|oauth_version |	OAuth 사용 버전|
|oauth_verifier |	Request Token 요청 시 oauth_callback으로 전달받은 oauth_verifier 값|
|oauth_token |	Request Token 요청 시 oauth_callback으로 전달받은 oauth_token 값|


### Access Token 사용하기
- User의 권한으로 Service Provider의 기능을 사용, 권한이 필요한 오픈 API를 호출할 수 있게 되는 것
- 특정 서비스를 호출할 때, URL에 `OAuth 매개변수`를 함께 전달
- Access Token을 사용해 오픈 API를 요청하는 예
```
POST /cafe/getMenuList.xml HTTP/1.1  
Authorization: OAuth oauth_consumer_key="dpf43f3p2l4k3l03",  
oauth_token="nSDFh734d00sl2jdk",  
oauth_signature_method="HMACSHA1",  
oauth_timestamp="1379123202",  
oauth_nonce="csrrkjsd0OUhja",  
oauth_signature="MdpQcU8iPGGhytrSoN%2FUDMsK2sui9I%3D"  
```
- 매개변수

|매개변수 | 설명|
|---------|----|
|oauth_consumer_key	|Consumer를 구별하는 키 값. Service Provider는 이 키 값으로 Consumer를 구분한다.|
|oauth_nonce	|Consumer에서 임시로 생성한 임의의 문자열. oauth_timestamp의 값이 같은 요청에서는 유일한 값이어야 한다. 이는 악의적인 목적으로 계속 요청을 보내는 것을 막기 위해서이다.|
|oauth_signature|	OAuth 인증 정보를 암호화하고 인코딩하여 서명 값. OAuth 인증 정보는 매개변수 중에서 oauth_signature를 제외한 나머지 매개변수와 HTTP 요청 방식을 문자열로 조합한 값이다. 암화 방식은 oauth_signature_method에 정의된다.|
|oauth_signature_method|	oauth_signature를 암호화하는 방법. HMAC-SHA1, HMAC-MD5 등을 사용할 수 있다.|
|oauth_timestamp|	요청을 생성한 시점의 타임스탬프. 1970년1월 1일 00시 00분 00초 이후의 시간을 초로 환산한 초 단위의 누적 시간이다.|
|oauth_version	|OAuth 버전|
|oauth_token	|oauth_callback으로 전달받은 oauth_token|

 - 주의
`Access Token을 이용해 요청할 때, Service Provider에 따라 realm이라는 매개변수를 사용해야 하는 경우도 있다. realm은 optional 매개변수인데, WWW-Authenticate HTTP 헤더 필드에서 사용하는 값이다.`

<br><br>

## OAuth 2.0
- OAuth 1.0 단점
  - OAuth 1.0은 웹 애플리케이션이 아닌 애플리케이션에서는 사용하기 곤란
  - 절차가 복잡하여 OAuth 구현 라이브러리를 제작하기 어렵다
  - 이런저런 복잡한 절차 때문에 Service Provider에게도 연산 부담이 발생한다.

- OAuth 2.0은 이러한 단점을 개선한 것이다. 
- OAuth 1.0과 호환성이 없다.

- OAuth 2.0의 특징
  - 웹 애플리케이션이 아닌 애플리케이션 지원 강화
  - 암호화가 필요 없음 `HTTPS`를 사용하고 HMAC을 사용하지 않는다.
  - Siganature 단순화 정렬과 URL 인코딩이 필요 없다.
  - 보안 강화를 위해 Access Token의 `Life-time`을 지정할 수 있도록 했다.
  - OAuth 2.0에서 사용하는 용어 체계는 OAuth 1.0과 완전히 다르다. 같은 목적의 다른 프로토콜이라고 이해는 것이 좋다.


<br><br><br>
<출처>
- https://d2.naver.com/helloworld/24942
