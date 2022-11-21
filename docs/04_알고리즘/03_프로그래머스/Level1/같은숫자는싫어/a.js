function solution(arr) {
    var answer = [];

    arr.forEach(element => {
        console.log("::", answer[answer.length - 1], element);
        (answer[answer.length - 1] !== element) && answer.push(element);
    });

    return answer;
}

console.log(solution([4, 4, 4, 3, 3]))

// 다른사람 풀이

function solution(arr) {
    return arr.filter((val, index) => val != arr[index + 1]);
}