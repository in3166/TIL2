# EventListenerOptions

- `addEventListener`의 3번째 인자로 `useCapture` 속성을 포함한 객체를 사용할 수 있음

```js
// it's same
document.addEventListener('touchstart', listener, true);
document.addEventListener('touchstart', listener, { capture:true });
```

- `capture` : 이벤트 전달 방식으로 capturing(true) 또는 bubbling(false) 선택
- `once` : true일 경우 이벤트를 한번만 받고 해제
- `passive` : true일 경우 이벤트에 의해 스크롤이 블럭되는 것을 방지

<br>

## { passive: true }

- '모바일 디바이스의 부드러운 스크롤' 문제 해결
- **스크롤**에 관련된 성능 문제 해결할 때 지정
<br>

### Why?

- 모던 웹 브라우저 내부엔 `네트워크`, `브라우저`, `UI`, `GPU`, `플러그인`, `렌더러` 등 여러 프로세스 존재

- 크롬은 탭 내의 웹 콘텐츠를 렌더러 프로세스가 처리하고 렌더러 프로세스 내부에서도 하위 스레드들이 돌아간다.
<img src="02_JavaScript/img/pass1.png" width="50%" />

- 렌더러 프로세스가 화면을 그리는 과정
  - `JS -> Style -> Layout -> Paint -> Composite`
  
    - 메인 스레드: JS 실행 후 Layout, Paint 과정을 거쳐 Layout tree 생성
    - 이후, 컴포지터 스레드가 넘겨 받아 Layout Tree에 따라 Composite 수행

- 성능 최적화
  - `reflow`: 화면의 레이아웃에 영향을 주는 속성이 변경될 경우 위 파이프라인을 모두 수행
  - `repaint`: 색상, 이미지 등 paint에 관계된 속성만 변경될 경우, Paint 부터 Composite 까지 수행

- 만약, `reflow`, `repaint`가 발생하지 않는 경우(paint, layout에 영향을 주지 않는 경우), `Composite` 작업만 수행 가능
  - 메인 스레드 처리를 기다리지 않고 바로 컴포지터 스레드가 처리할 수 있어 성능에 좋다.
<br>

### So

- JavaScript에 `addEventListener()`로 등록된 이벤트는 컴포지터 스레드가 받는다.
- 이벤트가 들어오면 컴포지터 스레드는 메인 스레드에 이벤트를 넘기고 렌더링 파이프라인을 따라 처리되기를 기다린다.

- **`{ passive: true }`는 이벤트를 받는 컴포지터 스레드에 해당 이벤트가 메인 스레드의 처리를 기다리지 않고 바로 Composite를 수행해도 된다는 의미이다.**
  - 컴포지터 스레드는 원래의 동작대로 메인 스레드에 이벤트를 넘기지만, 기다리지 않고 바로 Composite 수행
  - 즉, 스크롤 이벤트를 받아 새 프레임을 바로 합성할 수 있고 결과적으로 스크롤 성능이 향상된다.

- 이 속성을 사용하면 `e.preventDefault()`를 사용할 수 없다. (타겟의 기본 동작 막음)
  - 컴포지터 스레드가 바로 합성을 해야하는데 `e.preventDefault()`는 스크롤을 막고 메인 스레드에서 처리를 해야하는 메소드이기 때문

<br><br><br>
<출처>

- <https://amati.io/eventlisteneroptions-passive-true/>
