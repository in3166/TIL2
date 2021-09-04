# Lazy Loading
- 이미지 성능에 많은 영향
  - 사용자가 다운로드한 모든 콘텐츠를 실제로 다 보진않을 수 있다. (여러 사진 중 첫번째 사진만 보고 웹페이지를 떠났을 때)
  - 메모리 및 대역폭 낭비

- 페이지에 액세스할 때 모든 콘텐츠 대량 로드하는 대신 사용자가 필요한 페이지의 일부에 액세스할 때 콘텐츠를 로드
- 기존 모든 이미지를 유지한 채 페이지 사이즈를 줄이고 로딩 시간을 향상

## 작동 방식
- 페이지를 읽는 시점에 중요하지 않은 리소스 로딩을 추후에 하는 기술
- 하지만, 이 리소스들은 필요할 때 로드되야 한다.
- 즉, 실제로 화면에 보여질 필요가 있을 때 로딩을 하는 기술
  - SPA (Single Page Application) 내에서 JS 파일이 나중에 필요하면 초기 로드하지 않는 것이 좋다.
  - 이미지 목록이 있을 때 화면에 보이지 않는 이미지들은 placeholder로 두고 스크롤을 해서 이미지가 보이면 로드

## 사용 이유
1. 성능 향상
- 초기 로딩 시 필요 리소스 수를 줄임 (다운로드 byte를 줄임)

2. 비용 감소
- 리소스를 줄일 수 있으므로 네트워크 전송 비용 감소


## Lazy Loading 여러 기술
1. `<img>` 태그 이용
- `<img>`의 `src` 속성은 첫 번째 이미지든 1000번째 이미지이든, 혹은 뷰포트 밖에 있든 상관없이, 이미지를 무조건 로드
- `src` 속성 대신 다른 속성에 이미지 URL 넣고 언제 로딩할 것인지 브라우저에 알리기

```JAVASCRIPT
<img data-src="https://ik.imagekit.io/demo/default-image.jpg" />
```

