function solution(seoul) {
    var answer = '';
    seoul.forEach((element, index) => {

        if (element === "Kim") {
            answer = `김서방은 ${index}에 있다`
            return answer;
        }
    });

    return answer;
}

console.log(solution(["Jane", "Kim"]))

// indexOf
function findKim(seoul) {
    var idx = seoul.indexOf('Kim');
    return "김서방은 " + idx + "에 있다";
}

//
const solution = (arr) => `김서방은 ${arr.findIndex(s => s === 'Kim')}에 있다`;