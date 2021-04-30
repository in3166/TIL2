# NoSQL (Not only SQL)

- NoSQL은 단순히 기존 관계형 DBMS가 갖고 있는 특성뿐만 아니라, 다른 특성들을 부가적으로 지원하는 데이터베이스 관리 시스템
- 더 융통성 있는 데이터 모델을 사용
- 데이터의 저장 및 검색을 위한 특화된 매커니즘을 제공. 
- 단순 검색 및 추가 작업에 있어서 매우 최적화된 키-값 저장 기법을 사용. 
- 응답속도나 처리 효율 등에 매우 뛰어난 성능
- 데이터가 일관성이 없고 복잡한 쿼리를 사용할 수 없는 환경에서 NoSQL은 스키마가 필요 없고 데이터 분산이 용이

*쿼리(query): 정보 수집에 대한 요청에 쓰이는 컴퓨터 언어*
- 데이터의 정확한 처리가 필수적인 시스템에서는 관계형 데이터베이스를 사용. 
- SQL이라고 하는 데이터 처리 언어의 편의성 때문에 NoSQL 등 다른 데이터베이스 시스템들은 많이 활용되지 않았음

-  비정형 데이터를 보다 쉽게 저장하고 처리
<br>

## NoSQL 디자인 필수 사항
- 정규화하지 말고, 비정규화 할 것
  - 데이터 중복을 허용하여 성능을 높이고, 데이터 안에 데이터를 넣는(Composition) 모델 등을 사용하여 Qeuery 수를 줄인다.

- 내 App의 서비스 특성과 맞는 NoSQL 선택
  - BigTable 계열, Cassandra 계열, Document DB 계열 등

- NoSQL 쿼리가 실제 몇 개의 물리 노드에 걸쳐서 수행되는지에 대한 이해가 있어야 쿼리 디자인 가능

- NoSQL 디자인은 DB와 APP 뿐만 아니라 인프라(network, disk)에 대한 디자인을 함께 해야한다.

- 대부분 NoSQL DB는 인증이나 인가 체계가 없어 보안에 취약하기 때문에 별도의 보안 체계 마련 (방화벽, Proxy 등)


<br>

## 데이터 모델링
### 1. Key/Value Store
- 대부분 Key/Value 개념 지원
- Unique한 Key에 하나의 Value를 가지고 있는 형태
- Puth(Key, Value), Value := get(Key) 형탱의 API로 접근

|key| value|
-----|------
|key| value|

- Column Family: 테이블 형태 데이터 저장을 위해 확장된 개념 사용
  - Key 안에 (Column, Value) 조합의 여러 필드를 갖는다.
  <img src="https://github.com/in3166/TIL/blob/main/DB/MongoDB/img/nodatamodel1.png" />
  
  - 예) 사용자 프로필 저장: 사용자 이름(key) / 성별, 주소, 나이은 각각의 Column
  - Key 필드는 RDBMS의 Primary key, Column필드은 RDBMS의 일반 데이터 필드로 이해

### 2. Ordered Key/Value Store
- Key/Value Store 확장 형태, 데이터가 내부적으로 Key를 순서로 Sorting 저장
- 결과값을 업데이트 날짜 등으로 sorting하여 보여주는 것 유리 (Hbase, Cassandra 등)
<img src="https://github.com/in3166/TIL/blob/main/DB/MongoDB/img/nodatamodel2.png" />

### 3. Document Key/Value Store
- Key/Value Store 확장 형태, 기본적으론 Key/Value Store
- Key에 해당하는 Value 필드에 데이터를 저장하는 구조는 같지만 저장되는 Value 데이터 타입이 `Document` 타입 사용
- Document 타입: XML, JSON, YAML 같이 구조화된 데이터 타입, 복잡한 계층 구조 표현 가능
- 대부분 추가적인 기능 (Sorting, Join, Grouping) 제공 (MongoDB, CouchDB, Riak 등)
<img src="https://github.com/in3166/TIL/blob/main/DB/MongoDB/img/nodatamodel3.png" />


<br><br>

## RDBMS와 NoSQL의 차이
- RDB는 Entity를 정의하고 데이터 모델링을 정의한 후에 쿼리와 APP을 개발, NoSQL은 App을 먼저 디자인하고 필요한 쿼리 결과를 정의한 후 데이터 모델링
- NoSQL은 Key에 대한 `Put/Get`만 지원 (RDBMS의 insert/select)
  - 그래서, 고민해야 할 기능
  - Sorting (Order By)
  - Join (Foreign key-join)
  - Grouping (group by)
  - Range Query (where key>"start" and key<"end" 범위 내의 내용)
  - Index (Index 지정하여 select query)

<br>

## NoSQL 데이터 모델링
- NoSQL에 저장할 데이터 구조 - 테이블 설계 정의
- RDBMS와 차이
  - 1) 개체 모델 지향에서 쿼리 결과 지향의 모델링
    - REBMS 모델링: 저장할 도메인 모델 분석 후 개체 간 관계 식별, 테이블 추출, 테이블 이용 쿼리 구현하여 결과 도출
    - NoSQL 모델링: 도메인 모델 -> 쿼리 결과 -> 테이블 순서로 테이블 디자인 (RDBMS 역순)
    - 복잡한 쿼리 기능이 없어 도메인 모델에서 어떤 쿼리 결과가 필요한지 정의하고 결과를 얻기 위한 데이터 저장 모델을 역순으로 디자인

  - 2) 정규화에서 비정규화
    - RDBMS 모델링: 데이터 일관성, 도메일 모델과의 일치성을 위헤 데이터 모델 정규화, 그 중 같은 데이터 두 개 이상의 테이블 중복 제거
    - NoSQL 모델링: 쿼리 효율성을 위해 데이터 정규화하지 않고, 의도적으로 중복된 데이터 저장 등 비정규화된 데이터 모델 설계 방식으로 접근

