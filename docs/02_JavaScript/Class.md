# 기존 생성자 함수

```js
function Vehicle(make, model, color) {
  this.make = make,
  this.model = model,
  this.color = color,
  this.getName = function () {
    return this.make + " " + this.model;
  }
}

let car = new Vehicle("Toyota", "Corolla", "Black");
let car2 = new Vehicle("Honda", "Civic", "White");
```

- 클래스의 생성자와 거의 흡사한 기능 제공
- 문제점
  - `new Vehicle` 사용 시 JS 엔진은 각 오브젝트에 대해 `Vehicle` 생성자 함수를 복사 (모든 프로퍼티, 메서드가 새로운 Instance에 복사)
  - => 중복된 코드를 계속 생성
  - 새로운 프로퍼티나 메서드를 기존 생성자 함수에 추가 불가.

  ```js
  car2.year = "2012"
  // (역자 주: 댓글에 이 부분을 지적하는 사람이 있었습니다. 
  // '멀쩡하게 동작하는데 왜 동작이 안된다고 했느냐, 무슨 의미냐'라는 식으로 물었고
  // 저자는 '존재하는 오브젝트에는 가능하지만 생성자 함수에는 추가할 수 없다'라고 하였습니다.) 
  // => 함수 자체에 직접 추가해야한다
  ```

<br>

## Prototype
- 새로운 함수가 만들어지면 JS 엔진은 기본으로 `prototype` 프로퍼티(prototype object)를 추가
- `Prototype` 객체는 우리 함수를 다시 가리키는 생성자 프로퍼티와 또 다른 프로퍼티 `__proto__`객체를 가진다.

```
> Vehicle.prototype
- {consturctor: f}
  - constructor: f Vehicle(make,, model, color)
  - __proto__: Object
```

- `__proto__` 프러퍼티는 'dunder proto'라고 불리고 우리의 생성자 함수의 프로퍼티를 가리킨다.
- 생성자 함수의 새로운 인스턴스가 생성될 때마다, 다른 프로퍼티와 메서드와 함께 이 프로퍼티(`__proto__`)도 인스턴스에 복사된다.

```
var car = new Vehicle("KIA", "CLK22", "Black")
> car
> - Vehicle {make: "KIA", model: "CLK22", color: "Black", getName: f}
     - color: "Black"
     - getName: f ()
     - make: "KIA"
     - modle: "CLK22"
     - __proto__: Object
```

- 이 `__proto__` 객체는 생성자 함수에 새로운 프로퍼티, 메서드를 추가하기 위해 사용 가능

```js
car.__proto__.year = "2014";
```


### Prototype 사용 유의점
- 프로토타입 프로퍼티와 메서드는 모든 생성자 함수 인스턴스 간 공유되지만 한 인스턴스가 어떤 프리미티브 프로퍼티를 변경하면 해당 인스턴스만 반영된다.
- 참조 타입 프로퍼티는 항상 모든 인스턴스 사이에서 공유된다.
  - 배열 타입 프로퍼티는 한 인스턴스가 수정하면 모든 인스턴스에 대해 수정된다.

<br><br><br> 

# Class 정의
- 객체를 생성하기 위한 템플릿
- 데이터와 이를 조작하는 코드를 하나로 추상화
- 함수의 한 종류

<br>
  
## Class 선언
- class 키워드 사용

```javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  sayHi() { alert(this.name); }
}
```

