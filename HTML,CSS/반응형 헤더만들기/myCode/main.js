window.onload = function () {
    const bar = document.getElementById('bar');
    bar.addEventListener('click', barChanage, false);
    window.addEventListener("resize", setWindow, false);
}

function barChanage() {
    const m = document.getElementById('mid');
    const r = document.getElementById('right');
    if (m.classList.contains('non-hide')) {

        m.classList.remove('non-hide');
        m.classList.add('hide');
        m.style.display = "none";
        r.style.display = "none";
    } else {
        m.classList.add('non-hide');
        m.classList.remove('hide');
        m.style.display = "inline-block";
        r.style.display = "inline-block";
    }
}

function setWindow() {
    let windowWidth = window.innerWidth;
    if (windowWidth >= 780) {
        const m = document.getElementById('mid');
        const r = document.getElementById('right');
        if (m.classList.contains('non-hide')) {
            m.classList.remove('non-hide');
            m.classList.add('hide');
            m.style.display = "none";
            r.style.display = "none";
        } else {
            m.classList.add('non-hide');
            m.classList.remove('hide');
            m.style.display = "inline-block";
            r.style.display = "inline-block";
        }
    }
}