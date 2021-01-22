# 1. reduce()
- 배열을 순회하며 인덱스 데이터를 줄여가며 어떠한 기능 수행
- 인자 2개: callback 함수, initValue(선택)
  - callback 함수의 인자 4개
    - initalValue: reduce()의 두번째 인자 initValue 값이 넘어옴
    - currentValue: numberList 첫번째 데이터 넘어옴 (1)
    - currentIndex: reduce()의 두번째 인자인 initValue 사용 여부에 따라 값이 달라짐 (사용:0, 미사용:1 부터 시작)
    - array: reduce()가 호출된 배열 (numberList)
    
  - 예제1: 1~10 더하기
  ```javascript
  const numberList = [1,2,3,4,5,6,7,8,9,10];
  const initValue = 0;
  
  const totalResult = numverList.reduce((initialValue, currentValue, currentIndex, array) => {
    return initialValue + currentValue;
  }, initValue);
  ```
  
  - 예제2: 과일 수량 계산
  ```javascript
  const fruit = ['apple', 'grape', 'banana', 'apple', 'orange', 'grape', 'apple', 'orange'];
  // 빈 객체와 fruit 배열 넘겨줌
  const result = fruit.reduce((object, currentValue) => {
      if (!object[currentValue]) {  // object의 현재 currentValue(배열 차례대로)가 비어있다면  
          object[currentValue] = 0; //초기화 해주고
      }
      object[currentValue]++;  // 추가해준다.
   
      return object;  // 그 객체를 다시 반환
  }, {});
 
  console.debug(result);
  ```
  
   - 예제3: 학생들의 평균 계산
  ```javascript
   class Student {
     constructor(name, age, enrolled, score) {
         this.name = name;
         this.age = age;
         this.enrolled = enrolled;
         this.score = score;
      }
   }
   const students = [
       new Student('A', 29, true, 45),
       new Student('B', 28, false, 80),
       new Student('C', 30, true, 90),
       new Student('D', 40, false, 66),
       new Student('E', 18, true, 88)
       ];
  // Q9. compute students' average score
  {
      const result = students.reduce((st1, st2, index) => {
          st1 += st2.score;
          return st1; // st1 + st2.scrote
      }, 0);
      console.log(result)
  }
  ```
  
  
# 2. some()
***array.some(callbackFunction(currentValue, index, array), thisArg)***

- 배열의 요소 중 하나라도 callbackFunction에서 true를 리턴하면 true를 리턴
- 배열 내 값 존재 여부, 조건에 맞는 값 존재 여부
- callbackFunction, thisArg 두개의 매개변수
- callbackFunction
  - currentValue : 배열의 현재 값
  - index : 배열의 현재 값의 인덱스
  - array : 현재 배열
- 
# 2-2. every() 
***array.every(callbackFunction(currentValue, index, array), thisArg)***

- 배열의 모든 요소가 callbackFunction 에서 true를 리턴해야 true를 리턴, 하나라도 false가 떨어지면 false를 리턴

- 예제1
```javascript
(function test(){
    var testArray = [1,2,3,4,5];
    var resultArray = [];
    function underThree(value){
        return (value<3) ? true : false;
    }
    function underTen(value){
        return (value<10) ? true : false;
    }
 
    resultArray.push(testArray.every(underThree)); // F
    resultArray.push(testArray.every(underTen));  // T
    resultArray.push(testArray.some(underThree));  // T
    resultArray.push(testArray.some(underTen));  // T
})(); 
```

- 예제2
```javascript
// Q8. check if there is a student with the score lower than 50
{
    const result = students.some((student) => student.score < 50);
    console.log(result);
}
```


# 3. find()
***arr.find(callback(element[, index[, array]])[, thisArg])***

- 특정 값 찾는 조건 callback 함수로 전달
- 조건에 맞는 값 중 첫번째 값 리턴
- 만족하는 값이 없으면 undefined
- 콜백함수의 인자 3개
  - element: 현재 처리중인 배열의 element
  - index: 현재 처리중인 배열의 index (선택)
  - array: find()가 호출된 배열 (선택)
- thisArg: callback 실행 시 this로 사용할 객체
- callback 함수가 true를 리턴하면 해당 배열의 값 리턴

- 예제1: name이 apple인 
```javascript
const arr = [
  {name: 'apple', price : 1000}, 
  {name: 'banana', price : 2000},
  {name: 'apple', price: 3000}
];

function isApple(element)  {
  if(element.name === 'apple')  {
    return true;
  }
}

const apple = arr.find(isApple);
document.writeln(apple.name); // apple
document.writeln(apple.price); // 1000
```

- 예제2: 학생들 중 점수가 90인 학생 찾기
```javascript
 class Student {
     constructor(name, age, enrolled, score) {
         this.name = name;
         this.age = age;
         this.enrolled = enrolled;
         this.score = score;
      }
   }
   const students = [
       new Student('A', 29, true, 45),
       new Student('B', 28, false, 80),
       new Student('C', 30, true, 90),
       new Student('D', 40, false, 66),
       new Student('E', 18, true, 88)
       ];

{
    // console.log(students.forEach((s) => { if (s.score === 90) { console.log(s); break; } }))
    const result = students.find((value) => value.score === 90);
    console.log(result);
}
```

# 4. filter()
***arr.filter(callback(element[, index[, array]])[, thisArg])***

