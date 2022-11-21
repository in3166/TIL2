//level1
// 완전 탐색
/* 
경우의 수를 일일이 나열하면서 답을 찾는 방법
가능한 모든 방법 찾기
*/

function solution(answers) {
    var answer = [];
    var p1 = [1, 2, 3, 4, 5],
        p2 = [2, 1, 2, 3, 2, 4, 2, 5],
        p3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

    var s1 = { name: 1, count: 0 }, s2 = { name: 2, count: 0 }, s3 = { name: 3, count: 0 };

    for (let index = 0; index < answers.length; index++) {
        if (answers[index] === p1[index % 5]) {
            s1.count++;
        }
        if (answers[index] === p2[index % 8]) {
            s2.count++;
        }
        if (answers[index] === p3[index % 10]) {
            // console.log(answers[index], p3[index % 10])
            s3.count++;
        }
    }
    var arr = [];
    arr.push(s1)
    arr.push(s2)
    arr.push(s3)
    arr.sort((a, b) => { return b.count - a.count });
    answer.push(arr[0].name);
    if (arr[0].count === arr[1].count) answer.push(arr[1].name);

    if (arr[0].count === arr[2].count) answer.push(arr[2].name);

    // 다른 풀이 비교  let count = [0, 0, 0];
    // const max = Math.max(count[0], count[1], count[2]);
    // for(let i = 0; i < count.length; i++) {
    //     if(max == count[i]) answer.push(i + 1);
    // }
    return answer;
}

console.log(solution([1, 3, 2, 4, 2]));

// 다른 풀이: filter 사용
function solution2(answers) {
    var answer = [];
    var a1 = [1, 2, 3, 4, 5];
    var a2 = [2, 1, 2, 3, 2, 4, 2, 5]
    var a3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

    var a1c = answers.filter((a, i) => a === a1[i % a1.length]).length;
    var a2c = answers.filter((a, i) => a === a2[i % a2.length]).length;
    var a3c = answers.filter((a, i) => a === a3[i % a3.length]).length;
    var max = Math.max(a1c, a2c, a3c);

    if (a1c === max) { answer.push(1) };
    if (a2c === max) { answer.push(2) };
    if (a3c === max) { answer.push(3) };


    return answer;
}