# Proxy
- 특정 객체를 감싸 프로퍼티 읽기, 쓰기와 같은 객체에 가해지는 작업을 중간에서 가로채는 객체
- 가로채진 작업은 `Proxy` 자체에서 처리하기도 하고 원래 객체가 처리하도록 그대로 전달되기도 한다.

## 쓰임
- 클라이언트와 서버 사이에 프록시 서버 위치
- 유저의 IP를 프록시 서버에서 바꿔 실제 IP를 모를 수 있게 할 수 있다.
- 방화벽 기능, 웹 필터 기능, 캐쉬 데이터/공유 데이터 제공 기능

## 사용 이유
- 원거리 인터넷 사용 제어
- 캐쉬 이용 더 빠른 인터넷 이용 제공
- 더 나은 보안 제공
- 이용 제한 사이트 접근 가능
<br>


## 문법
- `target`: 감싸게 될 객체로 함수를 포함한 모든 객체 가능
- `handler`: 동작을 가로채는 메서드인 '트랩(trap)'이 담긴 객체, 여기서 proxy 설정
```javscript
let proxy = new Proxy(target, handler)
```
- `proxy`에 작업이 가해지고 `handler`에 상응하는 트랩이 있으면 트랩이 실행되어 스팍시가 작업을 처리할 기회를 얻고, 트랩이 없으면 `target`에서 직접 수행

- 트랩이 없는 예
```javascript
let target = {};
let proxy = new Proxy(target, {}); // 빈 핸들러

proxy.test = 5; // 프락시에 값을 씁니다. -- (1)
alert(target.test); // 5, target에 새로운 프로퍼티가 생겼네요!

alert(proxy.test); // 5, 프락시를 사용해 값을 읽을 수도 있습니다. -- (2) target에서 값을 읽어옴

for(let key in proxy) alert(key); // test, 반복도 잘 동작합니다. -- (3)
```
- 트랩이 없으므로 `proxy`에 가해지는 모든 작업은 `target`에 전달

### 트랩으로 가로챌 수 있는 작업
- 객체에 어떤 작업을 할 땐, 자바스크립트 명세서에 정의된 '내부 메서드'가 관여
- 프로퍼티 읽을 땐 `[[GET]]` 메서드가 쓸 땐 `[[SET]]` 메서드가 관여
- 프락시의 트랩은 이런 내부 메서드의 호출을 가로챈다. (모든 메서드에 대응하는 트랩 존재)

내부 메서드 | 핸들러 메서드 | 작동 시점
------------|--------------|---------
[[Get]]     |     	get    |	프로퍼티를 읽을 때
[[Set]]	 |  set	              |프로퍼티에 쓸 때
[[HasProperty]]	| has |	in 연산자가 동작할 때
[[Delete]]  |	deleteProperty  |	delete 연산자가 동작할 때
[[Call]]  |	apply |	함수를 호출할 때
[[Construct]] |	construct |	new 연산자가 동작할 때
[[GetPrototypeOf]]  |	getPrototypeOf  |	Object.getPrototypeOf
[[SetPrototypeOf]]  |	setPrototypeOf  |	Object.setPrototypeOf
[[IsExtensible]]  |	isExtensible  |	Object.isExtensible
[[PreventExtensions]] |	preventExtensions |	Object.preventExtensions
[[DefineOwnProperty]] |	defineProperty  |	Object.defineProperty, Object.defineProperties
[[GetOwnProperty]]  |	getOwnPropertyDescriptor  |	Object.getOwnPropertyDescriptor, for..in, Object.keys/values/entries
[[OwnPropertyKeys]] |	ownKeys |	Object.getOwnPropertyNames, Object.getOwnPropertySymbols, for..in, Object/keys/values/entries

- 규칙
  - 값을 쓰는 게 성공적 처리되면 `[[SET]]`은 반드시 `true` 반환, not - `false`
  - 값을 지우는 게 성공적 처리되면 `[[DELETEE]]`은 `true` 반환 등등

<br>

### 'get' 트랩으로 프로퍼티 기본값 설정하기
- `handler`에 `get(target, property, receiver)` 메서드가 존재해야 프로퍼티 읽기 가로채기 가능
- `target`: 동작을 전달할 객체
- `property`: 프로퍼티 이름
- `receiver`: 타킷 프로퍼티가 getter라면 `receiver`는 getter가 호출될 때 `this`

- 예시: 존재하지 않는 요소를 읽을 때 기본값 0을 반환해주는 배열 (원래 undefined)
```javscript
let numbers = [0, 1, 2];
numbers = new Proxy(numbers, {
    get(target, prop){
      if( prop in target ) {
        return target[prop];
      } else {
        return 0;
      }
    }
  }
});
alert( number[1] ); // 1
alert( number[12] ); // 0
```

### ‘set’ 트랩으로 프로퍼티 값 검증하기
`set( target, property, value, receiver )`
- `target`: 동작을 전달할 객체로 new Proxy의 첫 번째 인자입니다.
- `property`: 프로퍼티 이름
- `value`: 프로퍼티 값
- `receiver`: get 트랩과 유사하게 동작하는 객체로, setter 프로퍼티에만 관여합니다.

- 예시: 숫자만 저장할 수 있는 배열: 숫자형 값 설정 시 `true`, 아닐 시 `TypeError` 트리거 후 `false`
```javascript
let numbers = [];

numbers = new Proxy(numbers, { // (*)
  set(target, prop, val) { // 프로퍼티에 값을 쓰는 동작을 가로챕니다.
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // 추가가 성공했습니다.
numbers.push(2); // 추가가 성공했습니다.
alert("Length is: " + numbers.length); // 2

numbers.push("test"); // Error: 'set' on proxy
alert("윗줄에서 에러가 발생했기 때문에 이 줄은 절대 실행되지 않습니다.");
```
- 배열 관련 기능은 여전히 사용 가능

### 'ownKeys’와 'getOwnPropertyDescriptor’로 반복 작업하기
https://ko.javascript.info/proxy

### 'deleteProperty’와 여러 트랩을 사용해 프로퍼티 보호하기


### ‘has’ 트랩으로 '범위` 내 여부 확인하기


### 'apply' 트랩으로 함수 감싸기

<br><br><br>
<출처>
- https://ko.javascript.info/proxy
- https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/lecture/37074?tab=curriculum
