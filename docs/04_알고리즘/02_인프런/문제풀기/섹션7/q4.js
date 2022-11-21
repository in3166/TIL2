// 삽입 정렬
function solution(arr) {
  let answer = arr;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      for (let j = 0; j < i; j++) {
        if (arr[j] > arr[i]) {
          let temp = arr[i];
          arr.splice(i, 1);
          arr.splice(j, 0, temp);
        }
      }
    }
  }
  return answer;
}

let arr = [11, 7, 5, 6, 10, 9];
console.log(solution(arr));

// 다른 풀이
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let cur = array[i];
    let left = i - 1;
    while (left >= 0 && array[left] > cur) {
      array[left + 1] = array[left];
      array[left] = cur;
      cur = array[left];
      left--;
    }
  }
  return array;
}

// 다른 풀이 개선
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let cur = array[i];
    let left = i - 1;
    while (left >= 0 && array[left] > cur) {
      array[left + 1] = array[left];
      left--;
    }
    array[left + 1] = cur;
  }
  return array;
}

// 정답

function sol(arr) {
  let answer = arr;
  for (let i = 0; i < arr.length; i++) {
    let element = array[i];
    for (var j = i-1; j >= 0; j--) {
      const element = array[j];
      if(arr[j]>element) arr[j+1] = arr[j];
      else break;
    }
    arr[j+1] = element;
  }
  return answer;
}
