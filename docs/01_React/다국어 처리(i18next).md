# 다국어 처리 (Translation)

- `i18next` 라이브러리를 사용

  - `npm install react-i18next i18next --save`
  - `npm install i18next-http-backend i18next-browser-languagedetector --save`
  
    - (브라우저의 언어(백엔드)를 감지해 초기 언어 설정을 위해)
<br>

- 디렉토리

```
- src
  - components
    - home.js
    
  - locales
    - en
      - translation.json
    - ko
      - translation.json
      
  - i18n.js
  - index.js
```

<br>

- `i18n.js`

```js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationKO from "./locales/ko/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ko: {
    translation: translationKO,
  },
};

const Languages = ["en", "ko"];
i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18ne
  .use(initReactI18next)
  // The default export of the i18next module is an i18next instance ready to be initialized
  .init({
    resources,
    fallbackLng: "ko",
    whitelist: Languages,
    interpolation: { escapeValue: false },
    detection: { order: ["path", "navigator"] },
  });

export default i18n;
```

<br>

- `index.js`
  - React 고유 기능 `Suspense`로 `App`을 감싸준다.
  - 렌더링하기 위한 준비가 완료될 때까지 기다림. (필요 데이터 등의 로드 등)

```js
import React, { Suspense } from "react";
// ...
import "./i18n";

ReactDOM.render(
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>,
  document.getElementById("root")
);
```

<br>

- `/locales/en/translation.json`

```json
{
  "Home": {
    "title": "Total No. of Jintech's Minted On The Platform"
  },
}
```

<br>

- `home.js`
  - hook을 사용하는 방법

```js
import { useTranslation } from "react-i18next";
//...
const HomePage = (props) => {
  const { t, i18n } = useTranslation();
  
  // 언어 변경
  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
  };
  
  return(
    <>
     <button onClick={() => handleClick("en")}>En</button>
     <button onClick={() => handleClick("ko")}>Ko</button>
     <div>
       <p>{t("Home.title")}</p>
     </div>
    </>
  );
}
```

- HOC를 사용한 방법

  ```JS
  import React from 'react';
  import { withTranslation } from 'react-i18next';

  function MyComponent({ t, i18n }) {
    return <p>{t('my translated text')}</p>
  }

  export default withTranslation()(MyComponent);
  ```

<br><br><br>
<출처>

- <https://www.youtube.com/watch?v=cHqxgLhOl5Y>
- <https://www.i18next.com/>
- <https://react.i18next.com/latest/using-with-hooks>
