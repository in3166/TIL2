// 중복순열: 1~N 번호 구슬, 중복을 허락하여 M번 뽑아 일렬로 나열 하는 방법
// 다중 포문대신 재귀를 사용하는이유
// 반복문을 동적으로 추가해줄 수 없음
function solution2(n, m){
    let answer=[];
    let temp = [];
    function DFS(L,  te){









        
    }

    DFS(0,  temp);

    return answer;
}


console.log(solution2(3, 2)); // 번호 구슬, 뽑기 개수, 답: 3-2 = 9










function solution(n, m){
    let answer=[];
    let tmp=Array.from({length: m}, () => 0);
    //let tmp= new Array(m);
    let t =[];
    function DFS(L,  te){
        if(L == m){
            let newt = Object.assign([], te)
            answer.push(newt);
            te.pop();
            return;
            // aswer.push(tmp.slice()) -> 한 줄이면 된다..
        }
        for (let i = 0; i < n; i++) {
            // tmp[i] = 1;
            te.push(i+1);
            DFS(L+1, te);    
        }

       te.pop();
       return
    }
    
    DFS(0,  t);

  
    return answer;
}

// console.log(solution(4, 3));