// 단순 for문
// function solution(nums) {
//     var answer = 0;
//     var ans = [];

//     for (let i = 0; i < nums.length; i++) {
//         for (let j = i + 1; j < nums.length; j++) {
//             for (let k = j + 1; k < nums.length; k++) {
//                 ans.push(nums[i] + nums[j] + nums[k])
//             }
//         }
//     }
//     ans.forEach((e) => {
//         var t = true;
//         for (let i = 2; i * i <= e; i++) {
//             if (e % i === 0) t = false;
//         }
//         if (t) answer++;
//     })
//     console.log(ans)
//     return answer;
// }

//console.log(solution([1, 2, 7, 6, 4]));

// 재귀 함수
function solution(nums, sel) {
    var answer = 0;
    var result = [];

    if (sel === 1) return nums.map((val) => [val]);

    nums.forEach((fix, index, origin) => {
        // origin.shift();
        // console.log('origin', origin) // 쉬프트로 하면 하나 남았을때는 빈배열이 아니라 하나남은 요소를 유지해서 중복됨
        const rest = origin.slice(index + 1);
        console.log('rest', rest)
        let combination = solution2(rest, sel - 1);
        console.log('com ', combination)
        let ans = combination.map((val) => [fix, ...val])
        console.log('ans: ', ans)
        result.push(...ans); // ... 이 없으면 2차원 배열이됨, 배열의 요소들을 넣는게 아니라 배열 자체를 배열 안에 넣게됨!
        console.log('result: ', result)
    })


    console.log(result)
    return result;
}


const getCombinations = function (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((value) => [value]); // 1개씩 택할 때, 바로 모든 배열의 원소 return

    arr.forEach((fixed, index, origin) => {
        console.log('fixed: ', fixed)
        const rest = origin.slice(index + 1); // 해당하는 fixed를 제외한 나머지 뒤
        console.log('rest: ', rest)
        const combinations = getCombinations(rest, selectNumber - 1); // 나머지에 대해서 조합을 구한다.
        console.log('com: ', combinations)
        const attached = combinations.map((combination) => [fixed, ...combination]); //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
        console.log('att: ', attached)
        results.push(...attached); // 배열 spread syntax 로 모두다 push
    });

    return results; // 결과 담긴 results return
}

console.log(solution2([1, 2, 3, 4], 3));