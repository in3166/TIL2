# 실전 Redux
## 1. 정적 웹페이지 생성
```html
<body>
  <header>
    <h1>WEB</h1>
  </header>
  <nav>
    <ol>
      <li><a href="1.html">HTML</a></li>
      <li><a href="2.html">CSS</a></li>
    </ol>
    <ul>
      <li><a href="/create">create</a></li>
      <li><input type="button" value="delete">delete</a></li>
    </ul>
    <h2>HTML</h2>
    HTML is ...
  </nav>
</body>
```

<br><br>

## 2. 부품화(모듈화)
- 가독성, 재사용성
```html
<body>
  <div id="subject"></div>
  <div id="toc"></div>
  <div id="control"></div>
  <div id="content"></div>
  
  <script>
   function subject(){ // 다른 폴더에 넣어두거나 재사용 가능
    document.querySelector('#subject').innerHTML = `
       <header>
        <h1>WEB</h1>
      </header>
    `
   }
    
   function TOC(){
      document.querySelector('#toc').innerHTML = `
      <nav>
        <ol>
          <li><a href="1.html">HTML</a></li>
          <li><a href="2.html">CSS</a></li>
        </ol>
      </nav>
      `
    }
    
   function control(){
    document.querySelector('#control').innerHTML = `
       <ul>
          <li><a href="/create">create</a></li>
          <li><input type="button" value="delete">delete</a></li>
        </ul>
    `
   }
   
   function article(){
       document.querySelector('#content').innerHTML = `
          <article>
          <h2>HTML</h2>
          HTML is ...
        </article>
      `
   }

   TOC();
   subject();
   control();
   article();
  </script>
</body>
```
<br><br>

## 3. store 생성과 state 사용
- Redux 사용
```html
<body>
  <script>
   //...
   function TOC(){
      var state = store.getState(); // content[{...},{...}]
      var i = 0;
      var liTags = '';
      while(i < state.content.length){
        liTags = liTags + `
                 <li>
                   <a href="${state.content[i].id}">${state.content[i].title}</a>
                 </li>
                `;
        i = i + 1;
      }
    
      document.querySelector('#toc').innerHTML = `
      <nav>
        <ol>
          ${liTags}
        </ol>
      </nav>
      `
    }
   //...
   function reducer(state, action){
      if(state === undefined){
          return {
            contents: [
                {id:1, title:'HTML', desc:'HTML is ...'},
                {id:2, title:'CSS', desc:'CSS is ...'},
            ]
          }
      }
      return 
   }

   var store = Redux.createStore(reducer);

   TOC();
   subject();
   control();
   article();
  </script>

</body>
```

<br><br>

## 4. action을 dispatch를 통해 전달
```html
<body>
  <script>
  //...
   function TOC(){
      var state = store.getState(); // content[{...},{...}]
      var i = 0;
      var liTags = '';
      while(i < state.content.length){
        liTags = liTags + `
                 <li>
                   <a 
                      onclick="event.preventDefault();
                               var action = {type:'SELECT', id:${state.content[i].id}};
                               store.dispatch(action);
                               "
                      href="${state.content[i].id}">${state.content[i].title}</a>
                 </li>
                `;
        i = i + 1;
      }
    
      document.querySelector('#toc').innerHTML = `
      <nav>
        <ol>
          ${liTags}
        </ol>
      </nav>
      `
    }
   //...
   function reducer(state, action){
      if(state === undefined){
          return {
            selected_id: null,
            contents: [
                {id:1, title:'HTML', desc:'HTML is ...'},
                {id:2, title:'CSS', desc:'CSS is ...'},
            ]
          }
      }
      var newState = {};
      if(action.type === 'SELECT'){
        newState = Object.assign(newState, state, {selected_id: action.id});
      }
      return newState;
   }

   var store = Redux.createStore(reducer);
  </script>
</body>
```

<br><br>

