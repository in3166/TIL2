# Jest
- 페이스북에서 만든 **테스팅 라이브러리**
- Jest 이전 `JS 코드 테스트`를 위해선 여러 테스팅 라이브러리 조합 
  - (Test Runner: [Mocha, Jasmin], TestMatcher: [Chai, Expect], TestMock: [Sinon, Testdouble] 등)
- Jest는 3가지 기능을 모두 제공해 편리
<br>

## 기본 사용법
### 프로젝트 생성
- Project 디렉토리 생성 후 Npm 초기화로 `package.json` 생성

```
$ mkdir my-jest
$ npm init -y
$ ls
package.json
```

### Jest 라이브러리 설치

```
$ npm i -D jest
```

### 스크립트 수정

```
// package.json
"scripts": {
    "test": "jest"
},
```

### 테스트 코드 작성
- `test.js`

```javascript
test("1 is 1", () => {
  expect(1).toBe(1)
})
```

- `test(테스트 설명, () => {`
- ` expect("검증 대상").`
- `toXxxx("기대 결과")` ->  Test Mathcher
  - 자주 사용되는 Matcher
    - toEqual()
    - toBeTruthy(), toBeFalsy()
    - toHaveLength(), toContain()
    - toMatch()
    - toThrow()
    - 등

<br>

- `npm test`: 테스트 실행
- 프로젝트 내에 모든 테스틑 파일을 찾아서 테스트 실행
- Jest는 기본적으로 `test.js`로 끝나는 파일이나 `__test__` 디렉터리 안에 있는 파일들을 모두 테스트 파일로 인식
- 특정 테스트 파일 실행: `npm test <파일명 이나 경로>`

```
$ npm test

> my-jest@1.0.0 test /my-jest
> jest

 PASS  ./test.js
  ✓ 1 is 1 (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.868s, estimated 1s
Ran all test suites.
```

<br><br><br>
<출처>
- https://www.daleseo.com/jest-basic/
