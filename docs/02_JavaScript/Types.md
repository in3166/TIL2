# Primitive Types
```js
var age = 12;
var name = 'kim';
var male = true;
var un = undefined;
var nu = null;
```
- `age`는 Primitive Values


# Reference Type
- `Objects, Arrays`
```js
var person = {
  name: 'kim',
  age: 26,
}
var hobbies = ['football', 'bowling'];
```
<br>

## 차이점
### Memory Management
- Primitive values는 `Stack`에 Reference values는 `Heap`에 저장된다.
- `Stack`
  - 기본적으로 쉽게 접근할 수 있는 메모리로 a-well-stack으로 아이템들을 관리한다.
  - 오직 사전에 사이즈를 알고 있는 아이템들만 스택에 저장할 수 있다. (numbers, strings, booleans)
  
- `Heap`
  - 사전에 정확한 사이즈나 구조를 정할 수 없는 아이템들을 위한 메모리다.
  - Objects와 Arrays는 런타임에서 변경될 수 있기 때문에, `Heap`으로 가야한다.
  - 각각의 Heap 아이템들에 대해, 정확한 주소는 Heap에 저장된 아이템들을 가리키는 포인터에 저장된다.
  - 이 포인터는 차례로 스택에 저장된다.

<img src="https://github.com/in3166/TIL/blob/main/JavaScript/img/type1.png" width="60%" />

<br>

# Reference Types의 Strange Behavior
- 다음의 예제에서 `person` 변수가 실제로 저장하는 것은 무엇인가?
  - 변수에 저장된 `person` 객체의 포인터이다.
```js
var person = { name: 'Max' }
```

- 아래의 `newPerson`은 `person` 객체 자체를 복사한 것이 아니다.
  - 포인터만 복사
```js
var person = { name: 'Max' }
var newPerson = person
newPerson.name = 'Anna'
console.log(person.name) // Anna
```

### 실제 값을 어떻게 복사하는가? (얕은 복사)
- 배열
  - `slice()`
    - 새로운 배열을 반환하는 자바스크립트 배열 메서드
  ```js
  var hobbies = ['Sports', 'Cooking']
  var copiedHobbies = hobbies.slice()
  ```
  
  - `the spread operator`
  ```js
  var hobbies = ['Sports', 'Cooking']
  var copiedHobbies = [...hobbies]
  ```

- 객체
  - `Object.assign()`
  ```js
  var person = { name: 'Max' }
  var copiedPerson = Object.assign({}, person)
  ```
 
  - `the spread operator`
  ```js
  var person = { name: 'Max' }
  var copiedPerson = { ...person }
  ```
  
### Deep Clone
- https://redux.js.org/usage/structuring-reducers/immutable-update-patterns#immutable-update-patterns


<br><br><br>
<출처>
- https://academind.com/tutorials/reference-vs-primitive-values
