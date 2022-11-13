# DOM (Document Object Model) 문서 객체 모델

- XML이나 HTML 문서에 접근하기 위한 일종의 **인터페이스**
- 문서 내의 모든 요소를 정의하고, 각각의 요소에 접근하는 방법을 제공

  - **트리 구조**로 되어있는 객체 모델로 Javascript가 getElementnyId() 같은 함수로 HTML 각 요소에 접근하고 사용할 수 있다.

### 문제점

  - 거대한 DOM 트리에서 속도 이슈
  - 지속적인 DOM 업데이트는 잦은 오류와 사용자 인터페이스에 악영향
  - DOM을 제대로 찾지 못하면 코드 분석 다시해야 함.
<br>

## 브라우저의 Workflow

<img src="01_React/img/browserFlow.png" />

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
<br>

## DOM 수정 시

- DOM에 변화가 생기면 Render Tree를 재생성 (모든 요소들의 스타일이 다시 계산됨)
- 그 후 레이아웃을 만들고 페인팅하는 모든 과정을 반복한다.
- DOM 조작이 많아지면 브라우저는 연산을 많이 해야하고 프로세스가 비효율적이게 된다.

### => 가상 DOM의 사용

<br><br>
  
# Virtual DOM

- DOM 문서를 추상화한 개념
- 변화가 많은 View를 실제 DOM에서 직접 처리하지 않고 Virtual DOM과 메모리에서 미리 처리하고 저장한 후 실제 DOM과 동기화
- View 변환 -> 가상 DOM에 먼저 적용 => 최종 결과 실제 DOM에 전달 (브라우저 내의 연산양을 줄임)
<img src="01_React/img/vd.jfif" />

- 더 가볍고 빠른 Rendering
- 몇 가지 특수 키원드 (key, ref, htmlFor 등)이 존재
- 실제 DOM과 구조상 큰 차이 없음
<br>

## 가상 DOM의 중요성

- DOM 조작은 각 조작이 레이아웃의 변화, 트리 변화와 렌더링을 일으킨다. <br> 만약 30개의 노드를 하나씩 수정하면, 30번의 (잠재적인) 레이아웃 재계산과, 30번의 리렌더링을 초래
- Virtual DOM은 DOM 차원의 더블 버퍼링같은 개념
  - 변화 발생 시 오프라인 DOM 트리에 적용 (이는 DOM 트리에 렌더링 되지 않기때문에 연산 비용이 적다.)
  - 연산이 끝나면 최종 변화를 실제 DOM에 전달
  - 모든 변화를 한번에 묶어 한 번만 전달한다. (레이아웃 계산과 리렌더링 규모는 커지지만 연산의 횟수를 줄일 수 있다.)
  
  - Virtual DOM 없이도 변화가 있을 때, 변화를 묶어 DOM fragmenet에 적용한 다음 기존 DOM에 전달할 수 있음.
    - 그런데 왜 Virtual DOM 사용?
    - DOM fagment를 관리하는 과정을 `자동화`, `추상화`
    - 기존 값 중 어떤 값이 바뀌고 바뀌지 않았는지 기억하고 있을 필요없어짐.
    - DOM 관리를 가상 DOM이 하므로 컴포넌트가 DOM 조작 요청을 할 떄 다른 컴포넌들과 상호작용하지 않아도 된다. <br> (특정 DOM을 조작할 것이다, 이미 했다 등의 정보 공유 필요 X)
    - 즉, 각 변화들을 동기화 적업 없이 모든 작업을 하나로 묶을 수 있다.
  
```
React가 DOM 보다 빠르다는건 잘못된 사실이에요. 
사실은: 유지보수 가능한 어플리케이션을 만드는것을 도와주고 
그리고 대부분의 경우에 ‘충분히 빠르다’
- Dan Abramov (Redux 창시자, React 개발 팀원)
```

- 최적화 작업을 자동화 -> 생상성

<br>

### React의  data model 변화 감지와 render on the view

- React는 리액트 컴포넌트에 `state` 변화가 있으면 어디가 바뀌었는지 찾는 대신,
- 전체 UI를 업데이트된 상태로 처음부터 re-render 한다.
  - DOM Updation은 느린 처리과정이다. (문제)

<br/>

- `Virtual DOM` 등장: `Virtual DOM`은 단지 실제 DOM을 **객체** 형태로 나타낸다.
- 즉, 메모리에 존재하는 plain javascript 객체의 트리 데이터 구조일 뿐
  - (실제 화면에 렌더링되지 않으므로 빠름 - no reflow, repainting)

- app을 로드할 때, React는 실제 DOM을 복사하여 Virtual DOM을 생성한다.
- state가 변경되면 실제 DOM을 모든 실제 DOM을 re-render하지 않고 모든 새로운 Virtual DOM(updated state와 함께)을 렌더링한다.
- 이전의 Virtaul DOM과 새로운 Virtual DOM을 비교 후 바뀐 부분만 Real DOM에 적용한다.

***Updating in memory***

<br><br><br>

<출처>

- <https://noogoonaa.tistory.com/53>
- <https://velopert.com/3236>
- <https://stackoverflow.com/questions/61245695/how-exactly-is-reacts-virtual-dom-faster>
- <http://www.tcpschool.com/javascript/js_dom_concept>
