# 主要介绍一些高级的, 难以理解的 javascript 语法. 

## 面向对象的程序设计

对象的定义为: **无序属性的集合, 其属性可以包含基本值, 对象或者函数.** 

### 特性
ECMA-262 第 5 版定义了只有内部使用的**特性**, 用来描述属性的各种特征. 这些特性是为了实现 JavaScript 引擎用的, 不能直接访问他们.

#### 特性

主要包括两种属性: **数据属性和访问器属性**.

- 数据属性

	数据属性是指值为数据值的属性, 可以在这个位置读取和写入数值. 有四个特性:

	- `[[Configurable]]`: 表示能否通过 delete 删除属性从而重新定义属性, 总之能否变更这个属性. 默认为 true;
	- `[[Enumerable]]`: 能否迭代, 使用 `for - in `循环返回这个属性;
	- `[[Writable]]`: 能否修改值, 区别 `[[configurable]]`;
	- `[[Value]]`: 数据值的位置. 默认为 underfined. 读取值和设定值都是这个特性.

- 访问器属性

	不包含数据值, 主要是设定 `setter` 和 `getter` 函数.

	- `[[Configurable]]`: 一样;
	- `[[Enumerable]]`: 一样;
	- `[[Get]]`: 读取属性时调用的函数. 
	- `[[Set]]`: 写入时调用的函数.

	可以利用这俩来像 python 的魔法方法一样.

	```javascript
	var book = {
		_year: 2004,
		edition: 1
	};

	Object.defineProperty(book, "year", {
		get: function() {
			return this._year;
		},

		set: function(newValue) {
			this._year = newValue;
		}
	});

	console.log(book.year);
	//2004

	book.year = 2005;

	console.log(book.year);
	//2005
		})
	```
	
	**注意:** 

	1. 下划线是表示只能通过对象方法访问的属性, 就是 set 和 get.
	2. 注意只指定 getter 意味着属性不能写, 写入会被忽略;
	3. 只指定 setter 不能读;
	4. 单设置一个严格模式下报错.

#### 访问特性和修改特性

修改属性的默认特性, 只能通过 `Object.defineProperty()` 和 `Object.defineProperties()`

需要三个参数: 属性所在的对象, 属性的名字和一个描述符对象. 描述符对象的属性是一个特性.

可以同时设置多个属性：

```javascript

var book = {
	_year: 2004,
	edition: 1
};

Object.defineProperties(book,{
	"year":{
		"value": 2005
	},
	"edition":{
		"value": 3
	}
})

console.log(book.year);

console.log(book.edition);
```

注意: 如果设置了 `configurable` 为 false, 则无法该回来了. 也不能设置其他属性的值了.
除了 `writable`

读取属性的特性可以使用 `Object.getOwnPropertyDescriptor()`, 需要两个参数, 对象名和属性名.

- [ ] 数据属性和访问器属性的区别

### 创建对象
1. 字面量;
2. 工厂模式;
	
	```javascript
	function createPerson(name, age, job){
		var o = new Object();
		o.name = name;
		o.age = age;
		o.job = job;
		o.sayName = function(){
		alert(this.name);
		};
		return o;
	}
	var person1 = createPerson("Nicholas", 29, "Software Engineer");
	var person2 = createPerson("Greg", 27, "Doctor");
	```

	用函数来封装数据接口

	解决了重复创建对象的问题, 但是无法判断实例的类型, 就是不知道具体是"人" 还是 "猫".

3. 构造函数
	
	解决了工厂模式的问题, 可以使用 `instanceOf` 来判断实例的类型.

	new 创建对象的过程:
	
	1. 创建新对象;
	2. this 指向这个新对象;
	3. 执行构造函数的代码, 创建属性;
	4. 返回新对象.

	此外, 构造函数也是函数, 可以调用. 注意 this 的指向问题. 任何函数都可以用 new 来调用, 创建对象.

	缺点是: 多个实例彼此独立, 有些方法没必要定义多次, 浪费内存.

4. 原型模式

	我们创建的每个函数都有一个 prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法, 就是它里面的所有属性和方法都可以被实例调用, 并且只定义一次, 所有的实例用的都是同一个.

	```javascript
			
	function Book(){

	}

	Book.prototype.name="Nicholas"

	var book1=new Book();

	console.log(book1.name)
	// Nicholas
	```
	
### 理解原型对象
#### 函数, 原型对象和实例 
无论什么时候, 创建一个函数, 就会自动创建一个原型对象, 并且为这个函数创建 `prototype` 属性, 指向这个原型对象; 这个函数就只是函数对象, 原型对象才是创建的对象.

```javascript
	console.log(Object.getOwnPropertyNames(Book.prototype))
	// [ 'constructor', 'name', 'plus' ]
	console.log(Object.getOwnPropertyNames(Book))
	// [ 'length', 'name', 'arguments', 'caller', 'prototype' ]
```

这个原型对象自动创建一个 `constructor` 属性, 指向最开始创建的函数. `instanceOf` 主要是根据这个来判断. 

此后, 原型对象会继承它父类(如果有)的方法和属性.

创建一个实例后, 它会有一个指针指向原型对象. 没有标准方式访问, 浏览器有一个 `Object.getPrototypeOf()` 可以访问. 可以用 `isPrototypeOf` 来看它和一个原型对象的关系.

#### 解释器查找属性的顺序
解释器按照名字查找, 先找**实例对象**, 后找**原型对象**.

所以实例对象的同名属性会屏蔽原型对象, 不能访问但没改变它们.

可以用 `delete()` 恢复访问.

可以用 `hasOwnProperty()` 来确定有没有实例属性.

用 `in` 操作符可以判断实例和原型对象中是否存在这个属性, 可以判断是否属于原型对象.

#### 得到属性
`for (let property in Object)` 来得到可以迭代的所有属性. [[Enumerable]] 为 true 的.

还可以使用 `Object.key()` 返回一个迭代属性的数组. 实例只返回自己的, for-in 返回全部的.

`Object.getOwnPropertyNames()` 返回所有的包括不可迭代的属性的数组.

#### 原型对象的动态性
重写原型对象会打破与函数的 `constructor` 关系, instanceOf 也不能用了. 

注意什么叫做 **重写**.

```javascript

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

//book1.sayName() error, no function 
book2.sayName()
// " " empty value, Why??
console.log(book2.name, Object.getOwnPropertyNames(book2), Object.keys(Book.prototype))
// Wang [] [ 'constructor', 'name', 'sayName' ]
for (let property in book2){console.log(property)}

for (let property in book1){console.log(property)}

//constructor
//name
//sayName
//
//name
```

打破了关系, 然后重写指定 constructor. 

- 重写之前的实例: 不会继承, 不改变
- 之后的实例: 会继承, 

- [ ] 这里有问题, 如果不执行 sayName() 后面的, 就是空, 执行了,就正常了.

