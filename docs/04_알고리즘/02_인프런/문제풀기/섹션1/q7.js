// 10부제
function solution(day, arr){
    let answer=0;
    arr.forEach(element => {
       if(element%10 === day%10) answer++; 
    });
    
    return answer;
}

arr=[12, 20, 54, 30, 87, 91, 30];
console.log(solution(0, arr));