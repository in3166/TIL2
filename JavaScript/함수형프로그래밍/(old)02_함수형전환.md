# 회원 목록, map, filter
```js
var users = [
  { id: 1, name: QW, age: 33 },
  { id: 2, name: ER, age: 11 },
  { id: 3, name: RT, age: 56 },
  { id: 4, name: TY, age: 12 },
  { id: 5, name: YU, age: 35 },
  { id: 6, name: UI, age: 23 },
];
```
<br>

# 1. 명령형 코드 (일반적 코드)
## 1) 30세 이상인 users 담기
```js
var temp_users= [];
for (let i = 0; i < users.length; i++) {
  if(users[i].age >= 30) {
    temp_users.push(users[i]);
  } 
}
```

## 2) 30세 이상인 users의 names 수집
```js
var names = [];
for(let i = 0; i< temp_users.lenght; i++){
  names.push(temp_users[i].name);
}
```

## 3) 30세 미만인 users를 담기
```js
var temp_users= [];
for (let i = 0; i < users.length; i++) {
  if(users[i].age < 30) {
    temp_users.push(users[i]);
  } 
```

### 4) 30세 미만인 users의 ages를 수집
```js
var ages = [];
for(let i = 0; i< temp_users.lenght; i++){
  ages.push(temp_users[i].age);
}
```

<br><Br>

# 2. `_filter`, `_map`으로 리팩토링
- 함수형 스타일 (응용형 함수, 컬렉션 다루는 함수)로 변경
  - 응용형 함수: 함수가 함수를 받아 원하는 시점에 해당하는 함수가 알고있는 인수를 적용 (적용형 프로그래밍) (`_filter`)
  - 고차 함수: 함수를 인자로 받거나 리턴, 함수안에서 함수를 실행하는 함수 
- 30세 이상과 미만의 코드의 중복 제거, 조건부만 다름
- 함수형 프로그래밍: 원래 값을 직접 변경하지 않고 새로운 값을 리턴
- 조건부의 중복 제거: 함수형 프로그래밍에서 중복 제거나 추상화할 때 '함수'를 사용 (추상화의 단위가 객체, 클래스, 메서드가 아니라 함수)

## 1) `_filter`
```js
function _filter(list, predi) {
  var news_list= [];
  for (let i = 0; i < list.length; i++) {
    if(predi(list[i])) {
      news_list.push(list[i]);
    } 
   return news_list;
}

var over_30 = _filter(users, function(user){ return user.age >= 30; }
var under_30 = _filter(users, function(user){ return user.age < 30; }
```
- 위 `_filter` 함수는 다른 경우에도 사용 가능 (재사용성, 다형성)

## 2) `_map`
- mapper: 무엇을 수집해서 넣을 것인지 완전히 위임
- 데이터 형태가 어떻게 생겼는지 전혀 보이지 않음. - 관심사 분리 - 재사용성
```js
function _map(list, mapper){
  var new_list = [];
  for(let i = 0; i< list.lenght; i++){
    new_list.push(mapper(list[i]));
  }
  return new_list;
}

var names = _map(over_30, function(user) { return user.name});
var ages = _map(under_30, function(user) { return user.age});
```

- 함수형 프로그래밍에선 대입문 최소화 
  - 값(데이터, 객체)을 만들어 놓고 문장을 내려가면 변형하는 것이 아니라 함수를 통과하며 한 번에 값을 새롭게 만들어나가는 방식
  - 대입문 사이에 새로운 변경(작업)이 생길 여지 방지 (위의 `var under_30`과 `var ages` 사이에 `under_30`을 조작할 가능성)

- 대입문 대신 **함수 중첩**
```js
_mape(
  _filter(users, function(user){ return user.age >= 30; }),
  function(user) { return user.name}
)

_mape(
  _filter(users, function(user){ return user.age < 30; }),
  function(user) { return user.age}
)

```
<br><br>

# 3. each 만들기
## 1) `_each`로 `_filter`, `_map` 중복 제거
- `for` loop 부분, `user[i]` 해당 요소의 'i' 번째 값을 참조하는 부분
- `_each`는 `for`문을 돌면서 안에서 하는 일을 완전히 위임
- 코드 간결화, 명령적이 코드 대신 선언적인 코드 표현 사용

```js
function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
}
```
```js
function _filter(list, predi) {
  var news_list= [];
  
  _each(list, function(val) {
    if(predi(val)) {
       news_list.push(val);
    }
  }
  
  return news_list;
}

function _map(list, mapper){
  var new_list = [];
  
  _each(list, function(val) {
     new_list.push(mapper(val));
  });
  
  return new_list;
}
```

## 2) 외부 다형성
- 순수 함수로 만드는 기법이 메서드보다 다형성, 실용성 면에서 좋다.
- 돌릴 수 있어보이는 모든 데이터(객체)들에 사용할 수 있게 하는 것 -> 고차함수의 구조에 따라 결정 (_map, _filter, _each)

