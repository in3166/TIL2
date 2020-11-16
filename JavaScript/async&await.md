## async & await
- 자바스크립트 최신 비동기 처리 패턴

-  HTTP 통신으로 사용자 정보를 가져오는 함수
```
// 아래와 같이 콜백을 걸어야 실행 순서 보장
function logName() {
  var user = fetchUser('domain.com/users/1', function(user) {
    if (user.id === 1) {
      console.log(user.name);
    }
  });
}
```

### 기본 문법
- await의 대상이 프로미스 객체 반환해야 함
- await는 async 함수 안에서만 동작 (밖에서 호출할 땐 then() 사용)
- 자바스크립트가 await를 만나면 promise가 처리(setteld)될 때까지 기다린 후 반환
```
async function 함수명() {
  await 비동기_처리_메서드_명();
}
```

### 예제
- Promise는 비동기 처리를 위한 객체
- await 비사용 시 데이터 받아온 시점에 콘솔 출력 콜백함수나 .then() 등 사용
- 

```
function fetchItems() {
  return new Promise(function(resolve, reject) {
    var items = [1,2,3];
    resolve(items)
  });
}

async function logItems() {
  var resultItems = await fetchItems();
  console.log(resultItems); // [1,2,3]
}
```

