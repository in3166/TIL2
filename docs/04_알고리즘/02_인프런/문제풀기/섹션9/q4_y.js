// 이진트리 넓이 우선탐색(BFS)
function solution() {
  let answer = "";
  let queue = [];

  return answer;
}

console.log(solution());

//
function solution2() {
  let answer = [];
  let queue = [];
  queue.push(1);

  while (queue.length && answer.length < 8) {
    let p = queue.shift();
    answer.push(p);
    queue.push(2 * p);
    queue.push(2 * p + 1);

    /*
    for(let nv of [v*2, v*2+1]){
        if(nv>7) continue;
        queue.push(nv);
    }
    */
  }

  return answer;
}

console.log(solution2());
