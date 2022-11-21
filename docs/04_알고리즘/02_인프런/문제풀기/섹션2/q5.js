// 등수 구하기: 학생의 등수를 입력된 순서대로 출력
function solution(arr){  
    let n=arr.length;
    let answer = Array.from({length:n}, ()=>1); // 1로 초기화
    let newArr = Object.assign([], arr);
    newArr.sort((a,b)=>(b-a));
    console.log(newArr)

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < newArr.length; j++) {
            if(arr[i] === newArr[j]){
                console.log(arr[i], newArr[j])
                answer.push(j+1);
                newArr[j]=101;
                break;
            }
        }
    }

    return answer;
}

let arr=[92, 92, 92, 100, 76];
console.log(solution(arr));

// newArr을 안만들고 arr 하나 가지고 자기자신과 비교 차례로..  자기 보다 큰게 나오면 .. ++
//if(arr[j]>arr[i]) answer[i]++;