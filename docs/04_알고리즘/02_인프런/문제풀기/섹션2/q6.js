// 격자판 최대합
function solution(arr){  
    let answer=Number.MIN_SAFE_INTEGER;
    let sums = [];
    let sumsD = [0,0];
    for (let i = 0; i < arr.length; i++) {
        let sumH = 0;
        let sumV = 0;
        for (let j = 0; j < arr.length; j++) {
            if(i === j){
                sumsD[0] += arr[i][j];
            }else if( i + j === arr.length){
                sumsD[1] += arr[i][j];
            }else{
                sumH += arr[i][j];
                sumV += arr[j][i];
            }
        }
        sums.push(sumH);
        sums.push(sumV);
    }
    sums.push(sumsD[0])
    sums.push(sumsD[1])
    console.log(sums)
    sums.forEach(e=>{
        if(e>answer)
        answer=e;
    })
    return answer;
}

let arr=[[10, 13, 10, 12, 15], 
         [12, 39, 30, 23, 11],
         [11, 25, 50, 53, 15],
         [19, 27, 29, 37, 27],
         [19, 13, 30, 13, 19]];
console.log(solution(arr));


let sum1=sum2=0; //행과 열의 합
for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
        sum1+=arr[i][j]
        sum1+=arr[j][i]
    }
    amswer = Math.max(answer, sum1, sum2);
}
// 대각선
for (let i = 0; i < array.length; i++) {
    sum1+=arr[i][i];
    sum2+=arr[i][n-i-1];
}
amswer = Math.max(answer, sum1, sum2);
return answer;