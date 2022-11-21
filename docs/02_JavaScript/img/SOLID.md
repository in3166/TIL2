# SOLID (5개의 객체지향 설계원칙)

- 소프트웨어는 끊임없이 변경된다.
- 요구사항과 환경이 매번 변하기 때문에 소프트웨어는 계속 발전해야 한다.
- 변경되는 과정 중 문제가 생길 수 있는데 이런 문제가 영향을 끼치는 범위를 최대한 좁혀야한다.
  - 즉, 그 문제가 다른 곳에 영향을 끼치면 안된다.
- 그래서, `SOLID` 원칙을 따라 프로그래밍을 하여 사전에 방지한다.

## SRP (Single Responsibility): 단일 책임 원칙

- 클래스(함수 ~~객체~~)는 단 한개의 책임을 가져야 한다.
- 클래스를 변경하는 이유는 단 하나여야 한다.
- 이를 지키지 않으면, 한 책임의 변경에 의해 다른 책임과 관련된 코드에 영향을 미칠 수 있다.
  - `A` 메서드의 결과를 기반으로 `B` 메서드를 호출하고, `B` 메서드 기반 `C`메서드를 호출할 때, `A` 메서드가 수정된다면 연쇄적으로 모두 수정해야할 수있다.
  - 이런 경우, 유지보수가 어려워진다.
<br/>

- 책임?
  - '기능'과 유사한 개념
  - 한 클래스가 수행할 수 있는 기능이 여러 개면 내부의 함수끼리 강한 결합을 발생할 수 있다.
  - 응집도는 높고 결합도는 낮아야 좋은 객체 지향 설계를 이룰 수 있다.
    - 응집도: 모듈 내부의 기능적인 집중 정도
    - 결합도: 모듈 간의 상호 의존 정도

- `SRP` 위반 코드

```js
function Employee(name, pos, hours) {
  this.name = name;
  this.pos = pos;
  this.hours = hours;
  // 급여 계산은 회계팀이 해야 한다.
  this.calculatePay = function() {
    // ...
  }
  // 인사 관리팀이 한다.
  this.reportHours = function() {
    // ...
  }
}
```

- `SRP` 원칙에 맞는 코드로 수정

```JS
function Employee(name, pos, hours) {
  this.name = name;
  this.pos = pos;
  this.hours = hours;
}
// 코드를 분리해준다.
function PayCalculator() {
  this.calculatePay = function() {
    // ...
  }
}
// ...
```

<br/>

## OCP (Open-Closed Principle): 개방-폐쇄 원칙

- 확장에는 열려있어야 하고, 변경에는 닫혀있어야 한다.
- 기존의 코드를 변경하지 않고 기능을 수정, 추가할 수 있어야 한다.
  - `.js` 소스 코드를 열어 수동으로 조작하지 않고도 기능을 확장할 수 있어야 한다.
  - 즉, 소프트웨어 개체가 확장성을 위해 개방적이어야 하고 기존 내부 코드의 변경이 일어나도 외부 코드의 변경은 없어야 한다.

- 추상화와 상속을 통해 구현 가능, 기존 코드의 수정 없이 기능 확장을 할 수 있게해 유연성을 높힌다.

- 예제1

```js
let roles = ['ceo', 'cto', 'cfo'];
// employee는 특정 권한을 확인하는 메서드
function checkRoles(employee) {
  if(roles.inculdes(employee.role)){
    return true;
  }
  return false;
}
// checkRoles에 영향을 미치지않고 새로운 기능을 추가
// 새로운 역할을 넣는 메서드
function addRole(role) {
  roles.push(role);
}
```

- 예제2

```JS
// BAD: 만약, 2배가 아닌 3배 혹은 다른 기능을 추가하려면 아래 함수를 수정해야 한다.
function getMutipledArray(array, option) {
  const result = []
  for (let i = 0; i < array.length; i++) {
    if (option === "doubled") {
      result[i] = array[i] * 2 
    }
  }
  return result
}

// Good
// option을 받는게 아니라 fn을 받는다.
// 이제 새로운 array를 만든다는 매커니즘은 닫혀있으나 방식에 대해서는 열려있다.
function map(array, fn) {
  const result = []
  for (let i = 0; i < array.length; i++) {
    // 내부 값을 외부로 전달하고 결과를 받아서 사용한다.
    result[i] = fn(array[i], i, array) 
  }
  return result
}

// 새로운 기능을 만들어도 map코드에는 영향이 없다.
const getDoubledArray = (array) => map(array, (x) => x * 2)
const getTripledArray = (array) => map(array, (x) => x * 3)
const getHalfArray = (array) => map(array, (x) => x / 2)
```

- 하나의 함수 안에서 **분기**가 만고 옵셕이 많다면 `SRP`나 `OCP`를 점검하자!

<br/>

## LSP (Liskov Substitution): 리스코프 치환 원칙

