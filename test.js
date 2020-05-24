function sum(num2, num1){
	console.log(this.num1, num2);
	return num2 +  this.num1;
}
var o={
	num1:3
}
var num2=5;
var oSum = sum.bind(o);

console.log(oSum(num2));
console.log(sum.apply(o, [num2]));
console.log(sum.call(o, num2));
