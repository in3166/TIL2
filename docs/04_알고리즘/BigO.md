# Big O
- 시간 복잡도 표기법
- 알고리즘 스피드는 '완료까지 걸리는 절차의 수'로 결정
- 실제 시간을 측정하지 않는다.

- 선형 검색
  - 'itme'을 하나씩 검색 - 데이터가 10개면 10개를 검색 (10 steps)
  - Input size가 `N` 개이면 `N steps`이 요구된다.
  - 즉, 선형 검색의 알고리즘은 시간복잡도는 `O(N)`

## Constant time (상수 시간)
- `O(1)`
- Input size에 상관없이 동일한 수의 step이 필요
- 프린트하는 코드가 여러 줄 있어도 시간 복잡도는 `O(1)`로 동일
  - BigO는 함수가 Input size에 따라 함수가 어떻게 작동하는지에 관심이 있다.
```js
function printArray(arr) {
  console.log( arr[0] );  
}
```

## O(N)
- Input size와 동일하게 step이 필요
```js
function printAll(arr) {
  for( i of arr) {
    console.log(i);
  }
  for( i of arr) {
    console.log(i);
  }
}
```

## Quadratic Time (2차 시)
- Nested Loops (중첩 반복)이 있을 때 발생
- `O(N^2)`
```js
function printAll(arr) {
  for( i of arr) {
    for( j of arr) {
      console.log(i, j);
    }
  }
}
```

## Logarithmic Time (로그 시간)
- `O(log N)`
- 주로 이진검색 알고리즘 설명 시 사용
- 이진 검색은 기존 Input이 2배로 들어나도 step은 `+1`만 된다.
  - 이진 검색은 Input을 반으로 나누고 시작 (10개에서 20개로 증가해도 10 / 10 로 나누는 단계 하나만 추가하면 된다.)
  - 이진 검색은 정렬되지 않은 배열엔 사용 불가!

<br><br><br>
<출처>
- https://www.youtube.com/watch?v=BEVnxbxBqi8
