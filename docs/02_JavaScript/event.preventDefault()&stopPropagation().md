# element.addEventListener
- 이벤트 등록 시 내부적 동작
```js
var event_listener_list = [];
var sayHi = function() {
  console.log('hi');
};
window.addEventListener('click', sayHi);

// 위의 동작은 아래처럼 변환
event_listener_list.push({
  type: 'click',
  callback: sayHi,
  capture: false, 
  passive: false,
  once: false,
  removed: false
});
```
- `addEventListener`로 이벤트를 등록하면 JS 내부적으로 갖고 있는 큐와 같은 공간에 리스너들이 등록한 차례대로 저장된다.

- 이 때, 들어가는 요소는 여러가지 정보를 담는 객체와 같다.
  - type: 이벤트 타임 (click, wheel..)
  - callback: 이벤트의 콜백 함수
  - capture: 캡쳐링 여부
  - passive: passive 여부 (`preventDefault`를 무시)
  - once: 한 번만 실행될 것인지 여부

- 동일한 이벤트 등록 시 새로운 이벤트는 등록되지 않는다. (타입, 콜백, 기타 옵션 값이 동일한 경우)

### 이벤트 핸들러 적재 예시
```js
var log = function(x) {
  console.log(x);
};
window.addEventListener('click', () => log(1));
window.addEventListener('keydown', () => log(2));
window.addEventListener('dbclick', () => log(3));
```
```
[event_listener_list]
index  type    callback      ...
  0    click   (anonymous)
  1    keydown (anonymous)
  2    dbclick (anonymous)
```
- 만약 1번 인덱스의 `keydown` 이벤트가 들어오면 0번 인덱스부터 등록 순서대로 검사하며 실행시켜도 되는 이벤트 핸들러만 실행

### 익명 함수의 등록
```js
window.addEventListener('click', () => log(1));
window.addEventListener('click', () => log(2));
window.addEventListener('click', () => log(3));
```
- 위의 경우 모두 같은 타입을 가지는 이벤트 행들러이고 `log`라는 메소드를 싱핼하는 것도 동일하지만
- 콜백 함수의 몸체는 `익명함수`이기에 등록하려는 핸들러가 다 다르다고 판단하여 3개 모두 등록
<br>

```js
var i = 1;
function log() {
  console.log(i++);
}
window.addEventListener('click', log);
window.addEventListener('click', log);
window.addEventListener('click', log);
```
- 하지만 위의 예시는, 콜백 함수가 등록된 기명함수이기 때문에, 같은 메모리 주소를 `addEventListener`를 통해 넘겨주고
- JS는 이들 모두를 동일하게 판단해 처음 한 번만 등록하고 나머지는 무시한다.

<br><br>

## 자바스크립트 이벤트는 2 단계를 거친다.: 버블링, 캡쳐링
<img src="https://github.com/in3166/TIL/blob/main/JavaScript/0.JPG" width="77%">
- 클릭 이벤트의 경우 최상위 엘리먼트인 `window` 객체부터 이벤트가 진행된다.
- 실제로 중간 엘리먼트를 모두 방문하고 실제 이벤트가 걸린 DOM 엘리먼트는 `e.target`으로 조회되는 객체이다.
- 중간에 들르는 엘리먼트는 `e.currentTarget`으로 조회 가능

```js
window.addEventListener('click', log);
```
- 이벤트 등록 시 두 번째 파라미터까지만 전달하면 캡쳐링 단계에 걸리지 않는다.
- 캡쳐링 단계에서 이벤트 핸들러가 실행되기를 원한다면 (`window.addEventListener('click', log, true);`)

- 주의사항
  - 캡처링 이벤트 핸들러는 버블링 단계보다 먼저 이벤트를 감지할 수 있다는 뜻이다.
  - 다른 캡쳐링 이벤트 핸들러보다 먼저 실행된다는 뜻은 아니다.
  - JS는 `이벤트 핸들러 리스트`로 콜백의 실행 순서를 결정하기 때문에 동일 타입의 먼저 등록된 다른 콜백이 있으면 먼저 실행된다.

<br><br>

	
# event.preventDefault()
- 이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지않고 그 이벤트를 취소 (고유 동작 막음)

