# TDD (Test Driven Development: 테스트 주도 개발)

```
'1' + 1 = '11'
'2' * 3 = 6
1 + '2' + 3 * 4 = '1212'
```

- 예측하기 어려운 코드들
- 자바스크립트는 문법 체크 과정이 없어 모든 브라우저에서 직접 실행해봐야 동작을 보장

## 단위 테스트 (Unit Test) - TDD의 첫 번째 단계

- 단위(unit): 특정 조건에서 어떻게 작동해야 할지 정의한 것 (대개 '함수'로 표현) - Input에 따라 계산한 결과를 Output으로 도출
- 중비(arrange), 실행(act), 단언(assert) 패턴
<BR>
  
- 어떤 함수의 기능을 만들 때
  - ***적색 단계(RED) 단계***
    - 바로 기능을 코딩하지 않고 기능을 테스트할 수 있는 테스트 코드 생성 (단위 테스트)
  - ***녹색 단계(GREEN) 단계***
    - 함수에 기능 코드를 작성 (테스트에 통과할 정도로 구현)
  - ***리팩터(Refactor) 단계***
    - 녹색 단계를 거친 코드의 리팩토링 (추상화, 확장 가능, 중복 제거 등)
    - 코드를 수정할 때 기존 로직을 계속 유지해야 한다. -> 즉, 수정한 코드가 기존 로직 유지함을 보장(TDD: Test의 성공 여부)
<br>

## Jasmine Framework

### 설치 방법

- *Karma와 함께 설치(자동화)*
- **StandAlone**
  - 모든 Jasmine 코드를 브라우저에 올려서 실행
  - 간단하게 실행 결과 확인 가능
  - 실무에선 잘 쓰이지 않음.
  - <https://github.com/jasmine/jasmine/releases> -> zip
  - 테스트 러너(Test Runner) 파일
    - 자스민, 소스, 테스트 코드를 실행
    - 스탠드 얼론으로 설치한 자스민은 HTML 파일이 테스트 러너 (자동화를 하려면 테스트러너인 카르마와 함께 사용-명령어로 테스트 돌림)

  ```javascript
  // SpecRunner.html
  // 자스민 라이브러리 파일
  <scirpt src="lib/jasmine-2.7.0/jasmine.js" />
  <scirpt src="lib/jasmine-2.7.0/jasmine-html.js" />
  <scirpt src="lib/jasmine-2.7.0/boot.js" />
  // 소스 코드
  <scirpt src="src/Player.js" />
  <scirpt src="src/Song.js" />
  // 테스트 코드
  <scirpt src="spec/SpecHelper.js" />
  <scirpt src="spec/PlaterSpec.js" />
  ```

## 자스민 테스트 코드 기본 구조

- Sample.html

```javascript
    // 테스트 코드 작성
    describe('hello world', ()=> { // 테스트 스윗: 테스트 유닛들의 모음
      it('true is true', ()=> { // 테스트 유닛: 테스트 단위
        expect(true).toBe(true) // 매쳐: 검증자 
        // 함수 결과 기대값, 기대하는 값
      })
    })
```

- `describe('설명', 테스트 구현 함수)` 함수: 테스트 꾸러미(Test Suite) 생성, 테스트 케이스의 모음, 보통 함수 하나하나 테스트할 때 사용
- `it('설명', 기대식 가진 테스트 구현 함수)` 함수: 테스트 케이스 만들기, 함수의 기능 테스트할 때 사용 (Test Spec)
  - 첫번째 인자: 함수 기능의 스펙: 문자열 형태
  - 두번째 인자: 테스트 코드 구현
- 테스트 코드 구현부 (기대식과 매쳐)
  - `expect(결과값)` 함수: 함수 결과값을 인자로
  - `tobe(기대값)` 함수: 기대하는 값을 인자로

- 결과

```
1 spec, 0 failure // 모든 테스트는 1개, 실패 0개
hello world
  true is true
```

<br>

# 테스트할 수 없는 코드

```html
<button onclick="counter++; countDisplay()">증가</button>
<span id="counter-display">0</span>

<script>
  var counter = 0;
  
  function countDisplay(){
    var el = document.getElementById('counter-display');
    el.innerHTML = counter;
  }
</script>
```

- 문제점

1. 관심사 분리

