# call/apply와 데코레이터, 포워딩
- JS 함수 유연: 함수는 여기저기 전달 가능, 객체로 사용 가능
- 함수 간 호출을 어떻게 포워딩(forwarding) 하는지, 함수를 어떻게 데코레이팅(decorating) 하는지

## 코드 변경 없이 캐싱 기능 추가하기
- CPU를 많이 잡아 먹는 `slow(x)` 함수 (순수 함수) - 결과가 안정적: x가 같으면 결과도 같음
- 자주 호출 시 결과를 저장(캐싱)해 재연산에 걸리는 시간 줄이기
- 아래 예시는 캐싱 관련 코드 추가 대신, 래퍼 함수를 만들어 캐싱 기능을 추가
```js
function slow(x) {
  // CPU 집약적인 작업이 여기에 올 수 있습니다.
  alert(`slow(${x})을/를 호출함`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) { // 래퍼 함수
    if (cache.has(x)) {    // cache에 해당 키가 있으면
      return cache.get(x); // 대응하는 값을 cache에서 읽어옵니다.
    }

    let result = func(x);  // 그렇지 않은 경우엔 func를 호출하고,

    cache.set(x, result);  // 그 결과를 캐싱(저장)합니다.
    return result;
  };
}

slow = cachingDecorator(slow);

alert( slow(1) ); // slow(1)이 저장되었습니다.
alert( "다시 호출: " + slow(1) ); // 동일한 결과

alert( slow(2) ); // slow(2)가 저장되었습니다.
alert( "다시 호출: " + slow(2) ); // 윗줄과 동일한 결과
```
 - `cachingDecorator`
   - 인수로 받은 함수의 행동을 변경시켜주는 함수 **데코레이터(decorator)**
   - 모든 함수를 대상으로 `cachingDecorator` 호출 가능 (캐싱이 가능한 함수 원하는 만큼 구현 가능)
   - 반환: 캐싱 래퍼 ( `function(x)` ) - `func(X)`의 호출 결과를 캐싱 로직으로 감쌈 (wrpping)

- `slow(x)`는 래퍼로 감싼 이후에도 바깥 코드에서 볼 땐, 동일한 작업 수행 (행동 양식에 캐싱 기능 추가했을 뿐)
- `slow(x)` 본문을 수정하는 대신 독립된 래퍼 함수를 사용할 때 이점
  - 재사용 가능, `slow(x)` 자체의 복잡성 증가 안함, 여러 개의 데코레이터 조합하여 사용 가능
<br>

## 'func.call'를 사용해 컨텍스트 지정하기
- 위의 캐싱 래퍼는 객체 메서드에 사용하기 적합하지 않다.
- 객체 메서드 `worker.slow()`는 데코레이터 적용 후 제대로 작동하지 않는다.
```js
let worker = {
  someMethod() {
    return 1;
  },
  
  slow(x) {
  // CPU 집약적 작업
  return x * this.someMethod(); // (*)
  }
};

// 이전과 동일
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func(x); // (**)
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // 기존 메서드는 잘 동작
worker.slow = cachingDecorator(worker.slow); // 캐싱 데코레이터 적용
alert( worker.slow(2) ); // 에러 발생!, Error: Cannot read property 'someMethod' of undefined
```
- `(*)` 표시 줄에서 `this.someMethod` 접근 실패
- `(**)` 표시 줄에서 래퍼가 기존 함수 `func(x)`를 호출하면 `this`는 `undefined`(or global)
- 아래도 동일
```js
let func = worker.slow;
func(2);
```
- 래퍼가 기존 메서드 호출 결과를 전달하려 했지만 `this`의 컨텍스트가 사라졌기 때문에 에러 발생


### `func.call(cotext, args)`
- `this`를 명시적으로 고정해 함수를 호출할 수 있게 해주는 특별한 내장 함수 메서드
```js
var example = function (a, b, c) {
  return a + b + c;
};
example(1, 2, 3);
example.call(null, 1, 2, 3);
example.apply(null, [1, 2, 3]);
```

- 메서드를 호출하면 첫 번째 인수 `this`, 이어지는 인수가 `func`의 인수가 된 후, `func`이 호출된다.

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
- 다른 컨텍스트(객체) 하에 `sayHi` 호출

```js
function say(phrase) {
  alert(this.name + ': ' + phrase);
}

let user = { name: "John" };

// this엔 user가 고정되고, "Hello"는 메서드의 첫 번째 인수가 됩니다.
say.call( user, "Hello"); // John: Hello
```
- `call`을 사용해 컨텍스트와 `phrase`에 원하는 값 지정

```js
...
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // 이젠 'this'가 제대로 전달됩니다.
    cache.set(x, result);
    return result;
  };
}
...
```
- 래퍼 안에서 `call`을 사용해 컨텍스트를 원본 함수로 전달하면 에러가 발생하지 않는다.
<br>

