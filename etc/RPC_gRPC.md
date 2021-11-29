# RPC (Remote Procedure Call)
- 원격 컴퓨터나 프로세스에 존재하는 함수 호출 프로토콜

- 기존 로컬 함수(procedure) 뿐만 아니라 다른 주소 공간에 존재하는 함수를 호출할 수 있는 프로토콜
  - 다른 주소 공간: 머신 내 다른 프로세스나 네트워크로 연결된 다른 머신의 프로세스
  - 클라이언트-서버 구조의 애플리케이션을 만들 수 있게 된다.
  - **서버 쪽에서 함수를 만들어 두면 클라이언트에서 함수를 호출하듯이 요청할 수 있다.**
  
- Request Parameter와 Response Parameter를 알아야 사용할 수 있다. 그래서 미리 서버와 클라이언트의 인터페이스를 맞춰야 한다.
  - IDL(Interface Definition Language)로 함수명, 인자, 반환 값에 대해 정희한 후 rpcgen 컴파일러를 이용하여 stub 코드를 자동 생성한다.
  - [자세한 메커니즘](https://www.getoutsidedoor.com/2019/07/11/what-is-grpc/)

# gRPC
- HTTP/2 특징을 기반으로 하는 RPC 프로토콜
  - 특징들 
    - Header Compression
    - TLS 위에서 동작: HTTPS 웹에서만 작동 가능
    - Binary protocol: 프레임을 텍스트가 아닌 바이너리로 구성하여 파싱이 빠르고 오류 발생이 적다.
    - Multiplexing: SPDY는 하나의 커넥션 안에서 여러 개의 독립적인 스트립을 동시에 처리
    - Full-duplex interleaving, stream priority: 한 스트림이 진행 중일 때 다른 스트림이 끼어드는 것을 허용
    - Server push: 클라이언트의 요청이 없어도 서버에서 컨텐츠를 직접 push 가능

- 양방향 스트리밍 가능, HTTP 보다 통신 속도 빠름, 네트워크 통신에 대한 추상화 제공하여 사용자가 네트워크 프로그래밍에 신경 쓰지 않아도 됨.

# JSON-RPC
- JSON과 RPC 표준을 함께 사용하여, 서버 쪽에 구축해야 할 기능을 함수별로 명확이 구분하여 만들 수 있다.
- 서버 유지 관리 용이
- 웹 문서를 요청하는 것이 아니라 데이터만 서버에 요청할 경우 훨씬 쉽고 간편하다.

- 특징
  - TCP 위에서 동작
    - REST는 HTTP(S) 위에서만 동작하는 반면 JSON-RPC는 TCP위에서 동작하여 더 다양한 프로토콜에서 사용 가능
    - web3에서도 웹소켓을 통해 통신을 하는데 사용할 수 있다.
    - 하나의 엔드 포인트 URL에서 모든 요청과 읍닫을 받는다.
    - Method로 통신
    
  - 다양한 Action을 나타낼 수 있다.
    - REST는 CRUD Operation에 적합한 반면 JSON-RPC는 다양한 동작 표현 가능
    - ex) `car.rent.calculate_fee`: 차를 렌트하는데 요금을 계산하는 메소드

  - 통일된 parameter 전달방식
 

<br><br><br>
<출처>
- https://www.getoutsidedoor.com/2019/07/11/what-is-grpc/
- https://acstory.tistory.com/54
