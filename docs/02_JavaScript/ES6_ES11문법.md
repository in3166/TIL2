# Shorthand property names

- 키와 값의 이름이 동일하면 하나로 축약 가능.

```javascript
const name = "lee";
const age = "12";

//const o1 = {
//  name: name,
//  age: age
//};

const o2 = {
  name,
  age
};
```

<br><br>

# Destructuring assignment

- object 키와 값에 접근하기 위해선 `.`을 사용
- object 안에 정의된 키의 이름을 동일하게 괄호 안에 작성해서 선언

```javascript
//const name = student.name;
//const level = student.level;

const { name, level } = student;
```

- 다른 이름으로 작성하고 싶을 때

```javascript
const { name: studentName, level: studentLevel } = student;
```

- 배열에서도 동일하게 사용 가능

```javascript
const animals = ['cat', 'dog'];

//const first = animals[0];
//const second = animals[1];

const [first, second] = animals;
```

<br><br>

# Spread Syntax

- Array에 있는 하나하나의 요소를 낱개로 가져와서 복사해준다.
- Object를 담고 있는 변수는 실제 object가 있는 메모리의 주소를 가지고 있다.
- Array 복사도 주소 값만 복사되어 오기 때문에 ***동일한 Object를 가리키고 있다.*** (하나가 변경되면 복사된 나머지도 영향)

```js
const obj1 = { key: 'key1' };
const obj2 = { key: 'key2' };
const array = [obj1, obj2];

// map이나 forEach 등을 사용할 수도 있지만 ...사용
const arrayCopy = [...array];
```

- 배열을 복사하면서 새로운 요소 추가하기

```javscript
const arrayCopy2 = [...array, { key: 'key3' }];
```

- Object를 복사하기

```javascript
const obj3 = { ...obj1 };
```

- 병합도 가능

```javascript
const arr1 = ['1', '2'];
const arr2 = ['3', '4'];
const arr3 = [...arr1, ...arr2];

const obj1 = [ ob1: 'a' ];
const obj2 = [ ob2: 'b' ];
const obj3 = [...obj1, ...obj2]; // 만약 키가 동일하면, 뒤에 있는 키가 덮어씌움.
```

<br><br>

# Default Parameters

- 인자가 있는 함수에 인자없이 출력할 때
- 인자에 초기값 지정

```javacript
fuction printMessage(message = 'default message') {
  console.log(message);
}

printMessage('hi');
printMessage();
```

<br><br>

# Ternary Operator

```javascript
const isCat = true;

{
  let component;
  if (isCat) {
    component = 'cat';
  } else {
    component = 'dog';
  }
}
```

```javascript
const component = isCat ? 'cat' : 'dog';
```

<br><br>

# Template Literals

```javascript
const weather = "sunny";
console.log(`Today weather is ${weather}`);
```

<br><br>

# Optional Chaining

```javascript
const person1 = {
  name: 'Ell',
  job: {
    title: 'S/W Eengineer',
    manager: {
      name: 'Bob',
    },
  },
};
const person2 = {
  name = 'Bob',
};

function printManager(person) {
  console.log(person.job.manager.name);
}

printManager(person1); // ok
printManger(person2); // error
```

- option1: if문 사용
- option2: Ternary Operator 사용

```javascript
function printManager(person) {
  console.log(
  // person.job ? (person.job.manager ? (person.job.manager.name : undefined) :undefined )
     person.job
       ? person.job.manager
         ? person.job.manager.name 
         : undefined
       :undefined
  );
}
```

- option3: && 연산자 사용

```javascript
function printManager(person) {
  console.log( // 앞이 있으면 뒤에 거를 실행
    person.job && person.job.manager && person.job.manager.name
  );
}
```

- option3: ***Optional Chaining 사용***

```javascript
function printManager(person) {
  console.log(
    person.job ?.manager ?.name
  );
}
```

<br><br>

# Nullish Coalescing Operator

- false: false, '', 0, null, undefined
- OR 연산자: 앞이 false 일 때만, 뒤가 실행

```javascript
const name = null;
const userName = name || 'Guest';
```

- name이 null이나 아무 것도 없는 경우만 Guest를 할당하고 싶은데 `''` 문자열이 빈 경우나 `0`일 경우도 false로 간주

```javascript
const name = '';
const userName = name || 'Guest';
```

- 명확한 코딩: 아무런 값이 없을 때만 뒤 실행

```javascript
const name = '';
const userName = name ?? 'Guest';

const num = 0;
const userNum = num ?? 'undefined';
```

<br/>

## 최신 기능

### Numeric Seperator

- 큰 숫자를 보기 좋게 정렬하기

```js
const a = 24_949_394;
```

### replaceAll

- 문자열 변경이 한 번에 가능

```js
let text = "a_b_a_c_d";
text.replaceAll('a','t');
```

### Logical Assignment Operators

```js
// 변수가 거짓이 아니라면 변수가 업데이트 된다.
// old
let a = 1;
if(a) {
  a = 2;
}

// new
let a = 1;
a &&= 2;

// 변수가 참이 아니면 업데이트
// old
let a = false;
if(!a) {
  a = true;
}

// new
let a = false;
a ||= true;

// 변수가 Null/undefeind이면 업데이트
// old
let a = undefined;
if( a === undefeind ){
  a = 'hi';
}
//new
let a = undefined;
a ??= 'hi';
```

<br/>

### Toplevel await (ES2022)

- 이전에는 `await`를 `async` 함수 내에서 사용해야 했지만,
- 이제는 `async` 함수 없이 모듈에서 사용 가능

```js
// old
(async function() {
  await waitServer();
})();

// new
await waitServer();
```

### Error cause

- 오류의 내용을 설명해 더 나은 오류 메시지 생성

```js
// old
new Error("Can't save text");

// new
new Error("Can't save text", { cause: "Not allowed." });
const err = new Error("Can't save text", { cause: "DB is full." });
err.message;
err.cause;
```

### .at()

- 배열의 모든 인덱스에 액세스 가능
  - 대괄호와의 차이점: 뒤로 검색 가능
    - `-1`: 마지막 인덱스
    - `-2`: 뒤에서 2 번째 인덱스

```js
const number = [0, 1, 2, 3, 4, 5];
// old
number[2]
// new
number.at(2); // 2
number.at(-1); // 5
number.at(-2); // 5
```

### Class Field

- `private` 메서드, 프로퍼티를 가질 수 있다.

```js
// 초기화를 위해 `Construcor`을 사용하지 않아도 된다.
class message{
  constructor() {
    this.text = 'hi';
  }
}

//new
class Message {
  #text = "hi";
  #destuct() {
    console.log("boom");
  }
}

const btn = new Message();
btn.#destruct(); // error
btn.#text; // error
```

- `static` 메서드를 사용 가능

```js
//old
class Message {
  // ...
}
Message.build() {
  //...
}

// new
class Message {
  static build() {
    // ...
  }
  static #privateBuild() {
    // ...
  }
}
```


<br><br><br>
<출처>

- [드림코딩](https://www.youtube.com/watch?v=36HrZHzPeuY&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=23)
- [노마드 코더](https://www.youtube.com/shorts/yn32aDWUgZU)
