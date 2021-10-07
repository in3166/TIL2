# Schema의 중첩되어 있는 필드 Populate 하기
- Engine 스키마
```js
const engineSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: 1,
    },
    name: {
      type: String,
      maxlength: 50,
    },
    requiredParts: [
      {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "Part" },
        requiredNumber: { type: Number },
      },
    ],
    defaultLifespan: { // 교체시기
      type: Number,
    },
    recentRepairDate: { // 최근 수리 날짜
      type: Date,
    },
    futureCheck: { // 예상
      type: Date,
    },
    maintenanceHistory:[
      {
        parts: [{
          part: { type: mongoose.Schema.Types.ObjectId, ref: "Part" },
          repairNumber: { type: Number },
        }],
        date:{
          type: Date,
        },
        site:{
          type: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
        }
      }
    ]
  },
  { timestamps: true }
);

const Engine = mongoose.model("Engine", engineSchema);

module.exports = { Engine };
```

- Site 스키마
```js
const siteSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: 1,
    },
    name: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    engines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Engine" }],
    partStock: [
      {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "Part" },
        stock: { type: Number },
      },
    ],
  },
  { timestamps: true }
);
```

- populate
```js
Engine.find()
    .populate("requiredParts.part")
    .populate("maintenanceHistory.parts.part")
    .populate({ path: "maintenanceHistory.site", model: "Site" })
    .exec((err, engines) => {
    ...
```
