function solution(arr1, arr2) {
    var answer = new Array(arr1.length).fill(0);
    for (let i = 0; i < arr1.length; i++) {
        answer[i] = new Array(arr1[0].length).fill(1);
    }

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr1[0].length; j++) {
            answer[i][j] = arr1[i][j] + arr2[i][j];
        }
    }
    return answer;
}

console.log(solution([[1], [2]], [[3], [4]]));

// 다른 풀이
function sumMatrix(A, B) {
    return A.map((a, i) => a.map((b, j) => b + B[i][j]));
}