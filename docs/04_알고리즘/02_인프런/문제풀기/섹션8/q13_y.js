// 수열 추측하기: 우선 수열 만들기 잘 못함, combi 하는데 며칠이걸리냐..
// 3 1 2 4 
//  4 3 6
//   7 9
//    16
// 가장 위 수 개수 1~n n과 그합 f가 주어졌을 때 가장 위의 수들 구하기(답이 여러개이면 사전 순 가장 앞)
// combine에서 루프돌리지 않고 규칙 찾기!

function solution3(n, f) {
  let answer,
    flag = 0;
    let chk = Array.from({length:n+1}, ()=>0);

  function combi(n, r) {

    
  }

  let temp = [];

  function DFS(L, sum) {

  }

  DFS(0, 0);
  return answer;
}

console.log(solution3(4, 6)); // 3 1 2 4
//console.log(solution3(10, 3794));



















function solution(n, f) {
  let answer,
    flag = 0;

  let chk = Array.from({ length: n }, () => 0);
  let temp = Array.from({ length: n }, () => 0);

  function combi(n, r) {
    let r1 = r.slice();
    let i = 0;
    while (r1.length !== 1) {
      //console.log("i1: ", i, r);
      if (i === r1.length - 1) {
        i = 0;
        r1.pop();
      } else {
        r1[i] = r1[i] + r1[i + 1];
        i++;
      }
    }
    //console.log(r[0]);
    return r1[0];
  }

  function DFS(L, sum) {
    if (flag) return;
    if (L === 4) {
      //            console.log(temp)
      let tem = temp.slice();
      // console.log(tem);
      //console.log(combi(f, tem));
      if (f === combi(f, tem)) {
        answer = tem;
        flag = 1;
      }
    }
    for (let i = 0; i < n; i++) {
      if (!chk[i]) {
        chk[i] = 1;
        temp[L] = i + 1;
        DFS(L + 1, sum + temp[L]);
        chk[i] = 0;
      }
    }
  }

  DFS(0, 0);
  return answer;
}

//console.log(solution(10, 3794));

// 1 2 3 4 
// 1+2 2+3 3+4
// 1+2+2+3 2+3+3+4
// 1+2+2+2+3+3+3+4
// (1*1)+(2*3)+(3*3)+(4*1)
// 3C0 + 3C1 + 3C2 + 3C3

function solution2(n, f) {
  let answer;
  let flag = false;
  let dy = Array.from(Array(n), () => Array(n).fill(0)); // 메모이제이션, n <= 10
  let ch = Array.from({length: n+1}, ()=>0); // 순열 돌리기 체크 값
  let p = Array.from({length: n}, ()=>0); // 순열 저장 (1234, 1234, ...)
  let b = Array.from({length: n}, ()=>0); // 'n'에 따른 미리 조합 값 저장 순열과 곱해줄 값 30 31 32 33

  // COMBINATION으로 미리 구해놔야 시간복잡도 해결
  function combi(n, r) {
    if(dy[n][r]>0) return dy[n][r];
    if(n===r || r===0) return 1;
    else return dy[n][r] = combi(n-1, r-1) + combi(n-1, r);
  }

  function DFS(L, sum) {
    if(flag) return;
    // 순열
    console.log("L: ", L, " sum: ", sum)
    if(L === n && sum === f){
      answer = p.slice();
      console.log(p)
      flag = true;
    }else{
      // 순열을 구함
      for (let i = 1; i <= n; i++) {
        if(!ch[i]){
          ch[i] = 1;
          p[L] = i;
          DFS(L+1, sum + (b[L]*p[L])); // 순열의 한자리씩 구할때마다 곱해서 sum 해줌
          ch[i] = 0;
        }
      }
    }
  }

  for(let i = 0; i < n; i++){
    b[i] = combi(n-1, i); //30 31 32 33
  }

  console.log(dy)
  console.log(b)
  DFS(0, 0);
  return answer;
}

//console.log(solution2(4, 16));