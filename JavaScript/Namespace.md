# Namespace
- 이름이 존재하는 공간 (A지역 C와 B지역 C - 공간으로 식별)
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
 
window.onload = function () {
    console.log(value);
    console.log(MyModule.value);
    callSender();
    MyModule.callSender();
}
```

[코드 5]의 실행 결과는 아래의 [그림 1]과 같다. [코드 5]의 2번째 줄에서는 전역적으로 참조가 가능한 value라는 변수를 선언하고, 1이라는 값을 할당하였다. 그 다음, 8번째 줄에서는 MyModule이라는 네임스페이스를 갖는 value라는 변수를 선언하고, 5라는 값을 할당하였다. 4번째 줄과 9번째 줄의 callSender()라는 함수 또한 하나는 전역 참조가 가능하도록, 나머지 하나는 MyModule이라는 네임스페이스를 갖도록 선언하였다.


자바스크립트에서는 네임스페이스를 구현하기 위해 여러 디자인 패턴을 사용할 수 있다. 아래의 [코드 6]은 [코드 5]에서 네임스페이스 MyModule을 정의하는 코드와 동일하다.
```javascript
var MyModule = {
    value1: 5,
    callSender: function () {
        console.log('I am a sender');
    }
}
```





그러나 [코드 5, 6]과 같이 객체의 개념을 이용하여 구현하는 네임스페이스는 객체의 이름이 충돌하는 것과 같이 네임스페이스의 이름 또한 충돌할 수 있다. 이러한 네임스페이스 간의 충돌을 방지하기 위해 [코드 7]과 같이 네임스페이스를 정의할 수 있다. [코드 7]에서는 네임스페이스를 정의하기 전에 기존에 동일한 이름을 갖는 네임스페이스가 존재하는지를 검사하고, 동일한 이름을 갖는 네임스페이스가 없을 경우에만 네임스페이스를 정의한다.




```javascript
if (typeof MyModule === 'undefined') {
    var MyModule = {};
}
```
```javascript
var MyModule = MyModule || {};
```

<br><br><br>
<출처>
- https://untitledtblog.tistory.com/106
