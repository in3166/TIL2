var someone = {
    name: 'co',
    who: function () {
        console.log(this);
    }
};

var ad = (someone) => {
    someone.who();
}

ad(someone);