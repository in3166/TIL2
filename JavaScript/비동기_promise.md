# 비동기 처리
- 비동기(Asynchronous)적 처리는 작업을 요청하지만 결과는 그 자리에서 꼭 받지 않아도 되는 데이터 처리 방식
- ex) jquery ajax
```
// HTTP GET 요청
function getData() {
  var data;
  $.get('https://domain.com/product/1', function(res){
   data = res;
  }
  return data;
}

// 결과: undefined 
```
- 특정 로직의 실행이 끝나기 까지 기다리지 않고 나머지 코드 실행

### 콜백함수로 비동기 처리 방식의 문제점 해결하기
```
function getData(callbackFunc) {
	$.get('https://domain.com/products/1', function(response) {
		callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
	});
}

getData(function(tableData) {
	console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

```
function mailList_ch(e) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () { // 콜백 함수 (임의함수로 생성)
    if (this.readyState === 4 && this.status === 200) {
    ...
   }
  } 
}
```

### 콜백 지옥 (Callback hell)
-  지옥은 비동기 처리 로직을 위해 콜백 함수를 연속해서 사용할 때 발생
```
$.get('url', function(response) {
	parseValue(response, function(id) {
		auth(id, function(result) {
			display(result, function(text) {
				console.log(text);
			});
		});
	});
});
```
### 콜백 지옥을 해결하는 방법
- 적으로 콜백 지옥을 해결하는 방법에는 Promise나 Async를 사용하는 방법이 있습니다. 
- 코딩 패턴으로만 콜백 지옥을 해결하려면 아래와 같이 각 콜백 함수를 분리해주면 됩니다.
```
function parseValueDone(id) {
	auth(id, authDone);
}
function authDone(result) {
	display(result, displayDone);
}
function displayDone(text) {
	console.log(text);
}
$.get('url', function(response) {
	parseValue(response, parseValueDone);
});
```

## Promise
- 자바스크립트 비동기 처리에 사용되는 객체
- 비동기적으로 실행하는 작업의 결과(성공 or 실패)를 나타내는 객체 (결과를 객체화)

### Promis 코드 기초
```
// Promise 대신 콜백 함수 사용
function getData(callbackFunc) {
  $.get('url 주소/products/1', function(response) {
    callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
  });
}

