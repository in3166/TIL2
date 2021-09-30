# Web Storage
- HTML5는 웹의 데이터를 클라이언트에 저장할 수 있는 새로운 자료구조인 `Web Storage` 스펙이 포함되어 있다.
- Key/Value 쌍으로 데이터를 저장하고 Key를 기반으로 데이터를 조회하는 패턴
- 영구저장소(Local Storage)와 임시저장소(Session Storage)를 따로 두어 데이터의 지속성을 구분할 수 있어 응용 환경에 맞는 선택이 가능
- 도메인 별로 별도의 영역을 가져 침범을 막지만 사용자의 접근은 허용한다.
  - 도메인·프로토콜·포트로 정의되는 `오리진(origin)`에 묶여있기 때문에 프로토콜과 서브 도메인이 다르면 접근 불가

# Cookie
- 클라이언트 로컬(하드)에 저장되는 데이터 파일
  - 웹 사이트에 접속할 때 생성되는 정보를 담은 파일로 서버가 사용자의 웹 브라우저에 저장하는 데이터
  
- 브라우저 요청 시  Request Header에 넣어서 자동으로 서버 전송
- 사용자 하드에 저장되어 보안위험
- 같은 도메인 상 쿠키 값 공유
- 4KB 용량 제항
- Key/Value 쌍의 이름/값, 만료 날짜, 경로 정보 필요
- API가 한번 더 호출되므로 서버에 부담이 증가

### 쿠키 목적
- 세션 관리: 로그인, 사용자 닉네임, 접속 시간, 장바구니 등의 서버가 알아야할 정보 저장
  - ID 저장, 로그인 상태 유지
  - 일주일 간 보지 않기

- 개인화: 사용자마다 다르게 적절한 페이지 보여줌
- 트래킹: 사용자의 행동과 패턴 분석

### 단점
- 개인정보 기록되어 사생활 침해 소지, 쿠키 차단 시 브라우저와의 연결 지속 기능 수행 불가
- 사용자가 임의로 수정하거나 다른 사람에 의해 탈취되기 쉬워 보안 취약

<br>

## Web Storage와 Cookie
- Web Storage는 기존 웹 환경의 쿠키(Cookie)와 매우 유사한 개념
- 차이점
  - Cookie는 매번 서버로 전송된다.
    - Web Storage는 클라이언트에 존재할 분 서버로 전송되지 않는다.
    
  - Web Storage는 단순 문자열을 넘어 객체 정보 저장 가능
  - Web Storage는 용량 제한 없음
  
  - Web Storage는 영구 데이터 저장 가능
    - Cookie는 만료일자를 지장하게 되어 있어 언젠가 제거된다.
    - 만약 만료일자를 지장하지 않으면 세션 쿠키가 된다.
    
  - 쿠키와 또 다른 점은 서버가 HTTP 헤더를 통해 스토리지 객체를 조작할 수 없다는 것입니다. 웹 스토리지 객체 조작은 모두 자바스크립트 내에서 수행
<br><br>

## Local Storage와 Session Storage
- 데이터의 지속성과 관련하여 두 가지 용도의 저장소를 제공
- Web Storage는 쿠키와 같이 사이트 도에민 단위로 접근이 제한
  - A 도메인에서 저장한 데이터는 B 도메인에서 접근 불가

### 동일한 메서드와 프로퍼티 제공
- `setItem(key, value)` – 키-값 쌍을 보관합니다.
- `getItem(key)` – 키에 해당하는 값을 받아옵니다.
- `removeItem(key)` – 키와 해당 값을 삭제합니다.
- `clear()` – 모든 것을 삭제합니다.
- `key(index)` – 인덱스(index)에 해당하는 키를 받아옵니다.
- `length` – 저장된 항목의 개수를 얻습니다.

### Local Storage
- 저장한 데이터를 명시적으로 지우지 않는 이상 **영구적 보관** 가능
- 도메인 별로 별도로 로컬 스로리지가 생성된다.
  - 도메인만 같으면 전역적으로 공유 가능
- `windows` 전역 객체의 `LocalStorage` 컬렉션을 통해 저장과 조회
```js
localStorage.setItem('test', 1);
alert( localStorage.getItem('test') ); // 1
}
```
<br>

- 순회하기
```js
// 키 순회
for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
```
  - 위 방법은 내장 필드까지 출력한다. (getItem, setItem 등)

- 내장필드 제외하고 순회하기
```js
// hasOwnProperty를 이용해 프로토타입에서 상속받은 필드를 골라내기
for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue; // setItem, getItem 등의 키를 건너뜁니다.
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}

// Object.keys로 '자기 자신’의 키를 받아온 다음 순회
let keys = Object.keys(localStorage);
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```
<br>

- 키와 값은 반드시 문자열
  - 숫자나 객체 등 다른 자료형을 넣으면 문자열로 자동 변환
  - `JSON`을 사용해 객체 사용 가능
  ```JS
  sessionStorage.user = JSON.stringify({name: "John"});

  // 잠시 후
  let user = JSON.parse( sessionStorage.user );
  alert( user.name ); // John
  ```
<br><br>

### Session Stroage
- 데이터의 **지속성**과 **액세스 범위**에 특수한 제한이 존재 (임시 저장)
  - 세션 종료(브라우저 닫기 등) 시 정보 삭제
  
- 도메인 별로 별도로 세션 스로리지가 생성된다.
- 하지만, 같은 사이트의 같은 도메인이더라도 브라우저가 다르면 서로 다른 영역이 된다.
  - 탭 브라우징이나 새로운 브라우저를 실행해 같은 페이지를 실행해도 이 두 페이지의 Session Storage는 별개의 영역
  - 탭을 닫으면 데이터 제거, 새로고침 시에는 유지된다.
  
- `windows` 전역 객체의 `sessionStorage`라는 컬렉션을 통해 저장과 조회

```js
sessionStorage.setItem('test', 1);
alert( sessionStorage.getItem('test') ); // 새로 고침 후: 1
```



<br><br><br>
<출처>
- https://velog.io/@ejchaid/localstorage-sessionstorage-cookie%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90
- https://fathory.tistory.com/33
- https://ko.javascript.info/localstorage