- 특정 조건에 만족하는 배열의 모든 값을 배열 형태로 리턴
- - 콜백함수의 인자 3개
  - element: 현재 처리중인 배열의 element
  - index: 현재 처리중인 배열의 index (선택)
  - array: find()가 호출된 배열 (선택)
- thisArg: callback 실행 시 this로 사용할 객체

- 예제1: 
```javascript
const arr = [
  {name: 'apple', price : 1000}, 
  {name: 'banana', price : 2000},
  {name: 'apple', price: 3000}
];

function isApple(element)  {
  if(element.name === 'apple')  {
    return true;
  }
}

const apples = arr.filter(isApple);

document.writeln(apples.length); // 2
document.writeln('<br>');
document.writeln(apples[0].name + ',' + apples[0].price); // apple, 1000
document.writeln(apples[1].name + ',' + apples[1].price); // apple, 3000
```

- 예제2: 
```javascript
// Q6. make an array of enrolled students
{
    const result = students.filter((student) => student.enrolled);
    console.log(result);
}
```


### 5. foreach()
```javascript
{
    const fruits = ['apple', 'banana', 'orange'];
    let string = '';
    fruits.forEach((fruit) => string += '/' + fruit);
    console.log(string); // /apple/banana/orange

}
```

### 6. split()
{
    const fruits = '🍎, 🥝, 🍌, 🍒';
    const array = fruits.split(',');
    console.log(array)
}

### 7. reverse()
{
    const array = [1, 2, 3, 4, 5];
    array.reverse();
    console.log(array)
}

### 8. slice
// Q4. make new array without the first two elements
{
    const array = [1, 2, 3, 4, 5];
    const arr = array.slice(2)
    console.log(arr) // [3,4,5]
}



class Student {
    constructor(name, age, enrolled, score) {
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;
    }
}
const students = [
    new Student('A', 29, true, 45),
    new Student('B', 28, false, 80),
    new Student('C', 30, true, 90),
    new Student('D', 40, false, 66),
    new Student('E', 18, true, 88),
];


## 9. map
***array.map(callback(currentValue, index, array), thisArg)***

- callback 실행 결과로 새로운 배열 생성
- callback 함수의 인자 3개
  - currentValue: 배열 내 현재 값
  - index: 배열 내 현재 값 인덱스
  - array: 현재 배열
  
- 예제1
```javascript
const days = ["Mon", "Tue", "Wed", "Thus", "Fri"];
const addsmile = day => '😃 ${day}'; 
const smilmingDays = days.map(addsmile); 
console.log(smilmingDays);  
```

- 예제2
```javascript
// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
{
    const result = students.map((student) => student.score);
}
```

- 예제3
```javascript
let c = ['a', 'b']
c.map(name => c[name] = ( c[name] | 0 ) + 1 );  // c[name]:이 c객체의 프로퍼티에 삽입?
c  // ['a', 'b', a: 1, b: 1]
c[0] // a
c['a'] // 1
c.a // 1
c[2] // undefined: 배열에 심볼로 들어가서 그렇다 -> c 객체의 속성으로(프로퍼티)로 들어갔다?
let a = c.map(name => (c[name] | 0) + 1);
a // [1, 1]
```

- 예제4: filter()와 같이 쓰기
```jacascript
const originalArray = [1, 2, undefined, 3];
 
const newArray = originalArray
  .filter(value => {
    return Number.isInteger(value);
  }).map(value => {
    return value * 2;
  });
 
console.log(newArray); // [2, 4, 6]
```

## 10. join('구분자')
- 배열의 원소를 연결하여 하나의 값으로 만들기
- 구분자 기본은 콤마, 설정할 수 있음

```javascript
var jbAry = [ 'Lorem', 'Ipsum', 'Dolor' ];
      var jbStr1 = jbAry.join();
      var jbStr2 = jbAry.join( ' / ' );
      document.write( '<p>' + jbStr1 + '</p>' ); // Lorem,Ipsum,Dolor
      document.write( '<p>' + jbStr2 + '</p>' ); // Lorem/Ipsum/Dolor
```

```javascript
// Q10. make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
{
    const result = students
        .map((student) => student.score)
        .filter((score) => score > 50)
        .join();
    console.log(result);

}


// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
{
    const result = students
        .map((student) => student.score)
        .sort((a, b) => a - b)
        .join();
    console.log(result);
}

{
    class User {
        constructor(id, pw) {
            this.id = id;
            this.pw = pw;
        }
        get pw() {
            return this._pw;
        }

        set pw(pw) {
            this._pw = pw;
        }
    }

    console.clear();
    const user1 = new User('YU', '123');
    console.log(user1);
    console.log(user1.pw);

    const book = {
        '이름': 'C#...',
        ' 초판발생': '2019'
    }
    console.log(book)

}
```

## 11. Object.values()
- 전달된 파라미터 객체가 가지는 속성의 값들로 이루어진 배열 리턴
```javascript
const object1 = {
  a: 'somestring',
  b: 42,
  c: false
};

console.log(Object.values(object1));
// expected output: Array ["somestring", 42, false]
```



<출처>

- https://2dubbing.tistory.com/55
- https://hianna.tistory.com/406 [어제 오늘 내일]
- 유튜브 dreamcoding
- https://aljjabaegi.tistory.com/316 [알짜배기 프로그래머]
- https://www.codingfactory.net/10450
- https://velog.io/@daybreak/Javascript-map%ED%95%A8%EC%88%98
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/values
