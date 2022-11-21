// 빈 배열 생성 
var infoArray = [];

// 빈 배열에 객체를 추가 
infoArray.push({ lang: 'javaScript', num1: 20, num2: 50 });
infoArray.push({ lang: 'SASS', num1: 100, num2: 70 });
infoArray.push({ lang: 'node', num1: 80, num2: 40 });
infoArray.push({ lang: 'LESS', num1: 10, num2: 80 });
infoArray.push({ lang: 'HTML', num1: 60, num2: 90 });

for (var key in infoArray) {
    // 배열 원소는 모두 객체(infoArray[key])이므로 
    // 객체에 sum 이라는 메소드를 추가한다. 
    infoArray[key].sum = function () {
        // this는 배열내 객체자신을 가리키고 있다. 
        return this.num1 + this.num2;
    };
    infoArray[key].average = function () {
        return this.sum() / 2;
    }
} var result = 'lang\t총점\t평균\n';

for (var prop in infoArray) {
    result += infoArray[prop].lang + '\t' + infoArray[prop].sum() + '\t' + infoArray[prop].average() + '\n';
}

// 다음의 코드는 위와 같습니다. 
/* for(var prop in infoArray) { with(infoArray[prop]) { 
    // with 를 통해 객체에 접근 
    result += 'lang' + '\t' + sum() + '\t' + average() + '\n'; } } */
console.log(result);

