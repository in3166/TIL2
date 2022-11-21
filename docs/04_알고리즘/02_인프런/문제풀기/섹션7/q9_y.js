// 결혼식: 오는 시간(존재o) - 가는 시간(존재x), 동시 존재 최대값
//그리디에 개념을 포괄적으로 생각하면 정렬을 하고 정렬 순서대로 하나씩 처리하는 코드 또는 우선순위큐를 사용하는 코드라면 그리디 풀이법
function solution3(times) {
  let answer = Number.MIN_SAFE_INTEGER;
 
  let peo = 0;
  times.sort((a, b) => a[0] -b[0]);
  console.log(times);
  const que = [];

  
  return answer;
}

let arr3 = [
  [14, 18],
  [12, 15],
  [15, 20],
  [20, 30],
  [5, 14],
];

let arr4 = [[17, 28], [6, 30], [1, 27], [19, 38], [4, 46], [23, 30], [35, 43], [26, 45], [21, 31], [11, 44]]
//console.log(solution3(arr3));














function solution(times) {
  let answer = Number.MIN_SAFE_INTEGER;
  let T_line = [];

  let m = new Map();

  times.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    else return a[1] - b[1];
  });

  //console.log(times);

  for (let i = 0; i < times.length; i++) {
    let start = times[i][0];
    while (times[i][1] > start) {
        if(m.get(start)){
            m.set(start, m.get(start++)+1)
        }else{
            m.set(start++, 1)
        }
    }
  }

  m.forEach(v => {
      if(v>answer) answer = v;
  })

 // console.log(m)

  return answer;
}

let arr = [
  [14, 18],
  [12, 15],
  [15, 20],
  [20, 30],
  [5, 14],
];
let arr1 = [[17, 28], [6, 30], [1, 27], [19, 38], [4, 46], [23, 30], [35, 43], [26, 45], [21, 31], [11, 44]]





// O(N)
// 다른 풀이: start와 end로 분리, 겁나 간단한데..
function solution2(times) {
  let answer = Number.MIN_SAFE_INTEGER;
  let T_line = [];

  for (const x of times) {
    T_line.push([x[0], 's']);
    T_line.push([x[1], 'e']);
  }


  // 시간 순으로 정렬
  T_line.sort((a,b)=> {
    if(a[0] === b[0]) return a[1].charCodeAt() - b[1].charCodeAt(); // 시간이 같으면 e가 먼저 정렬되게
    else return a[0]-b[0];
  })
  console.log(T_line)

  // s 만나면 ++, e 만나면 --, e는 무조건 자기쌍인 s보다 늦게 이므로 뺴줘도 된다.
  let cnt =0;
  for (const x of T_line) {
    if(x[1] === 's'){
      cnt++;
    }else{
      cnt--;
    }
    answer=Math.max(answer, cnt);
  }
  
  return answer;
}
console.log(solution2(arr1));

// O(N2)
// 다른 풀이 간결
function sol3(times) {
  let answer = Number.MIN_SAFE_INTEGER;
  let arr = Array.from({ length: 73 }, () => 0);

  for (let x of times) {
    for (let i = x[0]; i < x[1]; i++) arr[i] += 1;
  }
  for (let i = 0; i < arr.length; i++) answer = Math.max(answer, arr[i]);
}