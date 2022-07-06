```html
<div class = "container">
  <div class="item">
    <img>
  </div>
  <div class="item">
    <img>
  </div>
  <div class="item">
    <img>
  </div>
  <div class="item">
    <img>
  </div>
</div>
```
```css
.containter {
  display: grid;
  grid-template-columns: 40% 60% ; 가로로 4:6으로 아이템 하나씩 분할하여 배치
  grid-template-columns: 4fr 6fr ; 더 많이 씀, 여백을 줘도 스크롤 안생김
  grid-template-columns: repeat(3, 1fr); == 1fr 1fr 1fr 3줄이 됨
  grid-template-columns:: 200px 1fr; 한 컬럼은 고정
  grid-gap: 1rem; item들 사이에 여백을 줌
  /* 각 행의 높이는 내용이 가장 큰 아이템에 맞춰 균일, 내용에 상관없이 각각의 행들의 높이를 균일하게 하려면*/
  grid-auto-rows: 200px; 200px 보다 내용이 높으면 삐져나옴
  grid-auto-rows: minmax(200px, auto); 최소 200px을 확보하고 내용이 많아도 안삐져나오고 내용에 맞춰 늘어남

  /* 정렬*/
  justify-items: start; center; end; 각각의 아이템들의 그리드 안에서 가로로 정렬
  align-items: start; center; end; 각각의 아이템들의 그리드 안에서 세로로 정렬
}

.item:nth-child(1){
  grid-column: 1/4; 1번째 아이템을 1~4까지 가로로 차지하게 해준다. (1부터 시작, 3줄일 때 가정) -> 한 행을 다 차지함(헤더)
}

.item:nth-child(4){
  grid-columnL 3;  위치 조정 가능
  grid-row: 2/4; 1번째 아이템을 1~4까지 가로로 차지하게 해준다. (1부터 시작, 3줄일 때 가정) -> 한 행을 다 차지함(헤더)
}

.item:nth-child(5){
  justify-self: start; center; end; 아이템 하나만 정렬
  align-self:  start; center; end;
}

.item:nth-child(9){
  grid-column: 3;
  grid-row: 3/5; 영역을 겹치게 가능
}
```

<img src="https://github.com/in3166/TIL/blob/main/HTML%2CCSS/img/grid1.JPG" />

<br><br><br>

<출처>
- https://www.youtube.com/watch?v=eprXmC_j9A4
