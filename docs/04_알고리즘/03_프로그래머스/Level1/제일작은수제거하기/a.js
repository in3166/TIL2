function solution(arr) {
    let low = arr[0];
    let index = 0;
    if (arr.length === 1) return -1;
    arr.forEach((e, i) => {
        if (low > e) {
            low = e;
            index = i;
        }
    });
    arr.splice(index, 1)
    return arr;
}

console.log(solution([4, 3, 2, 1]))

// 다른 사람 풀이1: indexOf
function solution(arr) {
    arr.splice(arr.indexOf(Math.min(...arr)), 1);
    if (arr.length < 1) return [-1];
    return arr;
}