- 상속관계에서 즉, 부모 클래스와 자식 클래스 사이에는 일반화 관계가 성립해야한다. (일관성 있는 관계)
  - 하위 타입 객체는 상위 타입 객체에서 가능한 행위를 수행할 수 있어야 한다.
  - 즉, 상위 타입 객체를 하위 타입 객체로 **치환**해도 정삭 동작해야 한다.
  - 상속관계가 아닌 클래스들을 상속관계로 설정하면 안된다.

- 객체 지향에서 상속은 `IS-A` 관계를 성립해야 한다.
- 리스코프 치환 원칙은 상속을 받아 만든 하위 타입의 제약조건이 상위 타입에서 먼저 선언한 조건들과 충돌할 경우 유지보수가 힘들어진다.

<br/>

- Bad

```js
class Rectangle {
  constructor(
    protected width: number = 0,
    protected height: number = 0) {

  }

  render(area: number) {
    // ...
  }

  setWidth(width: number): this {
    this.width = width;
    return this;
  }

  setHeight(height: number): this {
    this.height = height;
    return this;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width: number): this {
    this.width = width;
    this.height = width;
    return this;
  }

  setHeight(height: number): this {
    this.width = height;
    this.height = height;
    return this;
  }
}

function renderLargeRectangles(rectangles: Rectangle[]) {
  rectangles.forEach((rectangle) => {
    const area = rectangle
      .setWidth(4)
      .setHeight(5)
      .getArea(); // BAD: Returns 25 for Square. Should be 20.
    rectangle.render(area);
  });
}
// 정사각형은 가로 세로가 같게 설정하게 되어 있어 오류 발생
const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);
```

- Good

```js
abstract class Shape {
  setColor(color: string): this {
    // ...
  }

  render(area: number) {
    // ...
  }

  abstract getArea(): number;
}

class Rectangle extends Shape {
  constructor(
    private readonly width = 0,
    private readonly height = 0) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(private readonly length: number) {
    super();
  }

  getArea(): number {
    return this.length * this.length;
  }
}

function renderLargeShapes(shapes: Shape[]) {
  shapes.forEach((shape) => {
    const area = shape.getArea();
    shape.render(area);
  });
}

const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
renderLargeShapes(shapes);
```

<br/>

## ISP (Interface Segregation): 인터페이스 분리 원칙

- 사용자가 필요하지 않은 것들에 의존하지 않도록, 인터페이스를 작게 유지해야 한다.
  - 클라이언트는 자신이 사용하는 메서드에만 의존해야 한다.

- 클래스는 자신이 사용하지 않는 인터페이스는 구현하지 않아야 한다.
  - 하나의 통합적인 인터페이스보다는 여러 개의 세부적인 인터페이스를 구현한다.
  - 클라이언트가 방대한 양의 옵션을 설정하지 않도록 하고 설정을 선택적으로 하여 무거운 인터페이스를 방지한다.

- 인터페이스는 해당 인터페이스를 사용하는 클라이언트를 기준으로 잘 분리해야 한다.

<br/>

- 함수형 프로그래밍에선 `interface` 당 함수가 1:1 관계이므로 ISP를 위반하기 어렵다.

- Bad

```js
interface SmartPrinter {
  print();
  fax();
  scan();
}

class AllInOnePrinter implements SmartPrinter {
  print() {
    // ...
  }  
  
  fax() {
    // ...
  }

  scan() {
    // ...
  }
}
```

- Good

```js
interface Printer {
  print();
}

interface Fax {
  fax();
}

interface Scanner {
  scan();
}

class AllInOnePrinter implements Printer, Fax, Scanner {
  print() {
    // ...
  }  
  
  fax() {
    // ...
  }

  scan() {
    // ...
  }
}
```

<br/>

## DIP (Dependecy Inversion): 의존성 역전 원칙

- **구체화에 의존하지 않고, 추상화에 의존해야한다.**
- 의존 관계를 맺을 때, 변하기 쉬운 것 보다는 어려운 것에 의존해야 한다.
  - 즉, 구체적인 것 보다는 추상적인 것에 의존
  - 구체화된 클래스 보다는 추상 클래스나 인터페이스에 의존

- 상위 모듈은 하위 모듈에 종석되어서는 안된다.
  - 즉, 상위 레벨 모듈이 하위 모듈의 세부사항에 의존하면 안된다.
- 추상화는 세부사항에 의존하지 않고 세부사항은 추상화에 의해 달라져야 한다.

<br/>
<br/>
<br/>

<출처>

- <https://velog.io/@haero_kim/SOLID-%EC%9B%90%EC%B9%99-%EC%96%B4%EB%A0%B5%EC%A7%80-%EC%95%8A%EB%8B%A4>
- <https://raisonde.tistory.com/entry/%EA%B2%B0%ED%95%A9%EB%8F%84Coupling%EA%B3%BC-%EC%9D%91%EC%A7%91%EB%8F%84Cohension>
- <https://velog.io/@hojin11choi/JS-Clean-Code-SOLID-Test>
- <https://github.com/labs42io/clean-code-typescript#liskov-substitution-principle-lsp>
