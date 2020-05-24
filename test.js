function sum(num1, num2){
	return num2 +  num1;
}

var o={
	"num3":3,
	"num4":4
}
function callSum(num1, num2){
	num3=3;
	num5=5;
	console.log(sum.apply(o, [num3, num4]));
}
callSum(1,2)
