// 일곱 난쟁이: 난쟁이 7 -> 9, 가짜 난쟁이 찾기
// 난쟁이 키 합: 100
function solution(arr){
    let answer=[]; // 얕은 복사 참조만 할뿐
    let sum = 0;
    let ck = Array.from({length: arr.length}, ()=>0);
    let flag = true;
    function DFS(L) {
        if(L >= arr.length) return;
        if(ck[L] === 1) return;
        if(sum === 100) {
            flag = false;
            console.log(sum)
            console.log('ck1: ',ck)
            ck = ck.slice();
            return;
        }
        
        ck[L]=1
        sum += arr[L];
        DFS(L+1);
        if(flag){
            ck[L]=0;
            sum -= arr[L];
            DFS(L+1);
        }
    }
    
    DFS(0);
    console.log('ck2: ',ck)

    for (let i = 0; i < arr.length; i++) {
        if (ck[i]===1){
            answer.push(arr[i])
        }
    }

    
    return answer;
}

// let arr2=[20, 7, 23, 19, 10, 15, 25, 8, 13];
// console.log(solution(arr2));
























// 하나씩 다 더하다가.. 점차 뒤로.. ㅠ
// function 만들어서 재귀로?




// sum - (arr[i] + arr[j])
function solution5(arr){
    let answer=arr; // 얕은 복사 참조만 할뿐
    let sum = 0;
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        sum += element;
    }
    // let sum = arr.reduce((a, b) => a + b, 0);
    sum -= 100;

    for (let a = 0; a < arr.length-1; a++) {
        const element1 = arr[a];
        for (let b = 0; b < arr.length; b++) {
            const element2 = arr[b];
            if(a !== b && sum == element1+element2){
                arr.splice(b, 1); // 차레대로 2개이므로 이걸먼저
                arr.splice(a, 1);
                // if(a>b){
                //     arr.splice(b, 1);
                // }else{
                //     arr.splice(b-1, 1); // 앞이 먼저 지워짐
                // }
                return answer;
            }
            
        }
        
    }
    
    return answer;
}
// // 하나씩 다 더하다가.. 점차 뒤로.. ㅠ
// // function 만들어서 재귀로?

let arr=[20, 7, 23, 19, 10, 15, 25, 8, 13];
//console.log(solution5(arr));


function solution3(arr){
    let answer = [];
    let index = [];

    let sum = arr.reduce((sum, ele)=>sum+ele, 0);
    let target = sum - 100;

    let map = new Map();

    for(let i = 0; i < arr.length; i++){
        if(!map.has(arr[i])){
            map.set(arr[i],i);
            if((target-arr[i] !== arr[i]) && map.has(target - arr[i])){ // 자기 자신이 2번 들어가는걸 제외하고
                let j = map.get(target-arr[i]);
                console.log(j);
                index.push(Math.max(i,j));
                index.push(Math.min(i,j));
                break;
            }
        }
    }
    console.log(map);
    arr.splice(index[0],1);
    arr.splice(index[1],1);
    answer = arr;
    return answer;
}

let arr3=[20, 7, 23, 19, 10, 15, 25, 8, 13];
console.log(solution3(arr3));
// string replace
// function solution2(s){
//     let answer=s;
//     s = s.replace(/A/g, '#'); // global이 아니면 첫번째 문자만 바뀜
//     // string은 참조가 되지 않고 값이 복사됨
//     return s;
// }