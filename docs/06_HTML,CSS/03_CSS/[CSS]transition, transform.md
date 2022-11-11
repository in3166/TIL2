# `transition`

- 속성을 서서히 변화시키는 속성
- `transition-property`, `transition-duration`, `transition-timing-function`, `transition-delay` 속성을 한 번에 정한다.

**`transition: property timing-function duration delay | initial | inherit`**

- `property` : transition을 적용시킬 속성을 정합니다.
- `timing-function` : transition의 진행 속도를 정합니다.
- `duration` : transition의 총 시간을 정합니다.
- `delay` : transition의 시작을 연기합니다.
- `initial` : 기본값으로 설정합니다.
- `inherit` : 부모 요소의 속성값을 상속받습니다.

<br>

```html
<style>
 .jb {
  box-sizing: border-box;
 width: 64px;
 height: 64px;
 margin: 10px 0px;
 background-color: orange;
 border-radius: 100%;
 transition: all ease 2s 0s;
 }
  
 input:checked ~ .jb {
 width: 100%;
 height: 200px;
 border-radius: 0;
 background-color: red;
 }
</style>
<body>
 <input type="checkbox">
  <div class="jb"></div>
  <!-- 체크박스에 체크하면 원이 큰 사각형으로 바뀌고, 배경색도 변합니다. 체크박스의 체크를 해제하면 원래 모양으로 돌아옵니다. -->
</body>
```

<br><br>

## `transition-property: none | all | property | initial | inherit`

- 적용될 속성을 선택
- `none` : 모든 속성에 적용하지 않습니다.
- `all` : 모든 속성에 적용합니다.
- `property` : 속성을 정합니다. 여러 개의 속성을 지정할 경우 쉼표로 구분합니다.
- `initial` : 기본값으로 설정합니다.
- `inherit` : 부모 요소의 속성값을 상속받습니다.

<br><br>

## `transition-timing-function`

- transition의 진행 속도를 조절

- 기본값은 ease입니다.
- `ease` : cubic-bezier( 0.25, 0.1, 0.25, 1 )과 같습니다.
- `linear` : cubic-bezier( 0, 0, 1, 1 )과 같습니다.
- `ease-in` : cubic-bezier( 0.42, 0, 1, 1 )과 같습니다.
- `ease-out` : cubic-bezier( 0, 0, 0.58, 1 )과 같습니다.
- `ease-in-out` : cubic-bezier( 0.42, 0, 0.58, 1 )과 같습니다.
- `step-start` : steps( 1, start )와 같습니다.
- `step-end` : steps( 1, end )와 같습니다.

- `initial` : 기본값으로 설정합니다.
- `inherit` : 부모 요소의 속성값을 상속받습니다.

- **`cubic-bezier( n, n, n, n )`** : n에는 0부터 1까지의 수를 넣습니다.
  - <http://cubic-bezier.com>
- `steps( n, start|end )` : n단계로 나누어 변화. (defalut: end)

<br><br>

## `transition-duration: time| initial | inherit`

- 끝날 때까지 걸리는 시간 선택
- 기본값은 0s입니다.
- 시간 단위는 초(s) 또는 1/1000초(ms)를 사용합니다.
- `initial` : 기본값으로 설정합니다.
- `inherit` : 부모 요소의 속성값을 상속받습니다.

<br><br>

## `transition-delay: time| initial | inherit`

- 시작하는 시간을 연기
- 기본값은 0s입니다.
- 시간 단위는 초(s) 또는 1/1000초(ms)를 사용합니다.
- `initial` : 기본값으로 설정합니다.
- `inherit` : 부모 요소의 속성값을 상속받습니다.

<hr>
<br><br>

# `transform`

- 요소의 모양, 크기, 위치 등을 자유롭게 바꿀 수 있습니다.

`<TIP>`

- CSS 좌표 체계의 기준점은 브라우저 왼쪽 상단
- CSS 접두어 의미
  - `-webkit-` : 구글, 사파리 브라우저에 적용
  - `-moz-` : 파이어폭스 브라우저에 적용
  - `-ms-` : 익스플로러에 적용, 보통 생략
  - `-o-` : 오페라 브라우저에 적용

<br>

## `translate()`

- 현재 위치에서 해당 요소를 X축과 Y축의 거리 만큼 이동

```CSS
#trans {
  -webkit-transform: translate(100px, 50px);
  -ms-transform: translate(100px, 50px);
  transform: translate(100px, 50px);
}
```

<br>
## `rotate()`
- 해당 요소를 주어진 각도만큼 시계 방향이나 반시계 방향으로 회전
<br>

## `scale()`

- 해당 요소의 크기를 주어진 배율만큼 늘리거나 줄입니다.
- 배율이 1보다 크면 크기를 늘리고, 0보다 크고 1보다 작으면 크기를 줄입니다.

<br>
## `skew()`
- 해당 요소를 주어진 각도만큼 각각 x축과 y축 방향으로 기울입니다.
- `skewX()`
- `skewY()`

<br>
## `matrix()`
- 모든 2D transform 메소드를 한 줄에 설정할 수 있도록 해줍니다.
- `matrix(scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY());`
```CSS
# matrix {
 -webkit-transform: matrix(0.7, 0, 0, 0.7, 1, 0);
 -ms-transform: matrix(0.7, 0, 0, 0.7, 0, 0);
 transform: matrix(2, 0.3, 0.2, 1.3, 150, 100);
}
```

<br><br><br>
<출처>

- <https://www.codingfactory.net/10953>
- <http://www.tcpschool.com/css/css3_transform_2Dtransform>
