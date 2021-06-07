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
 - 이벤트 캡쳐링과 버블링에 있어 현재 이벤트 **이후의 전파를 막는다.**
 
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
<br><Br>


# stopImmediatePropagation




<br><br><br>

<출처>
- https://programming119.tistory.com/100
- https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault
- https://developer.mozilla.org/ko/docs/Web/API/Event/stopPropagation
- http://megaton111.cafe24.com/2015/04/30/preventdefault-%EC%99%80-stoppropagation-%EC%B0%A8%EC%9D%B4/
- https://pa-pico.tistory.com/20
