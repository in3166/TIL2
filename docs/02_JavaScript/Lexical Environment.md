# 1. 변수
## 렉시컬 환경
- JavaScript에선 실행 중인 함수, 코드 블록(`{...}`), 스크립트 전체는 `렉시컬 환경`이라 불리는 `내부 숨김 연관 객체`(Internal Hidden Associated Object)를 갖는다.

### 렉시컬 환경 객체의 두 부분
1. **환경 레코드(Environment Record)**
    - 모든 지역 변수를 프로퍼티로 저장하고 있는 객체
    - `this` 값 같은 기타 정보도 포함
    
2. **외부 렉시컬 환경(Outer Lexical Environment)에 대한 참조**
   - 외부 코드와 연관됨

<br>

- **'변수'는 특수 내부 객체인 `환경 레코드`의 프로퍼티**이다.
  - 즉, 변수를 가져오거나 변경하는 것은 환경 레코드의 프로퍼티를 가져오거나 변경하는 것을 의미한다.

- 아래의 코드는 렉시컬 환경이 하나만 존재한다.
  - `Lexical Environment[phrase: 'Hello'] -outer-> null`
  -  대괄호: 네모 상자는 변수가 저장되는 환경 레코드
  -  outer: 외부 렉시컬 환경에 대한 참조 (전역 렉시컬 환경은 외부 참조를 갖지 않아 `null`을 가리킴)

```js
let phrase = 'Hello';
alert(pharse);
```

- 여러 줄의 코드
<img src="02_JavaScript/img/lex1.JPG" width="60%" />

1. 스크립트가 시작되면 스크립트 내 선언한 변수 전체가 렉시컬 환경에 올라간다. (pre-populated)
  - 변수의 상태는 특수 내부 상태인 `uninitialized`가 된다.
  - 자바스크립트는 이 상태의 변수를 인지하지만 참조할 순 없다. (`let` 만나기 전까지)
  
2. `let pharse`는 아직 값 할당 전이라 프로퍼티 값을 `undefined`이다. (이 시점부터 해당 변수를 사용할 수 있다)
3. `phrase` 값 할당
4. `phrase` 값 변경

<br><br><br>

# 2. 함수 선언문
- 함수는 변수와 마찬가지로 '값'이다.
- 함수 선언문으로 선언한 함수는 일반 변수와 달리 바로 초기화된다.
  - 즉, 렉시컬 환경이 만들어지는 즉시 사용 가능 (함수 표현식은 불가)
  - 변수는 `let`을 만나야 사용 가능한 것과 차이

- 스크립트에 함수를 추가했 을때 전역 렉시컬 환경 초기 상태 변화
<img src="02_JavaScript/img/lex2.JPG" width="60%" />
<br><br>

# 3. 내부와 외부 렉시컬 환경
- **함수 호출해 실행**하면 새로운 렉시컬 환경이 자동 생성
  - `매개변수`와 `함수의 지역 변수`가 저장됨

<img src="02_JavaScript/img/lex3.JPG" width="70%" />

- 함수 호출 중엔 호출 중인 함수를 위한 `내부 렉시컬 환경`과 내부 렉시컬 환경이 가리키는 `외부 렉시컬 환경`을 갖는다.
  - 위의 `내부 렉시컬 환경`은 현재 실행 중인 `say` 함수에 상응, 
    - 내부 렉시컬 환경엔 함수의 인자인 `name`으로 유래한 프로퍼티 하나만 존재
    - `say("John")` 호출했기 때문에 `name`의 값을 `"John"~
   
  - 위의 `외부 렉시컬 환경`은 **전역 렉시컬 환경**이다.
    - 전역 렉시컬 환경은 `phrase`와 함수 `say`를 프로퍼티로 갖는다.

- 코드에서 변수에 접근할 땐, 내부 렉시컬 환경을 먼저 검색 범위로 잡는다. 그 후 찾지 못하면 외부 렉시컬 환경으로 확장한다.
  - 전역 렉시컬 환경까지 확장 반복하는데 변수를 찾지 못하면 엄격 모드에서 에러 발생

<br><br>

# 4. 함수를 반환하는 함수

```js
function makeCounter() {
  let count = 0;
  
  return function() {
    return count++;
  }
}

