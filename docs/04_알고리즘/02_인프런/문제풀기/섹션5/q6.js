// 학급 회장(해쉬): 후보 ABCED, 투표결과
function solution(s){  
    let answer;
    let vote = new Map();

    for (let i = 0; i < s.length; i++) {
        const element = s[i];
        let val = vote.get(element);
        if(vote.has(element)) vote.set(element, ++val)
        else vote.set(element, 1);
    }

    let min = 0;

    for (const iter of vote) {
        console.log(iter)
        if(min < iter[1]){
            answer = iter[0];
            min = iter[1];
        }
    }
    return answer;
}

let str="BACBACCACCBDEDE";
console.log(solution(str));