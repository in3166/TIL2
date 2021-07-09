`const log = console.log;`
```js
const products = [
  { name: '반팔티', price: 15000  },
  { name: '긴팔티', price: 20000 },
  { name: '케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];
```

# map
```js
let names = [];
for (const p of products){
  names.push(p.name);
}
let prices = [];
for (const p of products){
  names.push(p.price);
}
```
- map으로 만들기
```js
// 함수형 프로그래밍은 함수가 인자와 리턴값으로 소통
// 함수를 인자로 두어 추상화: 함수안에서 어떤 값을 수집할 지 정의(p.name)
const map = (f, iter) => {
  let res = [];
  for (const p of iter){
    res.push(f(p));
  }
  return res;
}

log( map( p => p.name, products ) ); // ['반팔티', ...]
```

<br>

# 이터러블 프로토콜을 따른 map의 다형성
- 구현한 map은 이터러블 프로토콜을 따르기 때문에 `유연`하고 `다형성`이 높다.
- `document.querySelectorAll`는 Array를 상속받은 객체가 아니므로 map 함수가 구현되어 있지 않다.
```js
log(document.querySelectorAll('*'))
// 결과: NodeList(7) [html, head, script ...] - Array처럼 생겼지만 아래 사용 불가
log(document.querySelectorAll('*').map(el => el.nodeName)) // .map is not a function
log([1, 2, 3]map(a => a + 1)) // [2, 3, 4]
```

- `document.querySelectorAll`는 이터러블 프로토콜을 따르고 있다.
- 그러므로 우리가 만든 map 함수에도 동작한다. (Array에 한정되지 않음.)
```js
log(map(el => el.nodeName, document.querySelectorAll('*'))); // 우리가 만든 map 함수는 잘 동작한다.

const it =document.querySelectorAll('*')[Symbol.iterator](); // Array Iterator

function *gen() [
  yield 2;
  yield 3;
  yield 4;
}
log(map(a => a * a, gen())); // [4, 9, 16]
```

## 이터러블 프로토콜을 따랐을 때의 조합성
```js
let m = new Map();
m.set('a', 10);
m.set('b', 20);

const it = m[Symbol.iterator](); 
log(it.next()); // {value:['a', 10] ,done:false}

// map을 map함수에 사용 가능
log(map(([k, a])=>[k, a * 2 ], m)); // 구조분해/  [["a", 20], ["b", 40]]

// 새로운 map 생성 가능
let m2 = new Map(map(([k, a])=>[k, a * 2 ], m));
```

<br><br>

# filter
- 특정 조건 걸러내기
```js
// 명령형 코드
let under20000 = [];
for(const p of products) {
  if(p.price < 20000) under20000.push(p);
}
log(...under20000);
// 다른 조건이면 같은 코드를
```

- 리팩토링
```js
const filter = (f, iter) => {
  let res = [];
  for (const p of iter){
    if(f(p))
      res.push(f(p));
  }
  return res;
}

log(...filter(p => p.price < 20000, products)); // {name: "반팔티", price: 15000}, {name: "케이스", price: 15000}

log(filter(n => n % 2, function *(){
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
} ())); // [1, 3, 5]
// 즉시 실행하지 않으면 제너레이터를 정의만 하고 실행은 하지 않은채로 넘겨서 이터레이터로 만들지 못함.
```

<br>

# reduce
- 값을 축약해 나가는 함수
```js
const nums = [1, 2, 3, 4, 5];

let total = 0;
for ( const n of nums ) {
  total = total + n;
}
```

- 기본 구조
```js
const reduce = () => {

}

const add = (a, b) => a + b;
log(reduce(add, 0, [1, 2, 3, 4, 5])); // 15

// 내부적 처리 과정
log( add(add(add(0,1), 2), 3))... );
```

- reduce 구현
```js
const reduce = (f, acc, iter) => {
  for ( const a of iter ) {
    acc = f(acc, a);
  }
  return acc;
}
```

- 초기값이 생략됐을 때 구현
```js
// 만약 초기값이 없다면
log(reduce(add, [1, 2, 3, 4, 5])); // 아래 처럼 변경
log(reduce(add, 1, [2, 3, 4, 5]));

const reduce = (f, acc, iter) => {
  if(!iter){
    iter = acc[Symbol.iterator]();
    acc = iter.next().value; // 첫번째 값을 넣어줌
  }
  for ( const a of iter ) {
    acc = f(acc, a);
  }
  return acc;
}

// 모든 price를 더하는 경우
log( reduce((total, product) => total + product.price, 0, products );
```

<br>

# map+filter+reduce 중첩 사용과 함수형 사고
- products의 일정 금액 이하의 가격들을 합하기
- map이 받는 products를 축약
```js
const add = (a, b) => a + b;
log(
  reduce(
    add, 
    map(p => p.price, 
      filter( p => p.price < 20000, products))));
// 동일
log(
  reduce(
    add, 
    filter(n => n < 20000, 
      map( p => p.price, products))));
```


<br><br><br>
<출처>
- 인프런(함수형 프로그래밍과 JavaScript ES6+)
