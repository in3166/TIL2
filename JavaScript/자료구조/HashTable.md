## 연관배열 구조 (associative array)
- key 1개와 value 1개가 1:1 연관된 구조

## Hash Table
- 연관배열 구조를 사용해 키에 값을 저장하는 자료구조
- Key는 Hash 함수를 통해 Hash로 변경되며 Hash는 Value와 매칭되어 저장소에 저장

### 요소
- 키 (Key)
  - 고유한 값, Hash의 input
  - 다양한 길이가 될 수 있어 이 상태로 저장하면 길이만큼의 저장소 구성이 필요하기 때문에 해시로 변경하여 효율

- 해시 함수 (Hash Function)
  - Key를 일정한 길이의 Hash로 변환
  - 해시 충돌을 최대한 줄이는 함수를 만드는 것이 중요
  
- 해시 (Hash)
  - 해시 함수의 결과물
  - 저장소에서 값과 매칭되어 저장된다.
  
- 값 (Value)
  - 저장소에 치종적으로 저장되는 값으로 키와 매칭
  - 저장, 삭제, 검색, 접근이 가능

### 메서드
- 저장 (Insertion)
  - Key를 해시 함수를 사용해 Hash로 변경한 뒤 저장소에 해시에 해당하는 인덱스에 값을 저장
  - Insertion Big-O notation은 O(1): 해시 함수를 통해 키를 해시로 변경하여 해당 저장소에 값을 저장하면 되기 때문
  
- 삭제 (Deletion)
  - 키를 해시 함수를 사용해 해시로 변경한 뒤 저장소에 해시에 해당하는 인덱스 값 삭제
  - Insertion Big-O notation은 O(1)

- 검색 (Search)
  - 키를 해시 함수를 사용해 해시로 변경한 뒤 저장소에 해시에 해당하는 인덱스의 값 반환
  - Insertion Big-O notation은 O(1):

<BR>
### 해시 충돌 (Hash Collision)
- 무한한 값(key)를 유한한 값(Hash)로 표현하면서 서로 다른 두개 이상의 유한한 값이 동일한 출력 값을 가지게 되는 것
- 여러 충돌 방지 방법이 있음

  ### Seperate Chaining
  - 충돌을 허용하되 최소화
  - 해시 함수로 키를 해시로 바꾼 뒤 저장소에 넣을 때 이미 저장소에 값이 있으면 추가적으로 배열을 생성해서 값을 추가

<br>
### 구현


<출처>
- https://medium.com/@clgh0331/javascript-node-js-hash-table%EC%9D%84-%EA%B5%AC%ED%98%84-f1442b24571c
