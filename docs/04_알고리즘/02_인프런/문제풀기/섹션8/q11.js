// 팩토리얼
function solution(n){         
    let answer;
    function DFS(n){
        if(n === 0) return 1;
       
        return n* DFS(n-1);

    }
    answer = DFS(n);
    return answer;
}

console.log(solution(5));