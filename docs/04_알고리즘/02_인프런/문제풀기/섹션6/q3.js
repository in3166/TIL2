// 크레인 인형 뽑기: 카카오 4
function solution(board, moves){
    let answer=0;
    let stack = [];
    for (let i = 0; i < moves.length; i++) {
        let j =0;
        while (j<board.length) {
            let num = board[j][moves[i]-1];
            if(num) {
                board[j][moves[i]-1] = 0;
                let temp;
                stack.length && (temp = stack.pop());
                if(temp === num) answer += 2;
                else{
                    temp && stack.push(temp);
                    stack.push(num);
                }
                break;
            }
            j++;
            
        }
    }              
    return answer;
}

let a=[[0,0,0,0,0],
       [0,0,1,0,3],
       [0,2,5,0,1],
       [4,2,4,4,2],
       [3,5,1,3,1]];
4311324
let b=[1, 5, 3, 5, 1, 2, 1, 4];
console.log(solution(a, b));