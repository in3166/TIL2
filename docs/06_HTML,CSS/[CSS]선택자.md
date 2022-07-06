# 가상 클래스 선택자
- 요소의 상태에 따라 요소를 선택한다.
- 선택자 옆에 `콜론 : `을 사용하여 적용한다.

## `:link`
- 방문되지 않은 링크의 속성을 변경시켜주는 선택자

## `:visited`
- 방문한 링크에 대해서 속성을 꾸며주는 선택자

```css
a:link{
  color: red;
}

a:visited{
  color: green;
}
```

<br><br>

# 선택자

## `+`
- `A + B`: A태그 옆에 B태그를 선택하라.

```HTML
<style>
  div + h1 {
    color: red;
  }
</style>

<body>
  <div></div>
  <h1>빨간 글자가 됩니다.</h1>
  <div>
    <h1>검은 글자 그대로</h1>
  </div>
</body>
```

<br>

## `~`
- `A ~ B`: A태그 옆에 (이어져 있는 모든) B태그만 선택하라. 

```HTML
<style>
  div ~ h1 {
    color: red;
  }
</style>

<body>
  <div></div>
  <h1>빨간 글자가 됩니다.</h1>
  <h1>빨간 글자가 됩니다.</h1>
  
  <div>
    <h1>검은 글자 그대로</h1>
  </div>
  
  <div></div>
  <h1>빨간 글자가 됩니다.</h1>
  <h1>빨간 글자가 됩니다.</h1>
</body>
```

<br>

## `:first-child`
- 가상 클래스 선택자로 부모인 태그를 가지고 있는 자식들 중 첫째를 선택하라.

```HTML
<style>
  h1:first-child {
    color: red;
  }
</style>

<body>
  <div>
    <h1>빨간 글자가 됩니다.</h1>
    <h1>검은 글자 그대로</h1>
      <div>
        <h1>빨간 글자가 됩니다.</h1>
        <h1>검은 글자 그대로</h1>
      </div>
  </div>

  <div>
    <h1>빨간 글자가 됩니다.</h1>
  </div>
</body>
```

<br>

## `:only-child`
- 외동인 태그를 선택하라. (형제가 없는 요소)

```html
<style>
  h1:only-child{
    color: red;
  }
</style>

<body>
  <div>
    <h1>빨간 글자가 됩니다.</h1>
  </div>
  
  <h1> 검은 글자 그대로</h1>
  
  <div>
      <h1> 검은 글자 그대로</h1>
      <h1> 검은 글자 그대로</h1>
  </div>
  <div>
     
  </div>
</body>
```

<br>

## `:last-child`
- 마지막 자식 요소를 선택하라.

```HTML
<style>
  h1:last-child {
    color: red;
  }
</style>

<body>
  <div>
    <h1>검은 글자 그대로</h1>
    <h1>검은 글자 그대로</h1>
      <div>
        <h1>검은 글자 그대로</h1>
        <h1>빨간 글자가 됩니다.</h1>
      </div>
  </div>

  <div>
    <h1>빨간 글자가 됩니다.</h1>
  </div>
  
  <h1>빨간 글자가 됩니다.</h1>
</body>
```

<br>

## `:nth-child(n)`
- 부모 기준 n 번째 자식을 선택하라.

```HTML
<style>
  #a > h1:nth-child(2) {
    color: red;
  }
</style>

<body>
  <div id="a">
    <h1>검은 글자 그대로</h1>
    <h1>빨간 글자가 됩니다.</h1>
    <h1>검은 글자 그대로</h1>
    <div>
      <h1>검은 글자 그대로</h1>
      <h1>검은 글자 그대로</h1>
    </div>
  </div>

  <div>
    <h1>검은 글자 그대로</h1>
  </div>
  
  <h1>검은 글자 그대로</h1>
</body>
```

<br>

## `:nth-last-child()`
- 부모를 가지고 있으면서 뒤에서 두번째 위치한 요소 선택

```HTML
<style>
  h1:nth-last-child(2){
    color:red;
  }
</style>

<body>
  <div>
    <h1>검은 글자 그대로</h1>
    <h1>검은 글자 그대로</h1>
    <h1>빨간 글자가 됩니다.</h1>
    <div>
      <h1>빨간 글자가 됩니다.</h1>
      <h1>검은 글자 그대로</h1>
    </div>
  </div>

  <div>
    <h1>검은 글자 그대로</h1>
  </div>
  
  <h1>검은 글자 그대로</h1>
</body>
```

<br>

## `:nth-of-type(n)`
- 부모 요소의 특정 자식 요소 중 n번째 선택
- `even`, `odd` 키워드 사용 가능

