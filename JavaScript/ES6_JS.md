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


<br><br><br>
<출처>
- https://borakim-b.github.io/2019/12/01/20191201-flask-restplus/
