function solution(nums) {
    var answer = 0;
    var len = nums.length / 2;
    console.log(len);
    var a = [];
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        var check = 1;
        for (let j = 0; j < a.length; j++) {
            const element = a[j];
            if (a[j] === nums[index]) check = 0;
        }
        if (check) a.push(element);

    }
    //console.log(a)
    return len > a.length ? a.length : len;
}

console.log(solution([3, 1, 2, 3]));

// 다른 풀이: set 사용
function solution(nums) {
    const noDuplicatePokemon = new Set(nums);
    const pokemonVarietyCount = noDuplicatePokemon.size;
    const pokemonCounts = nums.length;
    return pokemonVarietyCount > pokemonCounts / 2 ? pokemonCounts / 2 : pokemonVarietyCount;
}

// 다른 풀이: reduce 사용
function solution(nums) {
    let answer = 0;
    const select = nums.length / 2;
    const check = nums.reduce((total, cur) => {
        total[cur] ? total[cur]++ : total[cur] = 1;
        return total;
    }, {});
    const checkLeng = Object.keys(check).length;
    return checkLeng > select ? select : checkLeng;
}
