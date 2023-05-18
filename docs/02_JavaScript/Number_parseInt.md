# Number vs parseInt

## 1. 숫자로된 문자열 변환

- 둘 다 변환 가능

```js
let test1 = "000001";
parseInt(test1); //1
Number(test1); //1
```

<br/>

## 2. 숫자로 시작하는 문자열 변환

- `parseInt`만 변환 가능

```js
let test = "2020년도";
parseInt(test); // 2020
Number(test); // NaN
```

<br/>

## 3. 문자로 시작하는 문자열 변환

- 둘 다 불가능

```js
let test = "제1회";
parseInt(test); // NaN
Number(test); // NaN
```

<br/>

## 4. 소수점이 있는 문자열 변환

- `Number`는 소수점까지 변환
- `parseInt`는 소수점 제거
- `parseFloat`는 소수점까지 변환

```js
let test = "10.12345";
parseInt(test); // 10
Number(test); // 10.12345
parseFloat(test); // 10.12345
```

<br/>
<br/>
<br/>

<출처>

- https://velog.io/@blackwidow/parseInt%EC%99%80-Number%EC%9D%98-%EC%B0%A8%EC%9D%B4
