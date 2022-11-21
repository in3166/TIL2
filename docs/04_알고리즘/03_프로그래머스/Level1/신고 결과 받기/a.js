function solution(id_list, report, k) {
  var answer = [];
  var ex = new Map();
  var email = new Map();

  // set을 사용 하기 !!
  var initReport = new Set();
  for (let i = 0; i < report.length; i++) {
    const element = report[i];
    initReport.add(element);
  }

  for (let i = 0; i < id_list.length; i++) {
    const element = id_list[i];
    email.set(element, 0);
  }

  console.log(initReport);

  for (const item of initReport) {
    const element = item.split(" ")[1];
    if (ex.has(element)) ex.set(element, ex.get(element) + 1);
    else ex.set(element, 1);
  }

  console.log(ex);
  for (const item of initReport) {
    const to = item.split(" ")[0];
    const from = item.split(" ")[1];
    if (ex.get(from) >= k) {
      email.set(to, email.get(to) + 1);
    }
  }

  // map values to array !!
  answer = Array.from(email.values());

  return answer;
}

console.log(
  solution2(
    ["muzi", "frodo", "apeach", "neo"],
    ["muzi frodo", "apeach frodo", "frodo neo", "muzi neo", "apeach muzi"],
    2
  )
);

// console.log(
//   solution(
//     ["con", "ryan"],
//     ["ryan con", "ryan con", "ryan con", "ryan con"],
//     2
//   )
// );

// 다른 풀이
function solution2(id_list, report, k) {
  let reports = [...new Set(report)].map((a) => {
    return a.split(" ");
  });
  console.log(reports); // 2차원 배열
  let counts = new Map();
  for (const bad of reports) {
    counts.set(bad[1], counts.get(bad[1]) + 1 || 1); // ||로 사용 !!
  }
  let good = new Map();
  for (const report of reports) {
    if (counts.get(report[1]) >= k) {
      good.set(report[0], good.get(report[0]) + 1 || 1);
    }
  }
  let answer = id_list.map((a) => good.get(a) || 0);
  return answer;
}
