// 괄호문자 제거
// 입력된 문자열에서 소괄호 사이에 존재하는 모든 문자를 제거하고 남은 문자만 출력 - eflm
function solution(s){  
    let answer;
    let stack = [];
    for (const x of s) {
        if(x === ")"){
            while (1) {
                let temp = stack.pop();
                if(temp==="(") break;
            }
        }else{
            stack.push(x);
        }
    }
    return stack;
}

let str="(A(BC)D)EF(G(H)(IJ)K)LM(N)";
console.log(solution(str));