- 해당 이미지(현재 placeholder)가 뷰포트에 들어오면 로딩하도록 확인
  - 자바스크립트 이벤트 사용
    - `scroll` 이벤트: 사용자 스크롤 시점 확인
    - `resize` 이벤트: 브라우저 크기 변경 시 발생
    - `orientationChange` 이벤트: 디바이스 가로-세로 변환 시 발생

    - 위 이벤트 발생 시 로딩이 지연되었거나 아직 로딩되지 않은 이미지를 모두 찾아, 어떤 이미지가 뷰포트에 들어왔는지 확인 (트리거)
    - 들어온 이미지를 `data-src` URL을 `src` 속성에 넣어 이미지 로드
    - 트리거 이벤트를 일으키기 위해 로딩을 지연시킬 이미지로 식별되던 `lazy 클래스` 제거
    - 모든 이미지가 로딩되면 트리거를 일으키던 이벤트 리스너 제거
    ```html
    <img src="https://ik.imagekit.io/demo/img/image1.jpeg?tr=w-400,h-300" />
    <img src="https://ik.imagekit.io/demo/img/image2.jpeg?tr=w-400,h-300" />
    <img src="https://ik.imagekit.io/demo/img/image3.jpg?tr=w-400,h-300" />
    <img class="lazy" data-src="https://ik.imagekit.io/demo/img/image4.jpeg?tr=w-400,h-300" />
    <img class="lazy" data-src="https://ik.imagekit.io/demo/img/image5.jpeg?tr=w-400,h-300" />
    <img class="lazy" data-src="https://ik.imagekit.io/demo/img/image6.jpeg?tr=w-400,h-300" />
    <img class="lazy" data-src="https://ik.imagekit.io/demo/img/image7.jpeg?tr=w-400,h-300" />
    <img class="lazy" data-src="https://ik.imagekit.io/demo/img/image8.jpeg?tr=w-400,h-300" />
    <img class="lazy" data-src="https://ik.imagekit.io/demo/img/image9.jpeg?tr=w-400,h-300" />
    <img class="lazy" data-src="https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300" />
    ```
    ```javascript
    document.addEventListener("DOMContentLoaded", function() {
      var lazyloadImages = document.querySelectorAll("img.lazy");    
      var lazyloadThrottleTimeout;
  
     function lazyload () {
        if(lazyloadThrottleTimeout) {
         clearTimeout(lazyloadThrottleTimeout);
       }    
    
        lazyloadThrottleTimeout = setTimeout(function() {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function(img) {
               if(img.offsetTop < (window.innerHeight + scrollTop)) {
                  img.src = img.dataset.src;
                  img.classList.remove('lazy');
               }
           });
           if(lazyloadImages.length == 0) { 
             document.removeEventListener("scroll", lazyload);
             window.removeEventListener("resize", lazyload);
             window.removeEventListener("orientationChange", lazyload);
           }
        }, 20);
      }
  
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    });
    ```

  - Intersection Observer API를 사용
    - 엘리먼트 요소가 뷰포트에 들어가는 것을 감지하고 액션을 취하는 것을 아주 간단하게 만들어주는 API
    - 이미지 로드 지연을 위해 이미지마다 옵저버 부착
    - API가 이미지의 뷰포트 진입 여부를 탐지해 `isIntersecting` 속성을 이용해 `data-src`속성에서 `src`로 이동
    - 전부 로드되면 `lazy 클래스`명을 이미지에서 삭제하고 옵저버 제거
    - 이벤트 리스너 사용보다 빨리 로드되지만 모든 부라우저가 지원하지 않음.
    ```javascript
    document.addEventListener("DOMContentLoaded", function() {
      var lazyloadImages;    
      if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
         entries.forEach(function(entry) {
           if (entry.isIntersecting) {
              var image = entry.target;
              image.src = image.dataset.src;
              image.classList.remove("lazy");
              imageObserver.unobserve(image);
            }
          });
        });

        lazyloadImages.forEach(function(image) {
          imageObserver.observe(image);
       });
      } else {  
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");
    
        function lazyload () {
         if(lazyloadThrottleTimeout) {
           clearTimeout(lazyloadThrottleTimeout);
          }    

          lazyloadThrottleTimeout = setTimeout(function() {
           var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function(img) {
               if(img.offsetTop < (window.innerHeight + scrollTop)) {
                 img.src = img.dataset.src;
                 img.classList.remove('lazy');
                }
            });
            if(lazyloadImages.length == 0) { 
             document.removeEventListener("scroll", lazyload);
             window.removeEventListener("resize", lazyload);
              window.removeEventListener("orientationChange", lazyload);
           }
         }, 20);
       }

       document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
       window.addEventListener("orientationChange", lazyload);
     }
    })
    ```

2. Native Lazy Loading 방식
- 최신 Googl Chrome 브라우저(76)에서 지원
- 임베딩할 이미지에 `loading` 속성만 추가
```javascript
<img src="example.jpg" loading="lazy" alt="..." width="200" height="200" style="height:200px; width:200px;" />
<iframe src="example.html" loading="lazy"></iframe>
```
- 속성
  - lazy: 뷰포트에서 일정한 거리에 닿을 떄까지 로딩 지연
  - eager: 현재 페이지 위치가 위,아래 어디에 있던 페이지 로딩되자마자 로딩
  - auto: 디폴트, 로딩을 지연하는 것을 트리거한다. 
- 로딩 지연 이미지들이 다운로드될 때 감싸고 있는 콘텐츠 내용들이 밀려나는 것을 방지하기 위해선 반드시 `height`, `width` 속성을 `<img>` 태그에 추가하거나 inline style로 지정해야 한다.


## CSS 속성 중 Background Image를 Lazy Loading 하는 방법
- CSS backgroud image 로드하기 위해 현재 문서 내 DOM 노드에 CSS 스타일 적용 여부 결정하기 위해 CSSOM(CSS Object Model)과 DOM Tree를 구성 필요
- 만약 엘리먼트에 CSS의 background image가 적용되지 않았다면 브라우저는 background image를 로드하지 않고, 엘리먼트에 CSS 규칙에 적용될 경우 이미지 로딩
- 즉, 엘리먼트가 뷰포트에 들어올 때까지 CSS background image 속성을 적용 안함
```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;    

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
})
```
```css
* {
  font-family: sans-serif;
}

#container {
  font-size: 20px;
  line-height: 30px;
  max-width: 600px;
}

#bg-image.lazy {
   background-image: none;
   background-color: #F1F1FA;
}
#bg-image {
  background-image: url("https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-600,h-400");
  max-width: 600px;
  height: 400px;
}
```
```html
<div id="bg-image" class="lazy"></div>
```
- `lazy` 클래스를 엘리먼트에 추가하면 해당 엘리먼트 `background-image` 속성을 none으로 만듦
- 위의 두가지 방법으로 뷰포트 안에 들어오는 것을 감지하고 `lazy 클래스`를 삭제

