// var obj = {};
// console.log(obj.prototype);

// function get(prams) {
//   var name = "i";
//   this.getName = function () {
//     return this.name;
//   };
// }

// console.log(get.length);
// console.log(get.prototype);

// get.prototype = (function () {
//   var b = "b";
//   return {
//     getB: function () {
//       return b;
//     },
//   };
// })();

// console.log(get.length);
// console.log(get.prototype);

// get.length = 2;
// console.log(get.length);

function Sale(price) {
  this.price = price || 0;
}

Sale.prototype.getPrice = function () {
  return this.price;
}

Sale.decorators = {};
Sale.decorators.fedtax = {
  getPrice: function() {
    var price = this.uber.getPrice();
    price += price * 7.5 / 100;
    return price;
  }
}

// 임시 생성자 패턴
Sale.prototype.decorate = function(decorator) {
  var F = function(){},
      overrides = this.constructor.decorators[decorator],
      i, newobj;
  F.prototype = this;
  newobj = new F();
  newobj.uber = F.prototype; // 자식 객체가 부모 객체에 접근할 수 있도록
  for (i in overrides) {
    if(overrides.hasOwnProperty(i)) {
      newobj[i] = overrides[i];
    }
  }
  return newobj;
}

var sale = new Sale(100);
// decorate 메서드를 부르고 덮어쓴다.
sale = sale.decorate('fedtax');
console.log(Sale.decorators)
console.log(Sale.prototype)
console.log(Sale.constructor)
console.log(sale.decorators)
