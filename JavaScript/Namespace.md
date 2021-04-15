# Namespace
- 이름이 존재하는 공간 (A지역 C와 B지역 C - 공간으로 식별), 다른 공간과의 분리
- 복잡한 프로그램을 개발, 협업을 하다보면 전역 범위에 이름이 같은 변수, 함수, 객체 등을 정의하는 경우가 발생
- 네임스페이스는 이러한 경우에 발생할 수 있는 충돌을 방지하기 위해 이름이 존재하는 공간을 정의하는 기능을 제공한다.
 
## C++의 Namespace
```c++
#include <iostream>
 
namespace A {
    void add() {
        std::cout << "call add() from A" << std::endl;
    }
}
 
namespace B {
    void add() {
        std::cout << "call add() from B" << std::endl;
    }
}
 
int main()
{
    A::add();
    B::add();
 
    return 0;
}
```


## Java의 Package
- 자바에서는 패키지 (package)라는 개념을 이용하여 네임스페이스 기능을 제공.
```java
package module1;
 
public class MyClass {
    public MyClass() {
        System.out.println("I'm from module1");
    }
}
```
```java
package module2;
 
public class MyClass {
    public MyClass() {
        System.out.println("I'm from module2");
    }
}
```
```java
package exec;
 
import module1.*;
import module2.*;
 
public class Main {
    public static void main(String[] args) {    
        MyClass mc = new MyClass();
    }
} // 오류 ->  import module1.MyClass처럼 명시적으로 어떠한 패키지의 MyClass를 포함할 것인지를 선언
```
<br>

## 자바스크립트와 네임스페이스
- 디자인 패턴을 이용 네임스페이스 기능 제공

## 객체 개념을 이용한 네임스페이스
```javascript
var MyModule = {};
var value = 1;
 
function callSender() {
    console.log('call sender');
}
 
MyModule.value = 5;
MyModule.callSender = function () {
    console.log('I am a sender.');
}
```
- 전역적으로 참조가 가능한 value라는 변수와 MyModule 네임스페이스를 갖는 value 선언, callSender()도 동일 
- 위와 동일
```javascript
var MyModule = {
    value1: 5,
    callSender: function () {
        console.log('I am a sender');
    }
}
```

### 네임스페이스는 객체의 이름이 충돌하는 것과 같이 네임스페이스의 이름 또한 충돌 가능. 
-  네임스페이스를 정의하기 전에 기존에 동일한 이름을 갖는 네임스페이스가 존재하는지를 검사하고, 동일한 이름을 갖는 네임스페이스가 없을 경우에만 네임스페이스를 정의한다.
```javascript
if (typeof MyModule === 'undefined') {
    var MyModule = {};
}
```
```javascript
var MyModule = MyModule || {};
```
<br>





<br><br>

# 전역 네임스페이스 오염 방지의 다른 방법들
## 1. var 사용
- 암묵적 전역(implied globals) - var없이 변수를 선언하거나 선언되지 않은 변수 사용하면 전역에 속한다
- 전역 변수가 아닌 전역 객체의 프로퍼티(property)로 생성
```javascript
var a = 1;
b = 2;
(function(){
  c = 3;
})();

delete a;
delete b;  // 프로퍼티는 삭제 가능
delete c; // 프로퍼티는 삭제 가능

console.log( typeof(a) ); // number
console.log( typeof(b) ); // undefined
console.log( typeof(c) ); // undefined
```
- 단일 var 패턴: 함수 상단에 var 선언을 하나만 쓰고 여러 개의 변수를 쉼표로 연결하여 선언
<br>

## 2. 즉시 실행 함수와 즉시 객체 초기화
### 즉시 실행 함수(IIFE, Immediately-Invoked Function Expression)
- 선언과 동시에 실행되므로 전역 변수를 만들지 않음

```javascript
console.log(typeof
 function() {
   var da = 1;
 }
); // function
```
- 전역 범위에 선언하면 전역 객체에 func라는 이름의 함수가 추가.

```javascript
console.log(typeof
 (function() {
   var da = 1;
 }())
); // undefined
```
- 함수가 즉시 실행되고 난 후에 전역에 남지 않고 바로 사라짐

### 즉시 객체 초기화 패턴
- 괄호로 묶어 바로 초기화하는 사용 방식, 전역 변수를 만들지 않음
- 단점: 즉시 실행 함수에 비해 JavaScript 압축 도구가 효과적으로 압축하지 못함.
```javascript
({
  // 속성 정의
  name: "text",
  
  // 객체 메서드 정의
  getName: function(){
   return this.name;
  },
  // 초기화 메서드 정의
  init: funtion (){
   console.log(this.getName());
  }
}).init();
```

- 위 두 가지의 남용은 메모리 낭비를 일으킴
- 할당없이 정의만 할 경우, 전역 네임스페이스는 건드리지 않지만 전역 실행 컨텍스트의 `temp=[]` 내에 'key-value'를 추가
- 이 영역은 어디에서도 접근 할 수 없어 신뢰성에 도움이 되지만 메모리가 

<br><br><br>
<출처>
- https://untitledtblog.tistory.com/106
- https://www.nextree.co.kr/p7650/
