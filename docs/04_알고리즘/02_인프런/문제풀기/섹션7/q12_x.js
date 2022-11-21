// 마구간 정하기(결정 알고리즘)
//N개의 마구간이 수직선상에 있습니다. 각 마구간은 x1, x2, x3, ......, xN의 좌표를 가지며 
//각 마구간에는 한 마리의 말만 넣을 수 있고, 가장 가까운 두 말의 거리가 최대가 되게 말을 마구간에 배치
//C마리의 말을 N개의 마구간에 배치했을 때 가장 가까운 두 말의 거리가 최대

function count(dist, stable){ 

  return cnt;
}

function solution2(c, stable){
  let answer;
  

  return answer;
}

let arr=[1, 2, 8, 4, 9];
console.log(solution2(3, arr)); //3






















function count(stable, dist){ // dist: 거리 -> 거리 만큼 떨어지게 배치할 수 있는가를 확인
  let cnt=1, ep=stable[0]; // 방금전 말을 배치한 마구간 위치

  for (let i = 1; i < stable.length; i++) {
    if(stable[i]-ep >= dist){
      cnt++;
      ep = stable[i];
    }
  }
  return cnt;
}

function solution(c, stable){
   let answer;
   stable.sort((a,b)=> a-b); // 사전 순으로 됨!!
   console.log(stable);

   let min = 1;
   let max = stable[stable.length-1] - stable[0];
   
   while (min <= max) {
     let mid = Math.floor((min+max)/2);
     let cnt = count(stable, mid);

     if(cnt >= c){
       answer=mid;
       ++min;
      }else if(cnt < c){
        --max;
      }
   }
   return answer;
}

let arr=[1, 2, 8, 4, 9];
//console.log(solution(3, arr)); //3


// tip: 거리를 늘리면서 마구간에 말을 넣자