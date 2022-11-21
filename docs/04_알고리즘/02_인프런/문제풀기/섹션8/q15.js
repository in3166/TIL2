// 수들의 조합
// n개의 arr 중 k개를 뽑느 조합에서 그 합들이 m인 경우의 수
function solution(n, k, arr, m){         
    let answer=0;

    let chk = Array.from({length:n}, () => 0);
    let temp = Array.from({length:k}, () => 0);

    function DFS(L, s) {
        if(L === k){
            let sum = 0;
            chk.forEach((e,i) => {
                if(e) sum += arr[i];
            });
            if(!(sum%m)) answer++;
        }   

        for (let i = s; i < n; i++) {
            chk[i] = 1;
            temp[L] = arr[i];
            DFS(L+1, i+1);
            chk[i] = 0;
        } 
    }

    DFS(0, 0)
    return answer;
}

let arr=[2, 4, 5, 8, 12];
console.log(solution(5, 3, arr, 6));