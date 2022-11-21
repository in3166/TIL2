// 구명보트 한 번에 2명씩, 무게 제한
// 구명 보트 개수 최대한 적게 사용하여 구출,
// Greedy: 각 단계별 최적해 찾기

function solution(people, limit) {
  var answer = 0;

  return answer;
}



console.log(solution([20, 20, 10, 70, 80], 100)); //3
console.log(solution([70, 80, 30], 100)); // 3






















function solution2(people, limit) {
  var answer = 0;
  people.sort((a, b) => a - b);
  var pl = 0,
    pr = people.length - 1;

  while (pl <= pr) {
    if (people[pl] + people[pr] <= limit) {
      pl += 1;
    }
    pr -= 1;
    answer += 1;
  }
  return answer;
}


/// 바보 투 포인터 알고리즘
function solution3(people, limit) {
  people.sort(function(a, b){return a-b});
  for(var i=0, j=people.length-1; i < j; j--) {
      if( people[i] + people[j] <= limit ) i++;
  }    
  return people.length-i;
}
