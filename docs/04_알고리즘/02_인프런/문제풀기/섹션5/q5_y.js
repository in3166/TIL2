// 슬라이딩 윈도우
// 최대 매출: N일 동안 매출기록, 연속된 K일 동안 최대 매출액
// O(n)으로 풀 수 있음..
function solution22(k, arr){
    let answer=0;

    let lt = rt = sum = 0;

    while (lt < arr.length-k){
        let temp = 0;
        for (let i = lt; i < lt+3; i++) {
            temp += arr[i];
        }
        answer = Math.max(answer, temp);
        lt++;
    }



    return answer;
}

let a1=[12, 15, 11, 20, 25, 10, 20, 19, 13, 15];
console.log(solution22(3, a1)); //56
























// 슬라이딩 윈도우
function solution(k, arr){
    let answer, sum=0;
    let p1=0;
    let p2=k-1;
    while (1) {
        sum = 0;
        if (p2>arr.length) break;

        // O(N^2)      
        for (let i = p1; i < p2; i++) {
            sum += arr[i];
            if(p1===0) answer = sum;
        }

        if(sum > answer) answer = sum;
        p1++; p2++;
    }

    return answer;
}

let a=[12, 15, 11, 20, 25, 10, 20, 19, 13, 15];
// console.log(solution2(3, a));



function solution2(k, arr){
    let answer = 0, sum = 0;
    let p1 = 0;
    let p2 = 0;
    while (p2 < arr.length) {
        sum += arr[p2++];
        if(p2-p1 === k) {
            answer = Math.max(answer, sum);
            sum -= arr[p1++];
        }
    }

    return answer;
}

// 풀이
function solution3(k, arr){
    let answer = 0, sum = 0;
    for (let i = 0; i < k; i++) {
        sum += arr[i];
    }
    
    answer=sum;

    for (let i = k; i < arr.length; i++) {
        sum += (arr[i]-arr[i-k]);
        answer = Math.max(answer, sum);
    }

    return answer;
}