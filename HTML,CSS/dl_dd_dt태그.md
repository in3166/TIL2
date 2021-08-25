# dl, dd, dt

## dl (Description List)
- `용어들의 목록`
- 정의가 필요한 목차를 설정할 때 사용
- 한 쌍으로 이루어지며, `<dt>`와 `<dd>`를 가지고 있어야 한다.
```html
<dl>
  <dt>정의</dt>
  <dd>1. 정의를 설명합니다.</dd>
  <dd>2. 다른 정의를 설명합니다.</dd>
</dl>
```

## dt (Description Term)
- `용어의 정의`를 나타낸다.
- 인라인 요소이므로 `<li>`, `<ul>`, `<p>` 등과 같은 블록 요소 내부 삽입 불가

## dd (Description Description)
- `<dt>` 태그의 `용어를 설명`
- 기본적 들여쓰기 설정
- `block` 요소이므로 다른 블록 요소 자유롭게 삽입 가능
```html
<dl>
  <dt>이그노벨상</dt>
  <dd>하버드 대학교 유머 잡지에서 발행하는 기이한 연구 상
    <ul>
      <li>설립년도 : 1995년</li>
      <li>시상시기 : 매년 10월</li>
      <li>시상장소 : 하버드대학교 샌더스 극장</li>
      <li>수상절차 : 이그노벨위원회 + 지나가는 행인투표</li>
    </ul>
  </dd>
</dl>
```
<br>

## 언제 사용하는가
### A is B 형태
- `A`: Name, 상위 or 추상적 개념
- `B`: Value, 하위 or 구체적 내용
1. 메타데이터 표시
- `종류: 사과(Apple)`
```html
<dl>
  <dt>종류</dt>
  <dd>사과</dd>
  <dd>Apple</dd>
</dl>
```

2. 대상 정의(설명)
- `사과(Apple): 빨갈고 달달한 과일이다.`
```html
<dl>
  <dt>사과</dt>
  <dt>Apple</dt>
  <dd>빨갛고 달달한 과일이다.</dd>
</dl>
```

<br><br><br>
<출처>
- https://dasima.xyz/html-dl-dt-dd-tags/
- https://velog.io/@raram2/dl-dt-dd%EB%8A%94-%EC%96%B8%EC%A0%9C-%EC%93%B0%EB%8A%94-%EA%B1%B8%EA%B9%8C
