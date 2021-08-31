# Splice
- 기존 배열을 변하고, 잘려진 배열 반환
- 배열에 원하는 엘리먼트 갯수를 추가하거나 제거
- 배열 메서드

- 1. 제거
```js
let bread = ['loaf1','loaf2','loaf3','loaf4','loaf5','loaf6'];
let newArr = bread.splice(1, 3);
// bread: ["loaf2", "loaf3", "loaf4"]
// newArr: ["loaf1", "loaf5", "loaf6"]
```

- 2. 제거 후 새로운 요소 추가
```js
let bread = ['loaf1','loaf2','loaf3','loaf4','loaf5','loaf6'];
let newArr = bread.splice(1, 3, 'newLoaf1', 'newLoaf2');
// bread: [ 'loaf1', 'newLoaf1', 'newLoaf2', 'loaf5', 'loaf6' ]
// newArr: [ 'loaf2', 'loaf3', 'loaf4' ]
```

- 3. 추가
```js
let bread = ['loaf1','loaf2','loaf3','loaf4','loaf5','loaf6'];
let newArr = bread.splice(3, 0, 'newLoaf1', 'newLoaf2');
// bread: ['loaf1', 'loaf2', 'loaf3', 'newLoaf1', 'newLoaf2', 'loaf4', 'loaf5', 'loaf6']
// newArr: []
```

<br>

# Slice
- 기존 배열 변하지 않고, 원하는 부분을 복사해서 새로운 배열 반환
- 배열 메서드
```js
//loaf3과 loaf5를 새 배열에 복사하고 싶어욧..

let bread=['loaf1','loaf2','loaf3','loaf4','loaf5','loaf6'];
newArr=bread.slice(2,5);
// bread: [ 'loaf1', 'loaf2', 'loaf3', 'loaf4', 'loaf5', 'loaf6' ]
// newArr: ["loaf3", "loaf4", "loaf5"]
```

# Split
- delimeter을 기준으로 잘라서 배열을 만든 후 배열 반환 
- `String` 메서드, 문자열을 배열로 만들 때 유용

```js
let myString = "the String method";
let newString = myString.split(" ");
let newString2 = myString.split("");

console.log(myString) // the String method
console.log(newString) // [ 'the', 'String', 'method' ]
console.log(newString2) // ['t', 'h', 'e', ' ', 'S', 't', 'r', 'i', 'n', 'g', ' ', 'm', 'e', 't', 'h','o', 'd']
```

<br><br><br>
<출처>
- https://velog.io/@chloeee/Slice-vs-Splice-vs-Split%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90
- 
