# bind()

- bind() 메서드가 호출되면 새로운 함수 생성
- 받게되는 첫 인자의 value로 this 키워드 설정, 이어지는 인자들은 바인드된 함수의 인수에 제공
  
  - ***func.bind(thisArg[, arg1[, arg2[, ...]]])***
    - thisArg: 대상 함수의 this에 전달하는 값
    - 바인딩 함수를 new 연산자로 생성한 경우 무시
    - 반환값: 지정한 this 값 및 초기 인수를 사용하여 변경한 원본 함수의 복제본.

```javascript
const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
```

<출처>

- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind>
