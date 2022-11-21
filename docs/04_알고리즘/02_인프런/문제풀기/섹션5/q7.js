// 아나그램: 알파벳 나열 순서는 다르지만 구성은 같은 단어
function solution(str1, str2){
    let answer="YES"; 
    let map1 = new Map();
    let map2 = new Map();
    
    for (let i = 0; i < str1.length; i++) {
        const e = str1[i];
        const e2 = str2[i];
        if(map1.has(e)){
            let val1 = map1.get(e);
            map1.set(e, ++val1);
        }else{
            map1.set(e, 0);
        }
        
        if(map2.has(e2)){
            let val2 = map2.get(e2);
            map2.set(e2, ++val2);
            
        }else{
            map2.set(e2, 0);
        }
    }

    map1.forEach((val, key) => {
        if(val !== map2.get(key)) answer = 'No';
    })

    return answer;
}

let a="AbaAeCe";
let b="baeeACA";
console.log(solution(a, b));

// 다른 풀이 map 하나로 풀기
function solution2(str1, str2) {
    let answer = "YES";
    let sH = new Map();
    for (const x of str1) {
        if(sH.has(x)) sH.set(x, sH.get(x)+1);
        else sH.set(x,1);
    }
    for (const x of str2) {
        if(!sH.has(x) || sH.get(x) === 0) return "NO"; // 2번째 조건
        sH.set(x, sH.get(x)-1);
    }
}