# 함수 선언문 (function declaration)
- 함수 선언문으로 정의된 함수는 JavaScript 인터프리터가 스크립트가 로딩되는 시점에 바로 초기화하고 VO(variable object)에 저장

- 함수 선언 위치와 상관없이 소스 내 어느 곳에서든 호출이 가능해짐. 

  - 사용하기 쉽지만 대규모 애플리케이션 개발 시 응답 속도 저하 주의
  - -> 스크립트 파일을 모듈화하고 필요한 시점에 비동기 방식으로 로딩하여 http 요청을 줄이고 속도 향상 가능

```js
function 함수명() {
  구현 로직
}
```


# 함수 표현식
- 로딩 시점에 VO에 함수를 저장하지 않고 runtime 시에 해석되고 실행

```js
var 함수명 = function () {
  구현 로직
};
```

<br>


## 차이점
- 함수 선언문은 `호이스팅`에 영향을 받지만 함수 표현식은 호이스팅에 영향을 받지 않는다.

```JS
// 실행 전
logMessage();
sumNumbers();

function logMessage() {
  return 'worked';
}

var sumNumbers = function () {
  return 10 + 20;
};
```

```js
// 실행
// 실행 시
function logMessage() {
  return 'worked';
}

var sumNumbers;  // 함수 표현식의 var도 호이스팅이 적용되었지만 할당될 function 로직은 호출 이후 선언해 단순 변수로 인식

logMessage(); // 'worked'
sumNumbers(); // Uncaught TypeError: sumNumbers is not a function

sumNumbers = function () {
  return 10 + 20;
};
```

<br><br>

## 함수 표현식 장점
### 1. 클로저로 사용
- 클로저는 함수를 실행하기 전 해당 함수에 변수를 넘기고 싶을 떄 사용

```js
function tabsHandler(index) {
    return function tabClickEvent(event) {
        // 바깥 함수인 tabsHandler() 의 index 인자를 여기서 접근할 수 있다.
        console.log(index); // 탭을 클릭할 때 마다 해당 탭의 index 값을 표시
    };
}

var tabs = document.querySelectorAll('.tab');
var i;

for (i = 0; i < tabs.length; i += 1) {
    tabs[i].onclick = tabsHandler(i);
}
```

- .tab 요소에 클릭 이벤트 추가
- 클릭이벤트 `tabClickEvent()`가 바깥 함수의 인자 값 `index`를 접근
- 클로저가 없다면 `index`는 tabs.length와 모두 동일

### 2. 콜백으로 사용 (다른 함수의 인자로 사용 가능)

```js
var arr = ["a", "b", "c"];
arr.forEach(function () {
  // ...
});
```

<br><br>

# new Function 문법
- 함수 표현식과 함수 선언문 이외 함수를 만들 수 있는 방법
- 기존 방식과 차이점: 런타임에서 받은 문자열을 사용해 함수를 만들 수 있다. (원래는 개바잘가 직접 스크립트를 작성해야만 한다.)
- 서버에서 전달받은 문자열을 이용해 함수를 생성해 실행할 수 있다.

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

- 예제
```js
let sum = new Function('a', 'b', 'return a + b');
alert( sum(1, 2) ); // 3

let sayHi = new Function('alert("Hello")');
sayHi(); // Hello
```

<br>

## new Fucntion - 클로저
- 함수는 특별한 프로퍼티 `[[Environment]]`에 저장된 정보를 이용해 자기 자신이 태아난 곳을 기억한다.
- `[[Environment]]`는 함수가 만들어진 렉시컬 환경을 참조
- `new Function`을 이용해 함수를 만들면 함수의 `[[Environment]]` 프로퍼티가 현재 렉시컬 환경이 아닌 **'전역 렉시컬 환경'**을 참조
- 그래서. 외부 변수에 접근할 수 없고, 오직 전역 변수에만 접근 가능한다.

```js
function getFunc() {
  let value = "test";
  let func = new Function('alert(value)');
  return func;
}

getFunc()(); // ReferenceError: value is not defined
```



<br><br><br>
<출처>
- https://joshua1988.github.io/web-development/javascript/function-expressions-vs-declarations/
- https://ko.javascript.info/new-function
