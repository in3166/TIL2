### Origin (출처)
- 서버의 위치 (ex. https://google.com)
- `Protocol`, `Host`, `Port`를 합친 것을 의미
```
 https://   www.naver.com /users ?sort=asc&page=1   #foo
[Protocol]      [Host]    [Path]  [Query String]  [Fragment]
```


### SOP (Same-Origin Policy)
- 웹에서 다른 출처로의 리소스 요청 제한 정책 중 다른 하나의 정책
- 같은 출처에서만 리소스 공유 가능 규칙
- 예외 사항: CORS 정책을 지킨 리소스 요청


### 같은 출처 vs 다른 출처
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

<br>

# CORS (Cross-Origin Resource Sharing)
- W3C에서 내놓은 교차 출처 리소스 공유 정책
- 특정 헤더를 통해 브라우저에게 `한 출처(Origin)`에서 실행되는 웹 애플리케이션이 `다른 출처(Cross Origin)`에 원하는 리소스에 **접근할 수 있는 권한**이 있는지 없는지 알려주는 매커니즘

- HTTP 요청에 대해 `HTML`은 기본적으로 `Cross-Origin` 요청이 가능
  - HTML이 `Cross-Origin` 정책을 따르고 있기 때문
  - ex) HTML에서 `<link>` 태그로 다른 origin의 리소스에 접근 가능
  - ex) 태그에서 다른 origin의 `jpg` 등의 리소스 접근 가능

- 하지만, `script` 내의 HTTP 요청에 대해서는 기본적으로 `SOP`를 따르고 `Cross-Origin` 요청이 불가능하다. (보안상 이슈로)
  - 대규모 웹 서비스가 늘며 외부 호출에 대한 필요가 늘어나 `JSONP` 같은 우회적 방법으로 `Cross-Origin` 정책을 회피하였는데
  - W3C에서 조금 더 안전한 브라우저와 서버 간 교차 통신을 할 수 있는 정책을 내놓았다.

### CORS 회피 방법
1. 웹 브라우저 실행 시 외부 요청을 허용하는 옵션 사용
  - 웹 브라우저 실행 시 `Command-Line` 옵션으로 `Cross-Origin` 서버로부터 받은 리소스 접근 가능하도록 설정
  - ex) `Chome`은 `--disable-web-security` 명령어 실행

2. 웹 브라우저에 외부 요청을 허요하도록 하는 플러그인 설치
  - 서버 응답 헤더에 `Access-Controller-Allow-Origin: *`만 추가해주면 웹 브라우저는 `Cross-Origin` 서버로부터 받아온 리소스에 접근 가능하다고 판단
  - 이런 작업을 플러그인으로 서버 응답 헤더에 강제적으로 넣을 수 있다.

