# const
- 선언된 값을 재할당 할 수 없음.

```js
const ha = [1,2,3];
ha = ["1", "2"]; // error
```
- 배열에서 재할당 할 때 오류 발생

```js
const ha = [1,2,3];
ha.push(4);
```

- 배열과 Object의 값 변경 가능
- const는 불변을 뜻하지 않고 값의 재할당만 막는다.

<br>

## Immutable Array

```js
const li = [ 1, 2, 3];
li2 = [].concat(li, 4);
console.log(li === li2) // false
```

<br>

# ES6 String 메서드

```js
let str = "hi dl";
str.startsWith(matchsrt) //true
```

- `startsWith`
- `endsWith`
- `includes`: 문자 포함여부
<br>

## for of

```js
var data = [1,2,undefined, NaN, null, ""];

// for in: 객체 순환
for(let idx in data) {
  console.log(data[idx]);
}
// for in: 문제 - 자신이 갖고 있지 않은 상위의 값까지 포함, 그래서 array에서 쓰지 않음
Array.prototype.getIndex = function(){};
for(let idx in data) {
  console.log(data[idx]); // 기존과 다르게 function이 더 생김
}

// for of: 배열 쉽게 순환 가능
for(let value iof data) {
  console.log(value);
}

var str = "goel";
for(let value iof str) {
  console.log(value);  // char 단위로 순회
}
```

<br>

## Spread Operator, 펼침 연산자

`...`

```js
let pre = ['apple' ,'orange', 100];
let newd = [...pre];
console.log(pre, newd);  // ['apple' ,'orange', 100]
console.log(pre === newd); // false

let newd2 = {...pre};
console.log(newd2);  // { '0': 'apple', '1': 'orange', '2': 100 }
```

### 활용
- 중간에 넣기

```js
let pre = [100, 200, "gi", null];
let newd = [0, 1, 2, ...pre, 5]; // 자르고 합칠 필요 없음
```

- 파라미터로 전달

```js
function sum(a, b, c){
  return a+b+c
}

let pre = [100,200,300];
sum.apply(null, pre); // 이전 방식 - 배열 그대로 전달
sum(...pre);
```

<br>

## Array From 메서드
- 진짜 배열로 만들어줌

```js
function addMark() {
  let newD = [];
  for(let i = 0; i<arguments.length; i++){
      newD.push(arguments[i] + "!");
  }
  
  let newArr = Array.from(arguments);  // 배열로 변경
  let newD2 = arguments.map((value) => { // 그냥 쓰면 오류 발생: arguments는 배열이 아님(형태는 같지만 가짜 배열)
    return  value + "!";
  })
  console.log(newD);
}
addMark(1,2,3,4,5);
```

- `arguments`: 인자로 주지 않아도 arguments 함수(객체) 안의 내부 지역변수같은 특별한 값을 이용하여 활용, 가변적인 파라미터가 필요할 때 사용
<br>

<hr>

### 문제
- `li` 리스트를 받아 문자열 'e'가 포함된 노드로 구성된 배열을 반환
- filter, includes, from 사용

```html
<ul>
  <li>apple</li>
  <li>orange</li>
  <li>banana</li>
  <li>strawberry</li>
</ul>
```

```js
function print(){
  let lists = document.querySelectorAll("li");
  console.log(lists);
  console.log(toString.call(lists)); // [object nodelist]
  console.log(toString.call(Array.from(lists)));  // // [object Array]
  console.log(arr[0].innerText); // apple
  
    let newarr = arr.filter((v, i)=>{
      return v.innerText.includes('e') // true가 뜨면 해당 value를 넣어줌
  })
  // filter에서 innerText만 뽑을 순 없음 그냥 필터해주는 것 뿐
}

print();
```

<hr>

### toString() 
- 모든 객체에 사용되어 해당 객체의 클래스를 가져올 수 있습니다. 
- Object.prototype.toString()을 모든 객체에 사용하기 위해서는 Function.prototype.call() 나 Function.prototype.apply()를 사용해서 검사하고자 하는 객체를 thisArg로 불리는 첫번째 파라미터로 넘겨야 합니다.

`Function.prototype.call()`
- 주어진 `this` 값 및 각각 전달된 인수와 함께 함수를 호출
- 이미 할당되어있는 다른 객체의 함수/메소드를 호출하는 해당 객체에 재할당할때 사용

`Function.prototype.apply()`
- 주어진 `this` 값과 배열 (또는 유사 배열 객체) 로 제공되는 `arguments` 로 함수를 호출
- `call()` 은 함수에 전달될 인수 리스트를 받는데 비해, `apply()` 는 인수들의 단일 배열을 받는다.
<hr>
<br>
<br>

# Destructuring
## Destructuring Array

