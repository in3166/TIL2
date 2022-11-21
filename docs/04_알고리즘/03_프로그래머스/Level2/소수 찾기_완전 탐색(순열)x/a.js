// 만들 수 잇는 소수의 개수 => 1 , 7, 17, 71 // 17, 71 // , 1, 7, 11, 77 ,17, 71(중복순열) => 3가지 순열과 조합 다시 보기
function solution(numbers) {
  var answer = 0;
  let chk = Array.from({ length: numbers.length }, () => 0);
  let t = [];

  function DFS(L, te) {
    let newt = Object.assign([], te);
    let nettNum = Number(newt.join(""));
    if (newt.length > 0 && !t.includes(nettNum) && nettNum > 1) t.push(nettNum);
    if (L == numbers.length) {
      console.log(newt);
      if (!t.includes(nettNum) && nettNum > 1) t.push(nettNum);
      te.pop();
      return;
      // aswer.push(tmp.slice()) -> 한 줄이면 된다..
    }
    for (let i = 0; i < numbers.length; i++) {
      if (!chk[i]) {
        chk[i] = 1;
        te.push(numbers[i]);
        DFS(L + 1, te);
        chk[i] = 0;
      }
    }

    te.pop();
    return;
  }

  DFS(0, []);
  console.log(t);
  t = t.filter((e) => {
    let ck = true;
    console.log(e / 2, e % 2);
    for (let i = 2; i <= Math.sqrt(e); i++) {
      if (e % i === 0) ck = false;
    }
    return ck;
  });
  console.log(t);
  return t.length;
}

console.log(solution("17")); // 3
console.log(solution("011")); // 2
console.log(solution("00")); // 


//

function solution2(numbers) {
    var answer = 0;

    var n = numbers.split('');
    var nums = new Set()
    combi(n,'');

    function combi(a, s) {
        if (s.length > 0) {
            if (nums.has(Number(s))=== false) {
                nums.add(Number(s));
            console.log(Number(s))
                if (chkPrime(Number(s))) {

                    answer++;
                }
            }
        }
        if (a.length > 0) {
            for (var i = 0; i< a.length; i++) {
                var t = a.slice(0)
                t.splice(i,1);
                //console.log(t)
                combi(t,s + a[i]);
            }
        }
    }

    function chkPrime(num) {
        if (num < 2) return false;
        if (num === 2) return true;
        for (var i = 2; i <= Math.sqrt(num); i++) {
            if (num%i===0) return false;
        }
        return true;
    }

    return answer;
}