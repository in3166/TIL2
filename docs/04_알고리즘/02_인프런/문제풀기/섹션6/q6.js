// 공주구하기 7
function solution(n, k){
    let answer;
    let queue = [];
    for (let i = 1; i <= n; i++) {
        console.log(i)
        queue.push(i);
    }
    console.log(queue)

    let q = Array.from({length:n}, (v, i)=> i+1); // 길이 n의 유사배열 객체
    console.log(q);
    
    let j = 1;
    while (queue.length > 1) {    
        if(j === k){
            j=1;
            queue.shift();
        }else{
            j++;
            queue.push(queue.shift());
        }
        
    }
    return queue[0];
}

console.log(solution(8, 3));