- 클릭 이벤트 처리기를 인라인 형태로 정의 (counter++; countDisplay())
- 값을 올리고 출력 - 한 줄의 코드에 여러 역할
- 소프트웨어 공학 원칙 - 단일 책임의 원칙(하나의 코드는 한 가지 역할)
  
2. 재사용성

- counter 전역 공간을 어지럽힌다.
- 횟수를 표시하는 span id를 dipalyCount()에서 하드 코딩

### 어떻게 해야 테스트할 수 있는 코드를 만들까?

1. 코드를 UI에서 완전히 분리

- HTML에서 JS 코드를 떼어내면 비즈니스 로직만 테스트 가능

2. 자바스크립트를 별도 파일로 분리

- 다른 곳에서도 재사용할 수 있고 테스트성도 좋아진다.

<BR>

# 모듈 패턴

- 함수로 데이터를 감추고, 모듈 API를 담고 있는 객체를 반환하는 형태

## 1. 임의 모듈 패턴

- 임의 함수를 호출하여 생성하는 모듈
- 객체가 여러개 필요할 경우 사용

```JAVASCRIPT
// 이름공간으로 활용
var App = App || {}

// 이름공간에 함수를 추가, 의존성있는 God 함수 주입
App.Person = function (God) {
  var name = God.makeName()
  
  // API 노출
  Return {
    getName: function() { return name },
    setNaem: function(newName) { name = newName }
  }
}
```

- 어떤 객체(getName, setName 메서드로 이루어진)를 반환하는 함수
- name 변수는 모듈 안에서만 접근 가능 (return 되는 get, set 메서드에서 사용되기 때문에 클로저 변수)
- 모듈 생성 시 God라는 다른 객체 주입: God 모듈이 name을 만들어내는 역할
- 사용

  ```js
  const person = App.Person(God) // oop의 객체 느낌
  person.getName()
  ```

## 2. 즉시 실행 함수(IIFE) 기반 모듈

- 임의 모듈 패턴과 거의 비슷하지만 모듈 정의 직후 바로 실행
- 객체 하나만 필요할 경우 사용

```JAVASCRIPT
var App = App || {}

App.Person = (function () {
  let name = ''
  
  // API 노출
  return {
    getName: function(God) { 
        name = name || God.makeName()
        return name 
    },
    setNaem: function(newName) { name = newName }
  }
})() // 함수 선언 즉시 실행. 싱글톤일 때 사용

//사용
App.Person.getName(God) // 이미 객체가 만들어져 있어, 메서드에 바로 접근 가능
```

## 모듈 생성 원칙

1. 단일 책임 원칙에 따라 모듈은 한 가지 역할만 한다.

- 그 역할만 집중함으로서 모듈을 더운 튼튼하게 만든다.
- 테스트 용이

2. 모듈 자신이 사용할 객체가 있다면 의존성 주입 형태로 제공한다.

- or 팩토리 주입 형태로 제공
- 테스트 용이

<br>

# 테스트 코드 작성

## 화면에 보이지 않는 부분의 모듈 만들기

### - ClickCounter 모듈 생성

- 카운터 데이터를 다루는 모듈
- 전역 공간에 있는 counter 변수를 ClickCounter 안에서 관리

# 첫번째 스펙: 'ClickCounter 모듈의 getValue()는 카운터 값을 반환한다.'

- 위 요구사항을 TDD 방식으로 구현

```html
<!--  index.spec.html -->
    <link rel="shortcut icon" type="image/png" href="../jasmine/lib/jasmine-2.6.4/jasmine_favicon.png">
    <link rel="stylesheet" type="text/css" href="../jasmine/lib/jasmine-2.6.4/jasmine.css">

    <script type="text/javascript" src="../jasmine/lib/jasmine-2.6.4/jasmine.js"></script>
    <script type="text/javascript" src="../jasmine/lib/jasmine-2.6.4/jasmine-html.js"></script>
    <script type="text/javascript" src="../jasmine/lib/jasmine-2.6.4/boot.js"></script>
  </head>
  <body>

    <script src="ClickCounter.js"></script>
    <script src="ClickCounter.spec.js"></script>
  </body>
```

### TDD의 첫 단계: 실패하는 테스트 코드 만들기 (적색 단계)

