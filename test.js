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
