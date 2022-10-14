# @supports
- 브라우저가 해당 CSS를 지원하는지 여부를 알려준다.

- ex) `grid` 지원 여부 확인
    - 지원이 되면 `div`를 `grid container`로 생성

    ```css
    @supports(display: grid){
      div {
        display: grid;
      }
    }
    ```

    - 지원하지 않는지도 확인 가능

    ```css
    @supports not (display: grid){
      div {
        display: flex;
      }
    }
    ```

<br>

# CSS Scroll Snap 
- 웹사이트 스크롤 방법?을 정함
- 스크롤 시 어떤 요소에 stick하게 설정 가능 (JS 없이 사용 가능)
- `scroll-snap-type`를 부모 요소에 `scroll-snap-align`을 자식 요소에 설정

```css
#container {
  height: 500px;
  scroll-snap-type: y mandatory;
}

.item {
  scroll-snap-align: center;
  height: 500px;
}
```

```html
<div id="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
</div
```

### [Demo Scroll](https://codepen.io/serranoarevalo/pen/xxdYBxZ)

<br>

# :is Pseudo Selector
- 적은 코드로 수많은 요소 선택 가능
- ex) header, nav, form 버튼의 배경색 바꾸기

```css
/* 기존 */
header button,
nav button,
form button {
  background-color: tomato;
}

/* :is Pesudo Selector 사용 */
:is(header, nav, form) button {
  background-color: tomato;
}
```

# Flex Box Gap
- 기존 `flex box`는 `container` 안의 `item` 사이의 간격을 두기 위해 `margin` 등을 사용해야만 했다.

- `flex container`에 `gap` 프로퍼티 설정
   - 두 개의 값을 주면 첫번째 요소는 행의 간격, 두번째 요소는 열의 간격

    ```css
    div {
      display: flex;
      gap: 10px 5px;
    }
    ```

# aspect-ratio
- 요소의 `aspect-ratio` 결정 가능
- 영상/이미지를 보여줄 때, 정해진 비율을 유지 가능하게 해준다.

```css
img {
  /* 16:9 */
  aspect-ratio: 16 / 9; 
}
```

<br>

# position: sticky
- 유저의 스크롤을 따라다니는 요소 생성 가능 (어디서부터 어디까지 따라다닐지 지정 가능)
- 원하는 요소에 `position: sticky`을 설정하고 정의된 높이가 있는 컨테이너 안에 요소를 넣으면 된다.

```html
<div id="container">
  <section>
    <aside>Header</aside>
  </section>
  <section>
    <aside>Header</aside>
  </section>
  <section>
    <aside>Header</aside>
  </section>
</div>
```

```css
section{
  height: 70%;
  display: flex;
  ...
}

aside {
  position: sticky;
  ...
}
```

### [Demo Sticky](https://codepen.io/serranoarevalo/pen/YzVeMyJ)

<br>

# @container
- 브라우저가 아닌 부모 요소에 의해 스타일이 적용
- 컴포넌트 단위로 스타일을 적용해 여기 저기에 다른 스타일(형태)로 재사용 가능해진다.

```css
.card-container {
  contain: style layout inline-size;
  /* ... */
}

.title {
  font-size: 20px;
}
/* 컨테이너 사이즈가 350px 이하일 때 .title에 아래 스타일 적용 */
@catainer (max-width: 350px) {
  .title {
    font-size: 10px;
    color: red;
  }
}
```



<br><br><br>
<출처>
- [노마드 코더](https://www.youtube.com/watch?v=lkTpOHv1Ros&list=WL&index=43)
- [코딩애플](https://www.youtube.com/watch?v=4Vq8CQf-egI&list=WL)