```javascript
// ClickCounter.spec.js
// ClickCounter를 테스트: 요구사항에 따른 테스트 코드
describe('App.ClickCounter', ()=> {
  describe('getValue()', ()=> {
    it('초기값이 0인 카운터 값을 반환한다', ()=> {
      // todo 
      const counter = App.ClickCounter()
      expect(counter.getValue()).toBe(0);
    })
  })
})
```

- ClickCounter 모듈이 존재한다고 가정하고 테스트 코드 작성 (적색 단계)

### TDD의 두번째 단계: Test 통과하도록 모듈 코드 생성 (녹색 단계)

```javascript
// ClickCounter.js
var App = App || {} // 네임스페이스 생성

App.ClickCounter = () => { // App에 ClickCounter 모듈 생성
    return {
        gerValue() {
            return 0 // 버튼을 클릭할 때 마다 변경되야할 counter에 상수값 x -> 변수로 변경
        }
    }
}
```

### TDD의 세번째 단계: Refactor 단계

- counter 변수로 변경
- 안심하고 리팩토링 가능 -> 이미 작성한 테스트 코드로 올바르게 작성 가능

```javascript
// ClickCounter.js
var App = App || {} // 네임스페이스 생성

App.ClickCounter = () => { // App에 ClickCounter 모듈 생성
    let value = 0;
    return {
        gerValue() {
            return value
        }
    }
}
```

- TDD는 하나의 기능에 대해 사이클을 돌며 개발하는 방법

<img src="02_JavaScript/img/tdd1.PNG" />

<br>
  
# 두번째 스펙: 'ClickCounter 모듈의 increase()는 카운터 값을 1만큼 증가한다.'

### TDD의 첫 단계: 실패하는 테스트 코드 만들기 (적색 단계)

```javascript
// ClickCounter.spec.js
describe('App.ClickCounter', ()=> {
  describe('getValue()', ()=> {
    it('초기값이 0인 카운터 값을 반환한다', ()=> {
      const counter = App.ClickCounter()
      expect(counter.getValue()).toBe(0)
    })
  })

  describe('increase()', ()=> {
    it('카운터를 1 올린다', ()=> {
      // todo 
      // 유닛 테스트의 준비 단계
      const counter = App.ClickCounter()
      
      // 실행 단계: increase() 함수를 호출
      counter.increase()
      
      // 단언: 결과 검증 단계
      expect(counter.getValue()).toBe(1)
    })
  })
})
```

### TDD의 두번째 단계: Test 통과하도록 모듈 코드 생성 (녹색 단계)

- increase() 구현

```js
var App = App || {}

App.ClickCounter = () => {
    let value = 0

    return {
        getValue() {
            return value
        },
        increase() {
            value++
        }
    }
}
```

### TDD의 세번째 단계: Refactor 단계

- 중복 코드의 제거: dry한 코드
- 테스트 코드의 ClickCounter 모듈 생성하는 부분에서 동일한 코드가 사용됨 (두개의 describe에서)
- `beforeEach` 함수: it 함수 호출 직전에 실행되는 자스민 함수 (중복 코드 옮기기)

```
describe(()=>{
  beforeEach(() => { // 1
  afterEach(() => { // 3
  it(() => { // 2
}
```

```javascript
// ClickCounter.spec.js
describe('App.ClickCounter', ()=> {
  let count
  beforeEach(() => { 
    counter = App.ClickCounter()
  }
  
  describe('getValue()', ()=> {
    it('초기값이 0인 카운터 값을 반환한다', ()=> {
      expect(counter.getValue()).toBe(0)
    })
  })

  describe('increase()', ()=> {
    it('카운터를 1 올린다', ()=> {
      counter.increase()
      expect(counter.getValue()).toBe(1)
    })
  })
})
```

- 초기값이 0이 아닌 경우

```javascript
// ClickCounter.spec.js
describe('App.ClickCounter', () => {
  let count
  beforeEach(() => {
    counter = App.ClickCounter()
  })

  describe('getValue()', () => {
    it('초기값이 0인 카운터 값을 반환한다', () => {
      expect(counter.getValue()).toBe(0)
    })
  })

  describe('increase()', () => {
    it('카운터를 1 올린다', () => {
      const initialValue = counter.getValue() // 초기값 미리 저장
      counter.increase()
      expect(counter.getValue()).toBe(initialValue+1)
    })
  })
})
```

