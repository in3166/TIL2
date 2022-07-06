## HTTP
 - 클라이언트와 서버 간 data의 request와 response
 - Hypertext: 링크뿐만이 아닌 전반적 리소스 포함 (문서, 이미지)

 - 방법
   - AJAX (Asynchronous JavaScript And XML)
     - XHR (XMLHttpRequest): 브라우저 Object의 하나
     - fetch() API: 더 간단한 데이터 주고 받기 가능 (IE 지원 X)
     
## XML
- HTML과 같은 마크업 언어 중 하나로 태그로 데이터를 나타냄
- 서버와 데이터 주고받을 때의 파일 포맷으로 쓰일 수 있음.
```javascript
  <recipe>
    <title> butter  </title>
    <ingredient> ... </>
  </recipe>
 ```
- 사용 시 파일 크기가 커지고 가동성이 좋지 않아 사용 X
  
# JSON (JavaScript Object Notation)
- Object{ Key : Value }
- 가장 간단한 파일 포멧
- 텍스트 기반 가볍고 읽기 쉬움
- `데이터 교환`을 목적으로 만들어진 언어에 종속되지 않는 포맷
   
# JSON 메서드
## 1. JSON.stringify
- `let json = JSON.stringify(value[, replacer, space])`
- ***object - [serialize] -> string(JSON)***
  - value: 인코딩 하려는 값
  - replacer: 인코딩 하길 원하는 프로퍼티가 담긴 배열 또는 매핑 함수 `function(key, value)`
  - space: 서식 변경 목적으로 사용할 공백 문자 수 


- 문자열로 변경
  - 변경된 문자열은 JSON으로 인코딩된(JSON-encoded), 직렬화 처리된(serialized), 문자열로 변환된(stringified), 결집된(marshalled) 객체
  - JSON은 문자열로 변경되어야 네트워크로 전송하거나 저장소에 저장할 수 있다.

- `replacer`: 콜백 함수나 배열을 인자로 줘서 원하는 프로퍼티만 적용 
  - `JSON.stringfy(obj, ['name']);` // 객체의 name만 전달하고 싶을 때
  - `let json = JSON.stringfy(['a1', 'a2']);` // => ["a1", "a2"]
  ```javascript
     JSON.stringfy(obj, (key, value) => {
        console.log(`key: ${key}, value: ${value}); 
        // 처음엔 key: , value: [object object] 출력  (최상위) 다음 부턴 각 프로퍼티 출력
        
        return key === 'name' ? 'name2' : value; 
        // key가 name이면 value를 name2로 설정하고 아니면 원래 정보 그대로 설정
     }
   ```
<br>

- 원시값에도 적용가능
- 객체, 배열, 원시형: 문자, 숫자, 불린, `null`
```js
// 숫자를 JSON으로 인코딩하면 숫자입니다.
alert( JSON.stringify(1) ) // 1

// 문자열을 JSON으로 인코딩하면 문자열입니다(다만, 큰따옴표가 추가됩니다).
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
```
<br>

- Object 내의 `메서드`나 `Symbol`, `undefined`인 프로퍼티는 포함(적용)되지 않는다.
```js
let user = {
  sayHi() { // 무시
    alert("Hello");
  },
  [Symbol("id")]: 123, // 무시
  something: undefined // 무시
};

alert( JSON.stringify(user) ); // {} (빈 객체가 출력됨)
```
     
<br>

- 중첩 객체도 알아서 문자열로 변환된다.
```js
let meetup = {
  title: "Conference",
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
};

