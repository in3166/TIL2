function solution(s){  
    let answer;

    if(s.length%2 ===0){
        answer = s.slice(Math.floor(s.length/2)-1, Math.floor(s.length/2)+1)
    }else{
        answer = s.slice(Math.floor(s.length/2), Math.floor(s.length/2)+1)
    }
    return answer;
}
console.log(solution("stud"));



/*
* slice (시작인덱스, 종료인덱스?) : 기존 배열은 변하지 않고, 잘려진 배열을 반환 (배열, String) // ? null일 수 있음

* splice (시작인덱스, 삭제 갯수?, 추가할 문자) : 문자를 삭제한 후 추가할 수 있다, 기존 배열 변하고, 잘려진 배열 반환 // ? null일 수 있음

* split(정규식 | 구분문자 , 제한?) : 구분문자를 기준으로 잘라서 배열을 만든후 배열을 반환 (기존 String 유지) // ? null일 수 있음

* substring(시작인덱스, 종료인덱스) : 시작인덱스부터 종료인덱스 전까지 잘라서 반환 (기존 String 유지)

* substr(시작인덱스, 길이) : 시작인덱스부터의 길이를 잘라서 반환 (기존 String 유지)
*/