- `Rectangle`이라는 이름을 가진 함수를 만든다. 함수 본문은 생성자 메서드 `constructor`에서 가져온다.
- `sayHi()`같은 클래스 내에서 정의한 메서드를 `Rectangle.Prototype`에 저장한다.
  
  - `new Rectangle`를 호출해 객체를 만들고, 객체의 메서드를 호출하면 함수의 prototype 프로퍼티에서 메서드를 프로토타입에서 가져온다.
  <img src="https://github.com/in3166/TIL/blob/main/JavaScript/img/class-1.JPG" />

  ```js
  // 클래스는 함수입니다.
  alert(typeof User); // function

  // 정확히는 생성자 메서드와 동일합니다.
  alert(Rectangle === Rectangle.prototype.constructor); // true

  // 클래스 내부에서 정의한 메서드는 Rectangle.prototype에 저장됩니다.
  alert(Rectangle.prototype.sayHi); // alert(this.name);

  // 현재 프로토타입에는 메서드가 두 개입니다.
  alert(Object.getOwnPropertyNames(Rectangle.prototype)); // constructor, sayHi
  ```
  
  ### Hoisting
  - class 선언은 `호이스팅`이 일어나지 않는다.
  - class 사용을 위해선 먼저 선언해야 한다.

  ```js
  //Error
  const p = new Rectangle(); // ReferenceError
  class Rectangle {}
  ```

## Class 표현식
- class 정의의 다른 방식
- 이름을 가질 수도 있고 갖지 않을 수도 있다.
- class 표현식의 이름은 클래스 body의 local scope에 한해 유효하지만 클래스의 `name`속성을 통해 찾을 수 있다.

```javascript
// unnamed
let Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name); // "Rectangle"

// named
let Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name); // "Rectangle2"
```

<br><br>

# Class body 와 메서드 정의
- class body: 중괄호 `{}`로 묶인 내부
- 메서드, constructor와 같은 class 멤버 정의하는 부분

## Strict Mode
- class body는 항상 `strict mode`에서 실행된다.

## Constructor
- `class`로 생성된 객체를 생성하고 초기화하기 위한 특수한 메서드
- `class` 안에 한 개만 존재 (존재하지 않으면 자동으로 빈 `constuctor` 생성)
- 부모 클래스의 `constructor`를 호출하기 위해 `super`키워드 사용할 수 있다.
- 작동을 위해 `new` 키워드가 반드시 필요
  - 기존 생성자 함수는 `let car = Vehicle("a", "b")`처럼 사용이 가능했지만 class는 불가


<br>

## 프로토타입 메서드
- 클래스 메서드는 `enumerable`하지 않다.
- 메서드 사이엔 `,` (쉼표)가 없다.

### ECMAScript2015 부터 객체 초기자(initializer)에 메서드 정의를 위한 짧은 구문 도입
  - 이전

  ```js
  var obj = {
    foo: function() {},
    bar: function() {}
  };
  ```

  - 이후

  ```js
  var obj = {
    foo() {},
    bar() {}
  };
  ```

  - 단축 구문 속성 계산명 지원

  ```js
  var bar = {
    foo0 : function (){return 0;},
    foo1(){return 1;},
    ["foo" + 2](){return 2;},
  };

  console.log(bar.foo0()); // 0
  console.log(bar.foo1()); // 1
  console.log(bar.foo2()); // 2
  ```
  
- class 프로토타입 메서드

```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // 메서드
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);
console.log(square.area); // 100
```

<br>

## Getter/Setter
- 프로퍼티의 값을 가져오거나 설정

```js
class Vehicle {
    constructor(model) {
        this.model = model;
    }
    
    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
    }
}
```

<br>

## Subclassing

```js
class Vehicle {
    constructor(make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    }

    getName() {
        return this.make + " " + this.model;
    }
}

class Car extends Vehicle{
    getName(){
        return this.make + " " + this.model +" in child class.";
    }
}

let car = new Car("Honda", "Accord", "Purple");

car.getName(); // "Honda Accord in child class."
```

- `getName()` 자식 클래스에서 호출
- 베이스 클래스에서 호출하기 위해선 `super` 사용

<br>

## 정적 메서드와 속성
- 정적 메서드는 `static` 키워드로 생성, 클래스의 **인스턴스화 없이 호출**, **인스턴스에선 호출 불가**
- 정적 메서드는 애플리케이션을 위한 유틸리티 함수 생성에 주로 사용
- 정적 속성은 캐시, 고정 환경설정, 인스턴스 간 복제할 필요없는 기타 데이터에 유용

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static displayName = "Point";
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.displayName; // undefined
p1.distance;    // undefined
p2.displayName; // undefined
p2.distance;    // undefined

