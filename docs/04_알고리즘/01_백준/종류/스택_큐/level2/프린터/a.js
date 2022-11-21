function solution(priorities, location) {
    var answer = 0;
    let arr = priorities;
    let chk = false;
    while (true) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[0] < arr[i]) {
                chk = true;
                let val = arr.splice(0, 1);
                arr.push(val[0]);

                if (location == 0) location = arr.length - 1;
                else {
                    location--;
                }
            }
            if (location == -1) return answer;
        }

        if (chk) {
            chk = false;
        } else {
            arr.splice(0, 1);
            answer++;
            if (location == -1) return answer;
        }
    }
}

console.log(solution([1, 1, 9, 1, 1, 1], 0));

// some과 shift()
// 다른 풀이1
function solution(priorities, location) {
    var list = priorities.map((t, i) => ({
        my: i === location,
        val: t
    }));
    var count = 0;
    while (true) {
        var cur = list.splice(0, 1)[0];
        if (list.some(t => t.val > cur.val)) {
            list.push(cur);
        }
        else {
            count++;
            if (cur.my) return count;
        }
    }
}


// 다른 풀이 2
function solution(priorities, location) {
    var arr = priorities.map((priority, index) => {
        return {
            index: index, priority: priority
        };
    });

    var queue = [];

    while (arr.length > 0) {
        var firstEle = arr.shift();
        var hasHighPriority = arr.some(ele => ele.priority > firstEle.priority);
        if (hasHighPriority) {
            arr.push(firstEle);
        } else {
            queue.push(firstEle);
        }
    }

    return queue.findIndex(queueEle => queueEle.index === location) + 1;
}