// 송아지 찾기(BFS)
// 송아지 찾기: 현수 위치와 송아지 위치가 수직선상 좌표 점 주어짐
// 현수가 송아지한테 움직이는데 송아지는 제자리에 잇고 현수는 스카이 콩콩 한번에 +1 -1 +5 만큼 갈수 있다. 최단거리
function solution(s, e) {
  // 현수 위치, 송아지 위치
  let answer = 0;
  while (s !== e) {
    if (s > e) {
      s -= 1;
      answer++;
    } else if (s < e) {
      if (e - s < 3) {
        s += 1;
        answer++;
      } else {
        s += 5;
        answer++;
      }
    }
  }
  return answer;
}

console.log(solution(34, 158));


// 체크 배열을 만들어서 이미 갔던 지점은 안가도록
/*
0 level                  (5) 
1 level     (4)          (6)            (10)
2 level  (3) () (6)   () (7) (11)   (9) (11) (15)
각 level을 체크해줘도 되고 아니면 배열을 만들어 index 요소 별로 레벨을 저장한다. (arr[5]=0, arr[3]=1 ...)
*/
function solution2(s, e) {
  let answer = 0;
  let ch = Array.from({length:10001}, ()=>0);  // 갔던 곳 체크
  let dis = Array.from({length:10001}, ()=>0); // 거리(레벨) 체크
  let queue = [];
  //s는 내 위치, e는 송아지
  ch[s] = 1;
  queue.push(s);
  dis[s] = 0;

  while (queue.length !== 0) {
    let x = queue.shift();
    for (const next of [x-1, x+1, x+5]) {
      if(next===e) return dis[x] + 1;
      if(next > 0 && next <= 10000 && ch[next] === 0){
        ch[next] = 1;
        queue.push(next);
        dis[next] = dis[x] + 1; 
      }
    }
  }
  return answer;
}

console.log(solution2(34, 158))