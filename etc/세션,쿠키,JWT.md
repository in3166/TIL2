# 세션 기반 인증
- 서버 세션을 이용한 인증
1. 클리이언트 로그인
2. 성공 시 서버가 유저 세션을 만들고 메모리나 DB에 저장
3. 서버가 클라이언트에 세션 ID 전송
4. 클라이언트의 브라우저에 세션의 ID만 쿠키에 저장

- 세션 데이터가 서버의 메모리에 저장 -> 확장 시 모든 서버가 접근할 수 있는 별도의 중앙 세션 관리 시스템 필요

## 단점
- 중앙 세션 관리 시스템 없이 시스템 확장의 어려움
- 중앙 세션 관리 시스템 장애 시 시스템 전체 문제
- 메모리 낭비

<BR><BR>
  
# JWT (Json Web Token)
- 토큰 기반 인증
- 필요한 정보를 토큰 body에 저장해 클라이언트가 가지고 있다가 증명서처럼 활용
- 간편, 확정 용이

`xxxxx.yyyyy.zzzzz`
- Header(xxxxx): 토큰 유형, 사용된 해시 알고리즘 등 정보, Base64Url로 인코딩되어 있다.
- Payload(yyyyy): 클라이언트 정보, meta Data 등의 정보, Base64Url로 인코딩되어 있다.
- Signature(zzzzz): Header에 저장한 '알고리즘'과 'secret Key', '서명'으로 Payload와 Header를 암호화해 담는다.

- Header와 Payload는 누구나 디코딩하여 확인할 수 있으므로 중요한 정보는 넣지 않는다.

## 작동 방식
1. 사용자 로그인
2. 서버 계정정보를 읽어 사용자를 확인 후, 사용자의 고유한 ID값을 부여한 후, 기타 정보와 함께 Payload에 넣는다.
3. JWT 토큰의 유효기간을 설정합니다.
4. 암호화할 SECRET KEY를 이용해 ACCESS TOKEN을 발급합니다.
5. 사용자는 Access Token을 받아 저장한 후, 인증이 필요한 요청마다 토큰을 헤더에 실어 보냅니다.
6. 서버에서는 해당 토큰의 Verify Signature를 SECRET KEY로 복호화한 후, 조작 여부, 유효기간을 확인합니다.
7. 검증이 완료된다면, Payload를 디코딩하여 사용자의 ID에 맞는 데이터를 가져옵니다.  

## 단점
- 악의적 사용자의 탈취, 해킹 등을 당해도 대응 못함.
  - 서버가 이미 발급된 JWT를 처리하지 못한다.
  - JWT는 유효기간이 완료될 때 까지 계속 사용 가능

- Payload 정보 제한적
- JWT 길이가 세션/쿠키 방식에 비해 길어 자원 낭비

## 해결책
- 기존 `Access Token`의 유효기간을 짧게 하고 유효기간이 긴 `Refresh Token`을 발행
- `Access Token`이 만료되면 `Refresh Token`과 함께 서버로 보내 `Access Token`을 재발급 받는다.
<img src="https://github.com/in3166/TIL/blob/main/etc/img/jwt1.png" />


<BR><BR><RB>
<출처>
- https://tansfil.tistory.com/58
- https://yonghyunlee.gitlab.io/node/jwt/
