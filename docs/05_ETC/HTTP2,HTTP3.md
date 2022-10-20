# HTTP/1.1 동작 방식

- HTTP: 웹 상에서 Client와 Server 간 통신을 위한 Protocol
- 기본 동작: Connetion 당 하나의 요청을 처리(요청-응답)
<img src="https://github.com/in3166/TIL/blob/main/etc/img/http1.png" width="30%"/>

```http
GET /q=a=1 HTTP/1.1
Host: 127.0.0.1

GET /flag HTTP/1.1
Host: www.modusecurity.xyz
User-Agent: curl/7.66.0
Accept: */* HTTP/1.1
Host: www.modusecurity.xyz
User-Agent: curl/7.66.0
Accept: */*
```

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 7872
ETag: W/"1ec0-0RmELqv7Q+F1+foGfUNa4OeTH1k"
* Added cookie connect.sid="s%3AAy0PPE659bH1rd9NURtAPhi0mTOWdNWa.Z0QvE5cxK1kVcOQuxS4RZ0HrcZVHcEVwfd0aqqQ3SdE" for domain www.modusecurity.xyz, path /, expire 0
Set-Cookie: connect.sid=s%3AAy0PPE659bH1rd9NURtAPhi0mTOWdNWa.Z0QvE5cxK1kVcOQuxS4RZ0HrcZVHcEVwfd0aqqQ3SdE; Path=/; HttpOnly
Date: Fri, 14 Feb 2020 13:40:56 GMT
Connection: keep-alive

