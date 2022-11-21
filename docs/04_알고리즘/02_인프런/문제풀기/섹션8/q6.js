// 바둑이 승자
// 트럭 C킬로그램 넘게 못태움, 바둑이들을 최대한 많이 태우기 위해 N마리 바둑이와 각 바둑이의 무게 W
function solution(c, arr){
    let answer=Number.MIN_SAFE_INTEGER;
    let n=arr.length;
    function DFS(L, sum){
       if(L >= n){
        if(sum<=c && answer<sum) answer = sum;
        return;
       }
       DFS(L+1, sum + arr[L]);
       DFS(L+1, sum);
    }

    DFS(0, 0);

    return answer;
}

let arr=[81, 58, 42, 33, 61];
console.log(solution(259, arr));