"use strict";

/*

    ES2015의 template literal( 백틱, ``) 에 대해서 알아본다.

*/
var str1 = '안녕하세요';
var str2 = '반갑습니다';
var greeting = "".concat(str1, ", ").concat(str2);
console.log(greeting);
var product = {
  name: '도서',
  price: '4200원'
};
var message = "\n\uC81C\uD488 ".concat(product.name, "\uC758 \uAC00\uACA9\uC740 ").concat(product.price, " \uC785\uB2C8\uB2E4.\nend\n");
console.log(message);