# CSS3 Animation

- 엘리먼트에 적용된 CSS 스타일을 다른 CSS 스타일로 부드럽게 전환

## 구성

- 애니메이션 CSS 스타일
- ***KeyFrames***: 애니메이션의 중간 상태를 나타냄

### 기존 스크립트를 사용한 애니메이션 보다 이점

1. 자바스크립트를 몰라도 간단하게 애니메이션 생성 가능
2. 자바스크립트 보다 성능 향상, Frame-Skipping 같은 여러 기술을 이용 최대한 부드럽게 렌더링
3. 브라우저는 애니메이션의 성능을 효율적으로 최적화 (ex. 현재 안보이는 엘리먼트에 대한 애니메이션은 업데이트 주기를 줄여 부하 최소화)

## 애니메이션 적용

- `animation` 속성과 이 하위 속성 지정
- 애니메이션의 총 시간, 반복 여부 등 지정 가능
- 이 속성은 중간상태를 기술하지 않음.

1. `animation-delay`: 엘리먼트가 로드되고 나서 언제 애니메이션이 시작될지 지정
2. `animation-direction`: 애니메이션이 종료되고 다시 처음부터 시작할지 역방향으로 진행할지 지정
3. `animation-duration`: 한 싸이클의 애니메이션이 얼마에 걸쳐 일어날지 지정
4. `animation-iteration-count`: 애니메이션이 몇 번 반복될지 지정합니다. infinite로 지정하여 무한히 반복 가능
5. `animation-name`: 중간 상태를 지정합니다. 중간 상태는  @keyframes 규칙을 이용하여 기술
6. `animation-play-state`: 애니메이션을 멈추거나 다시 시작
7. `animation-timing-function`: 중간 상태들의 전환을 어떤 시간간격으로 진행할지 지정
8. `animation-fill-mode`: 애니메이션이 시작되기 전이나 끝나고 난 후 어떤 값이 적용될지 지정

<br/>

# `KeyFrames` 사용하여 애니메이션 중간상태 기술

- `@keyframse` 규칙 이용, 두개 이상의 중간 상태 기술
- 특정 시점 엘리먼트가 어떻게 보일지 나타내고 전체 애니메이션에서 언제 등장할지 `<percentage>`를 지정
- 0%는 애니메이션이 시작된 시점이고 100%는 끝나는 시점, 최소 이 두시점은 기술되어야 한다. (`from`, `to`를 대신 사용 가능)

<br/>

## 예제

### 텍스트가 브라우저를 가로질러 움직이게 하기

`애니메이션 CSS 속성에`-webkit-`,`-moz-`등의 접두어가 사용되지 않음 -> 오래된 브라우저는 접두어 필요`

- `<p`> 엘리먼트가 브라우저 윈도우 오른쪽에서 왼쪽으로 가로질러 움직임

```css
p {
  animation-duration: 3s;  /* 애니메이션 총 길이 3초 */
  animation-name: slidein; /* slidein 애니메이션 지정 */
  animation-iteration-count: infinite; /* 애니메이션 반복 */
  animation-direction: alternate;      /* 애니메이션이 끝났을 때 반대방향으로 이동 */
}

@keyframes slidein { /* 애니메이션 중간 성태 기술하고 slidein이라 이름 붙임 */
  from {
    margin-left: 100%;
    width: 300%
  }
  
  75% {  /* 애니메이션 중간 상태 추가, 글자가 커지다가 원상태로 복귀 */
    font-size: 300%;
    margin-left: 25%;
    width: 150%;
  }
  
  to {
    margin-left: 0%;  /* 왼쪽 margin 100에서 시작해 0으로 */
    width: 100%;
  }
}
```

<br/><br/><br/>
<출처>

- <https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Animations/Using_CSS_animations>
