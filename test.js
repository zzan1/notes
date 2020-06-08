class SuperType {
	constructor() {
		this.name = 'tom',
		this.property = true;
	}
	getProperty() {
		return this.property;
	}
}



let SubType=function(){
	this.prototype=false,
	this.age=27
}

SubType.prototype = new SuperType()

// 父类的构造函数方法和原型方法全部被继承
let type1 = new SubType()
console.log(type1.getProperty());
console.log(type1.name)

// 子类的构造函数的属性也仍然存在
// 构造函数变为 superType 
console.log(type1.age, Object.getPrototypeOf(type1).constructor)


// true true 
console.log(type1 instanceof SubType, type1 instanceof SuperType)
//false true
console.log(SubType instanceof SuperType, SubType.prototype instanceof SuperType)

// true true true 

console.log(Object.prototype.isPrototypeOf(type1), SuperType.prototype.isPrototypeOf(type1), SubType.prototype.isPrototypeOf(type1))
