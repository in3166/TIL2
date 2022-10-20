# Service Worker

- 웹 서비스에서 풍부한 오프라인 경험, 주기적 백그라운드 동기화, 푸시 알림 등을 지원해주는 도구
  - 일반적으로 원시 애플리케이션에서 요구하는 기능이 웹에서 지원하는 모든 기능의 기술적 기반
  - 브라우저 접속이 아닌 실제 앱처럼 화면상 등록도 가능해진다.
<br>

- `브라우저가 백그라운드에서 실행하는 스크립트`
- 웹페이지나 사용자의 인터렉션이 필요하지 않은 기능만 제공
- 웹페이지와는 '별개'로 작동 (웹페이지의 수명 주기와 완전 별개)
  - 제약
    - 서비스워커는 요청하지 않는 이상 없는 것과 다름없다. (`'terminate()` 명령 없음)
    - 웹페이지가 닫혀도 자동으로 비활성화되지 않는다.
    - DOM이나 window 요소에 접근할 수 없다.

## 활용

- 캐시와 상호작용
  - `fetch` 이벤트의 중간자 역할 가능
  - 서비스워커는 HTTP를 통해 정보를 요청하는 대신 가지고 있는 캐시에서 자료를 전달
  - 캐시가 존재하는 한 인터넷 연결없이 정보 전달 가능

- 푸쉬 알림
  - 브라우저 창이 닫힌 상태에서도 동작하므로 푸쉬 기능 구현 가능

- 백그라운드 동기화
  - 채팅, 사진 업로드 등의 작업 도중 컴퓨터가 오프라인이 되어도 온라인 상태가 되었을 때 해당 작업 지속 가능

## 기존의 웹 처리 과정

1. 사용자가 웹 서버에 요청
2. 응답이 와서 HTML, CSS, JavaScript를 받음
3. 응답받은 파일들을 통해 페이지를 렌더링
4. JavaScript를 통해 사용자에 요청에 따라 API 요청을 해 필요한 데이터를 받아와 보여줌.

- 웹 페이지를 닫지 않는한 푸시 알림 등의 기능 사용 가능.
- 웹 페이지를 닫으면 받을 주소가 없기 때문에 응답 자체를 할 수 없게 된다.

### 단점

- 프로세스 동작 중 설치 실패 알림 기능이 부족
- 인증 정보가 없음
- CORS를 지원하지 않는 리소스에서 URL을 가져올 수 없음

<br>

## Service Worker 적용 방법

- react 기본 Service Worker 코드
- React는 CRA로 생성한 프로젝트에는 기본적으로 `Workbox`를 통해 서비스워커를 지원

```javascript
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(
      process.env.PUBLIC_URL!,
      window.location.toString()
    );
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://goo.gl/SC7cgQ'
          );
        });
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl: string) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // At this point, the old content will have been purged and
                // the fresh content will have been added to the cache.
                // It's the perfect time to display a 'New content is
                // available; please refresh.' message in your web app.
                console.log('New content is available; please refresh.');
              } else {
                // At this point, everything has been precached.
                // It's the perfect time to display a
                // 'Content is cached for offline use.' message.
                console.log('Content is cached for offline use.');
              }
            }
          };
        }
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl: string) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get('content-type')!.indexOf('javascript') === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
```

- localhost가 아닌 환경에서는 https로 등록을 해야한다.
<br>

<br><br><br>
<출처>

- <https://medium.com/wasd/service-worker-%EC%97%90-%EA%B4%80%ED%95%B4%EC%84%9C-9c8f9f2f3988>
- <https://so-so.dev/web/service-worker/>
