// 후위식 연삭 (postfix): 3*(5+2)-9 = 352+*9-  12
function solution(s){  
    let answer;
    let t = [];
    for (const x of s) {
        if(isNaN(x)){
            t.push(calc(x,t.pop(),t.pop()));
        }else{
            t.push(x);
        }
    }
    return t.pop();
}

function calc(x,a,b) {
    console.log(x, a, b )
    switch (x) {
        case "+":
            return parseFloat(a)+parseFloat(b);
        case "-":
            return parseFloat(b)-parseFloat(a);
        case "*":
            return parseFloat(a)*parseFloat(b);
        case "/":
            return parseFloat(b)/parseFloat(a);
    }
}
let str="352+*9-";
console.log(solution(str));