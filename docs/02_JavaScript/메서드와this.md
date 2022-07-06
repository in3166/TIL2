# 객체
- 사용자, 주문 등 실제 존재하는 개체(entity)를 표현하고자 할 때 생성
```js
let user = {
  name: "John",
  age: 30
};
```
<br>

# 메서드
- `객체 프로퍼티에 할당된 함수`
- 객체의 프로퍼티에 함수를 할당해 객체에게 행동할 수 있는 능력 부여
- 함수 표현식으로 프로퍼티 할당
```js
let user = {
  name: "John",
  age: 30
};

user.sayHi = function() {
  alert("안녕하세요!");
};

user.sayHi(); // 안녕하세요!
```

- 이미 정의된 함수를 프로퍼티 할당
```js
let user = {
  // ...
};

// 함수 선언
function sayHi() {
  alert("안녕하세요!");
};

// 선언된 함수를 메서드로 등록
user.sayHi = sayHi;

user.sayHi(); // 안녕하세요!
```
<br>

## 메서드 단축 구문
- 아래 두 객체는 동일하게 작동하지만 객체 상속 관련 미묘한 차이 존재
```js
user = {
  sayHi: function() {
    alert("Hello");
  }
};

// 단축 구문을 사용: function 생략
user = {
  sayHi() { // "sayHi: function()"과 동일합니다.
    alert("Hello");
  }
};
```
<br><br>

# 메서드와 this
- 메서드는 객체에 저장된 정보에 접근하여 제 역할을 한다.
- 메서드 내부에서 `this` 키워드를 사용하면 객체에 접근 가능
```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
    // 'this'는 '현재 객체'를 나타냅니다.
    alert(this.name);
  }
};

user.sayHi(); // John
```

- `this`를 사용하지 않고 외부 변수를 참조해 객체에 접근
  - 이런 방법은 에러 발생 가능: 객체 `user`를 복사해 다른 변수에 할당한다면 error
```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(user.name); // 'this' 대신 'user'를 이용함
  }
};


let admin = user;
user = null; // user를 null로 덮어씁니다.

admin.sayHi(); // sayHi()가 엉뚱한 객체를 참고하면서 에러가 발생했습니다.
```
<br>

## 자유로운 this
- 모든 함수에 `this`를 사용할 수 있다.
```js
function sayHi() {
  alert( this.name ); // 에러 발생 안함
}

- `this` 값은 런타임에 결정
- 컨텍스트에 따라 다름.
  - 동일한 함수라도 다른 객체에서 호출하면 `this`가 참조하는 값이 달라진다.\
```js
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 별개의 객체에서 동일한 함수를 사용함
user.f = sayHi;
admin.f = sayHi;

// 'this'는 '점(.) 앞의' 객체를 참조하기 때문에
// this 값이 달라짐
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (점과 대괄호는 동일하게 동작함)
```

### 객체 없이 호출하기 (this == undefined)
- 객체 없이 함수 호출 가능
```js
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```
- 엄격 모드에서 `this`는 `undefined`가 할당
- 비엄격 모드에선 전역 객체 참조 (`window`)
<br>

- 다른 언어 사용자는 `this`는 항상 메서드가 정의된 객체를 참조할 것이라 착각한다. (bound `this`)
- 자바스크립트의 `this`는 런타임에서 결정\
  - 메서드가 어디에 정의됐는지 상관없이 **점 앞의 객체가 무엇인가**에 따라 '자유롭게' 결정
  - 장점: 함수(메서드)를 하나 만들어 여러 객체에서 사용 가능
  - 단점: 유연함이 실수로 이어질 가능성

<br><br>

## this가 없는 화살표 함수
- 고유한 `this`가 없다.
- 화살표 함수에서 `this`를 참조하면, '평범한' 외부 함수에서 `this`를 가져온다.
```js
let user = {
    firstName: "보라",
    sayHi() {
      let arrow = () => console.log(this);
      arrow();
    },
    sayBye() {
        let il = function(){ console.log(this)};
        il();
      }
  };
  
  user.sayHi(); // [user] -   firstName: '보라', sayHi: [Function: sayHi], sayBye: [Function: sayBye]
  user.sayBye(); // [global]
```
<br><br>


## 문제1
```js
function makeUser() {
  return {
    name: "John",
    ref: this // 함수 자체를 바라봄
  };
};

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```
- `this` 값 설정 시 객체 정의가 사용되지 않았다.
- `this`는 호출 시점에 결정
- `makeUser()` 내 `this`는 `undefined`
  - 메서드로써 호출이 아니라 **함수로써 호출**
- `this`값은 전체 함수(global?)이고, 코드 블록과 객체 리터럴은 여기에 영햘을 주지 않는다.
- `ref: this`는 함수의 현재 `this`를 가져온다.

```js
// 결과 확인해보기
function makeUser() {
  console.log(this) // Object [global]
  return {
    name: "John",
    ref: this // 함수 자체를 바라봄
  };
};

let user = makeUser();

console.log( user ); 
// {
//   name: 'John',
// +  ref: Object [global]
// }
```

- 수정
  - `user.ref()`가 메서드가 되고 `this`는 앞 `.`의 객체가 된다.
```js
function makeUser() {
  return {
    name: "John",
    ref() {
      return this;
    }
  };
};

let user = makeUser();

alert( user.ref().name ); // John
```

## 문제2: 체이닝 기능 추가
```js
let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function() { // 사다리에서 몇 번째 단에 올라와 있는지 보여줌
    alert( this.step );
  }
};
```
```js
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    alert( this.step );
    return this;
  }
}

ladder.up().up().down().up().down().showStep(); // 1
```


<br><br><br>
<출처>
- https://ko.javascript.info/object-methods#ref-1861
