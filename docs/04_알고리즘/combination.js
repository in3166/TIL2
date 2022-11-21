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

const example = [1, 2, 3, 4];
const result = getCombinations(example, 3);
console.log(result);

// 재귀2
function getCombination(arr, r) {
    var tmp = [];
    var ans = [];
    // 조합 중 하나가 완성된 경우.
    if (tmp.length === r) {
        ans.push(tmp);
        return ans;
    }
    // 마지막으로 사용한 요소의 다음 것 부터 사용한다.
    const lastIndex = tmp.length === 0 ? -1 : tmp[tmp.length - 1];
    for (let i = lastIndex + 1; i < arr.length; i++) {
        tmp.push(arr[i]);
        getCombination(arr, r, tmp, ans);
        tmp.pop();
    }
    return ans;
}
//
// [1, 2, 3, 4] 에서 3개를 선택.
const combination = getCombination([3, 43, 4, 9], 3);
console.log(combination)
// 단순한 for문
const arr = [1, 2, 3, 4, 5, 6]
const ans = []; // 조합이 저장될 배열
for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
        for (let k = j + 1; k < arr.length; k++) {
            ans.push([arr[i], arr[j], arr[k]]);
        }
    }
}

console.log(ans)