// 이분검색
// n개의 수 오름차순, m 주어지면 몇 번째 O(n)
function solution(target, arr){
    let answer;
    arr.sort();
    arr.forEach((v,i) => {
        (v===target) && (answer = ++i);
    });
    
    return answer;
}

let arr=[23, 87, 65, 12, 57, 32, 99, 81];
console.log(solution2(32, arr))

// 이분 검색으로 풀기 O(logn)
function solution2(target, arr){
    let answer;
    arr.sort();
    
    let low = 0;
    let high = arr.length-1;
    while (low <= high) {
        let mid = Math.floor((low + high)/2);
        console.log(mid , arr[mid])
        if(arr[mid] === target) return target;
        else if(arr[mid] < target) low = mid + 1;
        else high = mid -1 ;

    }
    
    return answer;
}