// 이진수 출력(재귀): 10진수 N이 입력되면 2진수로 변환하여 출력하는 프로그램을 작성

function solution(n) {
  let answer = "";

  function DFS(n) {
    let moc = Math.floor(n / 2);
    let na = n % 2;
    
    if(!moc && !na) return
    DFS(moc);
     if (!na || na == 1 ){
      console.log(moc, na)
      answer += na;
    } 
  }

 DFS(n);
 //return answer.split("").reverse().join("");
 return answer; // 리버스 안하고?
}

console.log(solution(11)); // 1011

// 중요!
// 호출 밑에 나머지를 출력해줘야 거꾸로 출력됨 (스택에서 pop 될때 보여주기)
function solution(n) {
  let answer = "";

  function DFS(n) {
    if(!n) return;
    else{
      DFS(parseInt(n/2));
      answer+=String(n%2);
    }
  }

 DFS(n);
 //return answer.split("").reverse().join("");
 return answer; // 리버스 안하고?
}