<br><br>

## 화면에 보이는 부분의 모듈 만들기

### ClickCountView 모듈

- counter 데이터는 DOM에 반영되어야 하는데 이 역할을 하는 모둘을 생성
- 데이터를 출력하고 이벤트 핸들러를 바인딩하는 역할 담당

# 첫번째 스펙: 'ClickCountView 모듈의 updateView()는 카운트 값을 출력한다.'

- 데이터 조회할 ClickCounter를 어떻게 얻을까?
  - 모듈 생성 원칙 2번쨰: 모듈 자신이 사용할 객체가 있다면 의존성 주입 형태로 제공한다. (인자로 모듈 주입)
- 데이터를 출력할 DOM 엘리먼트를 어떻게 테스트할까?
  - 데이터를 출력할 DOM 엘리먼트도 만들어 전달 받기

- TDD: 모듈 주입 사용 경향: 하나의 모듈은 하나의 기능 단위이기 때문에 단일 책임의 원칙도 유지 가능

### TDD의 첫 단계: 실패하는 테스트 코드 만들기 (적색 단계)

```javascript
//ClickCountView.spec.js
describe('App.ClickCountView', () => {
  let updateEl, clickCounter, view
  beforeEach(() => {
    // 각 유닛테스트마다 매번 생성
    clickCounter = App.ClickCounter() // ClcikCounter 객체 생성
    updateEl = document.createElement('span')  // counter 값을 출력할 span 엘리먼트 생성
    view = App.ClickCountView(clickCounter, updateEl) // 두 객체를 clickcountview 모듈에 생성인자로 넘김
  })

  describe('updateView()', () => {
    it('ClickCounter의 getValue() 값을 출력한다', () => {
      // 준비
      const counterValue = clickCounter.getValue() // 출력할 데이터인 counter 값 저장
      // 실행
      view.updateView()
      // 단언
      expect(updateEl.innerHTML).toBe(counterValue.toString)
    })
  })
})
```

### TDD의 두번째 단계: Test 통과하도록 모듈 코드 생성 (녹색 단계)

- ClickCountView 모듈 생성

```javascript
// ClickCountView.js
var App = App || {}

App.ClickCountView = (clickCounter, updateEl) => {
    return {
        updateView() {
            updateEl.innerHTML = clickCounter.getValue()
        }
    }
}
```

### TDD의 첫 단계: 실패하는 테스트 코드 만들기 (적색 단계)

- ClickCountView에 의존성 주입이 되었는지 체크
  - 모듈을 사용하는 측에서 모듈의 넘겨주지 않으면 ClickCountView 모듈은 제대로 동작 불가 -> 보장
  - `toThrowError()`: 매쳐 함수 - expect 기대치에 예외를 던지는 함수 전달하면 toThrowError로 확인 가능

```javascript
describe('App.ClickCountView', () => {
  let updateEl, clickCounter, view
  beforeEach(() => {
    // 각 유닛테스트마다 매번 생성
    clickCounter = App.ClickCounter() // ClcikCounter 객체 생성
    updateEl = document.createElement('span')  // counter 값을 출력할 span 엘리먼트 생성
    view = App.ClickCountView(clickCounter, updateEl) // 두 객체를 clickcountview 모듈에 생성인자로 넘김
  })

  it('clickCounter를 주입하지 않으면 에러를 던진다.',()=> {
    const clickCounter = null
    const updateEl = document.createElement('span')
    
    // expect(function() {throw new Error()}).toThrowError(): 매쳐 함수 - expect 기대치에 예외를 던지는 함수 전달하면 toThrowError로 확인 가능
    const actual = () => App.ClickCountView(clickCounter, updateEl)
    expect(actual).toThrowError() // error을 예상
  })

  //it('updateEl을 주입하지 않으면 에러를 던진다.',()=> {

 // })

  describe('updateView()', () => {
    it('ClickCounter의 getValue() 값을 출력한다', () => {
      // 준비
      const counterValue = clickCounter.getValue() // 출력할 데이터인 counter 값 저장
      // 실행
      view.updateView()
      // 단언
      expect(updateEl.innerHTML).toBe(counterValue.toString)
    })
  })
})
```

### TDD의 두번째 단계: Test 통과하도록 모듈 코드 생성 (녹색 단계)

```javascript
var App = App || {}

App.ClickCountView = (clickCounter, updateEl) => {
    if (!clickCounter) throw Error('clickCounter')
    return {
        updateView() {
            updateEl.innerHTML = clickCounter.getValue()
        }
    }
}
```

<br>

## 테스트 더블

- 단위 테스트 패턴으로, 테스트하기 곤란한 컴포넌트를 대체하여 테스트하는 것
- 특정한 동작을 흉내만 낼뿐이지만 테스트 하기에는 적합.
- 5가지 하위 개념의 통칭
  - 더미(dummy): 인자를 채우기위해 사용
  - 스텁(sturb): 더미를 개선하여 실제 동작하게끔 만든 것으로 리턴값을 하드 코딩
  - 스파이(spy): 스텁과 유사, 내부적으로 기록을 남기는 기능 추가
  - 페이크(fake): 스텁에서 발전한 실제 코드, 운영에서는 사용할 수 없음
  - 목(mock): 더미, 스텁, 스파이를 혼합한 형태

- 자스민에선 테스트 더블을 `스파이스(spies)`라고 부른다.
  - spyOn(), createSpy() 등의 함수 존재

```javascript
// clickCounter 모듈의 increase 함수를 감시하도록 설정
spyOn(MyApp, 'foo') // 감시할 객체, 객체의 함수

// 특정 행동 한 뒤
bar()

// 감시한 함수가 실행되었는지 체크
expect(MyApp.foo).toHaveBeenCalled()
```

- bar() 함수가 MyApp.foo() 함수를 실행하는지 검증하는 코드

<br>

# 두번째 스펙: 'ClickCountView 모듈의 increaseAndUpdateView()는 카운트 값을 증가하고 그 값을 출력한다.'

- 이미 만든 ClickCounter의 increase 함수를 실행한다.
- 이미 만든 ClickCountView의 updateView 함수를 실행한다.
- 테스트 코드 또한 하나의 기능만 테스트하는게 좋다.

### TDD의 첫 단계: 실패하는 테스트 코드 만들기 (적색 단계)

```js
describe('App.ClickCountView 모듈', () => {
  ...

  describe('increaseAndUpdateView()는', ()=> {
    it('ClickCounter의 increase 를 실행한다', ()=> {
      spyOn(clickCounter,'increase')
      view.increaseAndUpdateView()
      // ClickCounter의 increase를 실핸한다는 것을 어떻게 검증할까? -> 테스트 더블
      expect(clickCounter.increase).toHaveBeenCalled()
    })
    
    it('updateView를 실행한다', () => {
      spyOn(view, 'updateView')
      view.increaseAndUpdateView()
      expect(view.updateView).toHaveBeenCalled()
    })
  })
})
```

### TDD의 두번째 단계: Test 통과하도록 모듈 코드 생성 (녹색 단계)

```javascript
var App = App || {}

App.ClickCountView = (clickCounter, updateEl) => {
  if (!clickCounter) throw new Error(App.ClickCountView.messages.noClickCounter)
  if (!updateEl) throw new Error(App.ClickCountView.messages.noUpdateEl)
  
  return {
    updateView() {
      updateEl.innerHTML = clickCounter.getValue()
    },
    increaseAndUpdateView(){
        clickCounter.increase()
        updateView()
    }
  }
}

App.ClickCountView.messages = {
  noClickCounter: 'clickCount를 주입해야 합니다',
  noUpdateEl: 'updateEl를 주입해야 합니다'
}
```

<br>

# 세번째 스펙: '클릭 이벤트가 발생하면 increaseAndUpdateView()를 실행한다.'

### TDD의 첫 단계: 실패하는 테스트 코드 만들기 (적색 단계)

```js
describe('App.ClickCountView 모듈', () => {
  let udpateEl, clickCounter, view, triggerEl

  beforeEach(()=> {
    updateEl = document.createElement('span')
    triggerEl = document.createElement('button')
    clickCounter = App.ClickCounter(); 
    view = App.ClickCountView(clickCounter, {updateEl, triggerEl}) // 인자가 많은 것은 좋지 않으므로 객체로 묶어 전달
  })
  
  ...
 
  it('클릭 이벤트가 발생하면 increseAndUpdateView를 실행한다', ()=> {
    //increseAndUpdateView가 실행됐는지 검증
    spyOn(view,'increseAndUpdateView')

    // 클릭 이벤트 발생
    // 주입 패턴 사용: 카운터 값을 출력학 돔 엘리멘트를 주입했듯이 
    // 클릭 이벤트 핸들러(increateAndUpdateView)를 바인딩할 돔 엘리먼트(triggerEl)를 주입받자
    triggerEl.click()

    // 검증: 호출됐는지 확인
    expect(view.increseAndUpdateView).toHaveBeenCalled()
  })
})
})
```

