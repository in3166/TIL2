// 유효한 팰린드롬, 알파벳 이외 무시
function solution(s){
    let answer="YES";
    s = s.split("");
    let temps = Object.assign([], s);
    temps = temps.reverse();
    
    for (let i = 0; i < s.length; i++) {
        const element = s[i];
        if (!element.match(/[a-zA-Z]/i)) continue;
        if(s[i].toUpperCase() !== temps[i].toUpperCase()) {
            answer = "NO";
        }
    }
    return answer;
}

let str="found7, time: study; Yduts; emit, 7Dnuof";
console.log(solution(str));

// s = s.toLowerCase().replace(/[^a-z]/g, '');