// 스택 큐
// 올바른 괄호: 괄호가 입려되면 올바른 괄호이면 yes.. (())() o / (()())) x no
function solution(s){
    let answer="YES";
    let e = 0;
    for (let i = 0; i < s.length; i++) {
        const element = s[i];
        if(element===")") e++;
        else e--;
    }
    if(e !== 0) answer="NO";
    return answer;
}

let a="(()(()))(()";
console.log(solution(a));

// STACK
function solution(s){
    let answer="YES";
    let e = [];
    for (const x of s) {
        if(x === ")") e.push(x);
        else{
            if(e.length===0) answer = 'no';
            e.pop();
        }
    }
    return answer;
}


