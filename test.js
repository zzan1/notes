<<<<<<< HEAD
const numbers=[1,2,3,4,5]

let max=Math.max.apply(Math, numbers)

// console.log(Math.random()*9 + 10)

const IF=false;

const IFObj=new Boolean(false)

const number = 100.12;

//console.log(number.toString(), number.toLocaleString(), number.valueOf())
// console.log(number.toString(2), number.toString(16))
// console.log(number.toFixed(1), number.toExponential(1), number.toPrecision(1))
//
const strT = "this我"
console.log(strT.length)
console.log(strT.charAt(4), strT.charCodeAt(4))
const strT2="+12bulue"
console.log(parseInt(strT2))
=======
function Book(){}

Book.prototype.name="Tom"

book1= new Book()

Book.prototype = {
	constructor: Book,
	name:"Wang",
	sayName:function(){
		return this.name
	}
}

book2 = new Book()

//book1.sayName()
book2.sayName()
>>>>>>> e947b10c9d6d69d8d22e8de6f176c5f7acf18ba2
