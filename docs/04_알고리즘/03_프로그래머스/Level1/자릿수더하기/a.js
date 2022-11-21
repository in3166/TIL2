function solution(n) {
    var answer = 0;
    var n2 = n.toString();
    var len = n2.length;
    for (let i = 0; i < len; i++) {
        answer += parseInt(n2.charAt(i))
    }
    return answer;
}

console.log(solution(987));


// 다른 풀이1
function solution(n) {
    // 쉬운방법
    return (n + "").split("").reduce((acc, curr) => acc + parseInt(curr), 0)
}

// 다른 풀이2
function solution(n) {
    var a = (n + '').split('');
    var b = 0;
    for (var i = 0; i < a.length; ++i) {
        b += parseInt(a[i]);
    }
    return b;
    //return n.toString().split('').reduce((a, b) => (a * 1) + (b * 1));
}