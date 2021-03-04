# CORS (Cross-Origin Resource Sharing)
- 교차 출처 리소스 공유


## Origin (출처)
- 서버의 위치 (ex. https://google.com)
- `Protocol`, `Host`, `Port`를 합친 것을 의미
```
 https://   www.naver.com /users ?sort=asc&page=1   #foo
[Protocol]      [Host]    [Path]  [Query String]  [Fragment]
```


## SOP (Same-Origin Policy)
- 웹에서 다른 출처로의 리소스 요청 제한 정책 중 다른 하나의 정책
- 같은 출처에서만 리소스 공유 가능 규칙
- 예외 사항: CORS 정책을 지킨 리소스 요청


## 같은 출처 vs 다른 출처
- 두 URL 구성 요소 중 `Schema`, `Host`, `Port` 이 3개가 동일하면 같은 출처로 판단
- `https://`, `naver.com`, `:80`
```
O - https://evan-moon.github.io/about
O - https://evan-moon.github.io/about?q=안뇽
O - https://user:password@evan-moon.github.io
X - http://evan-moon.github.io       // Schema 다름
X - https://api.github.io            // Host 다름
? - https://evan-moon.github.io:8000 // 브라우저 구현에 따라 다름
```
- 마지막 예제는 포트가 명시되지 않아 판단 애매
- 출처 비교 로직은 브라우저에 구현되어 있는 스펙
  - CORS 위반 요청을 해도 서버는 정삭적 응답 후 브라우저가 위반 판단되면 응답을 사용하지 않고 버린다.
  - 서버 간 통신은 이 정책이 적용되지 않는다.

## 작동 방식
- 웹 클라이언트 애플리케이션이 다른 출처 리소스 요청 시 HTTP 츠로토콜 사용하여 요청
- 브라우저는 요청 헤더에 `Origin` 필드에 요청을 보내는 출처를 담아 보낸다.
```
Origin: https://evan-moon.github.io
```
- 서버가 요청에 대한 응답을 할 때 응답 헤더에 `Access-Control-Allow-Origin` 값에 "이 리소스를 접근하는 것이 허용된 출처"를 내려주고
- 응답을 받은 브라우저는 자신이 보냈던 요청의 `Origin`과 서버가 보내준 응답의 `Access-Control-Allow-Origin`을 비교한 후 유효한 응답인지 결정한다.

## CORS 동작 방식의 3가지 시나리오
### Preflight Request
- 이 상황에서 브라우저는 요청을 한번에 보내지 않고 예비 요청과 본 요청으로 나누너 서버로 전송
- 본 요청 전에 보내는 예비 요청 `Preflight`는 HTTP 메서드 중 `Options` 메서드가 사용된다.
- `Preflight`는 본 요청 전 브라우저 스스로 이 요청을 보내는 것이 안전한지 확인하는 것 

<img src="" />
- 예비 요청의 응답으로 `Access-Control-Allow-Origin`, 어떤 것들을 허용하고 금지하는 지에 대한 정보
- 예비 요청과 응답에 담아준 허용 정책을 비교 후, 요청을 보내는 것이 안전하다고 판단하면 다시 본 요청 전송

<예제>
- 요청
```javscript
const headers = new Headers({
  'Content-Type': 'text/xml',
});
fetch('https://evanmoon.tistory.com/rss', { headers });
```
```javscript
OPTIONS https://evanmoon.tistory.com/rss

Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9,ko;q=0.8,ja;q=0.7,la;q=0.6
Access-Control-Request-Headers: content-type
Access-Control-Request-Method: GET
Connection: keep-alive
Host: evanmoon.tistory.com
Origin: https://evan-moon.github.io
Referer: https://evan-moon.github.io/2020/05/21/about-cors/
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
```
  - 

### Simple Request

### Credentialed Request


