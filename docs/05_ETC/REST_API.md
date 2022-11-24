# REST API(RESTful API)

- REST 아키텍처의 제약 조건을 준수하는 애플리케이션 프로그래밍 인터페이스

<br>

## API (Application Programming Interface)

- 추상과 구체를 분리하여 중요하지 않은 것들에 종속되지 않으면서 기능 사용 가능

<br>

## REST (Representational State Transfer)

- 웹의 장점을 최대한 활용할 수 있는 네트워크 기반의 아키텍쳐
- `리소스` 중심 URI로 정해준 후에, 거기에 `HTTP 메서드`를 이용해서 CRUD를 구현하고 메시지를 JSON으로 표현하여 HTTP Body에 실어 보낸다.

## REST 요소

- 리소스: 모든 것을 명사로 표현, 세부 리소스에 id 부여
- 메서드
- 메세지
- 예) `Terry라는 이름의 사용자 생성`
  - '사용자': 생성된는 리소스
  - '생성한다': 행위는 메서드
  - '이름이 Terry인 사용자': 메시지
  
```md
HTTP POST , http://myweb/users/
{  
   "users":{  
      "name":"terry"
   }
}
```

### HTTP 메서드

- REST에선 CRUD 4가지 메서드만 사용

- *Idempotent(멱등성): 동일한 요청 -> 동일한 결과*

메서드 | 의미 | Idempotent
-------|------|-----------
POST | Create  | No
GET   | Select  | Yes
PUT   | Update  | Yes
DELETE | Delete | Yes
<br>

### REST API 장점

- 학습과 사용이 쉽다.
- 자유도가 높아 원하는 대로 사용 가능하다.

<br><br>

## RESTful 간주 기준

- `클라이언트, 서버 및 리소스`로 구성되었으며 요청이 `HTTP`를 통해 관리되는 `클라이언트-서버 아키텍처`
  - REST 서버는 API를 제공하고, 제공된 API를 이용해서 비즈니스 로직 처리 및 저장을 책임

- `Stateless 클라이언트-서버 커뮤니케이션`: 요청 간 클라이언트 정보가 저장되지 않으며, 각 요청이 분리되어 있고 서로 연결되지 않음.
- 클라이언트-서버 상호 작용을 간소화하는 `캐시 가능 데이터(Cacheable)`
  - `REST`는 `HTTP`라는 기존의 웹 표준을 그대로 사용하기 때문에, 웹에서 사용하는 기존의 인프라를 그대로 활용이 가능
  - `HTTP`의 가장 큰 특징 중 하나인 캐싱 기능 적용 가능

- 정보가 표준 형식으로 전송되도록 하기 위한 구성 요소 간 `통합 인터페이스`
  - **요청된 리소스가 식별 가능**하며 클라이언트에 전송된 표현과 분리되어야 한다.
  - **수신한 표현**을 통해 **클라이언트가 리소스를 조작**할 수 있어야 한다.
  - 클라이언트에 반환되는 `자기 기술적(self-descriptive) 메시지`에 **클라이언트가 정보를 어떻게 처리해야 할지 설명**하는 정보가 충분히 포함되어야 한다.
  - 하이퍼미디어: 클라이언트가 리소스에 액세스한 후 하이퍼링크를 사용해 현재 수행 가능한 기타 모든 작업을 찾을 수 있어야 합니다.

- 요청된 정보를 검색하는 데 관련된 서버(보안, 로드 밸런싱 등을 담당)의 각 유형을 **클라이언트가 볼 수 없는 계층 구조**로 체계화하는 `계층화된 시스템`
- `코드 온디맨드(선택 사항)`: 요청을 받으면 서버에서 클라이언트로 실행 가능한 코드를 전송하여 클라이언트 기능을 확장할 수 있는 기능.
<br>

### REST API 단점

- 자주 바뀌는 API: 서버에서 필드, 타입이 바뀌는 경우 오류가 발생
- 너무 높은 자유도
- 버저닝(Versioning)
- 명세 찾기 어려움
- 죽은 문서들
- 개발 종속성

## 대안: IDL (Interface Description Language)

- 인터페이스 정의 언어
- 소프트웨어 컴포넌트의 인터페이스를 묘사하기 위한 명세 언어
- 언어중립적인 방법으로 인터페이스를 표현해 언어가 달라고 컴포넌트 사이의 통신을 가능케 한다.

### Open API (Swagger API)

- REST API를 어떤 IDL로 표현
- API 우선 접근 가능
  - `API 규격 먼저 정의 후 서버와 클라이언트 작업을 하자!`
  - 많은 경우에 서버 개발이 완료되어야 프론트 등이 작업 가능하고
  - 변경 사항이 있을 때 많은 것들이 동시에 바뀜
<br>

- 기존 문서 명세와 다른점?
  - Open API는 기계가 이해할 수 있는 언어 (Machine Readable Interface)
  - 클라이언트 빌드, 서버 스텁 빌드 등이 가능
  - IDL 변경 없이 서버 API 변경 불가
<br>

- 예시: JS Client

```js
new SwaggerClinet('http://petstore.swagger.io/b2/swagger.json')
  .then(
    client => clinet.apis.pet.addPet( { id: 1, body: { name: "boddy" } }),
    reason => console.error('failed to laod the spec: ' + reason)
  )
  .then(
    addPetResult => console.log (addPetResult.body),
    reason => console.error('failed on api call: ' + reason)
  );
```

<br><br><br>

<출처>

- <https://www.redhat.com/ko/topics/api/what-is-a-rest-api>
- <https://bcho.tistory.com/953>
- <https://www.youtube.com/watch?v=6C9zyLioTOU>
