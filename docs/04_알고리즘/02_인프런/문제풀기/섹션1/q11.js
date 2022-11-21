function solution(s){         
    let answer=0;

    for (let i = 0; i < s.length; i++) {
        const element = s[i];
        element == element.toUpperCase() && answer++;
        let num = s[i].charCodeAt(); // ascii code
        num >= 65 && num <= 90 && answer++;
    }
    return answer;
}

let str="KoreaTimeGood";
console.log(solution(str));