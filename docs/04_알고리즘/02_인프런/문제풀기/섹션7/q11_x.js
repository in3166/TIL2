// 뮤직비디오
function count2(songs, capacity){

}


// m: DVD 개수, 모든 곡을 순서대로 DVD들에 담아야 하는데 DVD의 녹화 길이 최소 구하기 (DVD 용량은 모두 동일해야 한다.)
// 기냥 나눠서 하면안되고 ++1 --1 해야 모든 경우의 수를 알 수 있다.
function solution2(m, songs){
    let answer;
    

    return answer;
}

let arr3=[1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(solution2(3, arr3));



















// 결정 알고리즘: 이분 탐색 기반
// tip: 가장 긴 길이와 가장 짧은 길이를 가지고 중간값을 정해 1씩 증가하거나 감소하는데 cnt가 요청한 개수이면 return?
function count(songs, capacity){
    let cnt=1, sum=0, arr=[];
    songs.forEach((element,i) => {
        if(sum+element <= capacity){
            sum += element;
        }else{
            arr.push(sum)
            //console.log("sum: ",sum)
            cnt++;
            sum=0;
            sum+=element;
        }
        if(i===songs.length-1) arr.push(sum);
    });
    console.log(Math.max(...arr))
    let sum2 = Math.max(...arr)
    return {cnt, sum2};
}

// m: DVD 개수, 모든 곡을 순서대로 DVD들에 담아야 하는데 DVD의 녹화 길이 최소 구하기 (DVD 용량은 모두 동일해야 한다.)
function solution(m, songs){
    let answer;
    // 최소합
    // 여기서 정렬하면 안됨 -> 순서 유지
    // max 값을 찾아서 해야함
   // songs.sort();
    let min = Math.max(...songs);// 1, 2, 3 ... 중 최대 값이 최소
    let max = songs.reduce((acc, n) => acc + n, 0);

    while (min <= max) {
        let mid = Math.floor((min+max)/2);

        let {cnt, sum2} = count(songs, mid);
        console.log("cnt: ", cnt)
     
        if(cnt <= m){
            answer = mid;
            max = mid-1;
        }
        // else if(cnt > m){
        //     min = mid;
        // }
        else{
           min = mid+1;
        }
    }
    return answer;
}

let arr=[1, 2, 3, 4, 5, 6, 7, 8, 9];
//console.log(solution(3, arr));