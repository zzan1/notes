# 主要介绍一些高级的, 难以理解的 javascript 语法.

## 面向对象的程序设计

对象的定义为: **无序属性的集合, 其属性可以包含基本值, 对象或者函数.**

### 特性

ECMA-262 第 5 版定义了只有内部使用的**特性**, 用来描述属性的各种特征. 这些特性是为了实现 JavaScript 引擎用的, 不能直接访问他们.

#### 特性

主要包括两种属性: **数据属性和访问器属性**.

- 数据属性

  数据属性是指值为数据值的属性, 可以在这个位置读取和写入数值. 有四个特性:

  - `[[Configurable]]`: 能否通过delete删除属性、能否再修改Enumerable、Writable（特殊，把Configurable设置为false后，这个属性也能被修改）、Value（更特殊，看下面例子）、Configurable属性这四个属性;
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

[深入理解这数据属性和访问器属性](https://www.zhihu.com/question/295168343)

```javascript
// 声明一个对象
const obj = {};

// 数据属性
Object.defineProperty(obj, 'data', {
  value: 0,
  writable: true,
  configurable: true,
  enumerable: true
});
// 等价于
obj.data = 0;

// 访问器属性
Object.defineProperty(obj, 'accessor', {
  set(val) { this.data = val; },
  get() { return this.data; },
  configurable: true,
  enumerable: true
});
```

这两个属性都是定义对象属性的方法, 二者不同但是大体上是一样的. 二者之间可以相互转换, 只需要设定相应的特性就可以了, 会自动放弃另一个.

#### 访问特性和修改特性

修改属性的默认特性, 只能通过 `Object.defineProperty()` 和 `Object.defineProperties()`

需要三个参数: 属性所在的对象, 属性的名字和一个描述符对象. 描述符对象的属性是一个特性.

可以同时设置多个属性：

```javascript
var book = {
  _year: 2004,
  edition: 1,
}

Object.defineProperties(book, {
  year: {
    value: 2005,
  },
  edition: {
    value: 3,
  },
})

console.log(book.year)

console.log(book.edition)
```
注意: 
1. 调用`Object.defineProperty()` 不指定的特性默认都为 false;
2. 如果设置了 `configurable` 为 false, 则无法该回来了. 也不能设置其他属性的值了, 除了下面的特例;
3. `writable` 仍可以自由设置. `value` 只有当 `writable`和`configurable` 都为 false 时才不可以设置.

读取属性的特性可以使用 `Object.getOwnPropertyDescriptor()`, 需要两个参数, 对象名和属性名.

### 创建对象

1. 字面量;
2. 工厂模式;

   ```javascript
   function createPerson(name, age, job) {
     var o = new Object()
     o.name = name
     o.age = age
     o.job = job
     o.sayName = function () {
       alert(this.name)
     }
     return o
   }
   var person1 = createPerson('Nicholas', 29, 'Software Engineer')
   var person2 = createPerson('Greg', 27, 'Doctor')
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

   不可以不要 `new` 单独使用构造函数来创建对象.

   缺点是: 多个实例彼此独立, 有些方法没必要定义多次, 浪费内存.

4. 原型模式

   我们创建的每个函数都有一个 prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法, 就是它里面的所有属性和方法都可以被实例调用, 并且只定义一次, 所有的实例用的都是同一个.

   ```javascript
   function Book() {}

   Book.prototype.name = 'Nicholas'

   var book1 = new Book()

   console.log(book1.name)
   // Nicholas
   ```

5. 组合使用原型模式和构造函数

  可以将共享的属性放到原型中定义, 把实例自己单独的属性放到构造函数中定义.

6. 动态原型模式

  ```javascript
    const BookTwo=function(name, edition){
			this.name = name;
			this.edition = edition;
			this.getEdition = function(){
				return this.edition;
    }

    if (typeof this.getName !== 'function'){
      BookTwo.proptotype.getName= function(){
        return this.name;
      }
    }
    }
  ```

  不是重写原型函数, 之前定义的还在. 可以在第一次 new 时, **初始化**一个原型属性.

  这么写, 会报错, 因为 `this.getName` 并没有声明, 却已经用来判断类型了

7. 寄生函数构造函数形式
   ```javascript
   function Book(name, edition){
			let o = new Array();
			o.name = name;
			o.edition = edition;
			o.getEdition= function(){
				return this.edition;
				}
			return o
		}
		const book1 = new Book("DOM", 2015);
	 ```

  寄生构造函数, 和工厂函数几乎一样, 除了使用 `new` 来创建对象. 它的作用是: **利用 new 来改变 this 的指向.**

8. 稳妥构造函数模式

  没有公共属性, 不使用 `this` 对象, 也不使用 `new` 来指定 this 对象. 

  目的: 防止外界更改自己的属性. 如下, 外界永远都不可能改变 `name` 和 `edition`

  ```javascript
  function Book(name, edition){
    let o = new Array();
    let name = name;
    let edition = edition;
    o.getEdition= function(){
      return edition;
    }
    return o
  }
  Const book1 = Book("Dom", "2005")
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

这个原型对象自动创建一个 `constructor` 属性, 指向最开始创建的函数.

此后, 原型对象会继承它父类(如果有)的方法和属性.

创建一个实例后, 它会有一个指针指向原型对象. 没有标准方式访问, 浏览器有一个 `Object.getPrototypeOf()` 可以访问. 可以用 `isPrototypeOf()` (方法, 不是关键字)来看它和一个原型对象的关系.

#### 解释器查找属性的顺序

解释器按照名字查找, 先找**实例对象**, 后找**原型对象**.

所以实例对象的同名属性会屏蔽原型对象, 不能访问但没改变它们.

可以用 `delete()` 恢复访问.

可以用 `hasOwnProperty()` 来确定有没有实例属性.

用 `in` 操作符可以判断实例和原型对象中是否存在这个属性, 可以判断是否属于原型对象.

#### 得到属性

`for (let property in Object)` 来得到可以迭代的所有属性. `[[Enumerable]]` 为 true 的.

还可以使用 `Object.key()` 返回一个迭代属性的数组. 实例只返回自己的, for-in 返回全部的.

`Object.getOwnPropertyNames()` 返回所有的包括不可迭代的属性的数组.

#### 原型对象的动态性

重写原型对象会打破与函数的 `constructor` 关系.

注意什么叫做 **重写**.

```javascript
function Book() {}

Book.prototype.name = 'Tom'

book1 = new Book()

Book.prototype = {
  constructor: Book,
  name: 'Wang',
  sayName: function () {
    return this.name
  },
}

book2 = new Book()

// book1 没有 sayname
console.log(book2.sayName(), book1.sayName) 

// book1 no chage
console.log(
  book2.name,
  book1.name
)

for (let property in book2) {
  console.log(property)
}
console.log("-------")
for (let property in book1) {
  console.log(property)
}

// book1 no longer is belong to Book, (Ture, false)
console.log(book2 instanceof Book, book1 instanceof Book)

// ture false
console.log(Book.prototype.isPrototypeOf(book2), Book.prototype.isPrototypeOf(book1))

console.log(Book.constructor)
```

重写 prototype:
1. 写不写 constructor 没有影响, 会自己补;
2. 重写之前的实例: 不会继承, 不改变, `instanceof` `isPrototypeOf` 均改变;
3. 之后的实例, 一切正常
   
只影响重写之前的属性.

### 继承
大多数语言都支持两种继承方式：接口继承和实现继承。接口继承只继承方法签名，而实现继承则继承实际的方法。

- [ ] 两种继承方式


ECMAScript 只支持实现继承, 并且实现继承主要依靠原型链来实现.

#### 原型链
主要思想: 让子对象的原型对象等于父对象的实例

```javascript

```

继承完之后:

1. 父对象的构造函数里定义的属性也被继承;
2. 子对象的构造函数定义的属性仍然存在;
3. 子对象的原型被重写, 所以继承之前定义的原型属性不存在了;
4. 实例 `instanceof`, `isPrototypeOf` 均为 true;
5. 继承完之后, 不能再用字面量的方法更改原型对象了, 因为这会重写原型对象, 打破原型链.

这张图很重要, 可以清楚的描述原型链的组成:
![](https://cdn.jsdelivr.net/gh/zzan1/markdownPicture/normal/20200607122052.png)

#### 原型链存在的问题
包含引用类型值的原型属性会被所有实例共享, 一个实例改变了值, 则全部改变. 基本类型的值不会改变. 注意这和实例属性覆盖原型属性不一样. **因为两个实例的属性指向了同一个内存地址**.

```javascript
let Book = function(){}
Book.prototype.name='DOM';
Book.prototype.list=[12,12,31,42];
let book1= new Book();
let book2 = new Book();
book1.name.split().reverse().join()

console.log(book1.name, book2.name)
// DOM DOM
//
book1.list.pop()

console.log(book1.list, book2.list)

//[ 12, 12, 31 ] [ 12, 12, 31 ]
```

原型链的第二个问题是：**在创建子类型的实例时，不能向超类型的构造函数中传递参数**.

#### 借用构造函数
```javascript
function SuperType() {
	this.list = [1, 2, 3, 4];
}
function SubType() {
	SuperType.call(this);
}

let book1 = new SubType()
book1.list.pop()
let book2 = new SubType()
console.log(book1.list, book2.list)
console.log(book1.list === book2.list)
// [ 1, 2, 3 ] [ 1, 2, 3, 4 ]
// false
```

这种技术的思想很简单: **在子类型构造函数中调用父类的构造函数**. 当创建实例时, 会绑定不同的 `this` 的对象, 然后就避免了继承时引用类型使用相同的内存地址的为题. 

但问题是: 父类只能是一个函数, 父类的原型属性无法通过 `this` 来绑定.

**为什么只能是函数呢?** 函数是**在特定执行环境中执行代码的对象**, 因此可以通过 `call` `apply` 来通过绑定不同的执行环境来实现创建不同的对象.

要学习这种思想的使用.

#### 组合继承

```javascript
function SuperType() {
	this.list = [1, 2, 3, 4];
}
SuperType.prototype.name = "yi";
function SubType() {
	SuperType.call(this);
}

SubType.prototype = new SuperType();

let book1 = new SubType();
book1.list.pop();
let book2 = new SubType();
console.log(book1.list, book2.list);
console.log(book1.list === book2.list);
// [ 1, 2, 3 ] [ 1, 2, 3, 4 ]
// false
console.log(book1.name, book2.name);
console.log(book1 instanceof SubType, book1 instanceof SuperType)
console.log(SuperType.prototype.isPrototypeOf(book1),SubType.prototype.isPrototypeOf(book1))
// yi yi
// true true
// true true
```

把原型链和构造函数继承结合起来, 虽然解决了一部分问题, 但是, 现在还是不能在原型函数中定义引用类型的值, 其实也不需要了.

#### 不是继承的对象复制: 原型式继承
```javascript
function obj(base) {
	function NewObj() {}
	NewObj.prototype = base;
	return new NewObj()
}
```

与原型链继承的方式位移差别是: 不是新建一个实例, 而是重写原型对象.

这只是实现了新对象的复制, 重新创建了一个和 base 一样属性的对象. 这个复制不是直接 `=`, 两个是不同的内寸地址.

现在可以使用 `Object.create()` 来实现上面这个函数. 第一个参数就是 `baseObj`, 传递一个想要复制的对象. 第二个参数可以新增加属性, 格式像 `Object.defineProperty()` 第二个参数一样, 需要指定特性;

#### 寄生式继承
和原型模式 `obj()` `Object.create()` 没什么区别, 在重写原型对象后, 又为原型对象添加属性, 实现复制, 加强了基底对象. 

#### 寄生组合式继承
**组合式继承的缺点**: 在第一次调用 SuperType 构造函数时，SubType.prototype 会得到两个属性：name 和 colors；它们都是 SuperType 的实例属性，只不过现在位于 SubType 的原型中。当调用 SubType 构造函数时，又会调用一次 SuperType 构造函数，这一次又在新对象上创建了实例属性 name 和 colors。于是，这两个属性就屏蔽了原型中的两个同名属性. 有两组 name 和 colors 属性：一组在实例上，一组在 SubType 原型中。

```javascript
function object(base) {
	function NewObj() {}
	NewObj.prototype = base;
	return new NewObj();
}
// 寄生式继承的实现, 
function inheritPrototype(baseObj, fatherObj) {
	let prototype = object(fatherObj.prototype);
	baseObj.prototype = prototype;
}
function SuperType() {
	this.name = "yi";
}
SuperType.prototype.sayName = function() {
	console.log(this.name);
};

console.log(
	SuperType.prototype.constructor,
	Object.getOwnPropertyNames(SuperType.prototype)
);
//[Function: SuperType] [ 'constructor', 'sayName' ]

let book1 = new SuperType();
console.log(Object.getOwnPropertyNames(book1));
// ['name']

function SubType() {
	SuperType.call(this);
	this.edition = "23";
}
// 第一个点
SubType.prototype = new SuperType();

console.log(
	Object.getOwnPropertyNames(SubType.prototype),
	SubType.prototype.constructor
);
//['name'] [Function: SuperType]
console.log(SubType.prototype === SuperType.prototype);
// false

let book2 = new SubType();
console.log(Object.getOwnPropertyNames(book2));
//[ 'name', 'edition' ]

SubType.prototype = SuperType.prototype
console.log(
	Object.getOwnPropertyNames(SubType.prototype),
	SubType.prototype.constructor
);
//[ 'constructor', 'sayName' ] [Function: SuperType]
console.log(SubType.prototype === SuperType.prototype);
// true

let book3 = new SubType();
console.log(Object.getOwnPropertyNames(book3));
//[ 'name', 'edition' ]

// 第二个点
SubType.prototype = object(SuperType.prototype)
console.log(
	Object.getOwnPropertyNames(SubType.prototype),
	SubType.prototype.constructor
);
//[] [Function: SuperType]
console.log(SubType.prototype === SuperType.prototype);
// false
let book4 = new SubType();
console.log(Object.getOwnPropertyNames(book4));
//[ 'name', 'edition' ]

```

寄生组合式继承改变原型链的缺点了吗?

解决了. **传递参数:** 通过在子类中调用 `call` 可以解决向父类构造函数中传递参数. **引用类型的值**, `call` 函数已经为不同的引用类型的值绑定了不同的对象. **重复定义属性**, 因为现在不再执行 `new SuperType()` 而是直接将 `SuperType.prototype` , 复制给了中间对象的原型对象. 没用 `new` 再次执行构造函数的过程了.

一个完整的寄生式组合继承

```javascript
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
```

1. 从第一个点和第二个点可以看出: 原型链继承(组合继承)原型函数中仍定义了一个 `name`, 重复定义了两次. 寄生式继承(第二个点)原型函数中不存在重复定义. 原因是: `new` 只会执行后面的函数, 为新对象定义属性. 而寄生式继承的 `new` 的 `NewObj` 函数没有定义自己的属性. 组合继承的 `new` 重复定义了 `SubType()` 的name属性, 这个属性已经从它的实例继承来了.
2. 构造函数就只是一个函数对象. 它定义的属性只有 `new` 时才会到实例中. 
3. prototype 对象的属性在实例中不是显然存在, 是通过 `[[prototype]]` 特性链接的. 所以实例的这部分属性可以通过继承来改变.
4. 动态手动的指定构造函数, 只是一种习惯. 他无法改变 Instanceof 的结果.

问题: 
1. `instanceOf` 和 `isPrototypeOf` 的工作原理是什么;
2. 第二点的原型对象已经没有属性了, 那为啥 constructor 仍有值
