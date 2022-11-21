function solution(board, moves) {
    var answer = 0;
    var pick = [];
    moves.forEach(element => {
        console.log('e', element)
        for (let index = 0; index <= board.length - 1; index++) {
            const num = board[index][element - 1];
            if (num != 0) {
                console.log('move: ', element, " / num: ", num);
                pick.push(num);
                if (pick[pick.length - 1] == pick[pick.length - 2] && pick.length - 2 != null) {
                    console.log('come: ', pick[pick.length - 1], " / ", pick[pick.length - 2]);
                    answer++;
                    pick.pop();
                    pick.pop();
                }
                board[index][element - 1] = 0;
                break;
            }
        }
    });
    console.log(answer * 2)
    return answer * 2;
}
solution([[0, 0, 0, 0, 0], [0, 0, 1, 0, 3], [0, 2, 5, 0, 1], [4, 2, 4, 4, 2], [3, 5, 1, 3, 1]], [1, 5, 3, 5, 1, 2, 1, 4]);



// 다른 사람 풀이
const transpose = matrix =>
    matrix.reduce(
        (result, row) => row.map((_, i) => [...(result[i] || []), row[i]]),
        []
    );

const solution = (board, moves) => {
    const stacks = transpose(board).map(row =>
        row.reverse().filter(el => el !== 0)
    );
    const basket = [];
    let result = 0;

    for (const move of moves) {
        const pop = stacks[move - 1].pop();
        if (!pop) continue;
        if (pop === basket[basket.length - 1]) {
            basket.pop();
            result += 2;
            continue;
        }
        basket.push(pop);
    }

    return result;
};