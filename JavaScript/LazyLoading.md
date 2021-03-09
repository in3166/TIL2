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
1. <img> 태그 이용
- src 속성 대신 다른 속성에 이미지 URL 넣기
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
- 최신 Googlw Chrome 브라우저(76)에서 지원
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


