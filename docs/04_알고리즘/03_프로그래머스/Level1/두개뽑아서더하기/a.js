function solution(numbers) {
    var answer = [];
    var answer2 = [];
    numbers.forEach((e, index1) => {
        //answer[e] = 1
        numbers.forEach((a, index2) => {
            if (index1 !== index2) {
                console.log(e, a);
                answer[e + a] = 1;
            }
        });
    });
    answer.forEach((a, index) => {
        if (a == 1) {
            answer2.push(index)
        }
    })
    return answer2;
}

console.log(
    solution([5, 0, 2, 7])
);