### array_like, arguments, document,querySelectorAll
- `map`과 `filter` 함수는 이미 JavaScript에 존재 
  - 이미 존재하는 이것들은 함수가 아니라 `메서드`: 순수 함수가 아니고 객체의 상태에 따라 결과가 달라진다.
  - 메서드: 객체 지향 프로그래밍, 해당 클래스의 인스턴스에서만 사용 가능 (`Array`에서만 사용 가능) -> 유사 배열 객체에서 사용 불가
    - 유사 배열 객체 예: jquery 객체, `document.querySelectorAll('*')`은 배열 처럼 보이고 length도 가지고 있다. ( [body, div, ...] )
    - 메서드는 해당 클래스에 준비되어 있지 않은 메서드는 사용 불가, 형을 다루기 어렵다. (다형성 지원 힘듦)
    ```js
    // 데이터가 먼저 나오는 프로그래밍
    // 평가의 순서 중요: 해당 하는 데이터, 객체가 있어야 기능을 수행 가능
    document.querySelectorAll('*').map(function(node) { return node.nodeName; }); // error
    ```

- 함수형 프로그래밍은 함수를 먼저 만들고 함수에 맞는 데이터를 구성하여 함수에 적용 -> 다형성, 유연성
  - 위에 `_map`은 들어오는 첫 번째 인자가 `length`가 있고 그 길이가 숫자여서 '0'부터 순회시 해당하는 키마다 값이 존재(key:vale)하면 무엇이든 사용 가능
```js
// 함수가 먼저나오는 프로그래밍
// 함수는 혼자 먼저 존재 가능, 평가 시점 유연, 조합성 향상 가능
_map( ocument.querySelectorAll('*'), (function(node) { return node.nodeName; }) ); // 동작 - 태그들의 이름 걸러짐 ["HTML", "BODY", ...]
```

## 3) 내부 다형성
- 내부 값에 대한 다형성은 보조함수가 책임
- 배열에 어떤 값이 들어 있어도 수행할 수 있게 해주는 것은 보조함수가 담당 (숫자면 더하고, node이면 nodeName을 참조하는 등의)

### predi, iter, mapper
```js
_map([1, 2, 3, 4], function(v) {
  return v + 10;
});
``` 
- 보조 함수의 이름
- 위 코드에서 일반적으로 두 번째 인자로 들어가는 함수를 보면 무조건 '콜백 함수'라고 부르는 경향 존재
  - 콜백 함수는 어떤 작업을 수행한 이후 다시 리턴하는 역할의 총칭
  
- 함수형 프로그래밍에선 두 번째 함수가 어떤 역할이냐에 따라 다양한 이름을 갖는 것이 중요
  - predi: 어떤 조건을 리턴, iter: 순회하며 반복, mapper: 무언가를 맵핑하는 함수

<br><br>

# 4. 커링
- 본체 함수에 인자를 하나씩 적용하다가 필요한 인자가 모두 채워지면 함수를 실행
- JS는 일급함수를 지원하고 평가 시점을 조정할 수 있기 때문에 커링 기법 구현 가능

## 1) `_curry`, `_curryr`
```js
function _curry(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    }
  }
}

// 일반적
var add = function(a, b) { return a+b; };
add(10, 5);

// 커리함수 적용
var add = _curry(function(a, b) { return a+b; });
var add10 = add(10);
add10(5); // 15,  사용법1: 미리 적용해서 변수에 함수를 만들어 놓고 사용
add(5)(10); // 15, 사용법2: 인자를 두개 같이 줌
```

- 위 커리의 실행 결과 (과정)
```js
var add = function(a) {
    return function(b) {
      return function(a, b) { return a+b; };
    }
  }
```

- 인자를 한 번에 주기
```js
add(5, 3); // 함수가 실행되지 않고 함수를 리턴 
// 수정
function _curry(fn) {
  return function(a, b) {
    return arguments.length == 2 ? 
         fn(a, b) :  function(b) {return fn(a, b); };
  /*if (arguments.length == 2) return fn(a, b);
    return function(b) {
      return fn(a, b);
    }
  }*/
}
```

- 빼기 커리 함수 생성
```js
var sub = _curry(function(a, b) {
  return a - b;
});

sub( 10, 5 ); // 10 - 5
var sub10 = sub(10)
sub10(5) // 인자 5에 `sub10`을 적용시키는 로직이므로 `5 - 10`이 되어야 더 어울림.
```

- 오른쪽 부터 인자를 채우는 `_curryr` 생성
```js
function _curryr(fn){
  return function(a, b) {
    return arguments.length == 2 ? 
         fn(a, b) :  function(b) {return fn(b, a); }; // a, b 순서만 바꿈
}
```

## 2) `_get` 만들어 좀 더 간단하게 하기
- Object의 있는 값을 안전하게 참조하는 `_get`
```js
function _get(obj, key) {
  return obj == null ? undefined : obj[key];
}

var user1 = users[1110]; // id, name, age [error]
_get(uers[1000], 'name'); // undefined
```

- 커링으로 좀 더 간결하게
```js
var _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key];  // [obj == null]은 [obj === null || obj === undefined]와 동일
});

var user1 = users[0];
_get(user1, 'name');
_get('name')(user1);

var get_name = _get('name'); // name을 꺼내는 함수가 됨
get_name(user1);
```

- 위의 `_map`, `_filter`에 `_get` 적용
```js
_mape(
  _filter(users, function(user){ return user.age >= 30; }),
  _get('name')
)

_mape(
  _filter(users, function(user){ return user.age < 30; }),
   _get('age')
)
```

<BR><RB>

# 5. `_reduce` 만들기


<br><br>

# 6. 파이프라인, `_go`, `_pipe`, 화살표 함수


<br><br>

# 7. 다형성 높이기, `_keys`, 에러


<br><br>


<br><br><br>
<출처>
- 
