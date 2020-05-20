var color=[1,2,3,4,5];
var base=10;

var sum=color.reduce((pre, cur)=>{
	return pre+cur;
}, base)
console.log(sum);
//[ 'blue', 'red', 'yellow' ] blue-red-yellow
