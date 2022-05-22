# 휴먼스케이프 - 검색어 추천이 있는 검색창 만들기 (6-B Team)
🗓️ 05.19 ~ 05.21

[👨🏻‍💻 github](https://github.com/POB-Frontend-4th-6team/WOB-humanscape-assignment-Bteam)

[🔗배포 URL](https://humanscape-assignment-6bteam.netlify.app/)

<br>
<hr>

## 팀원
### 노서현

📒 [blog]() | 💻 [github]()

### 마지혁

📒 [blog]() | 💻 [github]()

### 유인종

📒 [blog]() | 💻 [github]()

### 지수근

📒 [blog]() | 💻 [github]()

### 조혜빈

📒 [blog]() | 💻 [github]()


### 개발 기간
- 2022/05/19 ~ 2022/05/21


## 사용 기술

**Frontend** : `Typescript`, `React`, `Redux-toolkit`

**Library** : `@reduxjs/toolkit`, `classnames`, `axios`, `http-proxy-middleware`, `react-error-boundary`, `react-query`, `react-redux`, `react-router-dom`

**deploy** : `netlify`
<br>

### 파일 구조
```bash
├─assets
│  └─svgs
├─components
│  └─ErrorBoundary
│      └─ErrorFallback
├─hooks
├─routes
│  ├─MainPage
│  │  ├─DropDown
│  │  │  └─DropDownItem
│  │  ├─SearchInput
│  │  └─utils
│  └─_shared
│      ├─Footer
│      ├─Header
│      └─NotFound
├─services
├─states
├─styles
│  ├─base
│  ├─constants
│  └─mixins
├─types
└─utils
``` 

<br>

## 실행 방법

- repository clone

```jsx
git clone https://github.com/POB-Frontend-4th-6team/WOB-humanscape-assignment-Bteam.git
```

- 환경변수 설정(.env 파일 생성)

```jsx
SASS_PATH=node_modules:src
REACT_APP_DISEASE_API_KEY=서비스 키
```

서비스 키는 공공데이터포털의 건강보험심사평가원_질병정보서비스 OPEN API 의 서비스 키를 입력합니다. 

→ API 링크: [https://www.data.go.kr/data/15001675/openapi.do](https://www.data.go.kr/data/15001675/openapi.do)

→ 제공되는 두 개의 키(Encoding/Decoding) 중 Encoding 키를 서비스 키에 입력

- 필요한 모듈 설치

```jsx
yarn install
```

- 실행

```jsx
yarn start
```

<hr>
<br>

## 기능 소개

### 검색어 추천
![image](https://user-images.githubusercontent.com/45654988/169681311-65e38ae3-b525-4c41-b14e-dbde79e28a1e.png)

- **API 호출 최적화**

  - 검색어에 debouncing을 적용하여 500ms동안 입력이 없으면 입력이 끝난것으로 간주해 debounce된 검색어로 서버에 요청을 보내도록 했습니다. 500ms 이전에 입력이 발생할 경우 이전 타이머를 취소하고 새로운 타이머를 설정합니다.
  - react-query의 캐싱 기능을 이용해 검색한 단어를 일정시간동안 저장해 같은 단어를 검색할 시 api 호출을 최소화할 수 있도록 했습니다.

<br><br>

### 초성 검색어 

![image](https://user-images.githubusercontent.com/45654988/169681312-35c83718-e815-4d35-a874-1b16b1fa1ed8.png)

- 검색어에 초성이 포함된 경우에만 퍼지 문자열 검색을 적용했습니다.
  - 초성 검색은 API 호출로 가져올 수 없어서 문자열 검색과 분리했습니다.

- `MainPage`가 처음 mount 되면 `hooks/useGetDisease`를 호출하여 redux에 전체 결과를 저장하고
- `MainPage/SearchInput`에서 검색어가 초성일 경우 `MainPage/utils/getConsonantSearch`를 호출하여 저장된 질병 리스트와 초성 검색어를 비교해 배열로 리턴하고 받은 검색 결과를 출력했습니다.


<br><br>

### 사용자가 입력한 질환명과 일치하는 부분 볼드처리

![image](https://user-images.githubusercontent.com/45654988/169681316-99b74d03-6aef-46bf-8a6b-35a90776224d.png)


- 검색 결과에서 검색어와 일치하는 부분과 일치하지 않는 부분을 나누어 배열에 넣은 후, 렌더링 할 때 일치하는 부분을 mark 태그로 감싸 렌더링합니다.

<br><br>

### 키보드로 추천 검색어로 이동
![input2](https://user-images.githubusercontent.com/45654988/169681509-0ef2b5bf-e05f-49ae-a500-70d3dd1fbdbd.gif)

- 추천 검색어 드롭다운이 열려 있을 때, `위/아래 방향키`로 목록으로 이동 및 탐색이 가능하도록 구현하였습니다.
- 추천 검색어 드롭다운이 열려 있을 때, 특정 아이템이 선택되었을 때 `클릭하거나 엔터키 입력 시`에 해당 아이템 이름이 input value에 반영됩니다.
- 추천 검색어 드롭다운이 열려 있을 때, `ESC 키 입력 시` 드롭다운이 닫힙니다.

**구현방법**

- 키보드 이벤트를 검색 input의 onKeyDown에 연결하였습니다.
- 추천 검색어 배열에 추천 검색어가 있을 때, Enter/ESC/위방향키/아래방향키 입력 시 실행될 로직을 작성하였습니다.
- 위/아래 방향키 입력에 따라 `focusedDropDownItemIndex` state 변수의 prevState 에 +1/-1 연산이 되도록 하였습니다. 그리고 `focusedDropDownItemIndex`와 목록 아이템의 index를 비교하여 일치할 때 해당 아이템이 선택되었다는 것을 보여주는 UI를 적용하였습니다.

**어려움**

- 키보드 이벤트 및 관련 기능을 구현해보는 것이 처음이어서, 해당 부분을 공부해서 적용하는데 시간이 오래 걸렸습니다.
- 어떤 요소에 키보드 이벤트를 붙이는 것이 맞는지에 대한 고민이 있었습니다.
<br><br>

### 배포

- `netlify`로 배포시 proxy값이 적용되지 않아서 CORS 에러가 있었습니다. 해결방법으로 `root`폴더에 `netlify.toml`파일을 생성해 proxy를 직접 지정해주었습니다.
