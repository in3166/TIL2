// 문자열 압축: 같은 문자 오른쪽에 반복횟수 k2hs7e
function solution(s){
    let answer="";
    answer += s[0];
    let count = 1;
    for (let i = 1; i < s.length; i++) {
        if(answer[answer.length-1] == s[i] && s[i] == s[i+1] && i!=s.length-1){
            count++;
            console.log(count, s[i])
        }else if(i==s.length-1 && answer[answer.length-1] == s[i]){
            count++ ;
            answer += count;
        }else if(answer[answer.length-1] == s[i] && s[i] != s[i+1]){
            count++ ;
            answer += count;
        }else if(answer[answer.length-1] != s[i]){
            count =1 ;
            answer += s[i];
        }
    }
    return answer;
}

let str="KKHSSSSSSSE";
console.log(solution(str));
// 군이 앞뒤로 비교 안하고
// 오른방향으로 가면서 카운트++
// 이전고 ㅏ다르면 문자 찍고