# Generator
- 일반 함수는 하나의 값(or 0) 반환
- 제너레이터는 여러 개의 값을 필요에 따라 하나씩 반환(yield) 가능
- 제너레이터와 이터러블 객체를 사용하면 데이터 스트림 생성 가능

## Generator 함수
- 제너레이터를 만들기 위해 '제너레이터 함수'라는 특별한 문법 구조 `function*`이 필요
```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```






<br><br><br>
<출처>
- https://ko.javascript.info/generators
