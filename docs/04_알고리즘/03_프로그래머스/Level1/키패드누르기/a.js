function solution(numbers, hand) {
    var answer = '';
    var left = 10;
    var right = 11;
    var h = hand === 'right' ? "R" : "L";
    var dis = [[0, 4, 3, 4, 3, 2, 3, 2, 1, 2, 1, 1], [4, 0, 1, 10, 1, 2, 10, 2, 3, 10, 3, 10], [3, 1, 0, 1, 2, 1, 2, 3, 2, 3, 4, 4], [4, 10, 1, 0, 10, 2, 1, 10, 3, 2, 10, 3], [3, 1, 2, 10, 0, 1, 10, 1, 2, 10, 2, 10], [2, 2, 1, 2, 1, 0, 1, 2, 1, 2, 3, 3], [3, 10, 2, 1, 10, 1, 0, 10, 2, 1, 10, 2], [2, 2, 3, 10, 1, 2, 10, 0, 1, 10, 1, 10], [1, 3, 2, 3, 2, 1, 2, 1, 0, 1, 2, 2], [2, 10, 3, 2, 10, 2, 1, 10, 1, 0, 10, 1], [1, 3, 4, 10, 2, 3, 10, 1, 2, 10, 0, 10], [1, 10, 4, 3, 10, 3, 2, 10, 2, 1, 10, 0]];
    console.log(dis[2][8]);
    console.log(dis[0][8]);
    numbers.forEach(element => {
        console.log('ele: ', element)
        if (element === 1 || element === 4 || element === 7) {
            left = element;
            answer += "L";
            console.log(answer);
        } else if (element === 3 || element === 6 || element === 9) {
            right = element;
            answer += "R";
            console.log(answer);
        } else {
            if (dis[left][element] === dis[right][element]) {
                console.log('l: ', left, dis[left][element], ' r: ', right, dis[right][element]);
                if (h === "R") {
                    right = element;
                }
                else left = element;
                answer += h;
                console.log(answer);
            } else if (dis[left][element] > dis[right][element]) {
                console.log('l: ', left, dis[left][element], ' r: ', right, dis[right][element]);
                right = element;
                answer += 'R';
                console.log(answer);
            } else {
                console.log('l: ', left, dis[left][element], ' r: ', right, dis[right][element]);
                left = element;
                answer += 'L';
                console.log(answer);
            }
        }
    });

    return answer;
}

//console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], "right"));
console.log(solution([7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], "left"));


// 다른 풀이 정규식
function solution(numbers, hand) {
    hand = hand[0] === "r" ? "R" : "L"
    let position = [1, 4, 4, 4, 3, 3, 3, 2, 2, 2]
    let h = { L: [1, 1], R: [1, 1] }
    return numbers.map(x => {
        if (/[147]/.test(x)) {
            h.L = [position[x], 1]
            return "L"
        }
        if (/[369]/.test(x)) {
            h.R = [position[x], 1]
            return "R"
        }
        let distL = Math.abs(position[x] - h.L[0]) + h.L[1]
        let distR = Math.abs(position[x] - h.R[0]) + h.R[1]
        if (distL === distR) {
            h[hand] = [position[x], 0]
            return hand
        }
        if (distL < distR) {
            h.L = [position[x], 0]
            return "L"
        }
        h.R = [position[x], 0]
        return "R"
    }).join("")
}
