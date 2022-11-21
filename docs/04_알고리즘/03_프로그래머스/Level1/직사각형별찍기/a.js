process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
    const n = data.split(" ");
    const a = Number(n[0]), b = Number(n[1]);
    console.log(a);
    console.log(b);
    let s = ''
    for (let index = 0; index < b; index++) {
        for (let i = 0; i < a; i++) {
            s += '*';
        }
        console.log(s)
        s = '';
    }
});