## 5. subscribe를 통해 자동 갱신 처리
- `selected_id` 값에 따라 본문 내용 갱신
```html
<body>
  <script>
  //...
   function article(){
     var state = store.getState();
     var aTitle, aDesc
     for(let i = 0 ; i < store.content.length; i++){
        if(state.content[i].id === state.seleted_id){
             aTitle = state.content[i].title;
             aDesc = state.content[i].desc;
             break;
        }
     }
     document.querySelector('#content').innerHTML = `
        <article>
          <h2>${aTitle}</h2>
          ${aDesc}
        </article>
      `;
   }
  
   function reducer(state, action){
      if(state === undefined){
          return {
            selected_id: null,
            contents: [
                {id:1, title:'HTML', desc:'HTML is ...'},
                {id:2, title:'CSS', desc:'CSS is ...'},
            ]
          }
      }
      var newState = {};
      if(action.type === 'SELECT'){
        newState = Object.assign(newState, state, {selected_id: action.id});
      }
      return newState;
   }

   var store = Redux.createStore(reducer);
   store.subscribe(article);

  </script>
</body>
```

<br><br>

## 6. 글 생성 기능
- reducer에 `mode` 
```html
<body>
  <div id="subject"></div>
  <div id="toc"></div>
  <div id="control"></div>
  <div id="content"></div>
  
  <script>
   function subject(){ // 다른 폴더에 넣어두거나 재사용 가능
    document.querySelector('#subject').innerHTML = `
       <header>
        <h1>WEB</h1>
      </header>
    `
   }
    
   function TOC(){
      var state = store.getState(); // content[{...},{...}]
      var i = 0;
      var liTags = '';
      while(i < state.content.length){
        liTags = liTags + `
                 <li>
                   <a 
                      onclick="event.preventDefault();
                               var action = {type:'SELECT', id:${state.content[i].id}};
                               store.dispatch(action);
                               "
                      href="${state.content[i].id}">${state.content[i].title}</a>
                 </li>
                `;
        i = i + 1;
      }
    
      document.querySelector('#toc').innerHTML = `
      <nav>
        <ol>
          ${liTags}
        </ol>
      </nav>
      `
    }
    
   function control(){
    document.querySelector('#control').innerHTML = `
       <ul>
          <li><a onclick="
                         event.preventDefault();
                         
                         "
                 href="/create">create</a></li>
          <li><input type="button" value="delete">delete</a></li>
        </ul>
    `
   }

    function article(){
     var state = store.getState();
     if(state.mode === 'create'){
         document.querySelector('#content').innerHTML = `
            <article>
              <form onsubmit="event.preventDefault(); 
                              var _title = this.title.value;
                              var _desc = this.desc.value;
                              store.dispatch({type:'CREATE', title:_title, desc:_desc})">
                <p>
                  <input type="text" name="title" placeholder="title" />
                </p>
                <p>
                  <textarea name="desc" placeholder="description"></textarea>
                </p>
                <p>
                  <input type="submit" />
                </p>
              </form>
            </article>
         `
     } else if(state.mode === 'read'){
         var aTitle, aDesc
         for(let i = 0 ; i < store.content.length; i++){
            if(state.content[i].id === state.seleted_id){
                 aTitle = state.content[i].title;
                 aDesc = state.content[i].desc;
                 break;
            }
         }
         document.querySelector('#content').innerHTML = `
            <article>
              <h2>${aTitle}</h2>
              ${aDesc}
            </article>
          `;
     }
   }
  
   function reducer(state, action){
      if(state === undefined){
          return {
            max_id:2,
            mode: 'read',
            selected_id: null,
            contents: [
                {id:1, title:'HTML', desc:'HTML is ...'},
                {id:2, title:'CSS', desc:'CSS is ...'},
            ]
          }
      }
      var newState = {};
      if(action.type === 'SELECT'){
        newState = Object.assign(newState, state, {selected_id: action.id});
      } else if(action.type === 'CREATE'){
        var newMaxId = stata.max_id + 1;
        var newContent = state.content.concat();
        newContent.push({id:newMaxId, title:action.title, desc:action.desc});
        Object.assign({}, state, {
            max_id:newMaxId,
            content:newContent,
            mode:'read'
        });
      }
      return newState;
   }

   var store = Redux.createStore(reducer);
   store.subscribe(article);
   store.subscribe(TOC);

   TOC();
   subject();
   control();
   article();
  </script>
</body>
```

<br><br>

