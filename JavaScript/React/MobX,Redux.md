
## Mobx, Redux 차이점
- Mobx: Multiple Domain Store
- Redux: Single Domain Store

## Mobx 장점
- Multiple Domain Store
- 사용성
- 낮은 러닝 커브
- 상대적으로 적은 코드


## Mobx 단점
### 디버깅 툴 여부
  - Redux는 `Redux DevTools` 존재
  - 상태와 액션 추적이 간편하고, Time Travel도 가능
  - 아직 초기라 미들웨어가 부족 (작은 생태계?)

### 구조화하지 않을 경우 지저분한 코드
- MobX가 Redux보다 코드 자체는 적지만 Redux의 경우 Ducks 패턴을 따르면서 Reducer, Action 등을 체계적으로 분리해 개발
- MobX는 처음에는 간결한 코드가 갈수록 관리하기 어려워질 수 있다.

## Mobx를 사용해야 하는 경우
- 한 스토어에 저장되는 데이터가 명확하고, 드물게 다른 스토어에 접근해야 하는 경우
- 작은 프로젝트 (
- 복잡한 상태 관리가 요구되지 않은 경우

<br><br><br>
<출처>
- https://medium.com/@punkyoon/mobx%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%A9%B4-%EC%95%88%EB%90%98%EB%8A%94-%EA%B2%BD%EC%9A%B0-a49d24b44580
- https://techblog.woowahan.com/2599/
