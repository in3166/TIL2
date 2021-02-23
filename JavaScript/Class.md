# Class 정의
- 객체를 생성하기 위한 템플릿
- 데이터와 이를 조작하는 코드를 하나로 추상화

## Class 선언
- class 키워드 사용
```javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```
  ### Hoisting
  - class 선언은 `호이스팅`이 일어나지 않는다.
  - class 사용을 위해선 먼저 선언해야 한다.
  ```javscript
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
- class body는 strict mode에서 실행된다.

## Constructor
- `class`로 생성된 객체를 생성하고 초기화하기 위한 특수한 메서드
- class 안에 한 개만 존재
- 부모 클래스의 constructor를 호출하기 위해 `super`키워드 사용할 수 있다.

## 프로토타입 메서드
  ### ECMAScript2015 부터 객체 초기자(initializer)에 메서드 정의를 위한 짧은 구문 도입
  - 이전
  ```javscript
  var obj = {
    foo: function() {},
    bar: function() {}
  };
  ```
  - 이후
  ```javscript
  var obj = {
    foo() {},
    bar() {}
  };
  ```
  - 단축 구문 속성 계산명 지원
  ```javascript
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
```javsacript
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

## 정적 메서드와 속성
- 정적 메서드는 `static` 키워드로 생성, 클래스의 인스턴스화 없이 호출, 인스턴스에선 호출 불가
- 정적 메서드는 애플리케이션을 위한 유틸리티 함수 생성에 주로 사용
- 정적 속성은 캐시, 고정 환경설정, 인스턴스 간 복제할 필요없는 기타 데이터에 유용
```javscript
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
```javascript
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
```javascript
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
```javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```
- 정적 속성과 프로토타입 데이터 속성은 반드시 클래스 선언부 바깥쪽에서 정의
```javascript
Rectangle.staticWidth = 20;
Rectangle.prototype.prototypeWidth = 25;
```

```
Class.method = function () { /* code */ }  // static 처럼 여겨도 된다. (클래스 메서드, 정적 메서드)
Class.prototype.method = function () { /* code using this.values */ } (인스턴스 메서드)
```

```
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

``` 
function Class () {
      this.method = function () { /* do something with the private members */};
   }
```
- 클래스 메서드: 함수/클래스 내부에서 정의, 클래스 이름으로 접근 불가, 인스턴스 생성해야 함, unique 복사본을 생성(모든 객체마다),  생성자 함수(여기서 클래스) 내에 선언된 로컬 멤버에 액세스할 수 있는 전체 권한을 가짐


<br>

## Field 선언
`실험적 기능 - Babel 같은 build 시스템 사용시 사용 가능`
## Public 필드 선언
## Private 필드 선언

<br><br>

## extends를 통한 클래스 상속 (sub classing)
- ***subclass에서 constuctor가 있다면, 'this'를 사용하기 전 super() 호출 필수***


## Species


## super를 통한 상위 클래스 호출


## Mix-ins


## 클래스 재정의




<br><br><br>
<출처>
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes
