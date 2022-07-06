# 1. Custom Elements
- 기존 DOM Element 생성 방법들

```html
<div class="msg-box">
  <span class="msg-box__icon">info</span>
  <span>Hello!</span>
</div>
```

- 1번째 방법

```js
function createMessageBox(){
  const div = document.createElement('div');
  div.classList.add('msg-box');
  
  const spanIcon = document.createElement('span');
  spanIcon.classList.add('msg-box__icon');
  spanIcon.textContent = 'info';
  div.appendChild(spanIcon);
  
  const spanMsg = document.createElement('span');
  div.appendChild(spanMsg);
  
  return div;
}
```

- 2번째 방법

```js
function createMessageBox() {
  const div = document.createElement('div');
  div.classList.add('msg-box');
  
  div.innerHTML = `
    <span class="msg-box__icon">info</span>
    <span>Hello!</span>
  `;
  
  return div;
}
```

<br>

- 문제점
  - CSS class를 전역적으로 선언해 사용
  - 해당 element를 사용할 때마다 메서드 호출 및 DOM Tree에 Append 해야한다.
  - element Lifecycle 구성이 가능하지만 복잡하다.

## Web Components
- 이러한 기존 DOM Elements 생성 방법에서 벗어나 모듈화할 수 잇고 재사용도 가능한 Elements 생성 목적
- [`CustomElementsRegistry`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry) 인터페이스의 `define` 메서드로 정의 가능
- 이를 구현한 클래스 [`window.customElements`](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements)로 접근 가능

```js
const html = `
  <div class="msg-box">
    <span class="msg-box__icon">info</span>
    <span>Hello</span>
  </div>
`

<style scoped>
  상단의 component에만 적용될 css 정의
</style>

class MessageBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'closed' }).apeendChild(html.content.cloneNode(true));
  }
}

window.customElements.define(
  'msg-box',
  MessageBox
);
```

```html
<msg-box></msg-box>
```

### 장점
- Scoped CSS Style 사용 가능
- 명시적 DOM Element 저으이 가능
- Shadow DOM을 이용해 외부에서 정의한 Elements를 조작할 수 없도록 제어 가능
- HTML 태그를 이용해 명시적 사용 가능
- 쉽게 DOM Elements에 대한 LifeCycle 정의 가능
<br><br>

## 1.1 High-level View
- Web Components 정의위해 ` CustomElementRegister.define()`  메서드를 이용
- 아래 세 개의 Arguments를 받음
  - DOMString: Custom Elements의 이름 (kebob-case)
  - class extends HTMLElement: Element의 행동을 정의한 Class
  - { extends }: Inherits할 Node Name (선택) - 특정 동작 상속 받기

- 예제

```js
class WordCount extends HTMLParagraphElement {
  constructor() {
    super(); // always call
    
    // element functionality
  }
}

window.customElements.define(
  'word-count',    // DOMString
  WordCount,       // class
  { extends: 'p' },// extends 
);
```

  - `WordCount` 클래스는 `<p>` 태그인 'HTMLParagraphElement' 클래스 Extends하여 동작을 그대로 상속 받음
  - `super()` 필수적으로 호출: 모든 Custom Element가 `HTMLElement` 클래스를 상속받고 있기 때문
  - `is`: `is` 전역 특성은 표준 HTML 요소가 사용자 지정 요소처럼 행동하도록 지정

  ```html
  <word-count></word-count>
  <!-- or -->
  <p is="word-count"></p>
  ```

  - js로도 선언 가능

  ```js
  document.createElement('word-count');
  // or
  document.createElement('p', { is: 'word-count' });
  ```
  
## 1.2 예제 만들기
- 구현할 DOM Element

```html
<popup-info img="/img/alt.png" data-text="text contents"></popup-info>

<!--
<span class="wrapper">
  <span class="icon" tabindex="0">
    <img src="...from parent attribute...">
  </span>
  
  <span class="info">...from parent attribute...</span>  // Custom Element를 사용할 Paren DOM Tree에서 정의할 값들
</span>
-->
```

- 구현

```js
// Create a class for the element
class PopUpInfo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // Create spans
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', 0);

    const info = document.createElement('span');
    info.setAttribute('class', 'info');

    // Take attribute content and put it inside the info span
    const text = this.getAttribute('data-text');
    info.textContent = text;

    // Insert icon
    let imgUrl;
    if(this.hasAttribute('img')) {
      imgUrl = this.getAttribute('img');
    } else {
      imgUrl = 'img/default.png';
    }

    const img = document.createElement('img');
    img.src = imgUrl;
    icon.appendChild(img);

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    console.log(style.isConnected);

    style.textContent = `
      .wrapper {
        position: relative;
      }
      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: white;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }
      img {
        width: 1.2rem;
      }
      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    console.log(style.isConnected);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
  }
}

// Define the new element
customElements.define('popup-info', PopUpInfo);
```

<br>

## 1.3 Internal vs External styles
- 위 처럼 CSS String을 작성해도 되지만 `<link>` 태그도 이용 가능

```js
const linkElement = document.createElement('link');
linkElement.setAttribute('rel', 'stylesheet');
linkElement.setAttribute('href', 'style.css');

this.shadowRoot.append(linkElement, wrapper);
```

<br>

## 1.4 Using the Lifecycle callbacks
- `connectedCallback`: 
  - 모든 DOM이 **'Parsing되기 전'**에도 호출될 수 있음
  - Node **'moved'** 시 호출
  - **'Disconnected'** 시 호출될 수 있으며, 이는 `isConnected` 프로퍼티를 이용해 판별이 가능

- `disconnectedCallback` : Custom Elements가 DOM에서 **'Disconnected'*8 될 때 호출
- `adoptedCallback` : Node가 **'Moved'** 되었을 때 호출
- `attributeChangedCallback` : Custom Elements의 `Attributes`가 **'Added/Removed/Changed'** 되었을 때 호출
  - `static get observedAttributes()` Getter로 Observe할 Attributes를 알려줘야 함

```js
class CustomSquare extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });

    const div = document.createElement('div');
    const style = document.createElement('style');

    this.shadow.appendChild(style);
    this.shadow.appendChild(div);
  }

  updateStyle() {
    this.querySelector('style').textContent = /* css string */;
  }

  /**
   * lifecycle 'connected'
   * */
  connectedCallback() {
    console.log('Custom square element added to page');
    this.updateStyle();
  }

  /**
   * lifecycle 'disconnected'
   * */
  disconnectedCallback() {
    console.log('Custom square element removed from page');
  }

  /**
   * lifecycle 'adopted'
   * */
  adoptedCallback() {
    console.log('Custom square element moved to new page');
  }

  /**
   * lifecycle 'attribute changed'
   * */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed');
    updateStyle();
  }

  static get observedAttributes() {
    // should return an array containing names of attributes
    return ['c', 'l']; // watch 'c' and 'l' attributes
  }
}

window.customElements.define('custom-square', CustomSquare);
```

```html
<custom-square l="100" c="red"></custom-square>
```

<br><br>

# 2. Using Shadow DOM
- 캡슐화, 구현된 Componenets 내부를 어떻게 잘 유지할 지, 충돌을 회피할 지, CSS Scope 관리 등을 위해
- 각각의 DOM을 서로 충돌없이 분리 방법

## 2.1 High-level view

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charste="utf-8">
    <title>Simple DOM</title>
  </head>

  <body>
    <section>
      <img src="dinosaur.png" alt="T-Rex">
      <p>Here we will add a link to the <a href="https://www.mozilla.org/">Mozilla</a></p>
    </section>
  </body>
</html>
```

- DOM Tree

<img src="02_JavaScript/img/wencom1.png" />

- **Shadow DOM**
  - 독립적으로 DOM 자체를 분리
  - Shadow DOM 내부의 모든 것들은 Shadow Bundary 외부에 영향을 끼칠 수 없다.
  - `Shadow Host` : 일반적인 DOM Node처럼 보이는, Shadow DOM의 연결 지점
  - `Shadow Tree` : Shadow DOM 내부의 DOM Tree
  - `Shadow Boundary` : Shadow DOM의 시작 Node부터 Shadow DOM의 끝 Node까지의 공간
  - `Shadow Root` : Shadow Tree의 Root node

<img src="02_JavaScript/img/webcom2.png" />

<br>

## 2.2 기본 사용법
- `Element.attachShadow()` 메서드를 통해 Shadow DOM을 구성
- mode
  - `open`: Element.shadowRoot  프로퍼티를 이용해 Shadow DOM에 대한 참조를 얻을 수 있음
  - `closed`: 참조가 불가능하게끔 Shadow DOM을 구성 (`Element.shadowRoot` 값 = `null`)

```js
const shadow = element.attachShadow({ mode: 'open' });
const shadow = element.attachShadow({ mode: 'closed' });
```

<br><br>

# 3. Using Templates and Slots
## 3.1 `<template>`
- 재사용 가능한 Components를 만드는 가장 쉽고 편리한 방법
- 태그 내의 Nodes는 DOM에 렌더링되지 않으나, Programmatic하게 참조 가능 (`template.content` 프로퍼티를 이용해 접근)

```html
<template id="my-paragraph">
  <p>My Paragraph</p>

  <style> <!-- 전역적으로 정의 - shadow 아님 -->
    p {
      font-size: 30px;
    }
  </style>
</template>
```

```js
const template = document.getElementById('my-paragraph');
const templateContent = template.content;

document.body.appendChild(templateContent);
```

## 3.2 Using templates with Web Components
- `my-paragraph`라는 Custom Element 정의

```js
customElements.define(
  'my-paragraph',
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById('my-paragraph');

      this.attachShadow({ mode: 'closed' })
        .appendChild(template.content.cloneNode(true));
    }
  }
);
```

-  `cloneNode()`: `<template>`는 하나만 존재하므로 재사용을 위해 복제 (아니면 동일한 템플릿 참조)
-  `innerHTML` 사용한 방법

```JS
customElements.define(
  'my-paragraph',
  class extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'closed' })
        .innerHTML = document.getElementById('my-paragraph').innerHTML;
    }
  }
);
```

## 3.3 Adding flexibility with Slots

```html
<template>
  <p><slot></slot></p>
</template>
```

```html
<my-paragraph>
  TEXT
</my-paragraph>
```

<br>

## 3.4. Scoped styles
-  Styles를 Component 내에만 정의하는 방법
-  Shadow DOM 내에 `<style>` 태그가 오게끔 만들어주기

```js
const html = `
<div></div>

<style>
div {
  width: 100px;
  height: 100px;
  background-color: black;
}
</style>
`;

class extends HTMLElement {
  constructor() {
    super();
    
    this.attachShadow({ mode: 'closed' })
      .innerHTML = html;
  }
}
```

<br><br><br>
<출처>
- https://okky.kr/article/977318
