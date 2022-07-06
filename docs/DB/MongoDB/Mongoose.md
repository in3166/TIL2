# Mongoose
- MongoDB를 Node.js에서 사용하기 쉽게 추상화해 놓은 `ODM(Object Data Modeling) 라이브러리`
- 스키마 정의, 데이터 모델링 및 관계 설정, 쉬운 데이터 유효성 검증, 간단한 쿼리 API와 미들웨어 등 기능 제공

<br>

## 스키마
- MongoDB에 저장되는 `document`의 **Data 구조(필드 타입) 정보를 JSON 형태로 정의**한 것
- Mongoose는 사용자가 작성한 스키마 기준 데이터를 DB에 넣기 전 먼저 검사 (테이블과 비슷한 역할)
- 인덱스, 기본값 설정 등이 가능

- NoSQL은 테이블이 없어 Document에 아무거나 넣어도 에러가 발생하지 않는다. 같은 필드인데 자료형이 다르거나 오타가 들어가는 등의 문제 발생 가능한데 이런 문제를 막기 위해 `Schema` 도입

## Model
`mongoose.model('ModelName', Schema)`
- MongoDB에서 데이터를 저장하는 기본 단위인 `Document`의 형태 (Schema 인터페이스로 생성)
- 스키마 정의 시 데이터 모델링: 데이터 구조 정하기, 각 데이터의 디폴트값과 유효성 체크 여부 등 결정 가능
- Mongoose Model은 Schema를 감싸는 Wrapper로 MongoDB의 CRUD를 위한 인터페이스 제공

<br><br>

## 모델 스키마 정의
- 애플리케이션에서 몽구스 모델이 MongoDB에 접근 가능한 인터페이스를 제공
- 몽구스 모델을 모듈화하여 다른 파일에서 사용 가능
```JS
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
```

<BR><br>

## Model 사용
- 생성한 모델의 인스턴스를 한 번 생성하여 데이터베이스 작업 수행
```js
var instance = new someModel();
instance.title = 'hello';
instance.save(function (err){
            // save 실행 후 콜백 함수의 내용
});
instance.find({}, function(err, docs){
            // find 실행 후 콜백 함수의 내용
});
```
  
## Document 생성
- 정의한 모델을 가져와 클라이언트의 요청이 들어오면 토큐먼트 생성
```js
// controllers/tourController.js
const Tour = require('models/tourModel');

exports.createTour = async (req, res) => {
  const newTour = await Tour.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
};
```

## Document 읽기
`const allTours = await Tour.find();`
```js
const tour = await Tour.findById(req.params.id);
//or
const tour = await Tour.findOne({ _id: req.params.id });
```

## Document 업데이트
- `findByIdAndUpdate` 사용, 세번째 인자 `{new: true}`는 업데이트 반영 Document 리턴 (기본값 false, 이전 값 리턴)
```js
const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true
});
```

## Document 삭제
```js
await Tour.findByIdAndDelete(req.params.id);
```


<br><Br><br>
<출처>
- https://saegeullee.github.io/nodejs/mongoose-basic
