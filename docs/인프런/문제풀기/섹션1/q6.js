// 홀수: 7개의 자연수 중 홀수들의 합과 작은값
function solution(arr){
    let answer=[];
    let min = arr[0], sum=0;
    arr.forEach(element => {
        if(element%2 ===1) sum += element;
        if(min > element) min = element;
    });
    answer.push(sum)
    answer.push(min)
    /*
    let answer = [];
    let sum = 0;
    let min = Number.MAX_SAFE_INTEGER;
    for(let x of arr){
        if(x%2===1){
            sum += x;
            if(min > x) min = x;
        }
    }
    */
    return answer;
}

arr=[12, 77, 38, 41, 53, 92, 85];
console.log(solution(arr));