```js
let data = ['c', 'bv', 'a', 'd'];
//let d1 = data[0];
//let d2 = data[2];
// 동일
let [d1,,d2] = data;
```

## Destructuring Object

```js
let obj = {
  name: 'ke',
  address: 'ki',
  age: 10
}

let {name, age} = obj; // ke, 10

let { name: myName, age: myAge} = obj;
console.log(myName, myAge); // ke, 10

var {a = 10, b = 5} = {a: 3};
console.log(a); // 3
```

## Destructuring JSON

```js
var news = [
  {
      "title": "s1",
      "list": : [
            "asdf",
            "asdfzxv"
      ]
  },
  {
      "title": "s2",
      "list": : [
            "a23",
            "124xv"
      ]
  }
]

let [,s2] = news;
let {title, list} = s2;
let [, {title, list}] = news; // ritle: s2
```

## Destructuring Event 객체 전달
- 위 코드 이용, 파라미터에 사용 

```js
function getNewsList1([{list}]){
  console.log(newlist); //s1의 list 출력
}
getNewsList1(news);

function getNewsList([,{list}]){
  console.log(newlist); //s2의 list 출력
}
getNewsList(news);
```

- event 객체에 사용

```js
documnet.querySelector("div").addEventListener("click", function({type, target}){
    console.log(target.innerTextm target.tagName);
});
```
<br><br>

# Set으로 유니크한 배열 만들기
- 중복 없이 유일한 값을 저장, 이미 존재하는지 체크할 때 유용

```js
let mySet = new Set();
console.log(toString.call(mySet)); // [objdect Set]

mySet.add("a");
mySet.add("b");
mySet.add("a");

console.log(mySet.has("a")); // true
mySet.forEach((v)=>{
  console.log(v); // "a" , "b"
});

mySet.delete("a");
```


## WeakSet으로 효과적 객체 타입 저장하기
- 참조를 가지고 있는 `객체`만 저장 가능
- 객체 형태를 중복없이 저장하려 할 때 유용
- 객체가 `null`이 되거나 필요가 없어지면 가비지 컬렉션의 대상이 된다.
  - WeakSet에서도 그 정보가 없어진다. (참조를 모니터링)

```js
let arr = [1, 2, 3];
let arr2 = [5, 6, 7];
let obj = { arr, arr2 };
let ws = new WeakSet();

ws.add(arr);
ws.add(arr2);
ws.add(obj); 
ws.add(111); // 오류 발생
console.log(ws); // { [1, 2, 3], [5, 6, 7], Object {arr: Array(3), arr2:; Array(3)} }

arr = null을 했다고 하더라도,
가비지 컬렉터 입장에서 보면 ws에서 참조 중이기 때문에 가비지 컬렉견 대상으로는 되지 않을 것 같습니다.
가비지 컬렉션 대상으로 인식한다는 근거로 제시하신 것이 has(null)이니 당연히 false

//arr = null;
//console.log(ws); // { [1, 2, 3], [5, 6, 7], Object {arr: Array(3), arr2:; Array(3)} } 동일, ws에 존재하는 것처럼 보임
//console.log(ws.has(arr)); // false 유효하지 않은 객체
```

<br><br>

# Map & WeakMap
- key, value 구조

```js
let wm = new WeakMap();
let myfun = function(){};
// 이 함수가 얼마나 실행됐는지

wm.set(myfun, 0);
cosole.log(wm); // {function => 0}

let count = 0;
for(let i=0; i<10; i++){
  count = wm.get(myfun); // get value
  count++;
  wm.set(myfun, count);
}
cosole.log(wm.get(myfun); // 10
```

## WeakMap 클래스 인스턴스 변수 보호하기
- private한 변수 만들기

```js
function Area(he, wid) {
  this.he =  ge;
  thie.wid = wid;
}

Area.prototype.getArea = function() {
  return this.he * thie.wid;
}

let myarea = new Area(10, 20);
console.log(myarea.getArea()); // 200
console.log(myarea.he); // 10, 접근 가능
```

- 멤버에 접근을 막고 싶을 때 사용
- WeakMap 사용

```js
const wm = new WeakMap();
function Area(he, wid) {
  wm.set(this, {he, wid}); // wm 이 객체에 대한 추가정보를 담음
}

Area.prototype.getArea = function() {
  const {he, wid} = wm.get(this);
  return he * wid;
}

let myarea = new Area(10, 20);
console.log(myarea.getArea()); // 200
console.log(myarea.he); // 접근 불가

myarea = null;
console.log(wm); // WeakMap {Area {} => Object { he:10, wid:20 }} - 보이긴 하지만
console.log(wm.has(myarea)); // false
```

- 단점: 클래스 밖 전역공간을 사용
<br>

