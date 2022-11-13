# Map

- ES6에서 도입된 `key`, `value` 쌍으로 이루어진 Collection

# Object

- JavaScript를 이루는 거의 모든 것들을 객체라고 볼 수 있다.

- `Property`와 `Method`를 가지며, `property`는 map의 `key`의 역할이다.

<br>

## Map과 Object

- `key`와 `value`를 사용하는 점에서 기본적인 컨셉트는 같다.

- 실제로 ES6 전에는 객체가 Map의 역할을 했다.
  - 키를 삭제하거나 존재 유무 확인 등

### 차이점

- 사용 가능한 Key의 타입

  - Object: String, Symbol
  - Map: 무엇이든 가능 (함수, 객체, 원시 자료형 등)

- 순회

  - Obejct: Key의 배열을 얻어 이 배열을 이용하여 순회한다.
  - Map: built-in iterable 사용하여 바로 순회 가능

  ```js
  //Object
    {id: 1, name: "test"}

    for (var key in obj){
        console.log(`key: ${key}, value: ${obj[key]}`);
        //key: id, value: 1
        //key: name, value: test
    }

    //또는
    Object.keys(obj).forEach((key)=> console.log(`key: ${key}, value: ${obj[key]}`));
    //key: id, value: 1
    //key: name, value: test

    //Map
    for (const [key,value] of map){
        console.log(`key: ${key}, value: ${value}`);
        //key: 2, value: 3
        //key: 4, value: 5
    }
    //또는
    map.forEach((value, key) => console.log(`key: ${key}, value: ${value}`));
    //key: 2, value: 3
    //key: 4, value: 5
  ```

- 크기
  - Object: 직접 판별
  - Map: `size` 속성을 이용

- 정렬
  - Object: 안함
  - Map: 삽입 순

- 또한, Object는 프로토타입을 가지므로 주의하지 않으면 Key가 충돌할 수 있다.

- Map은 빈번한 키의 추가, 삭제가 필요할 때나 키의 순서가 보장되어야 할때, 저장할 데이터가 클 때 등에 경우 사용한다.

<br><br><br>

<출처>

- <https://kellis.tistory.com/129>
