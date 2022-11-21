// 완전탐색
// 가로 세로 명합 지갑 만들기, sizes: 명함들의 크기
function solution(sizes) {
    var answer = 0;
    let left = 0;
    let right = 0;
    sizes.forEach(element => {
        element.sort((a, b)=> a-b)
    });
    sizes.forEach((e, i) => {
        if(e[0] > left) left = e[0];
        if(e[1] > right) right = e[1]
    })
    answer = left * right;
    return answer;
}

console.log(solution([[60, 50], [30, 70], [60, 30], [80, 40]])) // 4000
console.log(solution([[10, 7], [12, 3], [8, 15], [14, 7], [5, 15]])) // 120
console.log(solution([[14, 4], [19, 6], [6, 16], [18, 7], [7, 11]])) // 133


//
function solution2(sizes) {
    const [hor, ver] = sizes.reduce(([h, v], [a, b]) => [Math.max(h, Math.max(a, b)), Math.max(v, Math.min(a, b))], [0, 0])
    return hor * ver;
}

function solution3(sizes) {
    let w = 0;
    let h = 0;
    sizes.forEach(s => {
        const [a, b] = s.sort((a,b) => a-b);
        if (a > h) h = a;
        if (b > w) w = b;
    });

    return w * h;
}