## Destructuring & Set 활용 - Lotto 번호 만들기
1. 유일한 값을 추출하는 과정에서 Set 사용
2. getRandomNumber 함수에 변수를 전달하는 과정에서 Destructuring 사용

```js
const SETTING = {
    name : "LUCKY LOTTO",
    count : 6,
    maxNumber : 45
};

const {count, maxNumber} = SETTING;
const lotto = new Set();

function getRandomNumbers(maxNum) {
  while(lotto.size < count) {
    const randNum = Math.floor(Math.random() * (maxNum - 1)) + 1;
    if (!lotto.has(randNum)) {
      lotto.add(randNum);
    }
  }  
}

getRandomNumbers(maxNumber);
lotto.forEach(n => {console.log(n)});
```
<br><br>

# Template 처리
- json으로 응답을 받고, JavaScript Object로 변환하고 데이터처리 조작 후 DOM에 추가하는 일 
- UI 작업에 빈번하고 어려운 작업 -> 데이터 + HTML 문자열 결합이 필요하기 때문

```js
const data = [
  {
    name: 'coffe-bean',
    order: true,
    items: ['maricano','milk','grenn-tea']
  },
  {
    name: 'coffe-bean',
    order: false,
  }
]

const template = `<div>welcom ${data[0].name} !!</div>`
console.log(template);
```

## Tagged Template literals
- Temaplate을 어떤 함수에서 처리 후 반환하여 조작 사용

```js
function fn(tags, name, items){
  console.log(tags); // ["<div>welcom ${data[0].name}", "!!</div>
    <h2>주문 가능 항목</h2><div>", "${data[0].items} !!</div>"]
  if(typeof items === "undefined") {
    items = "주문 가능 상품 없음";
  }
  return (tags[0] + name + tags[1] + items + tags[2]);
}

data.forEach((v) => {
const template = fn`<div>welcom ${v.name} !!</div>
    <h2>주문 가능 항목</h2><div> ${v.items} !!</div>`
}

const template = fn`<div>welcom ${data[0].name} !!</div>
    <h2>주문 가능 항목</h2><div> ${data[0].items} !!</div>`
```

- tags: 배열, "${ }"를 기준으로 구분되어 전달
- name: 첫번째 리터럴 문자 - ${data[0].name}
- items: 두번째 리터럴 문자 - ${data[0].items}
<br><br>

# Arrow Function
## this context

```js
const myObj = {
  runTimeout() {
    setTimeout(function() {
      console.log(this === window); // true, setTimeout은 큐에 있다가 window가 실행?
      this.printData(); //error
    }, 200);
  
    setTimeout(function() {
      this.printData(); // "hi"
    }.bind(this), 200);
  
    setTimeout(() => {
      console.log(this); // context 유지, 선언 기준
      this.printData(); // "hi"
    }, 200);
  }
  
  printData() {
    console.log("hi");
  }
}
```

## function default parameters, 기본 매개 변수

```js
function sum(value, size) {
  size = size || 3;
  return value * size;
}
// 동일
function sum(value, size=3) {
  return value * size;
}

console.log(sum(3));
```

## rest parameters
- argumnets를 이용한 가변 인자 사용
- 가짜 배열 -> 진짜 배열

```js
function checkNum(){
  const argArray = Array.prototype.slice.call(arguments); // == Array.form
  console.log(argArray); // [10, 2, 3, 4, 5, "44"]
  const result = argArray.every((v) => typeof v === "number")
  console.log(result); // false "44" 존재
}
const result = checkNum(10, 2, 3, 4, 5, "44");
```

- 동일

```js
function checkNum(...argArray){ // 배열로 바꿔줄 필요 없어짐
  const result = argArray.every((v) => typeof v === "number")
  console.log(result); // false "44" 존재
}
const result = checkNum(10, 2, 3, 4, 5, "44");
```
<br><br>

# Class
## 객체 생성

```js
function Health(name) {
  this.name = name;
}

Health.prototype.showHealth = function() {
  console.log(this.name + "님");
}

const h = new Health("fi");
h.showHealth(); // "fi 님"
```

- 일반적인 객체를 prototype 안에 두면서 객체를 생성
- new 키워드를 사용하면 this context에 prototype 하위의 메서드, 속성, this에 추가한 것들 등을 묶어서 객체를 생성
- constructor 없음, 일반적인 객체 지향 코드와 다르다.

- ES6 Class 위와 동일

```js
class Health{
  constructor(name, lastTime){
    this.name = name;
    this. lastTime = lastTime;
  }
  
  showHealth(){
    console.log(this.name + "님");
  }
}

const h = new Health("fi");
h.showHealth();
```

