function solution(skill, skill_trees) {
  var answer = 0;

  skill_trees.forEach((e, i) => {
    console.log("e: ", e);
    let tmp = e.split("");
    tmp = tmp.filter((a) => {
      return skill.includes(a);
    });
    console.log(tmp);

    let chk = true;

    for (let i = 0; i < skill.length; i++) {
      let tmpEl = tmp.shift();
      if (!tmpEl) break;
      if (skill[i] !== tmpEl) {
        chk = false;
        break;
      }
    }

    if (chk) answer++;
  });

  console.log(skill_trees);
  return answer;
}

// 2 0 3 / 0 1 3 / 2 3 - 1 / -1 0 1 /

// console.log(solution("CBD", ["BACDE", "CBADF", "AECB", "BDA"]));

// indexOf가 0이 아니면 처음부터 시작하는게 아님 !!
// 스킬트리안에는 존재하지만 처음부터 시작하지 않아서 불가능!

function solution2(skill, skill_trees) {
  const skills = skill.split("");
  console.log(skill.indexOf("CBD"));
  return skill_trees.filter((tree) => {
    // console.log(
    //   tree
    //     .split("")
    //     .filter((s) => skills.includes(s))
    //     .join("")
    // );
    return (
      skill.indexOf(
        tree
          .split("")
          .filter((s) => skills.includes(s))
          .join("")
      ) === 0
    );
  }).length;
}


function solution3(skill, skill_trees) {
  var answer = 0;
  var regex = new RegExp(`[^${skill}]`, "g"); // CBD가 아닌 것들

  console.log(skill_trees.map((x) => x.replace(regex, ""))); // ['BCD', 'CBD', 'CB', 'BD']

  return skill_trees
    .map((x) => x.replace(regex, ""))
    .filter((x) => {
      return skill.indexOf(x) === 0 || x === "";
    }).length;
}
console.log(solution3("CBD", ["BACDE", "CBADF", "AECB", "BDA"]));

ㅐ
function solution4(skill, skill_trees) {
  function isCorrect(n) {
    // const test = '[' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(v => !skill.includes(v)).join('') + ']*';
    let test = skill.split("");
    for (var i = 0; i < n.length; i++) {
      if (!skill.includes(n[i])) continue;
      if (n[i] === test.shift()) continue;
      return false;
    }
    return true;
  }

  return skill_trees.filter(isCorrect).length;
}