getData(function(tableData) {
  console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

```
// 프로미스 적용
function getData(callback) {
  // new Promise() 추가
  return new Promise(function(resolve, reject) {
    $.get('url 주소/products/1', function(response) {
      // 데이터를 받으면 resolve() 호출
      resolve(response);
    });
  });
}

// getData()의 실행이 끝나면 호출되는 then()
getData().then(function(tableData) {
  // resolve()의 결과 값이 여기로 전달됨
  console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
});
```

-  new Promise(), resolve(), then()와 같은 프로미스 API를 사용

### Promise 3가지 상태
- 상태: 프로미스 처리 과정, new Promise() 생성 후 종료까지

1. pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
- new Promise() 호출 시 대기상태, 콜백 함수를 가질 수 있음
```
new Promise(function(resolve, reject) {
  // ...
});
```
2. Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- 콜백 함수 인자 resolve 싱행
```
new Promise(function(resolve, reject) {
  resolve();
});
```
- 이행 상태가 되면 then()으로 처리 결과 값을 반환받을 수 있다.
```
function getData() {
  return new Promise(function(resolve, reject) {
    var data = 100;
    resolve(data);
  });
}
```

3. Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태
- 콜백 함수 인자 retect 실행
```
new Promise(function(resolve, reject) {
  reject();
});
```
- 실패 상태 이유(실패 처리 결과 값) catch()로 받음
```
function getData() {
  return new Promise(function(resolve, reject) {
    reject(new Error("Request is failed"));
  });
}

// reject()의 결과 값 Error를 err에 받음
getData().then().catch(function(err) {
  console.log(err); // Error: Request is failed
});
```

### 예제
- 예제1
```
//Promise 선언
var _promise = function (param) {

	return new Promise(function (resolve, reject) {

		// 비동기를 표현하기 위해 setTimeout 함수를 사용 
		window.setTimeout(function () {

			// 파라메터가 참이면, 
			if (param) {

				// 해결됨 
				resolve("해결 완료");
			}

			// 파라메터가 거짓이면, 
			else {

				// 실패 
				reject(Error("실패!!"));
			}
		}, 3000);
	});
};

//Promise 실행
_promise(true)
.then(function (text) {
	// 성공시
	console.log(text);
}, function (error) {
	// 실패시 
	console.error(error);
});
```

- 예제2
```
function getData() {
  return new Promise(function(resolve, reject) {
    $.get('url 주소/products/1', function(response) {
      if (response) {
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
getData().then(function(data) {
  console.log(data); // response 값 출력
}).catch(function(err) {
  console.error(err); // Error 출력
});
```

### 여러 개의 프로미스 연결하기 (Promise Chaining)
- 2초 후 resolve() 호출 -> 차례로 then 넘어감
```
new Promise(function(resolve, reject){
  setTimeout(function() {
    resolve(1);
  }, 2000);
})
.then(function(result) {
  console.log(result); // 1
  return result + 10;
})
.then(function(result) {
  console.log(result); // 11
  return result + 20;
})
.then(function(result) {
  console.log(result); // 31
});
```

```
var promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 1000);
});

promise.then(function (num) {
  console.log(num + 'complete'); /// 1complete
  return num + 1; /// return = 2
}).then(function (value) {
  console.log(value) // 2
});
```

- 실제 웹 서비스에서 있을 법한 사용자 로그인 인증 로직에 프로미스를 여러 개 연결해보겠습니다.

```
getData(userInfo)
  .then(parseValue)
  .then(auth)
  .then(diaplay);
  ```
위 코드는 페이지에 입력된 사용자 정보를 받아와 파싱, 인증 등의 작업을 거치는 코드를 나타내었습니다. 여기서 userInfo는 사용자 정보가 담긴 객체를 의미하고, 
parseValue, auth, display는 각각 프로미스를 반환해주는 함수라고 가정했습니다. 아래와 같이 말이죠.
```
var userInfo = {
  id: 'test@abc.com',
  pw: '****'
};

function parseValue() {
  return new Promise({
    // ...
  });
}
function auth() {
  return new Promise({
    // ...
  });
}
function display() {
  return new Promise({
    // ...
  });
}
```

### 에러 처리

1.then()의 두 번째 인자로 에러를 처리하는 방법
```
getData().then(
  handleSuccess,
  handleError
);
```

2.catch()를 이용하는 방법

- getData().then().catch();
- 위 2가지 방법 모두 프로미스의 reject() 메서드가 호출되어 실패 상태가 된 경우에 실행됩니다. 간단하게 말해서 프로미스의 로직이 정상적으로 돌아가지 않는 경우 호출되는 거죠. 

```
function getData() {
  return new Promise(function(resolve, reject) {
    reject('failed');
  });
}

// 1. then()의 두 번째 인자로 에러를 처리하는 코드
getData().then(function() {
  // ...
}, function(err) {
  console.log(err);
});

// 2. catch()로 에러를 처리하는 코드
getData().then().catch(function(err) {
  console.log(err);
});
```

- 프로미스 에러 처리는 가급적 catch()를 사용
- catch()로 에러를 처리하는 게 더 효율적입니다.
```
// then()의 두 번째 인자로는 감지하지 못하는 오류
function getData() {
  return new Promise(function(resolve, reject) {
    resolve('hi');
  });
}

getData().then(function(result) {
  console.log(result);
  throw new Error("Error in then()"); // Uncaught (in promise) Error: Error in then()
}, function(err) {
  console.log('then error : ', err);
});

// catch()로 오류를 감지하는 코드
function getData() {
  return new Promise(function(resolve, reject) {
    resolve('hi');
  });
}

getData().then(function(result) {
  console.log(result); // hi
  throw new Error("Error in then()");
}).catch(function(err) {
  console.log('then error : ', err); // then error :  Error: Error in then()
});
```



<출처>
- https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/
- https://velog.io/@cyranocoding/2019-08-02-1808-%EC%9E%91%EC%84%B1%EB%90%A8-5hjytwqpqj