## 여러 인수 전달하기
- 지금은 인수가 하나뿐인 함수에만 `cachingDecorator` 적용 가능
- 복수 인수를 가진 메서드, `worker.slow`를 캐싱해보기
```js
let worker = {
  slow(min, max) {
    return min + max; // CPU를 아주 많이 쓰는 작업이라고 가정
  }
};

// 동일한 인수를 전달했을 때 호출 결과를 기억할 수 있어야 합니다.
worker.slow = cachingDecorator(worker.slow);
```
- 인수가 1개일 땐, `cache,set(x, result)` 결과 저장,  `cache.get(x)`으로 결과 불러옴
- 1. 북수 키를 지원하는 맵과 유사한 자료 구조 구현하기
- 2. 중첩 맵을 사용하기. (`(max, result)` 쌍 저장은 `cache.set(min)`으로, `result`는 `cache.get(min).get(max)`을 사용해 얻기)
- 3. 두 값을 하나로 합치기, `맵`의 키로 문자열 `"min, max"`를 사용. 여러 값을 하나로 합치는 코드는 `해싱 함수`에 구현해 유연성 높힘

- 3번째 방법으로 코드 구현
- `func.call(this, x)`를 `func.call(this, ...arguments)`로 교체해, 래퍼 함수로 감싼 함수가 호출될 때 복수 인수 넘기기
```js
function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments); // (*)
    if(cache.has(key)){
      return cache.get(key);
    }
    
    let result = func.call(this, ...arguments); // (**)
    
    cache.set(key, result);
    return result;
  }
}

function hash(args){
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

console.log( worker.slow(3, 5) ); // 제대로 동작
console.log( worker.slow(3, 5) ); // 동일한 결과 (캐시 결과)
```
<br>

## func.apply
`func.apply(context, arge)`
- `apply`는 `func`의 `this`를 `context`로 고정, 유사 배열 객체인 `args`를 인수로 사용 가능하게 해준다.
- `apply`는 복수 인수를 따로 받지 않고 유사 배열 객체로 받는다.
```js
// 거의 동일한 역할
func.call(context, ...args);
func.apply(context, args); 
```
- 차이
  - 전개 문법 `...`은 이터러블 `args`을 분해해 `call`에 전달하게 해준다.
  - `apply`는 오직 유사 배열형태의 `args`만 받는다.
  - 즉, 인수가 이터러블 형태 -> `call`, 인수가 유사 배열 형태 -> `apply` 사용
  - 둘 다 가능한 배열은 `apply`가 보다 최적화되어 빠름

- 이렇게 `context`와 인수 전체를 다른 함수에 전달하는 것을 콜 포워딩(call forwarding)이라고 한다.
```js
let wrapper = function() {
  return func.apply(this, argumnets);
}
```

### func.bind
```js
var obj = {
  string: 'zero',
  yell: function() {
    alert(this.string);
  }
};
var obj2 = {
  string: 'what?'
};
var yell2 = obj.yell.bind(obj2);
yell2(); // 'what?'
```
<br>

## 메서드 빌리기
- 위의 해싱 함수 개선
- 현재 인수 두 개만 가능 -> args 요소 개수에 상관없게 바꾸기

- 배열 메서드 `arr.join` 사용
```js
function hash(args) {
  return args.join();
}
- 동작 안함 -> `hash(arguments)를 호출할 떄 인수는 진짜 배열이 아니고 이터러블 객체거나 유사 배열 객체이기 때문 (배열이 아닌 것에 배열 메서드 사용 불가)
- 아래와 같이 `join` 사용 가능 
```js
function hash() {
  alert( [].join.call(arguments) ); // 1, 2
}
hash(1, 2);
```
- 일반 배열에서 `join` 메서드를 빌려오고 `[].join.call`을 사용헤 `arguments`를 컨텍스트로 고정한 후 `join` 메서드를 호출
<br>

## 데코레이터와 함수 프로퍼티
- 원본 함수에 `func.calledCount` 드으이 프로퍼티가 있으면 데코레이터를 적용한 함수에선 프로퍼티를 사용할 수 없어 안전하지 않다.
- 위 예시에서 `slow`가 프로퍼티가 있다면 `cachingDecorator(slow)` 호출 결과인 래퍼엔 프로퍼티가 없다.
- 몇몇 데코레이터는 자신만의 프로퍼티를 가져 함수가 얼마나 호출되었는지 count 하거나 시간 소요되었는지 저장 가능
- 함수 프로퍼티에 접근하게 해주는 데코레이터를 `Proxy`를 사용해서 만들 수도 있다.


<br><br><br>
<출처>
- https://ko.javascript.info/call-apply-decorators
