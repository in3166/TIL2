// 부분집합 구하기(멱집합): N이 주어지면 1부터 N까지의 원소를 갖는 집합의 부분집합을 모두 출력


function solution3(n){
    let answer=[];

    let chk = Array.from({length: n+1}, () => 0);
    let i = 0;
    function DFS(L){
        if(L === n) {
            i++;
            console.log(chk)
            return;
        }
        

        chk[L] = 1;
        DFS(L+1);
        chk[L] = 0;
        DFS(L+1);


    }
console.log(i)
    DFS(0);
    return answer;
}





console.log(solution3(3));
//3 -> 7









// 원소별로 0, 1 선택한 것과 안한것을 구별하고, depth를 통해 재귀 dfs
// 전 문제와 비슷하게 이진 트리에서 0,1
function solution(n){
    let answer=[];

    let ch=Array.from({ length: n }, () => 0); // 유사 배열 객체, 이터러블 객체를  array 객체로 얕은 복사
   // console.log(ch)
    function DFS(L){
        if(L >= n) {
            for (const x of ch) {
                if(x) {
                   console.log(ch)
                   answer++;
                   break;
               }
            }
            return;
        }
        ch[L] = 1;
        DFS(L+1);
        
        ch[L] = 0;
        DFS(L+1);

    }
    DFS(0);
    return answer;
}

//console.log(solution(6));


function solution2(n){
    let answer=[];

    let ch=Array.from({ length: n+1 }, () => 0); // 유사 배열 객체, 이터러블 객체를  array 객체로 얕은 복사
   // console.log(ch)
    function DFS(L){
        if(L >= n+1) {
            let tmp = "";
            for (let i = 0; i <= n; i++) {
                if(ch[i] === 1) {
                    tmp += i+ " ";
                }
            }
            
            tmp.length>0 && answer.push(tmp.trim());
            //return;
        }else{
            ch[L] = 1;
            DFS(L+1);
            
            ch[L] = 0;
            DFS(L+1);
        }
    }
    DFS(1);
    return answer;
}

//console.log(solution2(3));