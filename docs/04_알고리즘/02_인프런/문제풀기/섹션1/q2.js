// 길이가 서로 다른 A, B, C 세 개의 막대 길이가 주어지면 이 세 막대로 삼각형을 만들 수 있으면 “YES"를 출력하고, 만들 수 없으면 ”NO"를 출력한다.
function solution(a, b, c){
    let answer="";
    let a1=0, a2=0,max = 0;
    a > b ? (a > c ? (max=a, a1=b, a2=c):(max=c, a1=a, a2=b)) : (b>c?(max=b, a1=a, a2=c):(max=c, a1=b, a2=a));
    answer = max < a1 + a2 ? 'YES' : 'NO'
    console.log(max, a1 ,a2)

    // 제일 긴 막대 < 짧은 막대 합
    /*
    let answer="yes", max;
    let sum=a+b+c; // 미리 합한다.
    if(a>b) max =a;
    else max b;
    if(c>max) max=c;
    if((sum-max)<=max) answer="no"; 
    */

    return answer;
}

console.log(solution(13, 33, 17));
console.log(solution(6, 7, 11));