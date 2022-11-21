// 돌다리 건너기: n개의 돌, 한칸 두칸, 방법의 수
function solution(n){  
    let answer=0;
    let dy=Array.from({length:n+2}, ()=>0);
    dy[1] = 1
    dy[2] = 2
    function DYN(L) {
        if(L === 1) return dy[1]; 
        if(L === 2) return dy[2];
        if(dy[L] !== 0) return dy[L];
        dy[L] = DYN(L-1) + DYN(L-2)
        return DYN(L-1) + DYN(L-2);
    }
    answer = DYN(n+1);
    console.log(dy)
    return answer;
}

console.log(solution(7));