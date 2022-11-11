window.onload = function () {
    const bar = document.getElementById('bar');
    const menu = document.querySelector('.navbar__menu');
    const icons = document.querySelector('.navbar__icons');
    bar.addEventListener('click', () => barChanage(menu, icons), false);
}

function barChanage(m, r) {
    m.classList.toggle('active');
    r.classList.toggle('active');
}
