// 합이 같은 부분집합: 두 부분으로 나눠 두개의 합이 같을때
function solution(arr){
  let answer="NO", flag=0; 
  arr.forEach(element => {
    flag += element;
  });
  function DFS(L, sum){
      if(L >= arr.length){
        if(sum === (flag-sum)) answer = "YES";
        return;
      }

      DFS(L+1, sum + arr[L]);

      DFS(L+1, sum);
  }
  DFS(0, 0);
  return answer;
}

let arr=[1, 3, 5, 6, 7, 10];
console.log(solution(arr));

// flag는 스택에 남아 있는 재귀함수들을 모조리 return 하기 위해서 쓴다.
function solution2(s) {
  let answer = 'NO', flag = 0;
  let total = s.reduce((a, b) => a + b, 0);
  let n = s.length;
  function DP(l, sum){
      if(flag) return;
      if(l === n){
          if((total - sum) === sum) {
              answer = 'YES'
              flag = 1;
          }
      }else{
          DP(l + 1, sum + s[l]);
          DP(l + 1, sum);
      }
  }
  DP(0, 0);
  return answer;
}