### TDD의 두번째 단계: Test 통과하도록 모듈 코드 생성 (녹색 단계)

```javascript
var App = App || {}

App.ClickCountView = (clickCounter, options) => {
  if (!clickCounter) throw new Error(App.ClickCountView.messages.noClickCounter)
  if (!options.updateEl) throw new Error(App.ClickCountView.messages.noUpdateEl)

  // increaseAndUpdateView를 trigger에서 실행하려는데 return에 있어 호출할 수 없으므로 반환 객체를 미리 변수에 저장
  const view = {
    updateView() {
      options.updateEl.innerHTML = clickCounter.getValue()
    },
    increaseAndUpdateView() {
      clickCounter.increase()
      this.updateView()
    }
  }

  options.triggerEl.addEventListener('click', () => {
    view.increaseAndUpdateView()
  })

  return view
}

App.ClickCountView.messages = {
  noClickCounter: 'clickCount를 주입해야 합니다',
  noUpdateEl: 'updateEl를 주입해야 합니다'
}
```

<br><br>

# 모듈 이용 화면 만들기

```html
<html>
  <body>
    <span id="counter-display"></span>  <!-- updateEl -->
    <button id="btn-increase">Increase</button> <!-- triggerEl -->

    <script src="ClickCounter.js"></script> <!-- 테스트코드는 호그ㅘ디 않음 -->
    <script src="ClickCountView.js"></script>

    <script>
      (() => {
        // todo: 두 모듈과 markup으로 화면을 그릴 부분
        const clickCounter = App.ClickCounter()
        const updateEl = document.querySelector('#counter-display')
        const triggerEl = document.querySelector('#btn-increase')
        const view = App.ClickCountView(clickCounter, { updateEl, triggerEl })
        view.updateView()
      })()
    </script>
  </body>
</html>
```

## 기존 코드와 비교

```html
<button onclick="counter++; countDisplay()">증가</button>
```

- button: 여러 관심사 혼재 (버튼 출력과 클릭이벤트 바인딩, 카운터 값 증가, 카운터 값 화면에 그리는 함수 호출)
- 개선
  - `<button id="btn-increase">Increase</button>`: 화면에 버튼만 출력
  - `view.updateView()`: 화면 갱신은 view 객체의 updateView() 메서드가 맡음
  - `ClickCounter`모듈의 increase() 함수 카운터 값 증가, 이 모듈이 클릭 관련 데이터를 관리
  - `ClickCountView` 화면 관리 모듈: `options.triggerEl.addEventListener('click', () => { view.increaseAndUpdateView() }) - 버튼 클릭 이벤트 바인딩
  - 가독성과 유지 보수 용이성 향상
<br>

```html
<script>
  var counter = 0;
</script>
```

- 전역 변수 counter: 변수 이름이 충돌할 여지 많음.
- 개선: 데이터 관리는 `ClickCounter` 모듈에 위임
  - 전역 변수를 모듈 안에 넣음

  ```javascript
  App.ClickCounter = () => { 
  let value = 0; 
    return {
      getValue() {
        return value
      },
      increase() {
        value++
      }
    }
  }
  ```

  - 이 value 함수는 다른 함수 `getValue`와 `increase`에서 호출 함으로써 **클로저**로 만듦. -> `ClickCounter` 모듈 안에서만 이 값을 접근 가능(외부 접근 불가)
  
<br>

```html
<script>
  function countDisplay() {
    var el = document.getElementById('counter-display');
    el.innerHTML = counter;
  }
