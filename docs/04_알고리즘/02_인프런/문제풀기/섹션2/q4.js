// 점수 계산
function solution(arr){         
    let answer=0, cnt=0;
    for (const x of arr) {
        cnt++
        if(x === 0) cnt=0;
        if(x===1) answer +=cnt; 
    }
       
    return answer;
}

let arr=[1, 0, 1, 1, 1, 0, 0, 1, 1, 0];
console.log(solution(arr));