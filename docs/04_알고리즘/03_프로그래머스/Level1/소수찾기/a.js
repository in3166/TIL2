function solution(n) {
    var answer = 0;
    var arr = new Array(n);
    arr.fill(1);

    for (let index = 2; index * index <= n; index++) {
        for (let j = index * index; j <= n; j += index) {
            console.log("j: ", j)
            if (arr[j - 1] === 1) { console.log(j - 1); arr[j - 1] = 0 };
        }
    }
    console.log(arr)
    answer = (arr.filter((value) => (value))).length;
    return answer - 1;
}

console.log(solution(10));


// SET
function solution2(n) {
    var se = new Set();
    // 자기 수로 초기화
    for (let index = 1; index < n; index++) {
        se.add(index);
    }
    // 1은 우선 삭제
    se.delete(1);
    for (let i = 3; i * i < n; i++) {
        if (se.has(i)) {
            for (let j = i * 2; j < n; j += i) {
                se.delete(j);

            }
        }
    }
    return se.size;
}
console.log(solution2(5))

