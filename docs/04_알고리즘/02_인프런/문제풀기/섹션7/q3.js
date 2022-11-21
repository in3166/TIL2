// special sort: 음수 양수 나누기 - 순서는 동일하게
function solution(arr){
    let answer=arr;
    let temp = [];
   for (let i = arr.length; i >= 0; i--) {
       if(arr[i] < 0) {
           temp.push(arr[i]);
           arr.splice(i, 1);
        }
    }
    
    temp.reverse();
    answer = [...temp, ...arr]
    return answer;
}

//let arr=[1, 2, 3, -3, -2, 5, 6, -6];
let arr=[1, 2, 3, -3, -2, 5, 6, -5];
console.log(solution(arr));
