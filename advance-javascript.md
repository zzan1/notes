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




