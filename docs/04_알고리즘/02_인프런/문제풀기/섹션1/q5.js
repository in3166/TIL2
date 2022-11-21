// 최솟값 구하기
function solution(arr){         
    let answer, min=Number.MAX_SAFE_INTEGER;
    arr.sort();
    /*
    let min=Number.MAX_SAFE_INTEGER; // 안정적인 아주 큰 값으로 미리 초기화
    for(let i=0; i<arr.length; i++){
        if(arr[i]<min) min =arr[i];
    } 
    */

    // 함수 사용
    /* 
    let min2=Math.min(3,2,7);
    // 배열은 전개 연산자로 해야 가능
    let min3=Math.min(...arr); //-> (arr[0], arr[1]...)
    
    */
    answer = arr[0];
    return answer;

}

let arr=[5, 7, 1, 3, 2, 9, 11];
console.log(solution(arr));