// 교육 과정 설계 - yes
function solution(need, plan){
    let answer="YES";
    let q = [];
for (let i = 0; i < need.length; i++) {
    const element = need[i];
    q.push(element);
}

    for (let i = 0; i < plan.length; i++) {
       const element = plan[i];
       
       if(q[0] === element) q.shift();
       else if(q[0] !== element && q.includes(element)) {
           answer = "NO";
           console.log(element)
           console.log(q)
       }
    }

   if(q.length >= 1) answer = "NO";
   return answer;
}

// let a="CBA";
// let b="CBDAGE";
//console.log(solution(a, b));
let a="CBA";
let b="CBBDDAB";

console.log(solution(a, b))
console.log(solution('CBA', 'CABA'));

// INCLUDE로 필수 과목인지 확인
function solution2(need, plan) {
    let answer = 'YES';
    const queue = [];

    for (s of plan) {
        if (need.includes(s)) queue.push(s);
    }

    if (!queue.join('').includes(need)) answer = 'NO';

    return answer;
}