console.log(Point.displayName);      // "Point"
console.log(Point.distance(p1, p2)); // 7.0710678118654755  - p1의 값, p2의 값 각각 사용 가능
```


## 프로토타입 및 정적 메서드를 사용한 this 바인딩
- 정적 메서드나 프로토타입 메서드가 `this`값 없이 호출되면, `this` 값은 메서드 안에서 `undefined`

```js
class Animal {
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
}

let obj = new Animal();
obj.speak(); // the Animal object
let speak = obj.speak;
speak(); // undefined

Animal.eat() // class Animal
let eat = Animal.eat;
eat(); // undefined
```

- non-strict mode 실행 시 `this`는 자동으로 전역 객체에 바인딩되지만 strict mode는 자동 바인딩 x

```js
function Animal() { }

Animal.prototype.speak = function() {
  return this;
}

Animal.eat = function() {
  return this;
}

let obj = new Animal();
let speak = obj.speak;
speak(); // global object (in non–strict mode)

let eat = Animal.eat;
eat(); // global object (in non-strict mode)
```


## 인스턴스 속성
-인스턴스 속성은 반드시 클래스 메서드 내에 정의

```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

- 정적 속성과 프로토타입 데이터 속성은 반드시 클래스 선언부 바깥쪽에서 정의

```js
Rectangle.staticWidth = 20;
Rectangle.prototype.prototypeWidth = 25;
```

```js
Class.method = function () { /* code */ }  // static 처럼 여겨도 된다. (클래스 메서드, 정적 메서드)
Class.prototype.method = function () { /* code using this.values */ } (인스턴스 메서드)
```

```js
class User {
  static staticMethod() {
    alert(this === User);
  }
}
```

- 정적 메서드는 메서드를 프로퍼티 형태로 직접 할당하는 것과 동일
`Class.method = function () { /* code */ }` 
- 정적 메서드: 클래스 이름(함수 이름)으로 호출할 수 있고 인스터스를 만들 필요없다., 


`Class.prototype.method = function () { /* code using this.values */ }`
- 프로토타입 메서드: 모든 인스턴스가 공유하는 메서드, 클래스이름, 인스턴스 이름으로 접근 가능, 단 하나의 메서드 복사본(메모리에)을 생성

```js
function Class () {
      this.method = function () { /* do something with the private members */};
   }
```

- 클래스 메서드: 함수/클래스 내부에서 정의, 클래스 이름으로 접근 불가, 인스턴스 생성해야 함, unique 복사본을 생성(모든 객체마다),  생성자 함수(여기서 클래스) 내에 선언된 로컬 멤버에 액세스할 수 있는 전체 권한을 가짐


<br>

## Field 선언
`실험적 기능 - Babel 같은 build 시스템 사용시 사용 가능`
- 구식 브라우저 폴리필 필요
- class filed, 어떤 종류의 프로퍼티도 클래스에 추가 가능

- `<프로퍼티 이름> = <값>`

```javascript
class User{
  name = 'John';
  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi(); // hello john
```

- `User.prototype`이 아닌 **개별 객체에만 클래스 필드가 설정**된다.

```javascript
class User {
  name = "John";
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

- 복잡한 표현식이나 함수 호출 결과를 사용할 수 있다.

```js
class User {
  name = prompt("이름을 알려주세요.", "보라");
}

