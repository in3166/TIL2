function solution(n, m) {
    var answer = [];
    let big = n>m ? n:m;
    for (let i = big; i >=1; i--) {
        console.log(i)
        if((n%i===0 && m%i===0) && (n/i!==0 && m/i!==0)){
            answer.push(i);
            answer.push(n*m/i);
            break;
        }
    }
    
    return answer;
}

console.log(solution(3,12));

//다른 풀이: 유클리드 호제법
function greatestCommonDivisor(a, b) {return b ? greatestCommonDivisor(b, a % b) : Math.abs(a);}
function leastCommonMultipleOfTwo(a, b) {return (a * b) / greatestCommonDivisor(a, b);}
function gcdlcm(a, b) {
    return [greatestCommonDivisor(a, b),leastCommonMultipleOfTwo(a, b)];
}

//
function gcdlcm(a, b) {
    var r;
    for(var ab= a*b;r = a % b;a = b, b = r){}
    return [b, ab/b];
}