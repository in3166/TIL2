// LRU: 삽입 정렬

function solution(size, arr){
  let answer=Array.from({length:size}, ()=>0);
  for (const x of arr) {
    let chk = false;
    for (let i = 0; i < answer.length; i++) {
      if(answer[i] === x){
        chk = true
        answer.splice(i,1);
      }
    }
    answer.unshift(x);
    if(!chk){
      answer.pop();
    }    
  }

  return answer;
}

let arr=[1, 2, 3, 2, 6, 2, 3, 5, 7];
console.log(solution(5, arr));

// 다른 풀이
for (let i = 0; i < work.length; i++) {
  if (answer.indexOf(work[i]) >= 0) answer.splice(answer.indexOf(work[i]), 1); // indexof 도 o(n)

  if (answer.length < cache) answer.unshift(work[i]);
  else {
      answer.pop();
      answer.unshift(work[i]);
  }
}

// 삽입 정렬 ??
// 존재 하지 않으면 모든 값들을 뒤 인덱스로 복사해서 넣음
// 존재하면 그자리 돌면서 위와 같이
function solution2(size, arr){
  let answer=Array.from({length:size}, ()=>0); // 0으로 초기화
  
  arr.forEach((v, i) => {
    let pos = -1;

    // 존재 여부 찾기
    for(let i=0; i<size; i++){
      if(v === answer[i]){
        pos = i;
      }
    }

    if(pos===-1){
      for (let i = size-1; i >=1; i--) {
        answer[i] = answer[i-1];
      }
      answer[0] = v;
    }else{ // 존재하면
      for (let i = pos; i >= 1; i--) {
        answer[i] = answer[i-1];
      }
      answer[0] = v;
    }
  });


  return answer;
}

let arr=[1, 2, 3, 2, 6, 2, 3, 5, 7];
console.log(solution2(5, arr));

// set 중복제거 후 리버스해서 사이즈 만큼 자름
function solution(size, arr) {
  return [...new Set(arr.reverse())].splice(0, size);
}