let user = new User();
alert(user.name); // 보라
```

<br>

## 클래스 필드로 바인딩 된 메서드 만들기
- 자바스크립트 함수는 동적인 `this`를 가지므로 객체 메서드를 전혀 다른 컨텍스트에서 호출하면 원래 객체를 참조하지 않는다.
- '잃어버린 `this`', `this`의 컨텍스트를 알 수 없다.

```js
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");
setTimeout(button.click, 1000); // undefined
```

### 해결법: 함수 바인딩에서 해결 방법
- 1. wrapper: `setTimeout(() => button.click(), 1000)`

  ```javascript
  setTimeout(function() {
    user.sayHi(); // Hello, John!
  }, 1000);
  ```

  ```javascript
  setTimeout(() => user.sayHi(), 1000); // Hello, John!
  ```

  - 외부 렉시컬 환경에서 `user`를 받아서 보통 때처럼 메서드 호출했기 때문에 동작
  - 1초가 지나기 전 `user`가 변경되면 변경된 객체의 메서드를 호출하는 문제
  
- 2. 생성자 안 등에서 메서드를 객체에 바인딩

### 해결법: 클래스 필드에서 해결 방법

```js
class Button {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    alert(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

- 클래스 필드 `click = () => {...}`는 각 `Button` 객체마다 독립적인 함수를 만들고 함수의 `this`를 해당 객체에 바인딩

<br><br><br>


# 클래스는 순수 함수 (생성자 함수)의 편의 문법이 아니다.
- 편의 문법(syntactic sugar, 문법 설탕): 기존 문법을 쉽게 읽을 수 있게 만든 문법

```javascript
function User(name) {
  this.name = name;
}

// 모든 함수의 프로토타입은 'constructor' 프로퍼티를 기본으로 갖고 있기 때문에
// constructor 프로퍼티를 명시적으로 만들 필요가 없습니다.

// 2. prototype에 메서드를 추가합니다.
User.prototype.sayHi = function() {
  alert(this.name);
};

// 사용법:
let user = new User("John");
user.sayHi();
```

### 두 방법의 중요 차이
- class 특수 내부 프로퍼티 존재
  - `class`로 만든 함수엔 특수 내부 프로퍼티인 `[[FunctionKind]]:"classConstructor"`가 이름표처럼 붙는다.
  - 자바스크립트는 다양한 방법을 사용해 함수에 `[[FunctionKind]]:"classConstructor"`가 있는지를 확인한다.
  - 이런 검증 과정이 있기 때문에 클래스 생성자를 `new`와 함께 호출하지 않으면 에러가 발생합니다.

- 클래스 메서드는 열거할 수 없음 (non-enumerable)
  - 클래스의 `prototype` 프로퍼티에 추가된 메서드 전체의 `enumerable` 플래그는 `false`
  - `for-in`으로 객체 순회 시, 메서드 제외하고자 할 때 유용

- 클래스는 `엄격 모드`로 실행(use strict). 클래스 생성자 안 코드 전체엔 자동으로 엄격 모드가 적용된다.

<br><br>

## Class 표현식
- 함수처럼 다른 표현식 내부에서 정의, 전달, 반환, 할당 가능
- 클래스 표현식

```js
let User = class {
  sayHi() {
    alert("Hello");
  }
};
```

- 기명 함수 표현식과 유사하게 클래스 표현식에도 이름 설정 가능 -> 클래스 내부에서만 사용 가능

```js
// 기명 클래스 표현식(Named Class Expression)
// (명세서엔 없는 용어이지만, 기명 함수 표현식과 유사하게 동작합니다.)
let User = class MyClass {
  sayHi() {
    alert(MyClass); // MyClass라는 이름은 오직 클래스 안에서만 사용할 수 있습니다.
  }
};

new User().sayHi(); // 제대로 동작합니다(MyClass의 정의를 보여줌).

alert(MyClass); // ReferenceError: MyClass is not defined, MyClass는 클래스 밖에서 사용할 수 없습니다.
```


- 클래스 동적 생성도 가능

```js
function makeClass(phrase) {
  // 클래스를 선언하고 이를 반환함
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}

// 새로운 클래스를 만듦
let User = makeClass("Hello");

new User().sayHi(); // Hello
```

<br><br>

# Private, Protected 프로퍼티와 메서드
- OOP의 중요한 점 중 하나 '내부 인터페이스와 외부 인터페이스의 구분'
- 커피머신: 몇가지 버튼이면 동작, 내부 구조는 복잡
<br>

- 내부 인터페이스(internal interface): 동일한 클래스 내 다른 메서드에선 접근 가능, 클래스 밖에서 접근 불가한 프로퍼티와 메서드
- 외부 인터페이스(external interface): 클래스 밖에서도 접근 가능한 프로퍼티와 메서드

### 자바스크립트 두 가지 타입 객체 필드(프로퍼티와 메서드)
- public: 어디서든 접근 가능, 외부 인터페이스 구성
- private: 클래스 내부에서만 접근 가능, 내부 인터페이스 구성

- JS 이외의 다수의 언어에서 클래스 자신과 자손 클래스에서만 접근 가능한 `protected` 필드를 지원

<br><br>

## 프로퍼티 보호하기 (커피 머신 구현)

```js
class CoffeeMachine {
  waterAmount = 0;
  
  constructor(power){
    this.power = power;
    alert(`전력량이 ${power}인 커피머신을 만듭니다.`);
  }
}
// 커피머신 생성
let coffeeMachine = new CoffeeMachine(100);

// 물 추가
coffeeMachine.waterAmout = 200;
```

- pubilc인 `waterAmout`를 'protected'로 바꿔 통제 ('0' 미만 설정 불가하게)
- **protected 프로퍼티 명 앞에 '_'이 붙는다.** (외부 접근이 불가한 필드 표시)

```js
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }
}

// 커피 머신 생성
let coffeeMachine = new CoffeeMachine(100);

// 물 추가
coffeeMachine.waterAmount = -10; // Error: 물의 양은 음수가 될 수 없습니다.
```

## 읽기 전용 프로퍼티
- 프로퍼티 생성 시에만 값을 할당 가능하고 그 후 수정 불가
- setter는 생성하지 않고 getter만 생성

```js
class CoffeeMachine {
  // ...
  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }
}

// 커피 머신 생성
let coffeeMachine = new CoffeeMachine(100);

alert(`전력량이 ${coffeeMachine.power}인 커피머신을 만듭니다.`); // 전력량이 100인 커피머신을 만듭니다.

coffeeMachine.power = 25; // Error (setter 없음)
```

- `getter` / `setter` 함수
  - 위 처럼 get, set 문법으로 만들 수 도 있지만 아래 형식 선호

  ```js
  class CoffeeMachine {
    _waterAmount = 0;

    setWaterAmount(value) { // 다수의 인자 받을 수 있게된다!
      if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
      this._waterAmount = value;
    }

    getWaterAmount() {
      return this._waterAmount;
    }
  }

  new CoffeeMachine().setWaterAmount(100);
  ```
  
- `protected` 필드는 상속된다.
  - `class MegaMachine extends CoffeeMachine`로 클래스를 상속
  - 새로운 클래스 메서드에서 `this._waterAmount`나 `this._power`를 사용해 접근 가능

- `private` 프로퍼티
  - 스펙에 최근 추가, 지원안되는 엔진 존재 - 폴리필을 구현
  - `#`으로 시작, 클래스 안에서만 접근 가능
  - `#waterLimit`: 물 용량 한도 프로퍼티, `#checkWater`: 물 양 확인 메서드

  ```js
  class CoffeeMachine {
    #waterLimit = 200;

    #checkWater(value) {
      if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
      if (value > this.#waterLimit) throw new Error("물이 용량을 초과합니다.");
    }
  }

  let coffeeMachine = new CoffeeMachine();

  // 클래스 외부에서 private에 접근할 수 없음
  coffeeMachine.#checkWater(); // Error
  coffeeMachine.#waterLimit = 1000; // Error
  ```
  
- 자손 클래스에서 직접 접근 불가

```js
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
    alert( this.#waterAmount ); // Error: CoffeeMachine을 통해서만 접근할 수 있습니다.
  }
}
```


<br><br><br>

<출처>
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes
- https://ko.javascript.info/class
- https://velog.io/@jakeseo_me/2019-05-03-1005-%EC%9E%91%EC%84%B1%EB%90%A8-evjv7dy8vh
- https://ko.javascript.info/private-protected-properties-methods
