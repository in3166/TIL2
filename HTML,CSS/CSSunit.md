# 절대적 값 (Absolute Length Units)
- cm, mm, Q, in, pc, pt, `px`
- Container 사이즈 변경에도 컨텐츠 고정
- 브라우저에서 폰트 사이즈 변경 시에도 고정되어 있음


# 상대적 값 (Relative Length Units)
## 폰트 사이즈에 비례
- `em`
  - 현재 지정된 포인트 사이즈 단위, 지금 폰트 사이즈를 나타내는 단위
  - 선택된 폰트 패밀리에 상관없이 항상 고정된 폰트 사이즈
  - 1em == 16px
  - `부모`의 폰트사이즈에 상대적으로 사이즈 지정 (곱한 값)
  <img src="" />
  - 위의 예제에서 `em`을 `%`로 바꿔도 동일 (8em == 800% / 0.5em == 50%)
  
- `rem`
  - root em
  - `root`에 지정된 폰트사이즈에 따라 크기 결정
  <img src="" />
  
  
- ex: 지정된 폰트패밀리에 따라 높이가 달라짐
- ch: 지정된 폰트패밀리에 따라 너비를 나타냄



- lh (line height pf the element)

- viewport related: 브라우저 너비를 기준으로
  - `vw`
  - `vh`
  - vmin
  - vmax

- `%`: 부모 요소에 상대적으로 크기 결정



<br><br><br>

<출처>
- https://www.youtube.com/watch?v=7Z3t1OWOpHo&list=PLv2d7VI9OotQ1F92Jp9Ce7ovHEsuRQB3Y&index=21
