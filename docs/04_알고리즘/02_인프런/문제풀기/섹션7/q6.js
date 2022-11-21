// 장난구러기 현수: n명 키대로 번호 부여, 현수와 짝꿍이 자리 바꿈 몇 번쨰?
// 걍 정렬 후 비교 O(n)
function solution(arr) {
  let answer =  Object.assign([], arr);
  //let answer =  arr.slice(); // 얕은복사 - 다차원 배열은 안됨 (기본형은 깊은)
  answer.sort((a,b)=>a-b); // 문자이기 때문에 99가 가면 젤뒤로
  console.log(answer)
  console.log(arr)
  let ja = "";
  arr.forEach((v,i) => {
    if(answer[i] !== v) ja += (i+1+ " ");
  });

  
  return ja;
}

let arr = [160, 127, 130, 135, 135, 136, 143, 120];
let arr3 = [120, 130, 150, 150, 130, 150];
let arr2 = [100, 125, 152, 130, 135, 135, 143, 127, 160];
let arr1 = [122, 123, 125, 125, 128, 161, 167, 167, 167, 161, 170];

console.log(solution(arr3));
