// 이진트리순회 (깊이우선탐색) 1 - 23 - 456
// 전위 1 2 4 5 3 6 7 : 부모 먼저 출력 왼 오
// 중위 4 2 5 1 6 3 7 : 왼 부 오
// 후위 4 5 2 6 7 3 1 : 왼 오 부  => 부모가 기준
function solution2(n){
    let answer="";
    function DFS(v){
        if(v > 7) return;
        DFS(2*v);
        DFS(2*v+1);
        console.log(v);
    }
    DFS(n);
    return answer;
}

console.log(solution2(1)); // 1-7
















function solution(n){
    let answer="";
    function DFS(v){
      if(v>7) return;
      else{
          console.log(v); // 전위
          DFS(v*2)
          console.log(v); // 중위
          DFS(v*2+1)
          console.log(v); // 후위
      }
    }
    DFS(n);
    return answer;
}

//console.log(solution(1)); // 1-7
//https://www.inflearn.com/course/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%AC%B8%EC%A0%9C%ED%92%80%EC%9D%B4/lecture/64098?tab=community&speed=1.5&q=178580 
// 스택 그림 한번보기 이해안되면