<<<<<<< HEAD
function inheritPrototype(SubType, SuperType) {
	let MediaObj = function() {};
	// 取消掉 SuperType 的构造函数, 只复制原型
	MediaObj.prototype = SuperType.prototype;
	SubType.prototype = new MediaObj();
}

function SuperType(name, list) {
	this.name = name;
	this.list = list;
}
SuperType.prototype.sayName = function() {
	console.log(this.name);
};
function SubType(age, name, list) {
	this.age = age;
	// 实现传参 实现 不同的引用类型u值内存地址
	SuperType.call(this, name, list);
}
inheritPrototype(SubType, SuperType);
