// 완전 탐색 (블루투포스)
// 졸업선물
function solution(m, product){
    let answer=0;
    product.sort((a,b) => {
        return (a[0]+a[1]) -(b[0]+b[1])
    })
    console.log(product)

    for (const i of product) {
        console.log(m) // 예산
        if(m- (i[0]+i[1]) >= 0){
            console.log("1: ", i)
            m -= (i[0]+i[1])
            answer++;
        }else if(m -( ((i[0])/2) +i[1]) >=0 ){
            console.log("2: ", i)
            m -= ( ((i[0])/2) +i[1] >=0 )
            answer++;
        }else{
            m
        }
    }
    return answer;
}

let arr=[[6, 6], [2, 2], [4, 3], [4, 5], [10, 3]];
//console.log(solution(28, arr)); // 예산, [상품가격, 배송비]

// 반례 [ [ 2, 2 ], [ 4, 3 ], [ 4, 5 ], [ 12, 1 ], [ 8, 6 ] ]
//  8 6을 사고 12 1을 할인받아 5개 다 살 수 있음.
let arr2=[[8, 6], [2, 2], [4, 3], [4, 5], [12, 1]];
console.log(sol(41, arr2)); // 예산, [상품가격, 배송비]

// 각각의 삼품이 할인받을 경우를 모두! 탐색하기
function sol(m, p) {
    let answer = 0;
    n = p.length;
    p.sort((a, b)=>((a[0]+a[1]) - (b[0]+b[1])));
    console.log(p);
    let res = [];

    for (let i = 0; i < n; i++) {
        let sum = m;
        const arr = p.map(v => v.slice());

        arr[i][0] /= 2;
        //console.log(p)
        console.log(arr)
        let cnt = 0;

        for (let j = 0; j < arr.length; j++) {
            const element = arr[j][0]+arr[j][1];
            console.log(element)
            if(sum - element <0) { res.push(cnt); break;}
            else if(sum - element === 0) { res.push(++cnt); break;}
            else {sum -= element; cnt++; console.log("s: ",sum)}
        }
    }
    res.sort().reverse();
    return res[0];
}