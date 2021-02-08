# DOM (Document Object Model)
- 문서 객체 모델
- 웹 페이지에 대한 인터페이스
- 트리 구조로 되어있는 객체 모델로 Javascript가 getElementnyId() 같은 함수로 HTML 각 요소에 접근하고 사용할 수 있다.

  ### 문제점
  - 거대한 DOM 트리에서 속도 이슈
  - 지속적인 DOM 업데이트는 잦은 오류와 사용자 인터페이스에 악영향
  - DOM을 제대로 찾지 못하면 코드 분석 다시해야 함.

## 브라우저의 Workflow
<img src="https://github.com/in3166/TIL/blob/main/JavaScript/React/img/browserFlow.png" />

  ### DOM Tree 생성
  - 브라우저가 HTML 전달 받으면 브라우저의 Render 엔진이 이를 파싱
  - DOM 노드로 이뤄진 트리를 만듦
  - 각 노드는 각 HTML 엘리먼트와 연관되어 있다.

  ### Render Tree 생성
  - 외부 CSS 파일과 엘리먼트의 Inline 스타일 파싱
  - 스타일 정보로 DOM 트리에 새로운 트리, 렌더 트리 생성
  - Render Tree 생성 처리
    - Webkit에서 노드의 스타일 처리 과정 'Attachment'
    - DOM 트리의 모든 노드들은 'attach' 메서ㄷ드로 스타일 정보 계산해서 객체형태 반환
      - 동기적 작업: DOM 트리에 새로운 노드 추가 시 그 노드의 attach 메서드가 실행
    - Render Tree가 만드는 과정엔, 각 요소들의 스타일이 계산되고, 이 과정에서 다른 요소들의 스타일 속성들을 참조

  ### Layout (reflow)
  - 렌더 트리 생성 이후의 레이아웃 과정
  - 각 노드들은 스크린 좌표가 주어지고, 어디에 위치할지 주어진다.


  ### Painting
  - 렌더링된 요소에 색을 입히는 과정
  - 트리의 각 노드들을 거쳐가면서 paint() 메서드를 호출
  - 스크린에 원하는 정포 나타남

## DOM 수정 시
- DOM에 변화가 생기면 Render Tree를 재생성 (모든 요소들의 스타일이 다시 계산됨)
- 그 후 레이아웃을 만들고 페인팅하는 모든 과정을 반복한다.
- DOM 조작이 많아지면 브라우저는 연산을 많이 해야하고 프로세스가 비효율적이게 된다.

### => 가상 DOM의 사용

<BR><BR>
  
# Virtual DOM
- DOM 문서를 추상화한 개념
- 변화가 많은 View를 실제 DOM에서 직접 처리하지 않고 Virtual DOM과 메모리에서 미리 처리하고 저장한 후 실제 DOM과 동기화
- View 변환 -> 가상 DOM에 먼저 적용 => 최종 결과 실제 DOM에 전달 (브라우저 내의 연산양을 줄임)
<img src="https://github.com/in3166/TIL/blob/main/JavaScript/React/img/vd.jfif" />

- 더 가볍고 빠른 Rendering
- 몇 가지 특수 키원드 (key, ref, htmlFor 등)이 존재
- 실제 DOM과 구조상 큰 차이 없음


<br><br><br>

<출처>

- https://noogoonaa.tistory.com/53
- https://velopert.com/3236
