function solution(N, stages) {
    var answer = [];
    var chk = new Array(N).fill(0);
    var all = new Array(N).fill(0);

    stages.forEach(element => {
        if (element <= N) {
            chk[element - 1]++;
            for (let i = 0; i < element; i++) {
                all[i]++;
            }
        } else {
            for (let i = 0; i < N; i++) {
                all[i]++;
            }
        }
    });


    for (let i = 0; i < all.length; i++) {
        let val = chk[i] / all[i];
        answer[i] = val;
    }
    var indices = [...answer.keys()].sort((a, b) => answer[b] - answer[a]);
    indices = indices.map((a) => a + 1);
    console.log(indices); // [1, 0, 2, 4, 5, 3]
    return indices;
}

console.log(solution(4, [4, 4, 4, 4, 4]))

// 다른 풀이
function solution(N, stages) {
    let ans = []

    for (let i = 1; i <= N; ++i) {
        let usersReachedCurrentStage = stages.reduce((acc, curStage) => acc + ((curStage >= i) ? 1 : 0), 0)
        let usersStagnatedCurrentStage = stages.reduce((acc, curStage) => acc + ((curStage == i) ? 1 : 0), 0)
        if (usersReachedCurrentStage === 0) {
            ans.push({ 'stage': i, 'failRate': 0 })
            continue
        }

        ans.push({ 'stage': i, 'failRate': (usersStagnatedCurrentStage / usersReachedCurrentStage) })
    }

    return ans.sort((a, b) => {
        if (a.failRate > b.failRate) return -1
        if (a.failRate < b.failRate) return 1
        return a.stage - b.stage
    }).map(entry => entry.stage)
}