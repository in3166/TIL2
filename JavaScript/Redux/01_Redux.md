# Redux
- 상태 관리 JavaScript 라이브러리
- `store`: 정보가 저장되는 장소
<img src="https://github.com/in3166/TIL/blob/main/JavaScript/img/redux1.JPG" />

<br><br>

## state와 render
- `state`: `store`안에 실제 정보가 `state`에 저장된다. (직접 접근 불가)
- `reducer`: `store`을 만들때 `reducer` 함수를 만들어 공급해줘야 한다.
```javascript
function reducer(oldState, action){ ... }
var store = Redux.createStroe(reducer);
```
<br>

- `render`: UI를 만드는 코드 (`store` 밖에 존재)
  - `render`을 실행하면 현재 `state`를 반영한 UI를 생성
```js
function render(){
  var state = store.getState();
  //...
  document.querySelector('#app').innerHTML = ` <H1>WEB</H1> `;
}
```
<br>

- `dispatch`, `subscribe`, `getState`: 밖에서 store에 접근하기 위한 함수들
  - `subscribe`: `state`가 변경될 때마다 UI를 갱신해주는 함수
  ```JS
  store.subscribe(render);
  ```
  
<img src="https://github.com/in3166/TIL/blob/main/JavaScript/img/redux2.JPG" />

<br><br>

## action과 reducer
- submit 버튼의 이벤트 (*빨간색 선*)
```js
<form onsubmit="store.dispatch({type:'create', payload:{title:title, desc:desc}})">
```
- `dispatch` 함수에게 `객체(action)`를 하나 전달 (type이 create인 객체)
<br>

- `dispatch`의 역할
  - `reducer`을 호출하여 `state` 값을 수정 후
    - `reducer` 호출 시 두 개의 값 전달 (현재 `state`값과 `action` data)
    ```js
    function reducer(state, action){ // 인자: 현재 state와 action - dispatch에 의해 공급
      if(action.type === 'create'){
        var newContents = oldState.contents.concat();
        var newMaxId = oldState.maxId + 1;
        newContents.push({id:newMaxId, title: action.payload.title});
        return Object.assign({}, state, { // state의 새로운 값이 됨
          contents: newContents,
          maxId: newMaxId,
          mode: 'read',
          selectedId:newMaxId
        });
      }
    }
    ```
    <br>
    
  - `subscribe`을 호출하여 화면을 갱신
    - 이전의 과정 다시 수행 (render -> getState -> state -> getState -> render *초록색 선*)
<img src="https://github.com/in3166/TIL/blob/main/JavaScript/img/redux3.JPG" />

<br><br>

## Redux를 쓰는 이유
### 예제: 해당 부품을 누르면 자신과 다른 부품들의 Color를 바꾸는 일을 하는 경우
- Redux를 안 쓴 경우
  - 자신을 변경하는 로직, 자신 외의 각각의 부품을 변경하는 로직들
  - 일반적으로 코딩을 한다면 부품이 늘어날수록 할일이 급격히 늘어난다. (각 부품마다 수많은 로직들)
  - 각 부품들이 강하게 종속되어 있어 더이상 부품이 아니라 하나의 큰 전체의 일부가 된다. (코드의 복작성 증가, 유연성 감소)
<img src="https://github.com/in3166/TIL/blob/main/JavaScript/img/redux4.JPG" />
<br>

- Redux를 사용한 경우
  - 한 버튼을 누르면 `store`에 데이터가 달라진 것을 알려주는 로직
  - `store`가 나머지 부품 전체(자신을 구독하는)에 상태가 변경되었으므로 업데이트하라고 알리는 로직
  - 각 부품은 자신이 어떻게 업데이트되야 하는지 알고 있어 알림을 받으면 알아서 업데이트된다.
  - 즉, 각 부품은 2개의 로직 필요 (나의 상태가 변경되었을 때 알리는 로직, 나 자신을 어떻게 업데이트해야 하는지에 대한 로직)
<img src="https://github.com/in3166/TIL/blob/main/JavaScript/img/redux5.JPG" />

<br><br>

### 예제 실제 코딩해보기
- Redux를 안 쓴 경우
```html
<!-- without-redux.html -->
<body>
  <style>
    .container{
      border: 5px solid black;
      padding: 10px;
    }
  </style>
  
  <div id="red"></div>
  <div id="green"></div>
  
  <script>
    function red(){
      document.querySelector('#red').innerHTML = `
        <div class="container" id="component_red">
          <h1>Red</h1>
          <input type="button" value="fire" 
                     onclick="
                          document.querySelector('#component_red').style.backgroundColoe='red';
                          document.querySelector('#component_green').style.backgroundColoe='red'" />
        </div>
      `;
    }
    red();
    
    function green(){
      document.querySelector('#red').innerHTML = `
        <div class="container" id="component_red">
          <h1>Red</h1>
          <input type="button" value="fire" 
                        onclick="
                          document.querySelector('#component_red').style.backgroundColoe='green';
                          document.querySelector('#component_green').style.backgroundColoe='green'" />
        </div>
      `;
    }
    green();
    // ...
  </script>
</body>
```
<br><br>

- Redux를 사용한 경우


<br><br><br>
<출처>
- https://www.inflearn.com/course/redux-%EC%83%9D%ED%99%9C%EC%BD%94%EB%94%A9/dashboard (생활코딩)
