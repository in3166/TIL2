function solution(arr) {
    var answer=0;
        console.log(arr)
    arr.forEach((e)=>{
        answer += e 
    })
    return answer/arr.length;
}

console.log(solution([1,2,3,4]));

// reduce
function average(array){
    return array.reduce((a, b) => a + b) / array.length;
  }