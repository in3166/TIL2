function solution(a, b) {
    var answer = '';
    var month = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var days = 0;
    for (let index = 0; index < a - 1; index++) {
        days += month[index];
    }
    days += b;
    console.log(days)
    var na = days % 7;

    switch (na) {
        case 1:
            answer = "FRI";
            break;
        case 2:
            answer = "SAT";
            break;
        case 3:
            answer = "SUN";
            break;
        case 4:
            answer = "MON";
            break;
        case 5:
            answer = "TUE";
            break;
        case 6:
            answer = "WED";
            break;
        case 0:
            answer = "THU";
            break;

        default:
            break;
    }
    return answer;
}
console.log(solution(1, 2));

// 다른 풀이

function getDayName(a, b) {
    var dayList = ['FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU'];
    var monthArr = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var daySum;
    if (a < 2) {
        daySum = b - 1;
    } else {
        daySum = monthArr.slice(0, a - 1).reduce((a, b) => a + b) + b - 1;
    }
    return dayList[daySum % 7];
}


// date 메서드
function getDayName(a, b) {
    var date = new Date(2016, (a - 1), b);
    return date.toString().slice(0, 3).toUpperCase();
}

// date
function getDayName(a, b) {
    var arr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var date = new Date(`2016-${a}-${b}`);
    var day = date.getDay()
    return arr[day];
}

//아래 코드는 테스트를 위한 코드입니다.
console.log(getDayName(5, 24));