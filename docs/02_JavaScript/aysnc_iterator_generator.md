# async 이터레이터와 제너레이터
- 비동기 이터레이터(asynchronous iterator) 사용 시 비동기적 들어오는 데이터를 필요에 따라 처리 가능
- 비동기 제너레이터(asynchronous generator)를 사용하면 이런 데이터를 더 편리하게 처리 가능

## async 이터레이터
- 일반 이터레이터와 비동기 이터레이터는 문법적 차이 존재
  - `Symbol.iterator` 대신 `Symbol.asyncIterator` 사용
  - `next()`는 프라미스를 반환
  - 반복 작업 `for await (let item of iterable)` 반복문 사용

- 일반 이터레이터
```js
let range = {
  from: 1,
  to: 5,

  // for..of 최초 실행 시, Symbol.iterator가 호출됩니다.
  [Symbol.iterator]() {
    // Symbol.iterator메서드는 이터레이터 객체를 반환합니다.
    // 이후 for..of는 반환된 이터레이터 객체만을 대상으로 동작하는데,
    // 다음 값은 next()에서 정해집니다.
    return {
      current: this.from,
      last: this.to,

      // for..of 반복문에 의해 각 이터레이션마다 next()가 호출됩니다.
      next() { // (2)
        //  next()는 객체 형태의 값, {done:.., value :...}를 반환합니다.
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1, 2, 3, 4, 5
}
```

- async 이터레이터
```js
let range = {
  from: 1,
  to: 5,

  // for await..of 최초 실행 시, Symbol.asyncIterator가 호출됩니다.
  [Symbol.asyncIterator]() { // (1)
    // Symbol.asyncIterator 메서드는 이터레이터 객체를 반환합니다.
    // 이후 for await..of는 반환된 이터레이터 객체만을 대상으로 동작하는데,
    // 다음 값은 next()에서 정해집니다.
    return {
      current: this.from,
      last: this.to,

      // for await..of 반복문에 의해 각 이터레이션마다 next()가 호출됩니다.
      async next() { // (2)
        //  next()는 객체 형태의 값, {done:.., value :...}를 반환합니다.
        // (객체는 async에 의해 자동으로 프라미스로 감싸집니다.)

        // 비동기로 무언가를 하기 위해 await를 사용할 수 있습니다.
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }

})()
```
<br><br>

## async 제너레이터
- 일반 제너레이터는 동기적 문법, `await` 사용 불가
- 제너레이터 본문에서 `await`를 사용해야 할 때 `async`를 앞에 붙여준다.
```js
async function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

    // await를 사용할 수 있습니다!
    await new Promise(resolve => setTimeout(resolve, 1000));

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value); // 1, 2, 3, 4, 5
  }

})();
```
- async 제너레이터의 `generator.next()` 메서드는 비동기적이 되고, 프라미스를 반환
- 일반 제너레이터는 `result = generator.next()`를 사용해 값을 얻지만, async 제너레이터는 `result = await generator.next()`
<br>

## async 이터러블
- 반복 가는 객체를 만드려면 `Symbol.iterator`를 추가하는데 `next`가 일반 객체를 반환하기 보단 제너레이터를 반환하는 경우가 대다수
```js
let range = {
  from: 1,
  to: 5,

  async *[Symbol.asyncIterator]() { // [Symbol.asyncIterator]: async function*()와 동일
    for(let value = this.from; value <= this.to; value++) {

      // 값 사이 사이에 약간의 공백을 줌
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for await (let value of range) {
    alert(value); // 1, 2, 3, 4, 5
  }

})();
```
<br><br>

### 실제 사례
- 많은 오란인 서비스가 페이지네이션을 구현해 데이터를 전송
- 사용자 목록이 필요해 서버에 요청을 보내면, 서버는 일정 숫자 단위로 사용자를 끊어 정보를 '한 페이지'로 구성 후, 다음 페이지를 볼 수 있는 URL과 함께 응답

- GitHub에서 커밋 이력을 볼 때도 페이지네이션 사용
  - 클라이언트는 `https://api.github.com/repos/<repo>/commits` 형태의 URL 요청 전송
  - GitHub에선 커밋 30개의 정보가 담긴 JSON과 함께, 다음 페이지 정보를 `Link` 헤더에 담아 응답
  - 더 많은 정보 필요 시 링크를 사용해 다음 용청


- 커밋 정보가 담긴 이터러블 객체를 만들어 객체를 대상으로 반복 작업을 할 수 잇게 해주는 간단한 API 만들기
```JS
let repo = 'javascript-tutorial/en.javascript.info'; // 커밋 정보를 얻어올 GitHub 리포지토리

for await (let commit of fetchCommits(repo)) {
  // 여기서 각 커밋을 처리함
}

// 필요할 때마다 요청을 보내 커밋 정보를 가져오는 함수
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // GitHub는 모든 요청에 user-agent헤더를 강제 합니다.
    });

    const body = await response.json(); // (2) 응답은 JSON 형태로 옵니다(커밋이 담긴 배열).

    // (3) 헤더에 담긴 다음 페이지를 나타내는 URL을 추출합니다.
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) 페이지가 끝날 때까지 커밋을 하나씩 반환(yield)합니다.
      yield commit;
    }
  }
}
```
1. `fetch` 메서드로 다운로드, 인증 정보나 헤더 등을 실어 `fetch`로 요청
2. `fetch` 전용 메서드인 `response.json()`을 사용해 요청 결과를 JSON 파싱
3. 응다브이 `Link` 헤더에서 다음 페이지 URL 얻음
4. 커밋을 하나씩 반환하는데, 전체 다 반환되면 다음 `while(url)` 반복문 트리거 다시 서버 요청 보냄

- 사용법
```js
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // 100번째 커밋에서 멈춥니다.
      break;
    }
  }

})();
```

<br><br><br>
<출처>
- https://ko.javascript.info/async-iterators-generators
