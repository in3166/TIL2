const fetch = require('node-fetch');

const API_ENDPOINT =
    "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
    fetchCats: async keyword => {
        try {
            const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
            //res = res.JSON();
            return res.json();
        } catch (error) {
            return error
        }
    },
};
let a = "고양이";
a = encodeURI(a)

async function a1() {
    var cats;
    cats = await api.fetchCats(a);
    console.log(cats);
}

a1();