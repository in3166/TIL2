// 회문 문자열: 앞뒤가 같은 문자열 yes
function solution(s){
    let answer="YES";
    //let temps= s;
    //s.reverse();
    var temps = s.split("").reverse().join("");
    console.log(temps)
    for (let i = 0; i < s.length; i++) {
        const element = s[i].toUpperCase();
        const element2 = temps[i].toUpperCase();
        if(element!=element2) answer="NO";
        
    }
    return answer;
}

let str="goooG";
console.log(solution(str));

// 문자열을 배열에 넣어서 인덱스 앞 뒤 비교
// len/2 까지만 돌면 된다. 몫
function solution(s){
    let answer="YES";
    s = s.toLowerCase();
    
    for (let i = 0; i < Math.floor(s.length/2); i++) {
        if(s[i]!==s[s.length-i-1]){
            answer="NO";
            break;
        } 
        
    }
    return answer;
}
