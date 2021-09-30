# 세션
- 세션 ID는 브라우저 당 하나씩 생성되어 웹 컨테이너에 저장
- 로그아웃 시 새로운 사용자로 인식해 새로운 세션 새성

## 세션(+[쿠키](https://github.com/in3166/TIL/blob/main/etc/LocalStorage,SessionStroage,Cookie.md)) 기반 인증
- 서버 세션을 이용한 인증
- 1. 클리이언트 로그인
- 2. 성공 시 서버가 유저 세션을 만들고 메모리나 DB에 저장
  - Memory
    - 빠른 속도를 위해(아무 설정도 하지 않았다면) 메모리에 저장되는데 많은 요청 시 서버 메모리 점유율이 높아져 부하가 걸릴 수 있다.
    - Application이 재식되면 쿠키는 그대로지만 Session이 변경된다. (초기화) -> 사용자가 무엇을 했는지 정보 손실

  - File Storage
    - 서버가 재시작 되어도 정보 유지
    - 사용자의 증가로 로드밸런서에 의해 서버 2대에 분할되어 접속된다고 했을 때, 서버마다 다른 쿠키와 세션이 생성되어 공유가 안됨
    
  - Database Stroage
    - Session 대신 DB에 사용자 정보 저장
    - 동일한 유저가 여러 디바이스에서 장바구니를 사용해도 공유 가능
    - Session은 생명주기 관리를 위해서 사용
    - ex) MongoDB 컬렉션에 `sessionToken`과 `만료시간` 속성을 두고 Token과 만료시간을 비교하여 확인

- 4. 서버가 클라이언트에 세션 ID 전송
- 5. 클라이언트의 브라우저에 세션의 ID만 쿠키에 저장

- 세션 데이터가 서버의 메모리에 저장 -> 확장 시 모든 서버가 접근할 수 있는 별도의 중앙 세션 관리 시스템 필요

## 단점
- 중앙 세션 관리 시스템 없이 시스템 확장의 어려움
- 중앙 세션 관리 시스템 장애 시 시스템 전체 문제
- 메모리 낭비
- 쿠키를 탈취해 클라이언트로 위장 가능 위험

<br><br>
  
# JWT (JSON Web Token)
- 토큰 기반 인증
  - 인증에 필요한 정보들을 암호화시킨 토큰
  
- 필요한 정보를 토큰 body에 저장해 **클라이언트가 가지고 있다가 증명서**처럼 활용
  - 쿠키/세션 방식과 유사하게 HTTP 헤더에 JWT 토큰(Access Token)을 실어 서버가 클라이언트 식별
  
- 간편, 확정 용이

`xxxxx.yyyyy.zzzzz`
- `Header(xxxxx)`: 토큰 유형, 사용된 해시 알고리즘 등 정보, Base64Url로 인코딩되어 있다.
- `Payload(yyyyy)`: 클라이언트 정보, meta Data 등의 정보, Base64Url로 인코딩되어 있다.
- `Signature(zzzzz)`: Header에 저장한 '알고리즘'과 'secret Key', '서명'으로 Payload와 Header를 암호화해 담는다.

- Header와 Payload는 누구나 디코딩하여 확인할 수 있으므로 중요한 정보는 넣지 않는다.

## 작동 방식
1. 사용자 로그인 요청
2. 서버 계정정보를 읽어 사용자를 확인 후, 사용자의 고유한 ID값을 부여한 후, 기타 정보와 함께 `Payload`에 넣는다.
3. `JWT 토큰`의 유효기간을 설정한다.
4. 암호화할 Srcret Key를 이용해 `Access Token`을 발급한다.
5. 사용자는 `Access Token`을 받아 저장한 후, 인증이 필요한 요청마다 토큰을 헤더에 실어 보낸다.
6. 서버에서는 해당 토큰의 Verify Signature를 Secret Key로 복호화한 후, 조작 여부, 유효기간을 확인한다.
7. 검증이 완료된다면, `Payload`를 디코딩하여 사용자의 ID에 맞는 데이터를 가져온다.  


## 장점
- Header와 Payload를 가지고 Signature를 생성하므로 데이터 위변조 방지
- 별도의 저장소 필요없음
- JWT는 토큰 기본 정보와 전달할 정보 및 검증 증명하는 서명 등 모든 정보를 자체적으로 가짐
- 서버는 무상태가 되고 확장성이 우수하다.
- OAuth의 경우 소셜 계정을 이용해 다른 웹서비스에서도 로그인 가능
- 모바일 환경에서도 잘 작동

## 단점
- 악의적 사용자의 탈취, 해킹 등을 당해도 대응 못함.
  - 서버가 이미 발급된 `JWT`를 처리하지 못한다.
  - `JWT`는 유효기간이 완료될 때까지 계속 사용 가능

- 특정 사용자 접속을 강제로 만료하기 어렵다.
  - 쿠키/세션 방식은 서버 쪽에서 세션을 삭제하면 가능

- `Payload` 정보 제한적
  - `Payload` 자체는 암호화되지 않아 중요한 정보를 담을 수 없다.
  
- JWT 길이가 세션/쿠키 방식에 비해 토큰의 길이가 길어 자원 낭비
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
<img src="https://github.com/in3166/TIL/blob/main/etc/img/jwt1.png" />


<BR><BR><RB>
<출처>
- https://tansfil.tistory.com/58
- https://yonghyunlee.gitlab.io/node/jwt/
- https://devhaks.github.io/2019/04/20/session-strategy/#Session%EC%9D%98-%EC%A0%80%EC%9E%A5-%EB%B0%A9%EC%8B%9D
- https://tecoble.techcourse.co.kr/post/2021-05-22-cookie-session-jwt/