- a 태그 클릭 시 href 링크로 이동하지 않게 할 경우
```js
$("a").click(function(e){
	e.preventDefault();
	alert("e.preventDefault()");
});
```
  - a 태그의 href 속성이 중단되고 `e.preventDefault();` 를 띄운다.
  
  
- form 안에 submit 역할을 버튼을 눌러도 새로 실행하지 않게 하고 싶을 경우
```js
form.addEventListener("submit", e => {
  e.preventDefault
  if(result === Number(input.value)) {
    resultDiv.textContent = "정답!"
    firstNum = RANDOM_NUM1
    secondNum = RANDOM_NUM2
    result = firstNum * secondNum
    word.textContent = `${firstNum} 곱하기 ${secondNum} 는?`
    input.value = ""
    input.focus()
  }
})
```
 - '정답' / '땡' 문구 0.1초 보였다 사라짐
 - submit 됨과 동시에 창이 다시 실행 -> 초기 화면으로 돌아감
 
 - 예제: 소문자만 입력하기
 ```js
 <html>
<head>
<title>preventDefault 예제</title>

<script type="text/javascript">

function checkName(evt) {
var charCode = evt.charCode;

  if (charCode != 0) {
    if (charCode < 97 || charCode > 122) {
      evt.preventDefault();
      alert("소문자만 입력할 수 있습니다." + "\n"
            + "charCode: " + charCode + "\n"
      );
    }
  }
}

</script>
</head>

<body>

<p>당신의 이름을 소문자만으로 입력해주세요.</p>
<form>
<input type="text" onkeypress="checkName(event);"/>
</form>

</body>
</html>
 ```
 
 <br><br>
 
 # stopPropagation()
 - 이벤트 캡쳐링과 버블링에 단계에 있어 현재 이벤트 **이후의 전파를 막는다.**
 
   - **캡쳐링**: 부모 Element에서 발생된 event가 `자식 Element` 순으로 전달되는 현상
   - **버블링**: 자식 Element에서 발생된 event가 `부모 Element` 순으로 전달되는 현상
   
 ```html
 <div class="first-cover">
  <ul class="second-cover">
    <li class="third-cover">
      <div class="last-el">event</div>
    </li>
  </ul>
</div>
 ```
 ```javascript
 $(".last-el").click(function(e){
	e.stopPropagation();
	alert("last-el");
});
$(".third-cover").click(function(){
	alert("third-cover");
});
$(".second-cover").click(function(){
	alert("second-cover");
});
$(".first-cover").click(function(){
	alert("first-cover");
});
 ```
<br>

## stopPropagation 주의 사항
```html
<div id="parent" onclick="log('parent')">
  <div id="child">
  </div>
</div>

<script>
  function log(x) { 
    console.log(x); 
  }
	
  const parent = document.getElementById("parent");
  parent.addEventListener('click', function() {
    log("parent in addEventListener");
  });
</script>
```
- `parent` 엘리먼트에 클릭 이벤트 발생 시 인라인 이벤트가 먼저 실행되고 `addEventListener`로 등록한 핸들러가 실행
- 즉, `addEventListener`로 등록한 이벤트 핸들러에서 `stopPropagation`을 실행해도 인라인으로 등록된 콜백은 멈추지 않는다.
- 해결: 인라인 핸들러 삭제 or 부모 엘리먼트에서 캡쳐링 중단 혹은 자식 엘리먼트에서 버블링을 중단해야 한다.

