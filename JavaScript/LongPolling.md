`알림 기능 구현을 위해`

# Http
- 양방향 통신 불가 (단방향 통신)
```
Client  -  [Req]  -> Server
Client  <-  [Res]  - Server
```
- 원하는 타이밍에 서버에서 클라이언트에게 데이터 요청 불가. (요청이 와야 전송가능)

<br><Br>

***어떻게 통신하는 것처럼 보일 수 있을까?***
## Polling
- 계속 관찰하기
- 일정 시간 간격으로 Request 반복
### 특징
  - 응답 간격 일정 (주기적인 요청으로)
  - 자동으로 배치프로세싱(일괄처리)되어 DB 튜닝 효과
  - 실시간으로 주는건 불가능하므로 실시간의 효과를 위해 간격을 줄이면 부담 증가
    - http는 단발성 통신으로 Header가 무거운 프로토콜
  - 보낼데이터가 없어도 계속 데이터 전송해야 하므로 서버 리소스 낭비

<br><br>

# Http Long Polling
- Polling과 유사하게 무한 요청 반복
- 요청을 보내고 `Time out`될 때까지 무한정 기다린다.
- 서버가 응답을 하면 클라이언트는 바로 다시 서버에 요청 전송
### 특징
  - 항상 연결 유지
  - 변경에 민감, 사실상 실시간 통신 가능
  - 요청 간격이 줄어들면 Polling보다 훨씬 데이터 많이 전송된다.
  - 모든 브라우저에서 사용 가능 (socket과 달리)


### 채팅 예제
- https://kamang-it.tistory.com/entry/NodeJSExpressWebJavaScriptLong-Polling%EC%9C%BC%EB%A1%9C-%EC%9B%B9-%EC%B1%84%ED%8C%85%EA%B5%AC%ED%98%84http-%EC%96%91%EB%B0%A9%ED%96%A5

<br><br>

<출처>
- https://kamang-it.tistory.com/entry/Webhttp%ED%86%B5%EC%8B%A0%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%96%91%EB%B0%A9%ED%96%A5-%ED%86%B5%EC%8B%A0%EA%B8%B0%EB%B2%95-long-polling