<!DOCTYPE html>
<html lang="en">
..... 생략.....
```

## 개선 사항

- 커넥션 재사용 가능 (기존 연결에 대한 Handshake 생략 가능)
- Pipelining 추가, 이전 요청에 대한 응답이 완전히 전송되기 전 다음 전송 가능 (커뮤니케이션 레이턴시 감소)
  - 하나의 요청 처리(Connection)에 다수의 파일 요청/응답이 가능

- 청크된 응답 지원 (응답 조각)
- 캐시 제어 메커니즘
- 언어, 인코딩 타입 등을 포함한 콘텐츠 전송
- 동일 IP 주소에 다른 도메인을 호스트하는 기능 (HOST Header)

## HTTP/1.1 단점

- 동시 전송 불가: 다수의 리소스 처리 시 대기 시간(Legacy) 길어짐
- 특정 응답의 지연: HOL (Head Of Line) Blocking
  - Pipelining으로 하나의 연겨로 여러 파일을 요청하고 응답할 수 있게 됐지만,
  - 한 연결의 이전 파일의 요청/응답이 지연되면 그 뒤의 파일들이 대기하게 되는 현상
  
- RTT (Round Trip Time 왕복 시간) 증가: 패킷이 목적지에 도달해 다시 출발지로 돌아오기 까지의 시간
  - HTTP1.1은 하나의 Connection으로 하나의 요청을 처리하는데 매 요청별 별도의 Connection을 만들어야 한다.
  - TCP 상에서 동작하는 HTTP 특성상 [3-way Handshake](https://mindnet.tistory.com/entry/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EC%89%BD%EA%B2%8C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-22%ED%8E%B8-TCP-3-WayHandshake-4-WayHandshake)(정확한 전송을 보장하기 위해 상대방 컴퓨터와 사전에 세션을 수립하는 과정)가 반복적으로 일어나고
  - RTT가 증가하면 네트워크 지연 초래
  
- 무거운 header 구조
  - HTTP1.1은 헤더에 많은 메타 정보가 들어가는데 매 요청 시마다 중복된 헤더 값을 전송

## HTTP/1.1 단점 해결을 위한 Latency 관점의 HTTP 고속화 `SPDY`

- 구글의 더 빠른 Web 실혈을 위한 새로운 프로토콜 (근본적 해결 x)
- *지원 종료*
<img src="https://github.com/in3166/TIL/blob/main/etc/img/http12.png" width="60%"/>

```
모두 웹 서버와 사용자의 웹 브라우저 간 통신을 암호화 하는데 사용되는 프로토콜
공개 키와 개인 키를 교환하여 보안 세션을 생성하여 통신을 암호화하는 방식
SSL: 보안 소켓 계층, 안전한 데이터 전송을 위한 인터넷 통신 규약 프로토콜 (SSL 2.0 및 3.0 모두 IETF에 의해 사용 중지)
TLS: 전송 계층 보안-모든 종류의 인터넷 트래픽을 암호화, SSL 프로토콜의 차세대 버전 (https는 SSL/TLS 적용한 것)
```

- TCP와 TLS
<img src="https://github.com/in3166/TIL/blob/main/etc/img/http13.png" width="30%"/>

<br><br>

# HTTP/2

- SPDY(스피디) 구글 비표준 개방형 네트워크 프로토콜 기반
- 속도 향상

## Multiplexed Streams

<img src="https://github.com/in3166/TIL/blob/main/etc/img/http2.png" />

- **한 Connection**으로 동시에 **여러 개의 메세지**를 주고 받을 수 있다.
- 응답은 순서에 상관없이 `stream`으로 주고 받는다. (HTTP/1.1의 Connection Keep-Alive, Pipelining의 개선)
  - `Streams`
    - 서로 다른 HTTP 연결들을 하나의 TCP 스트림으로 다중화하여 추상화하는 개념

## Stream Prioritization

- 리소스 간의 **의존관계(우선순위)** 를 설정
- 만약 CSS파일 1개와 img 파일 2개 요청했을 때, CSS 파일이 늦어지면 렌더링이 늦어짐. 이를 해결

## Server Push

- 서버는 클라이언트의 요청에 대해 요청하지 않은 리소스를 마음대로 보낼 수 있다.
- 만약 HTML 문서 요청했는데 HTML에 여러개의 리소스(CSS, Image 등)이 포함되어 있으면
- HTTP/1.1은 HTML을 수신한 후 해석하면서 리소스 재요청

- HTTP/2는 Server Push 기법으로 **클라이언트의 요청없이 리소스를 Push** 해줄 수 있음
- 클라이언트의 요청 최소화, 성능 향상
- `PUSH_PROMISE`

## Header Compression

- **Header 정보 압축**을 위해 Header Table과 Huffman Encoding 기법 사용하여 처리 - HPACK 압축방식
- 클라이언트가 두 번의 요청을 보낸다면, HTTP/1.X에선 Header 중복값이 존재해도 중복 전송

- HTTP/2 에선 중복값 존재 시 Static/Dynamic Header Table 개념 사용하여 중복 HEADER를 검출하고 중복된 Header는 index 값만 전송
- 중복되지 않은 Header 정보 값은 Huffman Encoding 기법을 인코딩 처리하여 전송

<br>

### HTTP/2의 문제점

- `HOLB(Gead of line Blocking)`
  - TCP 패킷이 네트워크 경로에서 손실되면 스트림에 공백이 생긴다.
  - 손실 된 바이트 다음에 오는 올바른 바이트들도 재전송으로 인해 전달되지 않아 불필요한 지연이 발생한다.

<br><br>

### TCP의 3 Way Handshake

- 통신을 시작할 때와 종료할 때 서로 준비가 되었는지 반드시 먼저 물어보고 패킷을 전송할 순서를 정하고 나서 통신 시작
- [자세한 내용](https://evan-moon.github.io/2019/10/08/what-is-http3/)
- HTTP/1은 하나의 TCP 연결에 하나의 요청만 처리하고 연결을 끊어버렸기 때문에 매 요청마다 이 번거로운 핸드쉐이크를 거쳐야 했다.
- 그래서 HTTP/2에서는 핸드쉐이크를 최소화하기 위해서 단일 TCP 연결을 유지하면서 여러 개의 요청을 처리할 수 있도록 변경된 것

- => HTTP/3는 이 핸드쉐이크 과정 자체를 없애고 다른 방법으로 연결의 신뢰성을 확보해 Latency를 줄였다.
<br>

# HTTP/3

- `QUIC`이라는 프로토콜 위에서 돌아가는 `HTTP`

- 기반 프로토콜로 `UDP` 기반의 `QUIC` 사용
  - 새로운 연결에 대한 핸드쉐이크로 인한 지연 해결
  - 패킷 손실이 다른 스트림에 미치는 영향 해결
  - 패킷 손실로 인한 지연 문제 해결

### UDP

- TPC보다 신뢰성이 없는 대신 빠른 프로토콜

- UDP는 데이터 전송을 제외한 어떤 기능도 정의되어 있지 않는 프로토콜 => **커스터마이징 용이**
  - TCP는 많은 기능을 위해 헤더에 정보가 많이 들어차 있지만 UDP는 데이터 전송에 초점을 맞춰 헤더에 정보가 별로 없다. (출발지와 도착지, 패킷의 길이, 체크섬)

## QUIC

- UDP 기반의 프로토콜
- `TCP(연결형/가상 회선 방식)`의 신뢰성(패킷 순서 보장, 패킷 유실 검사 등)과 `UDP(비연결형/데이터그램 방식)` 빠른 성능을 토대로 고안

## QUIC의 장점

### 연결 설정 시 레이턴시 감소

- TCP와 달리 3 Way Handshake 과정 불필요
- TCP 연결 생성은 기본적으로 `1 RTT`가 필요하고 TLS를 사용한 암호화까지 하려면 `3 RTT`가 필요

<img src="https://github.com/in3166/TIL/blob/main/etc/img/http3.jpg" width="50%" />
  
- 반면 QUIC는 연결 설정에 `1 RTT`만 필요
  - 클라이언트가 서버에 신호를 한번 주고, 서버도 응답을 한 번하면 본 통신 시작 가능
  
  - 첫 번째 핸드쉐이크를 거칠 때, 연결 설정에 필요한 정보와 함께 데이터도 같이 보낸다.
    - TCP+TLS는 데이터 전송 전 신뢰성 연결과 암호화에 필요한 정보를 교환하고 유효성을 검사 한 뒤 데이터 교환
    - TCP+TLS는 서로 자신의 세션 키를 주고 받아 암호화된 연결을 성립하고 세션키와 데이터를 주고 받는 반면,

    - QUIC은 서로의 세션 키를 주고 받기도 전에 데이터를 교환할 수 있다.
    - 첫 요청을 보낼 때는 서버의 세션 키를 모르는 상태이기 때문에 목적지인 서버의 `Connection ID`를 사용하여 생성한 특별한 키인 `초기화 키(Initial Key)`를 사용하여 통신을 암호화
  
  - 한 번 연결이 성곡하면 서버는 설정을 캐싱해 놓고 다음 연결에는 `0 RTT` 만으로 통신 가능
  - 지금은 `TCP Fast Open`과 `TLS 1.3`을 사용해 동일한 이점을 가질 수 있지만, QUIC는 데이터 전체를 첫 번째 라운드 트립에 포함해 전송할 수 있어 데이터가 큰 경우 여전히 유리
<br>

### 패킷 손실 감지에 걸리는 시간 감소

- TCP와 UDP 모두 `ARQ` 방식의 프로토콜 (에러 발생 시 재전송으로 복구)

- TCP는 `Stop ans Wait ARQ` 방식 사용: 송신 측이 패킷 보낸 후 시간을 재고 일정 시간 경과 후에도 수신하지 못하면 손실 간주
  - `ROT(Retransmission Time Out)`: 타임 아웃을 동적으로 계산하는 방식 (필요 데이터: `RTT`)
  - 패킷을 보낸 후 잘 받았다는 응답을 받을 때까지 걸렸던 시간을 측정해 타임아웃을 정하는 것 (`ACK` 필요)
  
  - 패킷 손실이 발생하면 RTT 계산이 애매해진다. `재전송 모호성(Retransmission Ambiguity)`
    - 패킷 전송 -> 타임 아웃 -> 패킷 재전송 -> ACK (이게 첫번째 전송에 대한 것인지 두번째 전송에 대한 것인지 애매)
    - 어떤 패킷에 대한 응답인지 타임스탬프를 패킷에 찍어주는 등의 별도의 방법을 사용하고 패킷 검사를 또 따로 해줘야한다.
  
  - 위 문제 해결을 위해 `QUIC`는 **헤더에 별도의 패킷 번호 공간 부여**
    - 패킷의 전송 순서만을 나타냄
    - 재전송시에도 동일한 번호가 전송되는 시퀀스 번호와 달리 매 전송마다 패킷 번호 증가 (Monomotic)

- 이 외에도 다른 기법들을 통해 패킷 손실 감지 시간 단축
  - [3.1](https://datatracker.ietf.org/doc/rfc9002/)
<br>

### 멀티플렉싱 지원

- 하나의 TCP 연결 안에서 여러 개의 스트림을 처리
- HTTP/2와 동일하게 지원

### 클라이언트의 IP가 변경되어도 연결 유지

- TCP의 경우 소스의 IP 주소와 포트, 연결 대상의 IP 주소와 포트로 연결 식별
- UDP의 경우 서버의 Connection ID를 사용하여 서버와 연결을 생성
- `Connection ID`는 랜덤한 값일 뿐, 클라이언트의 IP와는 전혀 무관한 데이터이기 때문에 클라이언트의 IP가 변경되더라도 기존의 연결을 계속 유지

- IP가 바뀌어도 세션이 유지된다.
  - IP가 바뀐 클라이언트가 기존 Connection ID를 가지고 있어 서버에서 원래 클라이언트가 보낸 메시지로 간주한다.
  - 중간에 아무 통신 없이 서버가 클라이언트의 IP를 알 수 있는 것은 아니다.
  -

<br>
  
<img src="05_ETC/img/http32.gif" width="60%" />

- 주요 특징
  - 전달 속도의 개선, 클라이언트와 서버의 연결 최소화
  - 대역폭을 예상하여 패킷 혼잡 회피
  - 암호화가 프로토콜 일부 기능으로 포함
  - 스트림 연결과 암호화 스펙 등을 포함한 모든 핸드쉐이크가 단일 요청/응답으로 끝남
  - 패킷이 개별적으로 암호화되며, 다른 데이터 부분의 패킷을 기다릴 필요 없음
  - 통신이 멀티플렉싱되며, 이를 통해 HOLB 극복
  - 운영체제 커널과 독립적으로 응용 프로그램 공간 내에서 구현할 수 있어 데이터의 이동에 따른 컨텍스트 전환에 의한 오버헤드 없음
  - Source Address와 무관하게 서버에 대한 연결을 고유하게 식별하는 연결 식별자가 포함되어 있어, IP 주소가 변경되더라도 커넥션 유지 가능

<br><br><br>
<출처>

- <https://www.popit.kr/%EB%82%98%EB%A7%8C-%EB%AA%A8%EB%A5%B4%EA%B3%A0-%EC%9E%88%EB%8D%98-http2/>
- <https://ykarma1996.tistory.com/86>
- <https://www.itworld.co.kr/news/113007>
- <https://evan-moon.github.io/2019/10/08/what-is-http3/>
