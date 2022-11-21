function solution(progresses, speeds) {
    var answer = [];
    let resolve = 0;
    while (progresses.length != 0) {
        for (let i = 0; i < progresses.length; i++) {
            progresses[i] += speeds[i];
        }

        let len = progresses.length;
        for (let i = 0; i < len; i++) {
            if (progresses[0] >= 100) {
                resolve++;
                progresses.shift();
                speeds.shift();
            } else {
                break;
            }
        }
        resolve != 0 && answer.push(resolve)
        resolve = 0;
    }
    return answer;
}

//console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]));

// 다른 풀이: 반복문 1개, map, ceil
function as2(progresses, speeds) {
    let answer = [0];
    let days = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index])); // 소수점 아래 제거
    let maxDay = days[0]; // 며칠이 필요한가..
    console.log("days: ", days, " maxDay: ", maxDay)
    // 차례로... wow
    for (let i = 0, j = 0; i < days.length; i++) {
        if (days[i] <= maxDay) {
            answer[j] += 1;
        } else {
            maxDay = days[i];
            answer[++j] = 1;
        }
    }

    return answer
}

console.log(as2([93, 30, 55], [1, 30, 5]));