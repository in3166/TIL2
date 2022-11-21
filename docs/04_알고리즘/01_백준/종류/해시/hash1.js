// // 완주하지 못한 선수

// // 시간 초과,  splice, for문 물가 -> reduce와 foreach

// // function solution(participant, completion) {
// //     var answer = '';
// //     for (let i = 0; i < completion.length; i++) {
// //         for (let j = 0; j < participant.length; j++) {
// //             if (participant[j] === completion[i]) {
// //                 participant.splice(j, 1);
// //                 break;
// //             }
// //         }
// //     }
// //     answer = participant[0];
// //     return answer;
// // }

function solution123(participant, completion) {
    var answer = '';

    let compleCount = completion.reduce((object, currentValue) => {
        if (!object[currentValue]) {
            object[currentValue] = 0;
        }
        object[currentValue]++;
        return object;
    }, {});
    console.log(compleCount);
    participant.forEach(element => {
        if (compleCount[element]) {
            compleCount[element]--;
        } else {
            answer = element;
        }
        if (compleCount[element] === -1) {
            answer = element;
        }
    });

    //answer = participant[0];
    return answer;
}

// console.log(solution(['1', '2', '3', '4'], ['4', '2', '3']));

// // 다른 풀이: 둘다 sort()로 정렬해서 차례로 인덱스 비교, 틀린 첫번째
// // for (let i in participant) {
// //     if (participant[i] !== completion[i]) return participant[i];
// // }



// function solution2(p, c) {
//     p.find(name => !c[name]--, // find의 첫번째 인자 콜백함수 
//         c.map(name => c[name] = (c[name] | 0) + 1)); // find의 두번째 인자 thisArg 콜백전에 실행
//     // c[name]을 리턴하는데 어떻게 만드는가: c[name]이 존재하면 거기에 +1, 존재하지 않으면 0+1
// }

// var solution5 = (_, $) => _.find(_ => !$[_]--, $.map(_ => $[_] = ($[_] | 0) + 1))




var solution1 = (participant, completion) => participant.find(name => !completion[name]--,
    completion.map(name => {
        completion[name] = (completion[name] | 0) + 1
        console.log(completion);
    }));

var solution8 = (participant, completion) => participant.find(
    name => !completion[name]--, completion.map(
        name => completion[name] = (completion[name] | 0) + 1));

var solution = (participant, completion) => {
    completion.map(name => {
        console.log(name);
        completion[name] = (completion[name] | 0) + 1
        console.log(completion);
    });

    console.log(completion);
    return participant.find((name) => !completion[name]--);
};

console.log(solution(['1', '6', '5'], ['1', '6']));

// let c = ['a', 'b'];
// console.log("!!" + c['a']);
// let a = [];
// a = c.map(name => c[name] = (c[name] | 0) + 1);
// console.log(a);
// console.log(c[0]);