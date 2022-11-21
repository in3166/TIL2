function solution(n, arr1, arr2) {
    var answer = [];
    var s1 = [];
    var s2 = [];

    arr1.forEach(element => {
        s1.push(two(element, n));
    });
    arr2.forEach(element => {
        s2.push(two(element, n));
    });
    console.log(s1)
    console.log(s2)

    for (let i = 0; i < n; i++) {
        var tmp = '';
        for (let j = 0; j < n; j++) {
            if (s1[i][j] === 1 || s2[i][j] === 1) {
                tmp += '#';
            } else {
                tmp += ' ';
            }
        }
        answer.push(tmp);
    }

    return answer;
}

function two(params, n) {
    var num = params;
    var na = 0;
    var moc = [];
    do {
        na = num % 2;
        moc.push(na);
        num = Math.floor(num / 2);
    } while (num != 0);
    if (moc.length !== n) {
        console.log('moc.lenb: ', moc.length, ' n: ', n - moc.length)
        let len = moc.length;
        for (let i = 0; i < n - len; i++) {
            moc.push(0)
            console.log(i, n - moc.length)
        }
    }
    moc.reverse();
    return moc;
}
console.log(solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28]));

// 다른 풀이
var solution = (n, a, b) => a.map((a, i) => (a | b[i]).toString(2).padStart(n, 0).replace(/0/g, ' ').replace(/1/g, '#'))

// 다른 풀이2
function solution(n, arr1, arr2) {
    return arr1.map((v, i) => addZero(n, (v | arr2[i]).toString(2)).replace(/1|0/g, a => +a ? '#' : ' '));
}

const addZero = (n, s) => {
    return '0'.repeat(n - s.length) + s;
}

//다른 풀이3 TDD
const solution = (n, arr1, arr2) => {
    const binaryStringArray1 = decimalToBinary(arr1, n);
    const binaryStringArray2 = decimalToBinary(arr2, n);
    const map1 = binaryStringArray1.map(splitToNumbers)
    const map2 = binaryStringArray2.map(splitToNumbers)
    const combinedMap = sumArray(map1, map2);

    return numberToSharpAndEmpty(combinedMap).map(v => v.join(''));
}

const numberToSharpAndEmpty = (arr) => {
    return arr.map((v1, i1) => {
        return v1.map((v2, i2) => {
            return (v2 === 0) ? ' ' : '#';
        }
        )
    })

    console.log(x)
};


const sumArray = (arr1, arr2) => arr1.map((v1, i1) => v1.map((v2, i2) => v2 + arr2[i1][i2]));

const decimalToBinary = (array, n) => array.map(item => item.toString(2).padStart(n, '0'));

const splitToNumbers = (str) => str.split('').map(e => Number(e));



// No 내장 함수
function solution(n, arr1, arr2) {
    let num1, num2, s;
    let answer = [];
    //manually turning decimals to binaries cos i can!
    for (let i = 0; i < n; i++) {
        num1 = arr1[i];
        num2 = arr2[i];
        s = '';
        for (let j = 0; j < n; j++) {
            s = (num1 % 2 + num2 % 2) ? '#' + s : ' ' + s;
            num1 = Math.floor(num1 / 2);
            num2 = Math.floor(num2 / 2);
        }
        answer.push(s);
    }
    return answer;
}