<br><br>

## lazy loading 기법으로 유저 인터페이스 향상시키는 방법
- placholder가 보기 좋지 않다, 로딩 시간이 느리다 등의 이유로 유저 사용성에 좋지 않을 수  있다.

1. 올바른 image placeholder 사용
- 주요 색상을 placeholder로 사용하기
  - 이미지의 첫 1x1 픽셀로 스케일을 감소 시키고 해당 픽셀 요소로 placeholder를 채우기
  - ImageKit을 사용하여 단일 색상 추출하기
    - 체인변환을 이용해 주요 단일 색상 얻기
    ```javascript
    <!-- Original image at 400x300 -->
    <img src="https://ik.imagekit.io/demo/img/image4.jpeg?tr=w-400,h-300" alt="original image" />

    <!-- Dominant colour image with same dimensions -->
    <img src="https://ik.imagekit.io/demo/img/image4.jpeg?tr=w-1,h-1:w-400,h-300" alt="dominant color placeholder" />
    ```
    - 예시: https://www.youtube.com/watch?v=wJEoRz3P3EU

- 저화질의 이미지로 placeholder 사용하기(LQIP) 
  - ImageKit 사용
  ```javacript
  <!-- Original image at 400x300 -->
  <img src="https://ik.imagekit.io/demo/img/image4.jpeg?tr=w-400,h-300" alt="original image" />

  <!-- Low quality image placeholder with same dimensions -->
  <img src="https://ik.imagekit.io/demo/img/image4.jpeg?tr=w-400,h-300,bl-30,q-50" alt="dominant color placeholder" />
  ```
  
<br>
2. 이미지 로딩을 위한 버퍼 시간 추가
- 위 트리거에서 뷰포트의 하단 부분과 이미지 상단 부분이 만나는 시점이 들어오는 시점
- 문제
  - 빠르게 스크롤하면 로딩 시간 필요하단 것이 placeholder로 보여진다. (스크롤 이벤트를 쓰로틀링을 사용(성능이슈)해 딜레이가 발생하기 때문)
- 해결
  - 뷰포트에 들어오는 위치를 마진을 넣어 여유를 준다.
  - Intersection Observer API에서는 `root'파라미터`와 `rootMargin파라미터`(기본 CSS 마진 규칙에서 동작)를 함께 사용하여 `intersection`(이벤트가 발생되는 부분)을 찾는 위치를 증가

3. Lazy loading으로 콘텐츠 요소들이 이동하는 것을 방지
- 이미지가 없을 때, 브라우저는 보여지고 있는 콘텐츠 공간을 모른다.
- 그래서 CSS로 따로 지정해주지 않으면 감싸고 있는 컨테이너 공간이 0x0 픽셀이 된다.
- 이미지 로딩 시 컨테이너가 크기에 맞게 다시 리사이징 된다. (엘리먼트 요소들이 밀려나갈 수 있음)

- 해결
  - 컨테이너에 너비/높이를 지정


### lazy loading과 관련해 인기있는 자바스크리브 라이브러리 소개
1. yall.js (또 다른 Lazy Loader 구현 방법)
Intersection Observer 방식이며, 이벤트 기반으로 lazy loading을 되돌리는 방식.
주요한 HTML 요소들은 모두 지원하지만 background-image는 안됨.
게다가 브라우저 IE11도 지원됨.

2. lazysizes
엄청 인기있고 광범위한 기능
src 이미지 응답이 지원되고 속성 사이즈 지정 가능
Intersection Observer 없는 좋은 성능

3. JQuery Lazy
jquery 기반 lazy loading을 구현할 수 있는 간단한 라이브러리

4. WeltPixel Lazy Loading Enhanced
lazy loading을 위한 Magento 2 확장판

5. Magento Lazy Image Loader
lazy loading을 위한 Magento 1.x 확장판

6. Shopify Lazy Image Plugin
lazy loading을 위한 Shopify 확장판

7. Wordpress A3 Lazy Load
Wordpress 전용 lazy loading 플러그인

<br><br><br>

<출처>
- https://helloinyong.tistory.com/297
