# call/apply와 데코레이터, 포워딩
- 함수 간 호출 포워딩(forwarding) 방법
- 함수 데코레이팅(decorating) 방법

## 코드 변경 없이 캐싱 기능 추가하기
- CPU를 많이 잡아먹지만 결과는 안정적인 함수 `slow(x)`
- 자주 호출되는 `slow(x)`의 결과를 어딘가에 저장(캐싱)해 재연산 시간 줄이기

- `slow()` 안에 코드 추가하지 않고 래퍼 함수를 만들어 캐싱 기능 추가
```js
function slow(x){
  // CPU 집약적 작업
  alert(`slow(${x})을/를 호출`);
  return x;
}


function cachingDecorator(func){
  let cache = new Map();
  
  // wrapper function: fucntion(x)
  return function(x){  // 현재 cache를 가지고 있음, 렉시컬? 클로저
    if (cache.has(x)) {    // 캐시에 해당 키가 있으면
      return cache.get(x); // 대응하는 값을 읽어 오기
    }
    
    let result = func(x); // 그렇지 않은 경우 func 호출,
    
    cache.set(x, result); // 그 결과를 캐싱
    return result; 
  }
}

slow = cachingDecorator(slow);

alert( slow(1) ); // 저장
alert( slow(1) ); // 동일 결과
```
- 위의 `cachingDecorator(func)`를 호출하면 ‘래퍼(wrapper)’, `function(x)`이 반환됩니다. 
- 래퍼 `function(x)`는 `func(x)`의 호출 결과를 캐싱 로직으로 감쌉니다(wrapping).


## 데코레이터(decorator)
- 위 `cachingDecorator`와 같이 **인수로 받은 함수의 행동을 변경시켜주는 함수**
- 모든 함수를 대상으로 위의 래퍼 함수를 호출 할 수 있는데, 이때 반환되는 것은 캐싱 래퍼
- 캐싱 관련 코드를 함수 코드와 분리하여 코드가 간결해질 수 있다.


### 독립된 래퍼 함수를 사용할 때 이점
- `cachingDecorator`를 재사용 가능, 원하는 함수 어디에든 적용 가능
- 캐싱 로직이 분리되어 `slow` 자체의 복잡성 증가하지 않는다.
- 필요하면 여러 개의 데코레이터를 조합해 사용 가능

<br><br>

## 'func.call'를 사용해 컨텍스트 지정
- 기존 코드는 객체 메서드에 사용 불가
```js
// worker.slow에 캐싱 기능을 추가해봅시다.
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // CPU 집약적인 작업이라 가정
    alert(`slow(${x})을/를 호출함`);
    return x * this.someMethod(); // (*)
  }
};

// 이전과 동일한 코드
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func(x); // (**)
    // let result = func.call(this, x); // 이젠 'this'가 제대로 전달됩니다. 수정!
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // 기존 메서드는 잘 동작합니다.

worker.slow = cachingDecorator(worker.slow); // 캐싱 데코레이터 적용

alert( worker.slow(2) ); // 에러 발생!, Error: Cannot read property 'someMethod' of undefined
```
- `this.someMethod` 접근에 실패 -> `this = undefined`
- 래퍼가 기존 메서드 호출 결과를 전달하려 했지만 `this`의 컨텐스트가 사려져 에러 발생
- `this`를 명시적으로 고정해 함수 호출하기
  - 내장 함수 `func.call` 사용
  - `func.call(context, arg1, arg2, ...)`
  ```js
  function sayHi() {
    alert(this.name);
  }

  let user = { name: "John" };
  let admin = { name: "Admin" };

  // call을 사용해 원하는 객체가 'this'가 되도록 합니다.
  sayHi.call( user ); // this = John
  sayHi.call( admin ); // this = Admin
  ```

### `this` 전달 과정
1. 데코레이터를 적용한 후에` worker.slow`는 래퍼 `function (x) { ... }`가 됩니다.
2. `worker.slow(2)`를 실행하면 래퍼는 2를 인수로 받고, this=worker가 됩니다(점 앞의 객체).
3. 결과가 캐시되지 않은 상황이라면 `func.call(this, x)`에서 현재 `this (=worker)`와 `인수(=2)`를 원본 메서드에 전달합니다.
<br><br>

## 여러 인수 전달하기



<br><br><br>
<출처>
- https://ko.javascript.info/call-apply-decorators
