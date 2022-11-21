// 연속 부분수열 1: N개의 수로 이루어진 수열, 연속부분수열의 합이 M이 되는 경우 몇번?
function solution(m, arr){
    let answer=0, lt=0, sum=arr[0];
    let p1=p2=0;
    while (p1 <= arr.length-1 && p2 <= arr.length-1) {
        if(sum === m) {
            console.log(sum, p1, p2)
            answer++;
            sum += (arr[++p2]-arr[p1++]);
        }
        else if(sum < m){
            sum += (arr[++p2]);
        }else if(sum > m){
            console.log("zzj", sum, p1, p2)
            sum -= (arr[p1]);
            p1++;
        }

        // 더 간단
        // if(sum >= M) sum -= arr[lo++];
        // else if(hi == arr.length) break; // sum이 m보다 작은데 p2가 더이상 더해줄수없으면 break;
        // else sum += arr[hi++];
        // if(sum == M) result++;
    }

    return answer;
}

let a=[1, 2, 1, 3, 1, 1, 1, 2];
console.log(solution(6, a));

function sol(m, arr) {
    let answer=0, lt=0, sum=0;
    for (let rt = 0; rt < arr.length; rt++) {
        sum+=arr[rt];
        if(sum===m) answer++;
        while (sum >= m) {
            sum -= arr[lt++];
            if(sum===m) answer++;
        }
    }
}