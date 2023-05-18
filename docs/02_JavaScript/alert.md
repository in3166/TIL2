# `window.alert()`

- 확인 버튼을 가지며 메시지를 지정할 수 있는 경고 대화 상자를 띄운다.
- 브라우저가 메시지를 dialog로 띄우고 사용자가 결정할 때 까지 기다린다.
  <br>

### 단점

- 비동기 코드가 있다면 결과를 바꿀 가능성이 있다.
- 전체 브라우저를 멈춘다. (blocks the entire browser)
- 자바스크립트 스레드를 멈춘다. (blocks the javascript thread)
- 오직 문자열만 출력할 수 있다. (only prints strings)
  
- 다음 과정 계속하기 위해 사용자의 상호작용이 필수적이다. 
  (requires user interaction to continue (this means you can't automate browser usage))
- 일반적인 팝업 차단기에 의해 차단될 수 있다. (is blocked by common popup blockers)
- `node.js` 같은 브라우저가 아닌 환경에서는 작동하지 않는다. 
  (doesn't work in non-browser environments like node.js (however console.log does work in node.js))

## 왜 쓸까?
- 드물지만 `alert()`를 사용해야 할 때가 있다.
- `alert()`는 `string`을 출력하므로, 첫 번재로 `value`를 `string`으로 변환한다.
  - 만약 어떤 특정 시점에 어떤 값은 확인하고 싶을 때 사용한다.
  - 또한 Script의 실행을 멈추므로 어떤 상황에서 유용할 수 있다.

<br/>
<br/>
<br/>

<출처>

- https://developer.mozilla.org/ko/docs/Web/API/Window/alert
- https://stackoverflow.com/questions/8825384/alert-is-bad-really