let counter = makeCounter();
```

<br>


<img src="02_JavaScript/img/lex4.JPG" width="70%" />

- `makeCounter()`를 호출하면 2개의 렉시컬 환경이 만들어진다.
- 위의 함수는 실행 도중에 `중첩 함수`가 만들어 진다
- 모든 함수는 함수가 생성된 곳의 렉시컬 환경을 기억한다.
  - 함수는 `[[Environment]]`라 불리는 숨김 프로퍼티를 갖는데 여기에 **함수가 만들어진 곳의 렉시컬 환경에 대한 참조**가 저장된다.
<br>

<img src="02_JavaScript/img/lex5.JPG" width="70%" />

- `counter.[[Environment]]`에는 `{count: 0}`이 잇는 렉시컬 환경에 대한 참조가 저장
  - 호출 장소와 상관없이 함수가 자신이 태어난 곳을 기억하는 이유
  - `[[Environment]]`는 함수가 생성될 때 딱 한 번 값이 셋팅되고 변하지 않는다.

- `counter()`을 호출하면 각 호출마다 새로운 렉시컬 환경이 생성된다. 
  - `counter` 자체가 함수고 함수를 호출하면 렉시컬 환경은 자동으로 생성되므로
  
- 이 렉시컬 환경은 `counter.[[Environment]]`에 저장된 렉시컬 환경을 외부 렉시컬 환경으로 참조한다.
<br>

<img src="02_JavaScript/img/lex6.JPG" width="70%" />

- 중첩 함수 내부의 `count` 변수를 찾기 위해 자체 렉시컬 환경 부터 확장해 나간다. 
  - 익명 중첩 함수엔 지역 변수가 없으므로 렉시컬 환경이 비어있는 상태 (`<empty>`)

- `count`를 찾으면 `count++`가 실행되는데, **변숫값 갱신은 변수가 저장된 렉시컬 환경에서 이뤄진다.**
  - `count`가 2, 3, ..으로 증가하는 이유
<br>

## 클로저 (Closure)
- **외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수**를 의미한다.
- JavaScript는 모든 함수가 클로저이다. (예외 `new Function`)
- 자바스크립트 함수는 숨김 프로퍼티 `[[Environment]]`를 이용해 자신이 어디서 만들어 졌는지 기억하고 함수 본문에선 `[[Environment]]`를 사용해 외부 변수에 접근한다.
<br><br>

## 가비지 컬렉션
- 함수 호출이 끝나면 함수에 대응하는 렉시컬 환경이 메모리에서 제거된다. (함수와 관련된 변수도 모두 사라짐)
  - 함수 호출이 끝나면 관련 변수를 참조할 수 없는 이유
  - JavaScript 모든 객체는 도달 가능한 상태일 때만 메모리에 유지된다.

- 호출이 끝나도 여전히 도달 가능한 중첩 함수가 존재
  - 중첩함수의 `[[Environment]]` 프로퍼티에 외부 함수 렉시컬 환경에 대한 정보가 저장된다. (도달 가능한 상태가 됨)
  - 함수 호출이 끝났지만 렉시컬 환경이 메모리에 유지되는 이유

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g.[[Environment]]에 f() 호출 시 만들어지는
// 렉시컬 환경 정보가 저장됩니다.
```

- `f()`를 여러 번 호출하고 결과를 어딘가에 저장하면 각 렉시컬 환경은 모두 메모리에 유지된다.

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g.[[Environment]]에 f() 호출 시 만들어지는
// 렉시컬 환경 정보가 저장됩니다.
```

- 중첩 함수가 메모리에서 삭제되고 난 후에야, 이를 감싸는 렉시컬 환경(그리고 그 안의 변수인 value)도 메모리에서 제거됩니다.

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g가 살아있는 동안엔 연관 렉시컬 환경도 메모리에 살아있습니다.

g = null; // 도달할 수 없는 상태가 되었으므로 메모리에서 삭제됩니다.
```

<br><br>

## 최적화 프로세스
- 이론상 함수가 살아있는 동안 모든 외부 변수는 메모리에 유지되는데, 실제론 자바스크립트 엔진이 이를 지속적 최적화한다.
  - 변수 사용을 분석하고 사용 되지 않는 외부 변수라고 판단되면 메모리에서 제거