3. JSONP(JSON with Padding)로 요청
  - JS, CSS 같은 리소스는 `Cross-Origin` 정책을 따르므로 외부 요청이 가능한 점 이용
  - [JSONP 사용법](https://kingbbode.tistory.com/26)

4. CORS로 요청
  - W3C에서 내놓은 표준 정책 방식

<br>

## CORS 작동 방식
- 웹 클라이언트 애플리케이션이 다른 출처 리소스 요청 시 HTTP 프로토콜 사용하여 요청하면
- 브라우저는 요청 헤더 `Origin` 필드에 요청을 보내는 출처를 담아 보낸다.
```
Origin: https://request-site.com
```
- 서버는 응답 헤더에 `Access-Control-Allow-Origin` 값에 "이 리소스를 접근하는 것이 허용된 출처"를 내려주고 응답
- 응답을 받은 브라우저는 자신이 보냈던 요청의 `Origin`과 서버가 보내준 응답의 `Access-Control-Allow-Origin`을 비교한 후 유효한 응답인지 결정

<br>

## CORS 동작 3가지 방식
### 1. Preflight Request (프리플라이트 방식)
- 브라우저는 요청을 한번에 보내지 않고 `예비 요청`과 `본 요청`으로 나누어 서버로 전송
- `Preflight`: 본 요청 전송 전에 보내는 예비 요청

- `Preflight`는 HTTP 메서드 중 `Options` 메서드가 사용된다.
- `Preflight`는 본 요청 전 브라우저 스스로 이 요청을 보내는 것이 안전한지 확인하는 것 

<img src="https://github.com/in3166/TIL/blob/main/etc/img/cors0.png" width="60%"/>
<br>

- 예비 요청의 응답으로 `Access-Control-Allow-Origin`, 어떤 것들을 허용하고 금지하는 지에 대한 정보를 담은 응답 헤더를 받음
- 브라우저는 `예비 요청`과 응답에 담아준 `허용 정책`을 비교 후, 요청을 보내는 것이 안전하다고 판단하면 다시 `본 요청` 전송
- 이후 서버가 이 본 요청에 대한 응답을 하면 브라우저는 최종적으로 응답 데이터를 자바스크립트에 넘겨준다.

<예제>
- 요청: 사이트의 RSS 파일 요청
```js
const headers = new Headers({
  'Content-Type': 'text/xml',
});
fetch('https://evanmoon.tistory.com/rss', { headers });
```

- `예비 요청`을 보냄: 브라우저가 본 요청을 보내기 전에 `OPTIONS` 메소드를 사용
  - `Origin` 정보 외에 본 요청에서 보낼 다른 정보도 포함
  - `Access-Control-Request-Headers: content-type` - 브라우저가 본 요청에서 `content-type`헤더를 사용할 것을 알림
  - `Access-Control-Request-Method`: GET` - 본 요청에서 `GET` 메서드를 사용할 것을 알림
```http
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

- 예비 요청에 대한 응답
  - `Access-Control-Allow-Origin: https://evanmoon.tistory.com`: 서버가 리소스 접근 가능한 출처를 알림
  - 위에서 요청 보낸 출처가 위의 출처와 다르므로 에러 발생될 것
  - 예비 요청에 대한 응답은 `200`으로 정상적, 하지만 출처가 다름
  - 반대로, 예비 요청에 대한 응답이 에러가 발생해도 위의 `Access-Control-Allow-Origin` 값이 제대로 있으면 `CORS` 정책 위반이 아니다.
```http
OPTIONS https://evanmoon.tistory.com/rss 200 OK

Access-Control-Allow-Origin: https://evanmoon.tistory.com
Content-Encoding: gzip
Content-Length: 699
Content-Type: text/xml; charset=utf-8
Date: Sun, 24 May 2020 11:52:33 GMT
P3P: CP='ALL DSP COR MON LAW OUR LEG DEL'
Server: Apache
Vary: Accept-Encoding
X-UA-Compatible: IE=Edge
```
<br><br>

### 2. Simple Request
- 예비 요청없이 본 요청을 보낸 후 서버의 응답 헤더에 `Access-Control-Allow-Origin` 값을 보내면 브라우저가 `CORS` 정책 위반 여부 
<img src="https://github.com/in3166/TIL/blob/main/etc/img/cors1.png" width="60%"/>

- 특정 조건 필요
  - 요청 메서드: `GET`, `HEAD`, `POST` 중 하나
  - `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`, `DPR`, `Downlink`, `Save-Data`, `Viewport-Width`, `Width`를 제외한 헤더를 사용 금지
  - `Content-Type`를 사용하는 경우에는 `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`만 허용

<예제>
- 요청
```JS
const xhr = new XMLHttpRequest(); 
const url = 'https://bar.other/resources/public-data/'; 
xhr.open('GET', url); 
xhr.onreadystatechange = someHandler; xhr.send();
```

- 브라우저는 위 요청이 `Cross-Origin` 요청 판단 후 요청에 `Origin: -` 헤더를 추가하여 외부 서버로 요청
```http
# 요청 헤더 GET /resources/public-data/ HTTP/1.1 
Host: bar.other 
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8 
Accept-Language: en-us,en;q=0.5 Accept-Encoding: gzip,deflate 
Connection: keep-alive Origin: https://foo.example
```

- 서버는 `Origin` 헤더를 확인하여 값이 허용되었는지 판단
  - `Access-Control-Allow-Origin: [서버에서 설정(허용)한 값]"` 을 응답 헤더에 추가하여 클라이언트로 응답
```http
# 응답 헤더 HTTP/1.1 200 OK 
Date: Mon, 01 Dec 2008 00:23:53 GMT 
Server: Apache/2 
Access-Control-Allow-Origin: * 
Keep-Alive: timeout=2, max=100 
Connection: Keep-Alive 
Transfer-Encoding: chunked
Content-Type: application/xml 
[...Payload...]
```

- 이후, 브라우저는 받은 응답의 `Access-Control-Allow-Origin` 헤더 값을 찾아 허용 여부 판단 후 허용되었으면 리소스 접근을 허락하고 그렇지 않으면 에러를 던진다.


<br><br>

### 3. Credentialed Request
- 인증된 요청을 사용하는 방법으로 다른 출처 간 통신에 보안을 더 강화한 방법
- 브라우저가 제공하는 비동기 리소스 요청 API인 `XMLHttpRequest`, `fetch`는 별도의 `credentials` 옵션 없이는 브라우저의 쿠키 정보나 인증 관련 헤더를 요청에 담지 않는다.
  - `credentials` 옵션 값

  | 옵션 값 | 설명 |
  ----------|-------
  smae-origin | 같은 출처 간 요청에만 인증 정보 담기 가능
  include | 모든 요청에 인증 정보 담기 가능
  omit | 모든 요청에 인증 정보 담기 불가능
  
- `same-origin` / `include` 옵션을 사용하여 리소스 요청을 보내면  `Access-Control-Allow-Origin` 확인 외에 검사 조건을 추가한다.
<br>

<예제>
- `Access-Control-Allow-Origin: *`(모든 요청 허용) 설정된 페이지에 `credentials` 옵션을 주어 요청
  - `include`: 동일 출처 여부와 상관없이 무조건 요청에 인증 정보가 포함되도록 설정, 쿠키 정보가 요청에 담김
```js
fetch('https://all-access-allow/feed.xml', {
  credentials: 'include',
});
```

- 에러 발생
  - 인증 모드가 `include`일 경우, `Access-Control-Allow-Origin:*` 헤더에 사용하면 안된다. 
  - 명시적 URL 사용해야 한다.
  - 응답 헤더에는 반드시 `Access-Control-Allow-Credentials: true` 존재해야 한다.
```
CORS policy: The value of the ‘Access-Control-Allow-Origin’ header in the response must not be the wildcard ’*’ when the request’s credentials mode is ‘include’.
```
<br><br>

## CORS 해결 방법
### Access-Control-Allow-Origin 세팅
- `Access-Control-Allow-Origin` 헤더에 알맞는 값 설정하기
- `*`를 설정하면 모든 출처에서 오는 요청을 받는다는 의미로 보안상 이슈 발생
- 명확한 출처를 명시
- 웬만한 백엔드 프레임워크에서 CORS 설정 미들웨어 라이브러리 제공

### Webpack Dev Server로 리버스 프록싱
- 로컬환경에서 프론트엔드 애플리케이션 개발하는 경우 대부분 `Webpack`과 `webpack-dev-server`를 사용하여 자신의 머신에 개발 환경을 구축
- 이 라이브러리가 제공하는 프록시 기능으로 `CORS` 정책 우회 가능
```JS
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.evan.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    }
  }
}
```
- 로컬에서 `/api`로 시작하는 URL 요청에 대해 브라우저는 `localhost:8000/api`로 요청을 보낸 것으로 알지만, 웹팩이 `https://api.evan.com`으로 요청을 프록싱
- 마치 `CORS` 정책을 지킨 것처럼 브라우저를 속여 원하는 서버와 자유롭게 통신할 수 있다.

- `webpack-dev-middleware`와 `Node` 서버의 조합으로 개발 환경을 직접 구축했다면 `http-proxy-middleware` 라이브러리를 사용하여 프록시 설정 가능
  - 실제 프로덕션 환경에서도 클라이언트 어플리케이션의 소스를 서빙하는 출처와 API 서버의 출처가 같은 경우에 사용하는 것이 좋다. 

<br><br><br>
<출처>
- https://evan-moon.github.io/2020/05/21/about-cors/#cors%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%8F%99%EC%9E%91%ED%95%98%EB%82%98%EC%9A%94
- https://vvshinevv.tistory.com/60