- Class지만 내부적으로는 함수로 처리 (showHealth도 prototype에 저장)

## Object assign으로 JS 객체 만들기
- new 키워드로 class를 만들지 않고 순수한 Object 만들기
- `new 없이 class 형태 객체 만들기`

```js
var healthObj = {
  showHealth : function() {
    console.log("오늘 운동시간: " + this.healthTime);
  }
}

const myHealth = Object.create(healthObj);
myHealth.healthTime = "11:22";
myHealth.name = "co";
console.log(myHealth); // [object Object] { healthTime: "11:22", name: "co", __protp__: {showHealth: function() {...}}}
```

- create 메서드: 단순히 prototype 기반의 Object를 만들어줌.
- Object의 (클래스 변수) 값들을 직접 추가해 줘야함 -> assign

```js
const myHealth = Object.assign( // 속성 값은 객체 안에 보관, 
                  Object.create(healthObj) //prototype 객체 하위에 추가
                  , {
                    name:"co",
                    lastTime: "11:22"
});
console.log(myHealth);
```


## Object assign으로 Immutable 객체 만들기
- Object assign은 새로운 객체를 만드는 방법이기도 하다.

```js
const previousObj = {
  name:"co",
  lastTime: "11:22"
};

const my = Object.assign({}, preivousObj, {"lastTime}:"12:22"}); // 카피해서 새로운 객체를 만듦 두 객체는 다른 객체
// previousObj의 값들을 모두 추출하고 3번째 인자에서 새로운 값이 있으면 그 값으로 대체하고 아니면 유지한다.
```

## Object setPrototypeOf로 객체 만들기
- prototype을 객체에 추가
- assign과 유사하지만 객체안의 값을 변형시켜서 속성 값을 뽑아서 복사하여 새로운 객체 (추가적인 기능 지원)
- 단순히 prototype 객체만 추가

```js
Object.setPrototypeOf(myHealth, haelthObj); // myHealth 객체의 portotype 객체로 healthObj를 지정
const newObj = Object.setPrototypeOf({name:'ty',lastTime:"11:22"}, haelthObj);
```

## Object setPrototypeOf로 객체간 prototype chain 생성하기
- like 상속

```js
// parent
var healthObj = {
  showHealth : function() {
    console.log("오늘 운동시간: " + this.healthTime);
  },
  setHealth: function(newTime){
    this.healthTime = newTime;
  }
}

//child obj
const healthChildObj = {
  getAge : function() {
    return this.age;
  }
}

// chain
const lastHealthObj = Object.setPrototypeOf(healthChildObj, healthObj);

const childObj = Object.setPrototypeOf({
  age : 22
}, healthChildObj);
console.log("childobj is ", childObj);
```

<br><br>

# Module (export & import)
## Module 기반 서비스 코드 구현
- index.html
- app.js

```js
import {log, getTime, getCurrentHour} from './myLogger';

log('my first test data');
log(getTime());
log(getCurrentHours());
```

- myLogger.js

```js
export function log(data){
  console.log(data);
} 

export const getTime = ()=>{
  return Date.now();
}

export const getCurrentHour = () => {
  return (new Date).getHours();
}
```

### Class 사용
- myLogger.js: Class 사용

```js
// utility -> 다른 파일로 분리 
export const _ = {
  log(data){
    console.log(data);
  }
}

// class
export class MyLogger{
  constructor(props) {
    this.lectures = ['a', 'b'];
  }
  
  getLectures() {
    return this.lectures;
  }
  
  getTime(){
   return Date.now();
  }
}
```

- app.js

```js
import {_, getCurrentHour, MyLogger} from './myLogger';

const logger = new MyLogger();
_.log(logger.getLectures());
```
<br><br>

# Proxy로 interception 기능 구현
`const proxy = new Proxy('타겟 객체', 'handler')`
- 어떤 작업 중 Object를 중간에 가로채서 다른 작업을 추가로 할 수 있는 기능 제공
```js
const myObj = { name : 'co', changedValue:0 };
const proxy = new Proxy(myObj, {});
proxy.name;   // 'co'
proxy.name = 'as'; 
proxy   // Proxy {name: 'as'}
myObj  // Object {name: 'as'}
proxy == myObj   // false
proxy.name == myObj.name  // true

const proxy2 = new Proxy(myObj, {
                get : function(target, property, receiver){ // receiver: proxy 자체
                  console.log('get');
                  return target[property];
                },
                set : function(target, property, value){ // target: myObj
                  target['changedValue']++;
                  target[property] = value;
                  console.log('set');
                }
               });

proxy2.name = 'adf'; // 'set'
proxy.name; // get, 'adf'
```

<br><br><br>

<출처>
- https://borakim-b.github.io/2019/12/01/20191201-flask-restplus/
