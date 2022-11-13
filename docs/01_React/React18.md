# React 18

## Suspense

- 이전 버전에서도 존재했지만 더이상 실험적인 기능이 아니라 정식 기능이 됨
- 서버사이드 렌더링과 함께 강력해졌다.
- Data fetching에 사용할 수 있다.

```js
function Profile() {
  const [profile, setProfile] = useState();

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then(setProfile);
  }, [])
  
  if (!profile) {
    return <Loader />;
  }

  // 이전에는 개선을 위해 useEffect 대신 React-query, SWR 라이브러리를 사용했다.
  const { data: profile, isLoading } = useQuery("profile", fn);
  if (isLoading) {
    return <Loader />;
  }

  return <div>Hello, {profile.name}!</div>
}
```

- `Suspense`로 더 개선하기: 로딩 부분을 외부로 분리 가능
  - React 18은 Fetchin Library와 React와 통신하며 데이터를 가져오는지 여부를 알 수 있다.
  - 데이터를 가져오기 있다면 컴포넌트를 렌더링하지 않고 `Loader`를 `Suspense`에 렌더링한다.

```js
function Profile() {
  const { data: profile } = useQuery("profile", fn);

  return <div>Hello, {profile.name}!</div>
}

<Suspense fallback={<Loader />}>
  <Profile />
</Suspense>
```

<br/>
<br/>
<br/>

<출처>

- [노마드 코더](https://www.youtube.com/watch?v=7mkQi0TlJQo&list=RDLV7mkQi0TlJQo&start_radio=1&rv=7mkQi0TlJQo&t=553)
- [코딩애플](https://www.youtube.com/watch?v=wZiOGxOhJNs&list=RDLV7mkQi0TlJQo&index=19)