alert( JSON.stringify(meetup) );
/* 객체 전체가 문자열로 변환되었습니다.
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```
 
<br><br>

- 순환 참조가 있으면 불가능
```js
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup은 room을 참조합니다.
room.occupiedBy = meetup; // room은 meetup을 참조합니다.

JSON.stringify(meetup); // Error: Converting circular structure to JSON
```
  - `replacer`로 전환 프로세스를 정교하게 조정하여 순환 참조에도 적용 가능
  ```js
       let room = {
       number: 23
     };

     let meetup = {
       title: "Conference",
       participants: [{name: "John"}, {name: "Alice"}],
       place: room // meetup은 room을 참조합니다.
     };

     room.occupiedBy = meetup; // room references meetup

     alert( JSON.stringify(meetup, ['title', 'participants']) );
     // {"title":"Conference","participants":[{},{}]}
  ```
   
  - `name`을 넣어주지 않아 `participants`가 비워졌다.
    ```js
    alert( JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']) );
    /*
    {
      "title":"Conference",
      "participants":[{"name":"John"},{"name":"Alice"}],
      "place":{"number":23}
    }
    */
    ```
    
    - occupiedBy를 제외한 모든 프로퍼티가 직렬화. 그런데 배열이 좀 길다.
      - 함수를 전달해 해결
      ```js
      alert( JSON.stringify(meetup, function replacer(key, value) {
        alert(`${key}: ${value}`);
        return (key == 'occupiedBy') ? undefined : value;
      }));

      /* replacer 함수에서 처리하는 키:값 쌍 목록
      :             [object Object]
      title:        Conference
      participants: [object Object],[object Object]
      0:            [object Object]
      name:         John
      1:            [object Object]
      name:         Alice
      place:        [object Object]
      number:       23
      */
      ```
<br>

- `space`로 가독성 높이기
```js
alert(JSON.stringify(user, null, 2));
/* 공백 문자 두 개를 사용하여 들여쓰기함:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/
```
<br>

- 커스텀 `toJSON`
  - 객체에 `toJSON`이라는 메서드가 구현되어 있으면 객체를 JSON으로 바꿀 수 있을 겁니다. 
```js
let room = {
  number: 23
  toJSON() {
    return this.number;
  }
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
    "date":"2017-01-01T00:00:00.000Z", // JSON.stringify는 감지하여 toJSON을 자동으로 호출
    "room": 23               
  }
*/
```

<br><br>
     
## 2. JSON.parse
- JSON으로 인코딩된 객체를 다시 객체로 디코딩
- `let value = JSON.parse(str, [reviver]);`
- ***object <- [deserialize] - string(JSON)***
  - `str`: JSON 형식의 문자열
  - `reviver`: 모든 `(key, value)` 쌍을 대상으로 호출되는 `function(key, value)` 형태의 함수로 값을 변경시킬 수 있다.
```js
// 문자열로 변환된 배열
let numbers = "[0, 1, 2, 3]";
numbers = JSON.parse(numbers);
alert( numbers[1] ); // 1
```

- 만약 원래 obj에 함수가 있었다면 다시 변환 시 사라짐 / object 또한 단순한 스트링이 돼서 해당 메소드 사용 불가
   
### 흔한 실수 JSON 포맷
```JS
let json = `{
  name: "John",                     // 실수 1: 프로퍼티 이름을 큰따옴표로 감싸지 않았습니다.
  "surname": 'Smith',               // 실수 2: 프로퍼티 값은 큰따옴표로 감싸야 하는데, 작은따옴표로 감쌌습니다.
  'isAdmin': false                  // 실수 3: 프로퍼티 키는 큰따옴표로 감싸야 하는데, 작은따옴표로 감쌌습니다.
  "birthday": new Date(2000, 2, 3), // 실수 4: "new"를 사용할 수 없습니다. 순수한 값(bare value)만 사용할 수 있습니다.
  "friends": [0,1,2,3]              // 이 프로퍼티는 괜찮습니다.
}`;
```
- 또한 JSON은 주석을 제공하지 않는다.

### reviver 사용
- 예시: 서버로부터 받은 문자열로 변환된 `mmetup` 객체 전송받음
```js
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

- `JSON.parse` 호출 시 에러
  - `meetup.date`의 값은 `Date` 객체가 아니고 문자열이기 떄문에 발생 
  - 문자열을 `Date`객체로 전환해야 한다. -> reviver 사용
```js
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
let meetup = JSON.parse(str);

alert( meetup.date.getDate() ); // 에러!
```

- 수정
```js
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

alert( meetup.date.getDate() ); // 제대로 동작
```

<br><br><br>
<출처>
- `드림코딩 엘리`
- https://ko.javascript.info/json