## 7. 글 삭제 기능
```html
<body>
  <div id="subject"></div>
  <div id="toc"></div>
  <div id="control"></div>
  <div id="content"></div>
  
  <script>
   function subject(){ // 다른 폴더에 넣어두거나 재사용 가능
    document.querySelector('#subject').innerHTML = `
       <header>
        <h1>WEB</h1>
      </header>
    `
   }
    
   function TOC(){
      var state = store.getState(); // content[{...},{...}]
      var i = 0;
      var liTags = '';
      while(i < state.content.length){
        liTags = liTags + `
                 <li>
                   <a 
                      onclick="event.preventDefault();
                               var action = {type:'SELECT', id:${state.content[i].id}};
                               store.dispatch(action);
                               "
                      href="${state.content[i].id}">${state.content[i].title}</a>
                 </li>
                `;
        i = i + 1;
      }
    
      document.querySelector('#toc').innerHTML = `
      <nav>
        <ol>
          ${liTags}
        </ol>
      </nav>
      `
    }
    
   function control(){
      document.querySelector('#control').innerHTML = `
         <ul>
            <li><a onclick="event.preventDefault();
                            store.dispatch({type:'CHANGE_MODE', mode:'create'});
                            "     
                   href="/create">create</a></li>
            <li><input type="button" value="delete" 
                       onclick="
                               store.dispatch({type:'DELETE'});                               
                               ">delete</a></li>
          </ul>
      `
   }

    function article(){
     var state = store.getState();
     if(state.mode === 'create'){
         document.querySelector('#content').innerHTML = `
            <article>
              <form onsubmit="event.preventDefault(); 
                              var _title = this.title.value;
                              var _desc = this.desc.value;
                              store.dispatch({type:'CREATE', title:_title, desc:_desc})">
                <p>
                  <input type="text" name="title" placeholder="title" />
                </p>
                <p>
                  <textarea name="desc" placeholder="description"></textarea>
                </p>
                <p>
                  <input type="submit" />
                </p>
              </form>
            </article>
         `
     } else if(state.mode === 'read'){
         var aTitle, aDesc
         for(let i = 0 ; i < store.content.length; i++){
            if(state.content[i].id === state.seleted_id){
                 aTitle = state.content[i].title;
                 aDesc = state.content[i].desc;
                 break;
            }
         }
         document.querySelector('#content').innerHTML = `
            <article>
              <h2>${aTitle}</h2>
              ${aDesc}
            </article>
          `;
     }else if(state.mode === 'wlecome'){
        document.querySelector('#content').innerHTML = `
            <article>
              <h2>$Welcome</h2>
              delete
            </article>
          `;
     }
   }
  
   function reducer(state, action){
      if(state === undefined){
          return {
            max_id:2,
            mode: 'read',
            selected_id: null,
            contents: [
                {id:1, title:'HTML', desc:'HTML is ...'},
                {id:2, title:'CSS', desc:'CSS is ...'},
            ]
          }
      }
      var newState = {};
      if(action.type === 'SELECT'){
        newState = Object.assign(newState, state, {selected_id: action.id, mode:'read'});
      } else if(action.type === 'CREATE'){
        var newMaxId = stata.max_id + 1;
        var newContent = state.content.concat();
        newContent.push({id:newMaxId, title:action.title, desc:action.desc});
        Object.assign({}, state, {
            max_id:newMaxId,
            content:newContent,
            mode:'read'
        });
      }else if(action.type === 'DELETE'){
          var newMaxId = stata.max_id - 1;
          var newContent = [];
          for(let i = 0; i < state.content.length; i++){
             if(state.selected_id !== state.content[i].id){
               newContent.push(state.content[i]);
               break;                               
             }
          }
          newState = Object.assign({}, state, {
             content:newContent,
             mode:'welcome'
          });
      }else if(action.type === 'CHANGE_MODE'){
          newState = Object.assign({}, state, {
             mode: action.mode
          });
      }
      return newState;
   }

   var store = Redux.createStore(reducer);
   store.subscribe(article);
   store.subscribe(TOC);

   TOC();
   subject();
   control();
   article();
  </script>
</body>
```


<br><br><br>
<출처>
- https://www.inflearn.com/course/redux-%EC%83%9D%ED%99%9C%EC%BD%94%EB%94%A9/lecture/34754?tab=curriculum
