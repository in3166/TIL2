// 가위 바위 보
function solution(a, b){         
    let answer="";
   for (let i = 0; i < a.length; i++) {
       let aq = a[i], bq = b[i];
       if(aq-bq===0){
        answer += "D";
        continue
        }
        switch(aq){
            case 1:
                if(bq ===2) answer+="B" 
                else answer +="A"
                break;
            case 2:
                if(bq ===1) answer+="A" 
                else answer +="B"
                break;
            case 3:
                if(bq ===2) answer+="A" 
                else answer +="B"
                break;
        }
   }
    
    return answer;
}

let a=[2, 3, 3, 1, 3];
let b=[1, 1, 2, 2, 3];
console.log(solution(a, b));