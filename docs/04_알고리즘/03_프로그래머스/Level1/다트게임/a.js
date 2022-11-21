function solution(dartResult) {
    var answer = 0;
    var arr = dartResult.split(/([A-Z]|\*|\#)/);
    console.log(arr);
    arr = arr.filter((element, i) => {
        return element !== ''
    });

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 'S') {
            arr[i - 1] *= 1
        } else if (arr[i] === 'D') {
            arr[i - 1] *= arr[i - 1];
        } else if (arr[i] === 'T') {
            arr[i - 1] *= arr[i - 1] * arr[i - 1];
        } else if (arr[i] === '*') {
            let chk = 0;
            for (let j = i - 1; j >= 0; j--) {
                if (typeof (arr[j]) === 'number') {
                    arr[j] *= 2;
                    chk++;
                }
                if (chk === 2) break;
            }
        } else if (arr[i] === '#') {
            arr[i - 2] *= -1;
        }
    }

    console.log(arr);

    for (let i = 0; i < arr.length; i++) {
        if (typeof (arr[i]) === "number")
            answer += arr[i];
    }

    return answer;
}

console.log(solution('1D2S3T*'));

// // 다른 풀이1:
// function solution(dartResult) {
//     const bonus = { 'S': 1, 'D': 2, 'T': 3 },
//         options = { '*': 2, '#': -1, undefined: 1 };

//     let darts = dartResult.match(/\d.?\D/g);

//     for (let i = 0; i < darts.length; i++) {
//         let split = darts[i].match(/(^\d{1,})(S|D|T)(\*|#)?/),
//             score = Math.pow(split[1], bonus[split[2]]) * options[split[3]];

//         if (split[3] === '*' && darts[i - 1]) darts[i - 1] *= options['*'];

//         darts[i] = score;
//     }
//     return darts.reduce((a, b) => a + b);
// }

// // 다른 풀이2:
// function solution(dartResult) {
//     const bonus = { 'S': 1, 'D': 2, 'T': 3 };
//     let darts = dartResult.match(/\\d.?\\D/g);

//     for (let i = 0; i < darts.length; i++) {
//         let split = darts[i].match(/(\\d{1,})([SDT])([*#])?/),
//             score = Math.pow(split[1], bonus[split[2]]);

//         if (split[3] !== undefined) {
//             if (split[3] === '*') {
//                 score *= 2;

//                 if (i > 0) darts[i - 1] *= 2;
//             } else score *= -1;
//         }

//         darts[i] = score;
//     }

//     return darts.reduce((a, b) => a + b);
// }
