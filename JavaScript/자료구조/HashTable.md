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

- key: 문자열, 숫자형을 허용
- hash function: 간단하게 key를 각 문자를 유니코드로 변환해서 합한 값을 hash Table을 생성할 때 지정해둔 size로 나눈 나머지를 hash로 바꾼다.

- insert
  - 키에서 해시를 뽑아 내어 배열로 구성한 저장소에 hash를 인덱스로 하여 [key, value]쌍을 저장(2차원 배열: seperage chaining 기법을 사용 하기 위해)
  - hash를 인덱스로 하는 배열에 이미 요소가 저장되어 있으면 해당 인덱스에 push로 요소를 추가해 밀어 넣어 준다. (2차원 배열 형태로 저장 가능)

- delete
  - 키에서 해시를 뽑아 해시에 해당하는 저장소의 인덱스로 접근해 삭제 (해당하는 키가 존재 확인) 
  - 여러 요소가 존재하면 반복문으로 확인해서 찾아내어 삭제
  - 이때 delete 연산자나 해당 요소를 undefined로 바꾸게 되면 해당하는 인덱스가 빈공간으로 남아 에러를 유발하므로 splice 메서드로 삭제, 삭제 성공시 true를, 실패시 false를 반환한다. 값의 존재유무에 상관없이 에러는 발생해선 안된다.

- search
  - 키에서 해시를 뽑아 내어 해시에 해당하는 저장소의 인덱스로 접근해 value를 반환한다. 
  - 해당하는 키가 존재하는지 확인, 여러 요소가 존재하면 반복문으로 확인해서 찾아낸다.
  - 요소를 찾아내는 모든 과정은 delete 매서드와 같다. delete 메서드는 요소를 찾으면 삭제하는 프로세스를 진행하지만, search 메서드는 찾아낸 요소의 value를 반환하고 마친다.
  - 만약 해당하는 요소가 존재하지 않으면 false를 반환한다.

- getTable
  - 구현하며 디버깅을 위해 만들어둔 테이블 전체를 반환하는 메서드.
  
  <br><br>
```javascript
  class hashTable{
    constructor(size){
        this.storage = [];
        if(size){
            this.size = size;
        }
        else{
            this.size = 100;
        }
    }
    insert = (key,value) => {               
        let index = this.hash(key);
        
        if(this.storage[index] === undefined){
            this.storage[index] = [[key, value]];
        }
        else{
            let storageFlag = false;
            for(let i = 0; i < this.storage[index].length; i++){
                if(this.storage[index][i][0] === key){
                    this.storage[index][i][1] = value;
                    storageFlag = true;
                }
            }
            if(!storageFlag){
                this.storage[index].push([key,value]);
            }
        }
    }
    delete = (key) => {
        let index = this.hash(key);
        if(this.storage[index] === undefined){
            return false;
        }
        else if(this.storage[index].length === 1 && this.storage[index][0][0] === key){
            this.storage.splice(index,1);
            return true;
        }
        else{
            for(let i = 0; i < this.storage[index].length; i++){
                if(this.storage[index][i][0] === key){
                    this.storage[index].splice(i,1)
                    return true;
                }
            }
            return false;
        }
    }
    search = (key) => {
        let index = this.hash(key);
        if(this.storage[index] === undefined){
            return false;
        }
        else if(this.storage[index].length === 1 && this.storage[index][0][0] === key){
            return this.storage[index][0][1];
        }
        else{
            for(let i = 0; i < this.storage[index].length; i++){
                if(this.storage[index][i][0] === key){
                    return this.storage[index][i][1];
                }
            }
            return false;
        } 
    }

    hash = (key) => {
        let hash = 0;
        for(let i = 0; i < key.length; i++){
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }

    getTable(){
        return this.storage;
    }

}

let data = new hashTable(100);
data.insert(1,5);
data.insert('asd', 12);
data.insert(213,14);
data.insert('a', 'b');
data.insert('213', '12');
console.log(data.search(1));
console.log(data.search(213));
data.delete(1);
console.log(data.search(1));
data.insert(1,10)
data.delete('a');
console.log(data.search(1));
console.log(data.getTable())
```

<출처>
- https://medium.com/@clgh0331/javascript-node-js-hash-table%EC%9D%84-%EA%B5%AC%ED%98%84-f1442b24571c