### 예제
- https://medium.com/%EC%98%A4%EB%8A%98%EC%9D%98-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/stoppropagation-vs-stopimmediatepropagation-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-75edaaed7841
- https://codesandbox.io/s/stoppropagation-9wpfr?from-embed
```html
 <div id="app" onclick="log('app')">
      <div id="parent" onclick="log('parent inline')">
        Parent
        <div id="child" onclick="log('child inline')">
          Child
        </div>
      </div>
      <hr />
      <h2>Stacks</h2>
      <div id="stack"></div>
    </div>
  </body>
  <script>
    function log(msg) {
      append(msg);
    }

    function append(msg) {
      const p = document.createElement("p");
      p.textContent = msg;
      stack.appendChild(p);
    }

    const app = document.getElementById("app");
    const parent = document.getElementById("parent");
    const child = document.getElementById("child");
    const stack = document.getElementById("stack");

    app.addEventListener("click", () => {
      append("addEventListener click app");
    });
    
    app.addEventListener(
      "click",
      () => {
        append("addEventListener click app capture");
      },
      true
    );

    parent.addEventListener("click", (e) => {
      append("addEventListener click parent");
      e.stopPropagation();
    });
    parent.addEventListener(
      "click",
      () => {
        append("addEventListener click parent capture");
      },
      true
    );

    child.addEventListener(
      "click",
      (e) => {
        append("addEventListener click child capture");
        e.stopPropagation();
      },
      true
    );
    child.addEventListener("click", () => {
      append("addEventListener click child");
    });
  </script>
```

<img src="https://github.com/in3166/TIL/blob/main/JavaScript/img/stoppro.png" />

- 최상위 엘리먼트 `div#app` 클릭 시 해당 엘리먼트 핸들러가 캡쳐링 단계에서 먼저 실행 (핸들러가 `cature: true`인 경우만 실행됨-직접 app을 클릭한게 아니라서?)
- 핸드러 내부에서 `stopPropagation`을 실행하지 않기 때문에 이벤트의 다음 흐름은 `div#parent`로 넘어간다.

- `parent`는 인라인으로 등록된 핸들러 존재하므로 인라인 콜백이 먼저 실행되고 그 다음 `addEventListener`로 등록한 콜백이 실행
- 그 후 `capture: false`로 등록된 콜백이 먼저 실행되고 `capture:true`로 등록된 콜백이 실행
  
  - 캡쳐링과 버블링은 실제 이벤트가 발생한 DOM 엘리먼트로 이벤트 실행 순서(turn)가 넘어가기 전/후 단계에서 해당 이벤트를 사전/사후에 감지할 수 있는 시스템이기 때문에 
  - 이벤트가 발생한 실제 DOM 엘리먼트에서는 캡쳐링이나 버블링에 대한 설정 값은 의미가 없다.

- `parent` 엘리먼트의 마지막 실행 콜백은 `stopPropagation`을 내부적으로 실행해 그 시점 이후버터 이벤트 전파는 일어나지 않는다.

<br><br>

# stopImmediatePropagation
```js
window.addEventListener('click', () => log(1));
window.addEventListener('click', () => log(2));
window.addEventListener('click', () => log(3));
```
- 위의 예시에서 마지막 3이 출력되지 않게 하기
  - `stopImmediatePropagation`을 사용하면 해당 이벤트 핸들러를 마지막으로 그 뒤에 실행 예정인 어떤 것도 실행되지 않는다.
  - 캡쳐링, 버블링을 포함해 **다른 모든 이벤트 핸들러의 실행도 막는다.**
  ```js
   window.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    log(2);
   });`
  ```
- https://codesandbox.io/s/stopimmediatepropagation-qwenh?from-embed=&file=/src/index.js:439-452
- 주의
  - DOM 엘리먼트에 이벤트 버블링을 먼저 등록 후 캡쳐링 이벤트를 등록하면, 등록된 순서대로 실행

<br><br>

### 정리
- `stopPropagation`
  - 이벤트의 캡쳐링과 버블링의 전파만 막고 싶을 때 사용
  
- `stopImmediatePropagation `
  - 캡쳐링과 버블링 뿐만 아니라 현재 실행중인 이벤트 핸들러 이후의 모든 핸들러를 실행시키지 않는다. (inline handler)

<br><br><br>

<출처>
- https://programming119.tistory.com/100
- https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault
- https://developer.mozilla.org/ko/docs/Web/API/Event/stopPropagation
- http://megaton111.cafe24.com/2015/04/30/preventdefault-%EC%99%80-stoppropagation-%EC%B0%A8%EC%9D%B4/
- https://pa-pico.tistory.com/20
- https://medium.com/%EC%98%A4%EB%8A%98%EC%9D%98-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/stoppropagation-vs-stopimmediatepropagation-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-75edaaed7841
