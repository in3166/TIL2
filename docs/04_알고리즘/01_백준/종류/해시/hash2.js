// 위장

function solution(clothes) {
    var answer = 0;
    let origin = [];
    clothes.map(name => {
        clothes[name[1]] ? (clothes[name[1]] = clothes[name[1]] + 1) : (origin.push(name[1]), clothes[name[1]] = 1);
    })

    let com, sum;
    (origin.length === 1) ? (com = 0, sum = clothes[origin[0]]) : (com = 1, sum = 0);
    for (let index = 0; index < origin.length; index++) {
        com *= (clothes[origin[index]] + 1);
    }
    (origin.length === 1) ? (answer += sum) : (answer += (com - 1));
    return answer;
}

// valuese: 값들만 추출
// function solution(clothes) {
//     return Object.values(clothes.reduce((obj, t)=> {
//         obj[t[1]] = obj[t[1]] ? obj[t[1]] + 1 : 1;
//         return obj;
//     } , {})).reduce((a,b)=> a*(b+1), 1)-1;    
// }


console.log(solution([['yellow_hat', 'a'], ['blue_sunglasses', 'g'], ['green_turban', 'g']]));