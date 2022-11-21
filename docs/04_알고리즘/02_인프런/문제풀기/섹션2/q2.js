// 보이는 학생: 맨 앞에서 볼 수 있는 학생의 수
function solution(arr){         
    let answer=1, max=arr[0];
    for (let i = 1; i < arr.length; i++) {
        const element = arr[i];
        if(element>max){
            max = element
            answer++;
        }
    }
    return answer;
}

let arr=[130, 135, 148, 140, 145, 150, 150, 153];
console.log(solution(arr));