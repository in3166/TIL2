var arr = [1, 2, 3, 0, 4, 5, 6, "te"];
var re = arr.filter((value, index, array) => {
    return value;
})

console.log(re)
arr.reduce((init, current, currentIndex, array) => {
    console.log(init)
    console.log(current)
    console.log(currentIndex)
    console.log(array)
    return 0;
}, arr[0])


const f = ['apple', 'banana', 'orange'];
f.reduce((object, current) => {
    //console.log(object)
    //console.log(current)
    console.log(f[current])

    //  console.log(currentIndex)
    //  console.log(array)
}, {})


console.log(f['apple'])
