// var sayHi = function (who) {
//   console.log(this.name);
//   return "Hi" + who;
// };

// var alien = {
//   name: "alien",
//   sayHi: function (who) {
//     console.log(this.name);
//     return "Hi" + who;
//   },
// };

// var a = alien.sayHi("you");
// var b = sayHi.apply(alien, ["me"]);
// sayHi();
// console.log(a, b);

function P() {
  this.a = "a";
}

function C(params) {
  this.b = "b";
  this.c = P.call(this);
}

let a = new C();
console.log(a);
