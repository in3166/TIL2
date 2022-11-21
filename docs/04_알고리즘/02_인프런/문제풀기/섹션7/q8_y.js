// 화의실 배정: 가장 많은 회의를 할 수 있는 횟수 (시작시간 - 끝나는 시간)
function solution3(meeting){
    let answer=0;

    meeting.sort((a, b)=>{
     
        
    })

    console.log(meeting)


    return answer;
}


let arr3=[[1, 4], [2, 3], [3, 5], [4, 6], [5, 7]]; // 3  - (2, 3), (3, 5), (5, 7)
let arr4=[[3, 3], [1, 3], [2, 3]]; // 2
console.log(solution3(arr3));












function solution(meeting){
    let answer=0;
    meeting.sort((a, b)=>{
        if(a[0] !== b[0])
            return a[0] - b[0];
        else 
            return a[1] - b[1];
    })
    
    for (let j = 0; j < meeting.length-1; j++) {
        let chk = 0;
        let temp = [];
        temp.push(meeting[j]);
        chk++;
        for (let i = j+1; i < meeting.length; i++) {
            if(temp[temp.length-1][1] <= meeting[i][0]){
                    console.log( j,`meeting[${i}][0] ` +  meeting[i][0], meeting[i][1])
                    temp.push(meeting[i]);
                    chk++;
                }
        }
        chk > answer && (answer = chk);
    }

    
    return answer;
}

let arr=[[1, 4], [2, 3], [3, 5], [4, 6], [5, 7]]; // 3  - (2, 3), (3, 5), (5, 7)
let arr2=[[3, 3], [1, 3], [2, 3]]; // 2
console.log(solution(arr2));


// 끝나는 시간을 기준으로 하면 중첩 반복문을 사용하지 않고 가능!!!
function solution(meeting){
    let answer=0;
    meeting.sort((a, b)=>{
        if(a[0] !== b[0])
            return a[0] - b[0];
        else 
            return a[1] - b[1];
    })
    
    let et = 0;
    for (const x of meeting) {
        if(x[0] >= et){
            answer++;
            et = x[1];
        }
    }

    
    return answer;
}