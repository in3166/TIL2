## HTTP
 - 클라이언트와 서버 간 data의 request와 response
 - Hypertext: 링크뿐만이 아닌 전반적 리소스 포함 (문서, 이미지)
 - Transfer
 - Protocol
 
 - 방법
   - AJAX (Asynchronous JavaScript And XML)
     - XHR (XMLHttpRequest): 브라우저 Object의 하나
     - fetch() API: 더 간단한 데이터 주고 받기 가능 (IE 지원 X)
     
  ### XML
  - HTML과 같은 마크업 언어 중 하나로 태그로 데이터를 나타냄
  - 서버와 데이터 주고받을 때의 파일 포맷으로 쓰일 수 있음.
  ```javascript
  <recipe>
    <title> butter  </title>
    <ingredient> ... </>
  </recipe>
  ```
  - 사용 시 파일 크기가 커지고 가동성이 좋지 않아 사용 X
  
  ### JSON (JavaScript Object Notation)
   - Object{ Key : Value }
   - 가장 간단한 파일 포멧
   - 텍스트 기반 가볍고 읽기 쉬움
   - 플랫폼에 상관 없이 사용 가능 (자바, 파이썬 등)
   
   - objec -[serialize]-> string
   
   1. Object to JSON
     - `JSON.stringfy(obj);`
     - 함수는 포함되지 않음
     - replacer: 콜백 함수나 배열을 인자로 줘서 원하는 프로퍼티만 적용 
     - `JSON.stringfy(obj, ['name']);` // 객체의 name만 전달하고 싶을 때

 ```javascript
     JSON.stringfy(obj, (key, value) => {
        console.log(`key: ${key}, value: ${value}); 
        // 처음엔 key: , value: [object object] 출력 (최상위) 다음 부턴 각 프로퍼티 출력
        
        return key === 'name' ? 'name2' : value; 
        // key가 name이면 value를 name2로 설정하고 아니면 원래 정보 그대로 설정
     }
 ```

     
     
  </br>
     
   2. JSON to Object
     - const obj = JSON.parse(json);
     - 만약 원래 obj에 함수가 있었다면 다시 변환 시 사라짐 / object 또한 단순한 스트링이 돼서 해당 메소드 사용 불가
   
   
