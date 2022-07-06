# Immutability
- 정보 변경의 불변성
- `데이터 원본 훼손의 방지`
- `CRUD`: Create, Read, Update, Delete
  - 무질서한 수정과 삭제 등으로 생기는 데이터 원본의 훼손  
- 변경될 필요가 없는 데이터들을 확실하게 고정시켜 둔다면, Application은 보다 안전하고 유연하게 된다.
<br>

## 이름에 대한 불변함
```js
var v = 1;
// 1억 줄의 코드~
v = 2;
console.log('v :', v);
 
const c = 1;
// 1~
c = 2;
```
`var 'v' = 1;`
- 중간에 누군가 값을 변경하면 원래 의도한 데이터가 나오지 않음 (에러 조차 나오지 않음)
- `const`: 중간에 값이 바뀌면 에러 발생 (상수 변수)
<br><br>

## 내용에 대한 불변함
### 변수 할당 방식
- 원시데이터 타입(Primitive): Number, String, Boolean, Null, Undefined, Symbol
- 객체(Object): Object, Array, Function

- 초기값의 비교
  - code: `var p1 = 1`
  - name: `p1`은 새로 저장된 1을 가리킴
  - value
    - 메모리상에 저장
    
    |M1|M2|
    |:---:|:---:|
    |1|-|
    |-|-|
    |-|-|
    
  - code: `var p2 = 1` (원시데이터)
  - name: `p2`은 원래 있던 1을 가리킴 (메모리 절약, p1 === p2: true)
  - value
    |M1|M2|
    |:---:|:---:|
    |1|-|
    |-|-|
    |-|-|
    <hr>
  - code: `var o1 = { name: 'kim' }` (원시데이터)
  - name: `o1`은 새로 저장된 값을 가리킴 
  - value
    |M1|M2|
    |:---:|:---:|
    |{ name: 'kim' }|-|
    |-|-|
    |-|-|
    
  - code: `var o2 = { name: 'kim' }` (원시데이터)
  - name: `o2`은 새로 저장된 값을 가리킴 (o1 === o2: flase)
  - value
    |M1|M2|
    |:---:|:---:|
    |{ name: 'kim' }|-|
    |-|-|
    |-|-|


- 원시 데이터 타입은 값(내용)을 변경할 수 없음 -> 1은 언제나 1, 불변함
- 객체 타입은 그 값이 변경될 수 있음

### 객체의 가변성
```js
var o1 = {name:'kim'};
var o2 = o1;     // o1과 같은 값을 가리킴
o2.name = 'lee'; // o1이 가리키는 값까지 바뀜
```

### 객체의 복사
- 객체를 Immutable하게 다루기
```js
var o1 = {name:'kim'}
var o2 = Object.assign({}, o1);  // 리턴될 객체, 복사할 객체 - 두 인자를 병합
o2.name = 'lee';
console.log(o1, o2, o1 === o2); // false
```

### 중첩된 객체의 복사
`Nested object`
- 객체의 프로퍼티의 값 중 하나가 객체일 때
  - code: `var o2 = { name: 'kim', score:[1,2,] }` (원시데이터)
  - name: 중첩된 객체의 값인 `score`와 그 값인 객체는 각자 메모리에 분리되어 저장되고 `score`은 값의 위치(레퍼런스)를 저장.
  - value
    |M1|M2|
    |:---:|:---:|
    |{ name: 'kim', score: -> }|[1,2]|
    |-|-|
    |-|-|
    
- 중첩된 객체의 단순한 복사는 같은 값을 가리킴 (score 동일)
```js
var o1 = { name: 'kim', score:[1,2,] }
var o2 = Object.assign({}, o1);
o2.score.push(3);
console.log(o1 === o2, o1.score === o2.score); // false, true 
```

- 중첩된 값도 복사해야 별개의 값이 된다.
```js
o2.score = o2.score.concat();  // assign을 쓰면 배열의 특성이 사라짐
console.log(o1 === o2, o1.score === o2.score); // false, false
```

    
<br><br>

## 불변의 함수
- 객체의 프로퍼티 값을 바꾸는 함수
```js
 function fn(person){
     person.name = 'lee';
 }
 var o1 = {name:'kim'}
fn(o1);
 console.log(o1); // name: 'lee' 로 변경
```

- 객체의 불변함을 유지하는 함수
  - 객체를 리턴해줘서 원본을 바꾸지 않고 새로 만든다.
    ```js
    function fn(person){
        person = Object.assign({}, person); // 원본을 바꾸지 않기 위해 복사
        person.name = 'lee';
        return person;
    }
    var o1 = {name:'kim'}
    var o2 = fn(o1);
    console.log(o1, o2);
    ```
  - 함수 밖에서 복사해주기
    ```js
    function fn(person){
        person.name = 'lee';
    }
    var o1 = {name:'kim'}
    var o2 = Object.assign({}, o1);
    fn(o2);
    console.log(o1, o2);
    ```

### 가변과 불변 API 비교
- JavaScript가 가지고 있는 API 중에 원본의 수정 여부 비교
```JS
var score = [1,2,3];
var a = score;
var b = score;
// 1~
// score.push(4); // 원본을 바꾸는 방법
var score2 = score.concat(4); // 리턴 값을 score 복사한 값에 push한 값
console.log(score, score2, a, b);/
```


<br><br>

## 객체를 불변하게 만들기 (Object.freeze)
```js
var o1 = {name:'kim', score:[1,2]}
Object.freeze(o1);
Object.freeze(o1.score);
o1.name = 'lee';
o1.city = 'seoul'; // 프로퍼티 추가도 불가
o1.score.push(3);
console.log(o1);  // {name:'kim', score:[1,2]}
```

### const vs Object.freeze
```js
const o1 = {name:'kim'}
Object.freeze(o1); // 값을 바꾸지 못하게 함
const o2 = {name:'lee'}
// o1 = o2; // const 카리키는 대상 변경 불가
o1.name = 'park';
console.log(o1);
```
- `const`: 변수나 객체가 가리키는(저장한) 주소 값을(레퍼런스) 수정할 수 없게 막는다.
- `freeze`: 저장하고 있는 값의 변경을 막는다.


<br><br><br>
<출처>
- https://opentutorials.org/module/4075/24881 (생활코딩)
