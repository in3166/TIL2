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

1. 데코레이터를 적용한 후에`worker.slow`는 래퍼 `function (x) { ... }`가 됩니다.
2. `worker.slow(2)`를 실행하면 래퍼는 2를 인수로 받고, this=worker가 됩니다(점 앞의 객체).
3. 결과가 캐시되지 않은 상황이라면 `func.call(this, x)`에서 현재 `this (=worker)`와 `인수(=2)`를 원본 메서드에 전달합니다.

<br><br>

## 여러 인수 전달하기

- 복수 인수를 가진 메서드도 사용할 수 있게 수정

```js
let worker = {
  slow(min, max) {
    return min + max;
  }
};

// 동일한 인수를 전달했을 때 호출 결과를 기억해야 한다.
worker.slow = cachingDecorator(worker.slow);
```

- 기존 맵을 사용하면 단일 키만 받기 때문에 사용 불가
  - 해결법
  - 1. 복수 키를 지원하는 맵과 유사한 자료 구조 구현 (or 서브 파티 라이브러리 사용)
  - 2. 중첩 맵을 사용. `(max, result)` 쌍 저장은 `cache.set(min)`으로, `result`는 `cache.get(min).get(max)`을 사용해 얻기
  - 3. 두 값을 하나로 합치기. 맵의 키로 문자열 "min,max"를 사용. 여러 값을 하나로 합치는 코드는 해싱 함수에 구현해 유연성을 높힌다.

- 3번째 방법과 `func.call(this, x)`를 `func.call(this, ...arguments)로 교체해, 래퍼 함수로 감싼 함수가 호출될 떄 복수 인수로 넘길 수 있게 해준다.

```js
let worker = {
  slow(min, max) {
    alert(`slow(${min},${max})을/를 호출함`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments); // (*) 단일 키로 만들기
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments); // (**) 컨텍스트(this)와 래퍼가 가진 인수 전부를 기존 함수에 전달

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert( worker.slow(3, 5) ); // 제대로 동작합니다.
alert( "다시 호출: " + worker.slow(3, 5) ); // 동일한 결과 출력(캐시된 결과)
```

<br>

## func.apply

- 위에서 `func.call(this, ...arguments)` 대신, `func.apply(this, arguments)를 사용 가능
`func.apply(context, args)`

- `apply`는 `func`의 `this`를 `context`에 고정, 유사 배열 객체인 `args`를 인수로 사용할 수 있게 해준다.
- `call`은 복수 인수를 따로따로 받는 대신, `apply`는 인수를 유사 배열 객체로 받는다.

- 아래는 거의 같은 역할

```js
func.call(context, ...args); // 전개 문법을 사용해 인수가 담긴 배열을 전달하는 것과
func.apply(context, args);   // call을 사용하는 것은 동일합니다
```

- 차이점
  - 전개 문법은 이터러블 `args`을 분해 해 `call`에 전달할 수 있게 해준다.
  - `apply`는 오직 유사 배열형태의 `args`만 받는다.
  - 즉, 인수가 이터러블 형태 -> `call`, 인수가 유사 배열 형태 -> `apply` 사용
  - `apply`가 조금 더 빠름

### 콜 포워딩(call forwarding)

- 컨텍스트와 함께 인수 전체를 다른 함수에 전달하는 것

```js
// wrapper를 호출하면, 기존 함수인 func를 호출하는 것과 명확히 구분 가능
let wrapper = function() {
  return func.apply(this, arguments);
};
```

<br><br>

## 메서드 빌리기

- 위의 해싱 함수 개선: 인수의 개수 상관없이 요소들 합치기 (배열 메서드: `arr.join`)

```js
function hash(args) {
  // return args.join();  -> 사용 불가, arguments는 가짜 배열, 유사 배열 객체 or 이터러블 객체
  [].join.call(arguments)
}
```

- 일반 배열에서 `join` 메서드를 빌려오고, `[].join.call`을 사용해 `arguments`를 컨텍스트로 고정한 후 `join` 호출

### HOW?

`네이티브 메서드 arr.join(glue)의 내부 알고리즘은 아주 간단하기 때문입니다.`

- `glue`가 첫 번째 인수가 되도록 합니다. 인수가 없으면 ","가 첫 번째 인수가 됩니다.
- `result`는 빈 문자열이 되도록 초기화합니다.
- `this[0]`을 `result`에 덧붙입니다.
- `glue와 this[1]`를 `result`에 덧붙입니다.
- `glue와 this[2]`를 `result`에 덧붙입니다.
- `this.length`개의 항목이 모두 추가될 때까지 이 일을 반복합니다.
- `result`를 반환합니다.

기존에 call을 사용했던 방식처럼 this를 받고 this[0], this[1] 등이 합쳐집니다. 이렇게 내부 알고리즘이 구현되어있기 때문에 어떤 유사 배열이던 this가 될 수 있습니다. 상당수의 메서드가 이런 관습을 따르고 있죠. this에 arguments가 할당되더라도 잘 동작하는 이유가 여기에 있습니다.

<br>

### 데코레이터와 함수 프로퍼티

- 함수 또는 메서드를 데코레이터로 감싸 대체하는 것은 대체적으로 안전
- 하지만 원본 함수에 `func.calledCount` 등의 프로퍼티가 있으면 데코레이터 적용 함수는 프로퍼티 사용 불가 -> 안전x (함수에 프로퍼티가 있을 경우 주의)

<br><br><br>
<출처>

- <https://ko.javascript.info/call-apply-decorators>
