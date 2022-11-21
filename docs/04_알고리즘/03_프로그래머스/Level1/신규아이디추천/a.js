function solution(new_id) {
    var answer = '';

    answer = new_id.toLowerCase();


    var regExp = /[^a-z0-9\.\_\-]+/;

    while (regExp.test(answer)) {
        answer = answer.replace(regExp, "");
        console.log(answer)
    }
    regExp = /\.{2}/;
    while (regExp.test(answer)) {
        answer = answer.replace(regExp, ".");
        console.log("..", answer)
    }

    regExp = /^\.|\.$/;
    while (regExp.test(answer)) {
        answer = answer.replace(regExp, "");
        console.log("끝", answer)
    }

    if (answer === "") answer = 'a';

    answer = answer.substr(0, 15);

    regExp = /^\.|\.$/;
    while (regExp.test(answer)) {
        answer = answer.replace(regExp, "");
        console.log("끝", answer)
    }

    if (answer.length <= 2) {
        while ((answer.length != 3)) {
            answer = answer.concat(answer.charAt(answer.length - 1));
        }
    }


    return answer;
}

console.log(solution("abcdefghijklmn.p"));

//풀이1 체이닝
function solution(new_id) {
    const answer = new_id
        .toLowerCase() // 1
        .replace(/[^\w-_.]/g, '') // 2
        .replace(/\.+/g, '.') // 3
        .replace(/^\.|\.$/g, '') // 4
        .replace(/^$/, 'a') // 5
        .slice(0, 15).replace(/\.$/, ''); // 6
    const len = answer.length;
    return len > 2 ? answer : answer + answer.charAt(len - 1).repeat(3 - len);
}

// 풀이2 padEnd
const solution = (new_id) => {
    const id = new_id
        .toLowerCase()
        .replace(/[^\w\d-_.]/g, '')
        .replace(/\.{2,}/g, '.')
        .replace(/^\.|\.$/g, '')
        .padEnd(1, 'a')
        .slice(0, 15)
        .replace(/^\.|\.$/g, '')
    return id.padEnd(3, id[id.length - 1])
}