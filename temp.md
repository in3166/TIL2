# 차트 데이터 가져오기 Test Case
| # | 수행 절차 |  기대 결과 | 결과 |
|---|-----------|-----------|-------|
|1|파라미터`type=step`, `dateList=['2022-04-19']`, `userId='member136'`로  `getTodayRateData` 함수 호출|`member136`에 맞는 걸음수 리스트를 십분 단위로 반환|Pass|
|2|파라미터`type=heart`, `dateList=['2022-04-19']`, `userId='member136'`로 `getTodayRateData` 함수 호출|`member136`에 맞는 심박수 리스트를 십분 단위로 반환|Pass|
|3|파라미터`type=step`, `dateList=['2022-03-08', '2022-04-19']`, `userId='member136'`로 `getPeriodRateData` 함수 호출|`member136`와 `dateList` 기간에 맞는 걸음수 리스트를 하루 단위로 반환|Pass|
|4|파라미터`type=heart`, `dateList=['2022-03-08', '2022-04-19']`, `userId='member136'`로 `getPeriodRateData` 함수 호출|`member136`와 `dateList` 기간에 맞는 심박수 리스트를 하루 단위로 반환|Pass|
|5|파라미터`type=step`, `dateList=[]`, `userId='member136'`로 `getPeriodRateData` 함수 호출|`member136`의 전체 기간의 걸음수 리스트를 하루 단위로 반환|Pass|
|6|파라미터`type=heart`, `dateList=[]`, `userId='member136'`로 `getPeriodRateData` 함수 호출|`member136`의 전체 기간의 심박수 리스트를 하루 단위로 반환|Pass|

<br><br>

## 역할
- 차트 데이터 가공
    
## 2022-05-30
    
- 심박수와 걸음수 데이터를 가공하여 보내주기

    - `오늘` 데이터는 10분 단위로 데이터를 저장하여 보내준다.

    ```jsx
    [{beat: 1, date: '2022-02-25 19:51:20}, ...]
    ```
        
    - `기간` 데이터 (일주일, 전체, 특정 기간)은 하루의 데이터를 보여준다.
    
        - 걸음수: 누적 데이터
        - 심박수: 평균 데이터 (하루의 평균 심박수를 다 더해 평균을 내준다.
            
        ### 오늘 한 일
            
        - 심박수의 오늘 데이터, 기간 데이터를 추출하여 합치기
        - 인자로는 date 배열과 userId (member_seq)를 받는다.
        - 심박수의 오늘 데이터는 JSON 파일에서 바로 불러와 저장해주면 돼서 간단했는데 기간별 데이터는 특정 날짜의 모든 데이터를 가져와 더하고 개수 만큼 나눠 평균을 구해줘야 해서 까다로웠다.

<img src="https://user-images.githubusercontent.com/45654988/171903165-99c4dfc2-8462-48ff-83b3-050e649aa34a.png" width="300px" />

![image](https://user-images.githubusercontent.com/45654988/171903214-a4341fdb-954f-4c6c-b182-863a9ec12e5f.png)
                
   
 ### 구현 방법
   
- 인자: `userId`, `dateList[]` 배열 `[시작 date, …, 끝 date]`

    1. 파일의 전체 데이터를 시작 날짜와 끝 날짜로 `filter` 한다.
    2. `filter`한 데이터를 `reduce`를 돌려 특정 날짜의 데이터를 객체에 저장하고 카운트 속성을 주어 개수를 세준다.
        1. 결과: `{2022-02-22: {beat: 2200, date: '2022-02-22', count: 22}, ...}`

    3. 카운트 속성을 없애준다. (`map`)

```jsx
// 기간 데이터의 값

const filter = heartData
                .filter((value) => value.crt_ymdt >= dateList[0] && value.crt_ymdt <= `${dateList[dateList.length - 1]} 23:59:59`)
                .reduce(
                  (acc: { [key: string]: { beat: number; date: string; count: number } }, { avg_beat: beat, crt_ymdt: date }) => {
                    const getDate = dayjs(date).format('YYYY-MM-DD')
                    if (!acc[getDate]) {
                      acc[getDate] = { beat, date: getDate, count: 1 }
                    } else {
                      acc[getDate].beat += beat
                      acc[getDate].count += 1
                    }
                    return acc
                  },
                  {}
                )
            
// count 없애기
const values = Object.keys(filter).map((key) => {
  filter[key].beat = Math.floor(filter[key].beat / filter[key].count)
  const tmp: { count?: number; beat: number; date: string } = filter[key]
     delete tmp.count
     return tmp
})
```
            
        
### 중간에 빈 날짜들의 value를 0으로 초기화 해주기
```jsx
const mergeArray = (firstArray: IChartObject[], secondArray: IChartObject[]) =>
  firstArray.reduce((acc: IChartObject[], { x, y }) => {
    const index = secondArray.findIndex((secondValue) => secondValue.x === x)

    if (index !== -1) acc.push({ x, y: secondArray[index].y })
    else acc.push({ x, y })

    return acc
  }, [])
```
        
```jsx
const initializeDataObject = (type: string, dateList: string[]) => {
  let tempDate = dateList[0]
  const tempX = type === 'step' ? 0 : 60
  const tmepInitialList: IChartObject[] = [{ x: dayjs(tempDate).format('YY-MM-DD'), y: tempX }]

  while (tempDate < dateList[1]) {
    tempDate = dayjs(tempDate).add(1, 'day').format('YYYY-MM-DD')
    tmepInitialList.push({ x: dayjs(tempDate).format('YY-MM-DD'), y: tempX })
  }

  return tmepInitialList
}
// ...

// values는 파일에서 가져온 데이터 리스트
mergeArrays(initializeDataObject, values)
```
<br>
    
## 2022-05-31
    
- 전체 기간 데이터 가져오는 함수 추가
- 오늘, 기간 데이터 리팩토링
  - 기간 데이터 함수와 전체 데이터 함수를 통합
    
- `steprate`, `heartrate`를 둘 다 하나의 함수를 사용할 수 있도록 통합 (`type`으로 구별)
  - `getTodayRateData`: 오늘 데이터를 십분 단위로 모두 가져오기
    - 파라미터: `type` , `dateList`, `memberId`
        
  - `getPeriodRateData`: 기간 설정 데이터, 전체 기간 데이터 가져오기
    - 파라미터: `type` , `dateList`, `memberId`
    - `dateList` 가 빈 배열이면 전체 데이터를 가져온다.
    
## 2022-06-01
- `utils/chart.ts` 파일을 생성하여 로직 분리
- `utils/user.ts` 에 유저 ID를 Seq로 변환하는 함수 추가
