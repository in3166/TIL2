### Static

- 요소를 HTML 상의 정의된 순서로 보여준다. (Default)
- 문서 흐름에 따라 배치한다.

### Relative

- 요소를 문서 흐름에 따라 배치한다.
- 자신을 기준으로 'top', 'right', 'bottom', 'left' 값에 오프셋을 적용한다.
- 해당 요소가 이동해도 페이지 레이아웃에서 요소가 차지하는 공간은 그대로 유지된다.

### Absolute

- 가장 가까운 위치 지정 조상 요소를 기준으로 상대적으로 배치한다.
- 위치가 설정된 조상 요소가 없다면, 'body' 요소를 기준으로 위치를 설정한다.
- 페이지 레이아웃에 공간이 배정되지 않는다.

### Fixed

- 뷰포트를 기준으로 위치를 설정한다.
- 페이지가 스크롤 되어도 요소는 항상 같은 곳에 위치한다.
- 페이지 레이아웃에 공간이 배정되지 않는다.

### Sticky

- 평소 'fixed'와 같이 요소를 화면에 고정하지만, 특정 조상인 'scroll' 박스 안에서 고정한다.
- 'scroll' 박스: 'overflow: auto', 'overflow; scroll' 속성을 적용한 가장 가까운 조상 요소

</br></br>

### Float

- 원래의 목적: 이미지, 텍스트 배치 방법
</br></br>

# Flex Box

### Main Axis (중심축)

- 가로나 세로 둘다 중심축이 될 수 있음
- 왼쪽에서 오른쪽, 위에서 아래

### Cross Axis (반대축)

- 중심축과 반대되는 축
</br></br>
</br></br>

## 1. Cotainer

- height
  - %: 컨테이너가 들어있는 부모의 %를 채움 (body안에서 100%를 해도 html의 크기가 전체 보이는 크기가 아니므로 해당 컨테이너의 아이템 크기에 맞춰짐)
  - vh: view height - 보이는 높이, 100이면 보이는 전체

- display
  - flex: container를 flex box로 지정, 자동으로 왼쪽에서 오른쪽으로 정렬

- flex-direction: 기본축 설정
  - row: default, 왼쪽에서 오른쪽
  - row-reverse: 오른쪽에서 왼쪽
  - column: 위에서 아래
  - column-reverse: 아래에서 위

- flex-wrap
  - nowrap: default, 크기에 상관없이 item들이 한 줄에 붙어있음.
  - wrap: 자동으로 다음 줄로 이동.
  - wrap-reverse: 반대로 wrapping

- flex-flow: flex-direction과 flex-wrap을 합함.
  - flex-flow: column nowrap

- justify-content: 중심축에서 item을 배치하는 방법.
  - flex-start: flex-direction 방향에 맞게 처음부터 정렬 (순서x, 위치만)
  - flex-end: 중심축에 끝에 맞춰 정렬.
  - center
  - space-around: 각 item들에 space를 넣어줌, 간격 띄움 (처음과 끝은 item 사이들의 간격보다 작음- item 하나의 space이므로)
  - space-evenly: 처음과 끝의 여백도 item 사이의 여백과 동일하게 적용.
  - **space-between**: 처음과 끝 item은 contatiner에 딱 맞게 배치하고 다른 item은 space를 줌.

- align-items: 현재 중심축의 반대축에서 item을 배치하는 속성 (item 정체의 위치 결정)
  - justify-content의 속성과 동일하지만 반대축을 기준으로 함.
  - **center**: 줄들간의 간격 유지, 줄들 전체가 중간으로 이동.
  - baseline: item의 크기가 다 다르면 텍스트를 기준으로 균등하게 배치해줌

- align-content: 반대축에서 item 사이의 줄 간격 배치하는 방법. (줄들 간의 간격 결정, 1줄만 있으면 효력x)
  - justify-content의 속성과 동일하지만 반대축을 기준으로 함.
  - center: 줄들을 전부 다 중간으로 배치, 줄들간의 간격 없음.

</br></br>

## 2. Item

- order: item의 순서 결정, 잘 안쓰임.
- flex-grow: 컨테이너에 크기에 맞춤 (비율로), 여백을 비율 별로 각각의 item들이 가짐
  - default은 자신의 item 크기를 유지하다가 작아지면 줄어듬.

   ```css
   .item{
     flex-basis: 0;
   }
   .item:nth_child(1){
     fles-grow: 1;
   }
   .item:nth_child(2){
     fles-grow: 2;
   }
   ```

- fles-basis: Items이 점유하는 공간을 설정해줌
  - 0, auto: 0으로 하고 fles-grow로 비율을 설정해주면 여백이아닌 아이템 각각의 비율이 됨

- flex-shrink: 컨테이너가 작아질 때 비율
  - 각각의 item 중 어떤게 더 크게 줄어들지

- flex: 각 item이 차지하는 비율 %
  - flex-basis를 0으로 설정안해도 실제 아이템들이 비율에 딱 맞음

- align-self: 아이템 별로 정렬
  - center, flex-start 등

<팁>
material.io

- 색에 맞춘 스타일 제공

<출처>

- <https://www.youtube.com/watch?v=7neASrWEFEM&list=PLv2d7VI9OotQ1F92Jp9Ce7ovHEsuRQB3Y&index=9>
