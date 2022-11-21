// 봉우리 몇개
function solution(arr){  
    let answer=0;
    
    let tempArr = new Array(arr[0].length).fill(0);
    arr.push(Object.assign([],tempArr));
    arr.unshift(Object.assign([],tempArr))

    for (let i = 0; i < arr.length; i++) {
        arr[i].push(0);
        arr[i].unshift(0);
    }
    for(let i = 1; i<=arr.length-2; i++){
        for (let j = 1; j <= arr.length-2; j++) {
            let c1 = arr[i-1][j];
            let c2 = arr[i][j-1];
            let c3 = arr[i+1][j];
            let c4 = arr[i][j+1];
            let element = arr[i][j];
            if(element > c1 &&element > c2 &&element > c3 &&element > c4) answer++;
        }
    }
    return answer;
}

let arr=[[5, 3, 7, 2, 3], 
         [3, 7, 1, 6, 1],
         [7, 2, 5, 3, 4],
         [4, 3, 6, 4, 1],
         [8, 7, 3, 5, 2]];
console.log(solution(arr));