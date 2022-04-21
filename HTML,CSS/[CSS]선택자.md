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


<br><br><br>
<출처>
- https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=kkrdiamond77&logNo=221148269517



