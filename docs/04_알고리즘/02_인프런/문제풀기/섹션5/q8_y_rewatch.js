// 모든 아나그램 찾기 (해쉬, 슬라이딩 윈도우, 투포인터)
// S문자열에서 T문자열과 아나그램이 되는 S의 부분문자열의 개수를 구하는 프로그램
// 부분 문자열은 연속된 문자열

// O(n)으로 풀기!
function solution4(s, t){
  let answer=0;
  let lt = 0; 
  let rt = lt + t.length-1;
  
  let temp = [];
  for (let i = lt; i <= rt; i++) {
    temp.push(s[i]);
  }
  console.log(temp);
  
  let chk = compare(temp.slice(), t);
  if(chk) answer++;
  
  while (rt !== s.length) {
    temp.shift();
    console.log('temp: ',temp, 'rt: ',rt)
    temp.push(s[++rt]);
    console.log('temp: ',temp, s[rt])
    let ck = compare(temp.slice(), t);
    if(ck) answer++;
  }

  return answer;
}

function compare(arr, t) {
  let tArr = t.split('');
  arr.sort();
  tArr.sort();
  console.log(arr, tArr);
  let chk = false;
  for (let i = 0; i < arr.length; i++) {
    if(arr[i] !== tArr[i]) chk = true;
  }
  if(chk) return false;
  return true;
}


//console.log(solution4("bacacbcba", "abc")); //3











function solution(s, t) {
  let answer = 0;
  let lt = t.length;
  let p1 = 0,
    p2 = p1 + lt;
  let map1 = new Map();
  let map2 = new Map();

  for (const i of t) {
    if (map1.has(i)) {
      let val = map1.get(i);
      map1.set(i, ++val);
    } else map1.set(i, 1);
  }
  console.log(map1, "\n--------");

  while (1) {
    if (p1 > s.length - lt) break;

    for (let i = p1; i < p2; i++) {
      if (map2.has(s[i])) {
        let val = map2.get(s[i]);
        map2.set(s[i], ++val);
      } else map2.set(s[i], 1);
    }

    console.log(map2);
    let chk = true;

    map1.forEach((v, k) => {
      map2.get(k) !== v && (chk = false);
    });

    if (chk) answer++;
    p1++;
    p2++;
    map2.clear();
  }

  return answer;
}

let a = "bacacbcba";
let b = "abc";

let start0 = new Date();  // 종료
//console.log(solution2(a, b));
let end0 = new Date();  // 종료
//console.log("1: ", end0-start0)

// 재시도
function solution2(s, t) {
  let answer = 0;
  let lt = 0,
    rt = 0;
  let map1 = new Map();

  for (const i of t) {
    if (map1.has(i)) {
      let val = map1.get(i);
      map1.set(i, ++val);
    } else map1.set(i, 1);
  }

  let map2 = new Map(map1);

  while (1) {
    if (rt > s.length) break;

    if (rt - lt === t.length && map2.size === 0) {
      answer++;
      map2 = new Map(map1);
      rt = ++lt;
    }

    if (!map2.has(s[rt])) {
      // console.log('가지고 있지 않아 p2: ', p2,s[p2], '/ p1: ', p1)
      rt = ++lt;
      map2 = new Map(map1);
    } else {
      //console.log('가지고 있어 p2: ', p2,s[p2], '/ p1: ', p1)
      map2.delete(s[rt]);
      rt++;
    }
  }

  return answer;
}

// 다른 풀이
function solution3(s, t) {
  let answer = 0;
  let sH = new Map();

  for (let x of t) {
    sH.set(x, (sH.get(x) || 0) - 1);
  }
  console.log(sH);
  let len = t.length - 1;
  
  // s[b, a ...]
  for (let i = 0; i < len; i++) {
    sH.set(s[i], (sH.get(s[i]) || 0) + 1);
    if (sH.get(s[i]) === 0) sH.delete(s[i]);
  }
  console.log(sH);
  
  let lt = 0;
  //b a c a c b c b a
  for (let rt = len; rt < s.length; rt++) {
    
    console.log("1---------",sH, rt, answer);
    sH.set(s[rt], (sH.get(s[rt]) || 0) + 1);
    console.log("2---------",sH, rt, answer);
      //b a c a c b c b a
    if (sH.get(s[rt]) === 0) sH.delete(s[rt]);
    if (sH.size === 0) answer++;
    sH.set(s[lt], (sH.get(s[lt]) || 0) - 1);
    console.log("3---------",sH, rt, answer);
    
    if (sH.get(s[lt]) === 0) sH.delete(s[lt]);
    console.log("4---------",sH, rt, answer);
    console.log("lt:",lt)

    lt++;
  }
  return answer;
}
//let start = new Date();  // 시작
//console.log(solution3(a, "abc"));
let end = new Date();  // 종료
//console.log("2: ", end-start)

function solution33(s, t){
  let answer=0;
  let sH = new Map();

  // 찾을 문자
  for(let x of t){
      sH.set(x, (sH.get(x) || 0)-1);
  }

  
  // 존재하면 ++ -> 0, 1 만? 마지막 c는 남겨둠
  let len=t.length-1;
  for(let i=0; i<len; i++){
    sH.set(s[i], (sH.get(s[i]) || 0)+1);

    if(sH.get(s[i])===0) sH.delete(s[i]);
  }

  
  
  let lt=0; // rt는 2부터 시작
  for(let rt=len; rt<s.length; rt++){
    // 해당 문자 +1
    console.log(`s[${rt}]: ${s[rt]} / s[${lt}]: ${s[lt]}`)
    sH.set(s[rt], (sH.get(s[rt]) || 0)+1);
    console.log(sH)
    // 해당 문자가 0이면 delete
    if(sH.get(s[rt])===0) sH.delete(s[rt]);
    if(sH.size===0) answer++;
    
    sH.set(s[lt], (sH.get(s[lt]) || 0)-1);
    console.log(sH)
    if(sH.get(s[lt])===0) sH.delete(s[lt]);
    
    lt++;
  }

  console.log(sH)
  return answer;
}

console.log(solution33("bacacbcba", "abc"));