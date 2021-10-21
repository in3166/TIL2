# exec
- query문을 호출한다고 쿼리가 실행되지 않는다.
- `콜백 함수`가 존재하면 쿼리가 실행된다. 
  - When executing a query with a callback function, you specify your query as a JSON document.
  
- `콜백 함수`가 없으면 **쿼리**를 리턴한다.

```js
A.findByIdAndUpdate(id, update, options, callback) // executes
A.findByIdAndUpdate(id, update, callback) // executes
A.findByIdAndUpdate(id, update, options)  // returns Query
A.findByIdAndUpdate(id, update)           // returns Query
A.findByIdAndUpdate()                     // returns Query
```
<br>

### 콜백 함수없이, 쿼리를 실행시키기 위해 쿼리 호출 후 **`exec()`를 호출**해야 한다.
  - **Promise** 리턴
  - 코드 중첩 완화, 조건부 쿼리, 에러 한 번에 처리 가능
  - better stack trace
 
```js
const q = Model.where({ _id: id });
q.update({ $set: { name: 'bob' }}).update(); // not executed
q.update({ $set: { name: 'bob' }}).exec(); // executed

Users.findOne({ name: 'zerocho' }).exec()
  .then((result) => {
    return Users.update({ name: result.name }, { updated: true }).exec();
  })
  .then((updatedResult) => {
    console.log(updatedResult);
  })
  .catch((err) => {
    console.error(err);
  });
  ---------------------------------------
// save 메서드는 자체적으로 Promise
newUser.save()
  .then((savedUser) => {
    console.log(savedUser);
  })
  .catch((err) => {
    console.error(err);
  });
  
-----------------------------------------
User
  .findOne({ name: 'daniel' })
  .exec(function (err, user) {
      //
  });
  
-----------------------------------------
User.find({name: 'John'}).exec(); // Will execute returning a promise
```
<br>

### `exec()`없이 `then()` 사용 가능 `thneable()`
- Mongoose queries do provide a then function. 
```js
User.find({name: 'John'}).then(); // Will execute
Promise.all([User.find({name: 'John'}), User.find({name: 'Bob'})]) // Will execute all queries in parallel

const user = await UserModel.findOne(userCondition);
// does exactly as the before line does, but you get a better stack trace if any error happened
// if you use await with exec() you get a better "stack trace"
const user = await UserModel.findOne(userCondition).exec(); 

```

- You have two ways to execute a query on a model. Using callback or using exec() function. "But" you can use await too. exec() function returns a promise, that you can use it with then() or async/await to execute a query on a model "asynchronous". So the question is "If I can just use user = await UserModel.find() and it works currectly
- Just when you call a query without exec() or callback, it returns a thenable which is something like promise but it's not a promise.

<br><br>

# Query is "promise like"

- 위에서 콜백이 없는 쿼리문은 Query Object를 리턴한다고 했다.
  - (쿼리 리턴? -> Promise가 아닌가? async/await 사용이 가능한데..)
  - Mongoose async operations, like `.save()` and queries, return thenables. This means that you can do things like `MyModel.findOne({}).then()`
  - Mongoose queries are not promises. They have a .then() function for co and async/await as a convenience. 
  - JavaScript MDN: The `then()` method returns a Promise.
<br>

- Mongoose queries are not promises. They have a .then() function for co and async/await as a convenience. 
  - However, unlike promises, calling a query's .then() can execute the query multiple times.

- 즉, 몽구스는 [CO](https://www.npmjs.com/package/co)와 async/await를 위해 `.then()` 함수를 편리성을 위해 만들어뒀다.
- 실제 Promise와는 다르게 `.then()`을 여러번 실행할 수 있다.
  - 즉, 쿼리를 여러번 실행 가능
  - `All promises are thenables, but not all thenables are promises.`

- 만약, 실제 Promise를 원한다면 `exec()`를 사용한다.
```js
let promise = Test.findOne({}).exec();
```
<br><br>

- JavaScript `Promises`는 [Promises/A+ specification](https://promisesaplus.com/)에 의해 실행된다.
  - `Promise`는 스펙에 부합하는 행동을 하는 `then` 메서드를 가지는 객체나 함수이다.
  - `thenable`은 `then` 메서드를 정의하고 있는 객체나 함수이다.

- 몽구스의 쿼리는 위의 스펙에 호환되지 않는다.
  - `catch`와 `finally`도 사용 불가

<br><br><br>
<출처>
- https://velog.io/@yejineee/Mongoose-Atomic-Update-%EB%B0%A9%EC%8B%9D%EC%9D%84-%EC%B0%BE%EC%95%84%EC%84%9C
- https://mongoosejs.com/docs/api.html#Query
- https://mongoosejs.com/docs/queries.html#queries-are-not-promises
- https://stackoverflow.com/questions/53970784/mongoose-promises-documentation-says-queries-are-not-promises
- https://www.zerocho.com/category/MongoDB/post/59b6228e92f5830019d41ac4
- https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do
