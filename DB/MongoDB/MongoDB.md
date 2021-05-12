# MongoDB
# 용어 비교

|SQL 용어 | MongoDB 용어|
|---------|------------|
|database|database|
|table |collection |
|row |document or BSON document |
|column |field |
|index |index |
|primary key|primary key |  
- Mongo DB에서는 primary key가 _id 라는 필드로 자동 생성됨

<br>

### Collection
- `문서(Document)`의 모음 (RDBMS에서 행의 모음이 Table 이듯이)
- `Collection`은 별도의 스키마를 갖지 않아 하나의 `Collection` 안에 `Document`는 다른 구조를 가질 수 있다.
- 하나의 `Collection` 안에 여러 다른 `Document`가 있다면 사용하기 어려으므로 `Collection`을 여러 개 만들어 성격이 맞는 문서 저장

### Sub-Collection
- 학교 구성원 관리 DB
- `학교-선생님`, `학교-학생` 으로 나눌 때 같은 속성인 학교에서 선생님과 학생을 나눠서 Collection을 만들면
- `school.teacher`, `school.student` 자식 컬렉션들

<br><br>

## Document - Oriented Database (문서 지향 데이터베이스)
- RDBMS의 행(Row) 개념보다 유연한 모델인 문서(Document)를 사용하는 데이터베이스
- 계층관계를 하나의 레코드(Record)에 입력 및 표현 
- MongoDB의 통신규격: **JSON** (한 개 이상의 Key:Value)
  - BSON 타입: DB 내에 저장될 때는 BSON 타입의 바이너리 형태의 데이터로 반환되어 저장


<BR>
  
## Schema-less 구조
- 스키마를 고정하지 않은 형태
- `key(field)`의 추가, 제거 간편
- 분산 확장 간단
  - `샤딩 시스템`(샤딩: 샤드-*각각의 장비*에 걸쳐 있는 데이터 분할 처리) 이용
  <img src="https://github.com/in3166/TIL/blob/main/DB/MongoDB/img/shard.png" />


<br><br><br>
<출처>
- https://dreamshutter.tistory.com/2 [DreamShutter]
- https://commin.tistory.com/78
- https://ryu-e.tistory.com/2
