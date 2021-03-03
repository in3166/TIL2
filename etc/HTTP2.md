# HTTP/1.1 동작 방식
- HTTP: 웹 상에서 Client와 Server 간 통신을 위한 Protocol
- 기본 동작: Connetion 하나의 요청을 처리(요청-응답)

## HTTP/1.1 단점
- 동시 전송 불가: 다수의 리소스 처리 시 대기 시간(Legacy) 길어짐
- 특정 응답의 지연: HOL (Head Of Line) Blocking
- RTT (Round Trip Time) 증가
- 무거운 header 구조

<br><br>

# HTTP/2
- SPDY(스피디) 구글 비표준 개방형 네트워크 프로토콜 기반
- 속도 향상

## Multiplexed Streams
<img src="https://github.com/in3166/TIL/blob/main/etc/img/http2.png" />

- 한 Connection으로 동시에 여러 개의 메세지를 주고 받을 수 있다.
- 순서에 상관없이 stream으로 주고 받는다. (HTTP/1.1의 Connection Keep-Alive, Pipelining의 개선)

## Stream Prioritization
- 리소스 간의 의존관계(우선순위)를 설정
- 만약 css파일 1개와 img 파일 2개 요청했을 때, CSS 파일이 늦어지면 렌더링이 늦어짐. 이를 해결

## Server Push
- 서버는 클라이언트의 요청에 대해 요청하지 않은 리소스를 마음대로 보낼 수 있다.
- 만약 HTML 문서 요청했는데 HTML에 여러개의 리소스(CSS, Image 등)이 포함되어 있으면
- HTTP/1.1은 HTML을 수신한 후 해석하면서 리소스 재요청
- HTTP/2는 Server Push 기법으로 클라이언트의 요청없이 리소스를 Push 해줄 수 있음
- 클라이언트의 요청 최소화, 성능 향상
- `PUSH_PROMISE`

## Header Compression
- Header 정보 압축을 위해 Header Table과 Huffman Encoding 기법 사용하여 처리 - HPACK 압축방식
- 클라이언트가 두 번의 요청을 보낸다면, HTTP/1.X에선 Header 중복값이 존재해도 중복 전송
- HTTP/2 에선 중복값 존재 시 Static/Dynamic Header Table 개념 사용하여 중복 HEADER를 검출하고 중복된 Header는 index 값만 전송
- 중복되지 않은 Header 정보 값은 Huffman Encoding 기법을 인코딩 처리하여 전송



<br><Br><br>
<출처>
- https://www.popit.kr/%EB%82%98%EB%A7%8C-%EB%AA%A8%EB%A5%B4%EA%B3%A0-%EC%9E%88%EB%8D%98-http2/
