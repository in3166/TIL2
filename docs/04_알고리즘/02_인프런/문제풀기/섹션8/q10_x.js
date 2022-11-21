// 순열 구하기: 10 이하의 N개의 자연수가 주어지면 이 중 m개를 뽑아 일렬로 나열하는 방법
// 중복 x -> 순서가 다르면 다른거임
function solution2(m, arr){         
    let answer=[];
    let chk = Array.from({length: arr.length}, () => 0);


    function DFS(L){
        if(L === arr.length ){
            console.log(chk);
            return;
        }
        if(chk[L] !== 1) { // 본문에서 for를 돌리는 방법으로 한번
            chk[L] = 1;
            DFS(L+1);
        }

        chk[L] = 0;
        DFS(L+1);
    }



    DFS(0);
    return answer;
}

let arr3=[3, 6, 9, 10];
// console.log(solution2(3, arr3));














function solution(m, arr){         
    let answer=[];
    n=arr.length;
    let chk = Array.from({length: n}, () => 0);
    let temp = Array.from({length: m}, () => 0);

    function DFS(L){
        if(L === m){
            answer.push(temp.slice());
            return;
        }

       // chk[L] = 1;
        //temp[L] = arr[L];
        for (let i = 0; i < n; i++) {
            if(!chk[i]){
                chk[i] = 1;
                temp[L] = arr[i];
                DFS(L+1);
                chk[i] = 0;
            }        
        }
    // DFS(L+1);
    }
    DFS(0);
    return answer;
}

let arr=[3, 6, 9, 10];
 console.log(solution(3, arr));