## NoSQL 데이터 모델링 절차
1. 도메인 모델 파악
- 어떤 데이터 개체가 있고 개체 간 관계는 어떻게 되는지 분석하고 ERD로 그려 도식화 (기존 RDBMS 모델링 접근 방법)
- 예) 블로그 시스템 데이터 도메인 모델
  - 사용자 ID 기반 블로그 카테고리 가지고 분류별 글 작성 가능, 글에 파일 첨부 가능, 댓글 가능
  <img src="https://github.com/in3166/TIL/blob/main/DB/MongoDB/img/nodatamodel4.png" />

2. 쿼리 결과 디자인 (데이터 출력 형태 디자인)
- '도메인 모델' 기반 애플레케이션에 의해 쿼리되는 결과값을 먼저 정한다.
  <img src="https://github.com/in3166/TIL/blob/main/DB/MongoDB/img/nodatamodel5.png" />
  
  - 1) 화면 좌측 상단: 블로그 사용자 포스팅 분류명 목록식 출력 
  ```
  select categoryID,name from Category where userID=”사용자ID”
  ```
  
  - 2) 포스팅 출력 화면 상단에 포스팅 분류명, 제목 출력, 날짜, 내용 출력
  ```
  select po.postID,po.Contents,po.date,ca.name
  from Category ca,Post po
  where userID=”사용자ID”
  order by date desc
  ```
  - 3) 첨부파일들 출력 (날짜, 파일명, 링크)
  ```
  select fileID,filename,date,fileLocation
  from Attachment
  where userID=”사용자ID” and postID=”현재 포스팅 ID”
  ```
  - 4) 댓글 출력 (작성일, 이름, 내용, 이메일 링크)
  ```
  select userID,email,Contents,date
  from Comment
  where userID=”사용자ID” and postID=”현재 포스팅 ID”
  order by date desc
  ```
  
- 아래처럼, 애플리케이션 출력 형태에 따라 데이터 정리
- NoSQL의 데이터 모델링은 도메인 모델 중심이 아니라, 애플리케이션의 **데이터 출력 내용 기반**

<img src="https://github.com/in3166/TIL/blob/main/DB/MongoDB/img/nodatamodel6.png" />

3. 패턴을 이용한 데이터 모델링
- 디자인한 데이터 출력 내용 기반 NoSQL에 정의될 데이터 모델링
- `Put/Get`만으로 데이터를 가지고 올 수 있는 형태로 데이터 모델-테이블을 재정의
- 데이터를 가급적 중복으로 저장하여, 한번에 데이터를 읽어오는 회수를 줄인다. (Demoralization)

<img src="https://github.com/in3166/TIL/blob/main/DB/MongoDB/img/nodatamodel7.png" />

- Key 부분에 Join을 없애기 위해, `userID`나 `postID`를 ':'로 구분되는 Deliminator로 하여 key에 포함
- 이는 또한, Ordered Key/Value 겨웅 Key를 기반으로 Sorting 하기 때문
  - 첫번째, postID를 Sequential하게 증가시키면 같은 사용자의 글의 경우 Sorting 가능
  - 두번째, Grouping: 포스팅 출력 사용자에 대해 posting을 계속 출력하면 순차적으로 Post가 출력 되다가 해당 사용자가 끝나면, Key의 맨 앞 userID가 다른 사용자 id로 변경되어 `where` 없이도 특정 사용자의 포스팅을 순차적으로 출력 가능 (모델링 패턴: Enumerable key, Composite Key Index 패턴) 


4. 최적화를 위한 필요한 기능 리스팅
- 애플리케이션, 데이터 특성에서 첨부 파일의 경우 포스팅 작성될 때 레코드가 추가되며, 변경이 거의 없다
- 수 또한 많지 않아 하나의 필드에 몰아 저장 가능 -> Document Stroe 고려
- 현재 데이터 모델은 포스팅이 포스트 순으로 출력 (Sorting 기능 없음)
  - 분류 개념의 분류에 따라 포스팅을 출력하려면 분류 필드가 별도 필드로 들어가야 하고, 이 필드에 따라 `where문 select` 기능이 있어야 한다.
  - RDBMS의 `Index` 개념 -> NoSQL의 `Secondary Index`
 
<img src="https://github.com/in3166/TIL/blob/main/DB/MongoDB/img/nodatamodel8.png" />

- 위 옵션 적용하여 Posting 테이블을 위 처럼 변경
 

5. 후보 NoSQL을 선정 및 테스트
- NoSQL 제품들이 제공하는 기능이나 내부 아키텍쳐 등은 다르다.
- 구조 및 특성 분석, 테스트, 안정성-확장성 테스트 등으로 선택 (대규모 서비스의 경우 여러 개의 NoSQL 사용)

6. 데이터 모델을 선정된 NoSQL에 최적화 및 하드웨어 디자인
- 선택한 NoSQL로 데이터 모델 최적화

<br><br><br>
<출처>
- https://m.blog.naver.com/shakey7/221558533513
- https://bcho.tistory.com/665?category=431293