- `An+B` 키워드 사용 가능
  - 순열과 비슷하게 선택

```HTML
<style>
  .box > p:nth-of-type(3){
    color:red;
  }
  li:nth-of-type(2n){
    color:blue;
  }
</style>

<body>
  <div class="box">
    <p>1. p태그1</p>
    <span>2. span태그1</span>
    <p>3. p태그2</p>
    <span>4. span태그2</span>
    <p>5. p태그3 빨간 글자가 됩니다.</p>
  </div>
  
  <div>
    <ul>
      <li>검정 글자</li>
      <li>파란 글자</li>
      <li>검정 글자</li>
      <li>파란 글자</li>
    </ul>
  </div>
</body>
```
<br>

## `:only-of-type`
- 동일 type의 형제가 없는 요소 선택

```html
<style>
  h1:only-of-type{
    color:red;
  }
</style>

<body>
  <div>
    <h1>검은 글자 그대로</h1>
    <h1>검은 글자 그대로</h1>
    <h1>검은 글자 그대로</h1>
  </div>

  <div>
    <h1>빨간 글자가 됩니다.</h1>
  </div>
  
  <h1>빨간 글자가 됩니다.</h1>
</body>
```
<br>

## `:not(x)`
- `x`에 들어간 인자 외 모든 요소
- `x`에는 클래스, 아이디, 가상 클래스 선택자 등이 가능

```html
<style>
  h1:not(.a){
    color:red;
  }
</style>

<body>
  <div>
    <h1>검은 글자 그대로</h1>
    <h1 class="a">빨간 글자가 됩니다.</h1>
    <h1>검은 글자 그대로</h1>
  </div>

  <div>
    <h1 class="a">빨간 글자가 됩니다.</h1>
  </div>
  
  <h1>검은 글자 그대로</h1>
</body>
```

<br>

## `::selection`
- 드래그 했을 때

```css
body *::selection{
  background-color: red;
}
```
<br>

## `::after`
- 요소의 자식 기준 마지막 위치에 내용 추가
```html
<style>
  .box li:first-child:after{
    content: '추가';
    background-color: red;
    display: block;
  }
</style>
<body>
  <ol class="box">
    <li>list
      <!--after삽입위치-->
    </li>
    <li>list</li>
    <li>list</li>
  </ol>
</body>
```
<br>

## `::before`
- 요소의 자식 기준 시작 위치에 내용 추가
```html
<style>
  .box li:first-child:before{
    content: '추가';
    background-color: red;
    display: block;
  }
</style>
<body>
  <ol class="box">
    <li>list</li>
    <li>list</li>
    <li>list 
      <!--before 추가-->
    </li>
  </ol>
</body>
```
<br>

## 속성선택자 `[attribute]`
- 특정 속성이나 특정 속성값을 가지고 있는 HTML 요소를 선택
- `[속성이름] 선택자`
- `[속성이름="속성값"] 선택자`

```html
<style>
  [title] { 
    background: black; color: yellow; 
  }
  [class] {
    colore: red;
  }
</style>
<body>
  <h1 title="h1 title">배경이 검정색이 됩니다.</h1>
  <h1 class="any">글자 색이 빨간색</h1>
</body>
```
<br>

- `선택자[속성=값]`  속성의 값이 모두 **일치**할 때 선택
- `선택자[속성^=값]` 속성값이 특정 문자열로 시작하는 요소를 모두 선택
- `선택자[속성$=값]` 속성값이 특정 문자열로 끝나는 요소를 모두 선택
- `선택자[속성*=값]` 특정 속성의 속성값에 특정 문자열를 포함하는 요소를 모두 선택
- `선택자[속성~=값]` 속성값에 특정 문자열로 이루어진 하나의 단어를 포함하는 요소를 모두 선택
- `선택자[속성|=값]` 속성값이 특정 문자열로 이루어진 하나의 단어로 시작하는 요소를 모두 선택
```html
<style>
	input[type="text"] {
			width: 150px;
			display: block;
			background-color: #FFEFD5;
			margin-bottom: 10px;
		}
	input[type="password"] {
			width: 130px;
			display: block;
			background-color: #90EE90;
			border: 2px solid red;
		}
	input[type="password"]:focus { 
    background-color: #FFC0CB; 
  }
</style>
<body>
  <form>
		사용자 : <br>
		<input type="text" name="username">
		비밀번호 : <br>
		<input type="password" name="password">
	</form>

</body>
```

<br><br><br>
<출처>
- https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=kkrdiamond77&logNo=221148269517
- https://firerope.tistory.com/5
- https://webty.tistory.com/60
- http://www.tcpschool.com/css/css_selector_attribute



