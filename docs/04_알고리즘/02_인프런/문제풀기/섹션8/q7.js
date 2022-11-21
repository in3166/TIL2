// 최대 점수 구하기
// N개의 문제 풀기. 얻는 점수와 걸린 시간, 제한시간 M안에 N개의 문제 중 최대 점수
function solution(m, ps, pt){         
    let answer=Number.MIN_SAFE_INTEGER;
    let n=ps.length;
    function DFS(L, sum, time){
        if(L >= n){
            if(time <= m && answer < sum) answer =sum;
            return;
        }
        DFS(L+1, sum+ps[L], time+pt[L]);
        DFS(L+1, sum, time);
    }

    DFS(0, 0, 0);
    return answer;
}

let ps=[10, 25, 15, 6, 7];
let pt=[5, 12, 8, 3, 4]
console.log(solution(20, ps, pt));