-  디버깅 시, 최적화 과정에서 제거된 변수를 사용할 수 없다는 점은 V8 엔진(Chrome, Opera에서 쓰임)의 주요 부작용입니다.
  - 크롬 개발자 도구에서 실행이 일시 중단된 후 `alert(value)`를 입력하면 에러 발생
  
```js
function f() {
  let value = Math.random();

  function g() {
    debugger; // Uncaught ReferenceError: value is not defined가 출력됩니다.
  }

  return g;
}

let g = f();
g();
```

```js
let value = "이름이 같은 다른 변수";

function f() {
  let value = "가장 가까운 변수";

  function g() {
    debugger; // 콘솔에 alert(value);를 입력하면 '이름이 같은 다른 변수'가 출력됩니다.
  }

  return g;
}

let g = f();
g();
```

<br><br>

### Q1. what will it show: "John" or "Pete"?

```JS
let name = "John";

function sayHi() {
  console.log("Hi, " + name);
}

name = "Pete";

sayHi(); 
```

- `Hi, Pete`가 출력, 함수는 외부 변수를 자신의 현재 시점에서 가장 가까운 값을 가져온다.
- 오래된 변수는 어디에도 저장되지 않는다.

<br>

### Q2. IF문 안의 함수

```JS
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

sayHi();
```

- 에러 발생: `if`문 안에서 정의한 함수는 밖에서 사용 불가

<br>

### Q3. Is variable visible?

```js
let x = 1;

function func() {
  console.log(x); // ?

  let x = 2;
}

func();
```

- `ReferenceError: Cannot access 'x' before initialization`
- `non-existing`과 `uninitialized`의 차이
  - 변수는 함수나 코드 블록에 들어가는 것이 실행 될 때 `uninitialized` 상태로 시작한다.
  - 그 후, `let`를 만나기 전까지 그 상태를 유지한다.
  - 즉, 변수는 존재하지만 사용할 수 없는 상태이다.

```js
function func() {
  // 지역 변수 x는 함수의 시작 부터 엔진에 알려져있다.
  // 하지만 "let"을 만나기 전까지("dead zone") "uninitialized"(사용 불가)이므로 에러가 발생한다.

  console.log(x); // ReferenceError: Cannot access 'x' before initialization

  let x = 2;
}
```

<br>

### Q4. 함수를 이용해 원하는 값만 걸러내기
- `arr.filter(f)`는 함수 `f`의 반환 값을 `true`로 만드는 요소를 배열로 반환

```js
/* ... 여기에 두 함수 inBetween과 inArray을 만들어주세요 ...*/
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6
alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```

```js
// isBetween 함수
function isBetween(a, b){
  return function(x) {
    return x >= a && x <= b;
  }
}
```

```js
// inArray 함수
function inArray(arr){
  return function(x) {
    return arr.includes(x);
  }
}
```

<br>

### Q5. 함수로 군대 만들기

```js
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter 함수
      alert( i ); // 몇 번째 shooter인지 출력해줘야 함
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0번째 shooter가 10을 출력함
army[5](); // 5번째 shooter 역시 10을 출력함
// 모든 shooter가 자신의 번호 대신 10을 출력하고 있음
```

- 위의 `shooter` 함수는 `i`를 지역 변수로 가지고 있지 않고 외부 렉시컬 환경에서 가져온다.
- 즉, `makeArmy()`가 실행과 연관된 렉시컬 환경에 있는데 `army[5]()`가 불려진 시기는 이미 `makeArmy`가 완료된 시점이라 `i`는 10이다.

```js
 for(let i = 0; i < 10; i++) {
    let shooter = function() { // shooter function
      alert( i ); // should show its number
    };
    shooters.push(shooter);
  }
```

- 위와 같이 수정하면, 매번 `for` 루프 code block이 실행된다.
- 즉, 변수 `i`에 해당하는 새로운 렉시컬 환경이 생성된다.

- 다른 방법

```js
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let j = i;
    let shooter = function() { // shooter function
      alert( j ); // should show its number
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

<br><br><br>
<출처>
- https://ko.javascript.info/closure
