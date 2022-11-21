// 재귀함수
// 자연수 N 입력. 재귀함수로 1부터 N까지 더하기
function solution(n){
    function DFS(L){
       if(!L) return 0;
       return L + DFS(--L);
    }
    return DFS(n);
}

console.log(solution(3));