</script>
```

- 기존 `countDisplay()` 함수의 문제점: 재사용 불가
- 개선: 화면 관리 모듈 `ClickCountView`
  - `updateView()` 메서드: `options.updateEl.innerHTML =  clickCounter.getValue()`
  - 호출 시 `updateEl`라는 이름으로만 전달해주면 화면을 그릴 수 있음.

<br><br>

# 추가 요구 사항도 쉡게 받을 수 있는 코드 만들기

- counter 감소 버튼, 2씩 증가-감소, ...

## ClickCounter 모듈 세번째 스펙: `ClickCounter 모듈은 '데이터'를 주입 받는다.`

- 현재는 value가 클로저로 생성되어 공유 불가
- 데이터를 주입 받음으로써 증가와 감소를 위한 데이터를 공유

### TDD의 첫 단계: 실패하는 테스트 코드 만들기 (적색 단계)

- 데이터를 주입받기 - 없을 경우 에러를 던지는 테스트 코드 작성

```JAVAScript
  it('초기값을 주입하지 않으면 에러를 던진다', () => {
    // todo 
    const actual = () => (counter = App.ClickCounter())
    expect(actual).toThrowError()
  })
```

### TDD의 두번째 단계: Test 통과하도록 모듈 코드 생성 (녹색 단계)

```javascript
App.ClickCounter = (_data) => {
  if (!_data) throw Error('_data')
  const data = _data; // 객체의 프로퍼티로 값을 변경하므로 const로 변경
  // 정수같은 원시형 값을 인자로 넣어주면 그 값은 참조가 아니라 복사 (객체 사용)
  data.value = data.value || 0;

  return {
    getValue() {
      return data.value
    },
    increase() {
      data.value++
    }
  }
}
```

<br>

...

- data 객체와 연관된 test 코드 수정

```javascript
// ClickCounter.spec.js
describe('App.ClickCounter', () => {
  let counter, data
  ...
  beforeEach(() => {
    data = { value: 0 }
    counter = App.ClickCounter(data)
  })
...
```

```javascript
// ClickCountView.spec.js
  beforeEach(()=> {
    const data = { value: 0 }
    clickCounter = App.ClickCounter(data)
```

# ClickCounter 모듈 네번째 스펙: `ClickCounter 모듈의 increase 함수는 대체될 수 있다.`

- 증가 뿐만 아니라 감소도 가능해야 한다.
- 이름 변경: increase -> count

### TDD의 첫 단계: 실패하는 테스트 코드 만들기 (적색 단계)

```javascript
// ClickCounter.spec.js
...
describe('setCountFn()', () => {
    it('인자로 함수를 넘기면 count()를 대체한다', () => {
      // 2를 더하는 함수 (테스트 준비)
      const add2 = value => value +2
      const expected = add2(data.value)
      // 실행
      counter.setCountFn(add2).count()
      const actual = counter.getValue()
      //검증
      expect(actual).toBe(expected)
    })
  })
})
```

<br>

### TDD의 두번째 단계: Test 통과하도록 모듈 코드 생성 (녹색 단계)

```javascript
App.ClickCounter = _data => {
  if (!_data) throw Error('_data')
  const data = _data
  data.value = data.value || 0

  return {
    getValue() {
      return data.value
    },

    count() {
      data.value++
    },
    setCountFn(fn) {
      this.count = () => (data.value = fn(data.value)) // 함수 오버라이딩
      return this // 함수 체이닝
    }
  }
}
```

## 화면에 붙이기

```html
 <button id="btn-desc">Decrease</button>
  <span id="counter-display"></span>
  <button id="btn-increase">Increase</button>

  <script src="ClickCounter.js"></script>
  <script src="ClickCountView.js"></script>

  <script>
    (() => {
      const data = { value: 0 } //data 객체 생성
      const counterDesc = App.ClickCounter(data).setCountFn(v => v - 1);
      const counterInc = App.ClickCounter(data)


      const clickCounter = App.ClickCounter()

      const updateEl = document.querySelector('#counter-display')
      const btnInc = document.querySelector('#btn-increase')
      const btnDes = document.querySelector('#btn-desc')

      const descCounterView = App.ClickCountView(counterDesc, { updateEl, btnDes })
      const incCounterView = App.ClickCountView(counterInc, { updateEl, btnInc })

      descCounterView.updateView()
    })()
  </script>
```

<br><br><br>
<출처>

- <https://www.inflearn.com/course/tdd-%EA%B2%AC%EA%B3%A0%ED%95%9C-%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0/lecture/12422?tab=curriculum&speed=1.25>
