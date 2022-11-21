function solution(array, commands) {
    var answer = []
        ;
    commands.forEach((e, i) => {
        //console.log(e[0], e[1])
        var t = array.slice(e[0] - 1, e[1]);
        t = t.sort((a, b) => a - b);
        console.log(t)
        answer.push(t[e[2] - 1]);
    });
    return answer;
}

console.log(solution([1, 5, 2, 6, 3, 7, 4], [[2, 5, 3], [4, 4, 1], [1, 7, 3]]));
//sort(): compareFunction이 제공되지 않으면 요소를 문자열로 변환하고 유니 코드 코드 포인트 순서로 문자열을 비교하여 정렬

// 다른 풀이: 구조 분해 할당
function solution(array, commands) {
    return commands.map(command => {
        const [sPosition, ePosition, position] = command
        const newArray = array
            .filter((value, fIndex) => fIndex >= sPosition - 1 && fIndex <= ePosition - 1)
            .sort((a, b) => a - b)

        return newArray[position - 1]
    })
}

// 다른 풀이2: 
function solution(array, commands) {
    return commands.map(v => {
        return array.slice(v[0] - 1, v[1]).sort((a, b) => a - b).slice(v[2] - 1, v[2])[0];
    });
}