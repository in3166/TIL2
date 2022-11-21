// 가장 짧은 문자거리, 2번째 인자와 첫번째 문자열의 각 문자의 거리 1 0 1 2 1 0 1 2 2 1 0
function solution(s, t){
    let answer=[];
    let index = [];
    // 해당 문자가 있는 인덱스를 모두 구해서 다시 빼서
    for (let i = 0; i < s.length; i++) {
        const element = s[i];
        element === t && index.push(i);
    }
    for (let i = 0; i < s.length; i++) {
        let max = 999;
        const element = s[i];
        if(element != "e"){
            for (const iter of index) {
                let d = Math.abs(i-iter);
                if(max>=d) max =d;
            }
            answer.push(max)
        }else{
            answer.push(0)
        }
    }
    return answer;
}

let str="teachermode";
console.log(solution(str, 'e'));