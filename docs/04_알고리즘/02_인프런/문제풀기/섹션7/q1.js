// 선택정렬
function solution(arr){
    let answer=arr;
    for (let i = 0; i < arr.length; i++) {
        let min = Number.MAX_SAFE_INTEGER;
        let idx = 0;
        for (let j = i; j < arr.length; j++) {
            const element = arr[j];
            if(element < min) {min = element; idx = j};
        }
        [arr[i], arr[idx]] = [arr[idx], arr[i]];
        // let temp = arr[i];
        // arr[i] = min;
        // arr[idx] = temp;
    }
    return answer;
}

let arr=[13, 5, 11, 7, 23, 15];
console.log(solution(arr));