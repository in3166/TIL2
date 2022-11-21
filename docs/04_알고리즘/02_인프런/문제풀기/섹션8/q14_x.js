// 조합 구하기: n개에서 m개 뽑는 방법의 수

function solution3(n, m) {
  let answer = [];

  let temp = Array.from({length: m}, ()=>0);
  let te = Array.from({length:n}, ()=>{return Array(n).fill(0)});

//  console.log(te);
  
  function DFS(L, s) {
    if( L === m ){
      console.log(temp);
      answer.push(temp.slice());
      return;
    }
    for (let i = s; i < n; i++) {
      temp[L] = i+1;
      console.log(temp);
      DFS(L+1, i+1);
      console.log('t2: ',temp);
    }
  }


  DFS(0, 0);


  return answer;
}

console.log(solution3(4, 3));
//  12 13 14 23 24 34














// 1고정 -> 2개 2고정 -> 
// L은 선택한 개수/ I는 들어간거 !!
function solution(n, m) {
  let answer = [];
  let chk = Array.from({ length: n }, () => 0);

  function DFS(L, s) {
    if (L === m) {
      let temp = [];
      chk.forEach((element, i) => {
        if(element)
        temp.push(i);
      });
      console.log("temp: ", temp)
      answer.push(temp);
      return;
    }

    for (let i = s+1; i <= n; i++) {
      chk[i] = 1;
      DFS(L+1, i);
      chk[i] = 0;
    }
  }
  DFS(0, 0);
  return answer;
}

console.log(solution2(4, 3));

// 걍 처넣으면 됨...
function solution2(n, m) {
  let answer = []; // m 만큼 초기화해준다.
  let temp = Array.from({ length: m }, () => 0);

  function DFS(L, s) {
    if (L === m) {
      answer.push(temp.slice());
      return;
    }

    for (let i = s; i <= n; i++) {
      temp[i] = i; // return되면 다시 L에 덮어씀.
      DFS(L+1, i+1); // 여기서 i+을 해주면 되지
    }
  }
  DFS(0, 1);
  return answer;
} // 결과물 틀림

// 이게 답이 맞음
function solution4(n, m) {
  let answer = [];

  let temp = Array.from({length: m}, ()=>0);
  let te = Array.from({length:n}, ()=>{return Array(n).fill(0)});

//  console.log(te);
  
  function DFS(L, s) {
    if( L === m ){
      console.log(temp);
      answer.push(temp.slice());
      return;
    }
    for (let i = s; i < n; i++) {
      temp[L] = i+1;
      console.log(temp);
      DFS(L+1, i+1);
      console.log('t2: ',temp);
    }
  }


  DFS(0, 0);


  return answer;
}

