# 반응형 헤더 만들기
- 미디어쿼리
- 자바스크립트
  - 숨김, 보이기 버튼

## 개선 사항
1. 시멘틱 태그 사용
 - div -> nav
  
2. 불필요한 div 남용
  - navbar 안에 또다른 container 만들 필요 x
  - ul 또한 또다른 div 안에 넣을 필요 없음
  
3. ul 가로 배치
  - diplay: inline 보단 flex로 row
  - margin 대신 padding을 넣어서 hover시 하이라이트
  
4. 메뉴바를 flex에 넣지 않고 absolute 적용

5. toggle
  - css에서 menu.active를 설정해서 diplay:flex; 해줌 -> 원래 자바스크립트에서 모두 추가할 필요 없음.
  - 윈도우 사이즈 늘어나면 본래 설정으로 돌아감
  
  ```javascript
  // 본래
  function barChanage(m, r) {
  const m = document.getElementById('mid');
    const r = document.getElementById('right');
    if (m.classList.contains('non-hide')) {

        m.classList.remove('non-hide');
        m.classList.add('hide');
        m.style.display = "none";
        r.style.display = "none";
    } else {
        m.classList.add('non-hide');
        m.classList.remove('hide');
        m.style.display = "inline-block";
        r.style.display = "inline-block";
    }
  }
  ```
  
  ```javascript
  // 수정
function barChanage(m, r) {
    m.classList.toggle('active');
    r.classList.toggle('active');
}
  ```
  
6. css 변수
 - 미리 변수를 설정해 놓고 재사용 가능.
  ```css
  :root {
    --text-color: #f0f4f5;
    --background-color: rgb(46, 46, 77);
    --accent-color: moccasin;
}

a {
    color: var(--text-color);
    text-decoration: none;
}
  ```
