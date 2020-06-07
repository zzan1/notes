function object(base) {
	function NewObj() {}
	NewObj.prototype = base;
	return new NewObj();
}
function SuperType() {
	this.name = "yi";
}
SuperType.prototype.sayName = function() {
	console.log(this.name);
};

function SubType() {
	this.edition = "23";
}

SubType.prototype = object(SuperType.prototype)
console.log(
	Object.getOwnPropertyNames(SubType.prototype),
	SubType.prototype.constructor
);
//[] [Function: SuperType]
let book4 = new SubType();
console.log(Object.getOwnPropertyNames(book4));
//[ 'name', 'edition' ]
console.log(book4 instanceof SubType, book4 instanceof SuperType)
// true true
console.log(SubType.prototype.isPrototypeOf(book4), SuperType.prototype.isPrototypeOf(book4))
// true true


