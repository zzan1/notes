# 这是关于 《javascript DOM 编程艺术》的学习笔记  

贯穿整篇书的设计理念：

预留退路，循序渐进，以用户为中心的设计

# javaScript的发展历史以及DOM的发展

javaScript 最初是由 NetScape 公司与 sun 公司合作开发的。出现在最初的 NetScape Navigator 2 中。

微软作为一个追随着，迅速发布了自己的 Jscript. 面对微软的竞争， NetScape 和 sun 联合**欧洲计算机制造协会** （ECMA）对这种语言进行了标准化，结果就是 ECMAScript 语言。

## 什么是DOM

简单来说，DOM 就是一套对文档的内容进行抽象和概念化的方法。

W3C 对 DOM 的定义是： 一个与操作系统和编程语言无关的接口，程序和脚本可以通过这个接口动态的对文档的内容，结构和样式进行访问和修改。

## DOM 的发展历史 ---- 浏览器之争

### DOM level 0  

javaScript 最初对表单和图像操作的语法，类似：

```javaScript
document.image[2]
document.forms['details']
```

这被认为第 0 级 DOM (DOM level 0).

### DHTML 的产生

DHTML 是指 dynamic HTML, 它把 HTML, css, javaScript 三者结合起来。但是由于不同浏览器厂商对于 DOM 语法的规定不一样，程序员通常要为不同的浏览器写不同的语句，相互之间**不兼容**。DHTML 为新世界开启了一扇大门，但是由于 DOM 的不兼容使得这条道路异常崎岖，因此，DHTML 很快就不愿意被人提起。

### 制定标准

在各大厂商争夺的同时，W3C 默默地为 DOM 制定了一个标准。后来，各个厂商携手 W3C 一起制定这个标准。这个标准的 DOM 被称为 “第 1 级 DOM ”

# 编译型和解释型设计语言

程序设计语言主要分为两大类： 编译型和解释型设计语言。

像 C++ 和 java 等语言需要一个编译器，将写出来的源代码编译为直接在计算机上执行的二进制文件。

类似 javaScript 等这种解释型语言，他们不需要编译器，只需要一个解释器。

如果解释型语言出现错误，它们只有执行到这段代码时才会被发现。对于编译型语言，错误在代码编译过程中就会被发现。编译型语言的速度往往更快，可移植性更好。

# 离散值与矢量

向布尔，字符串，数值等数据类型，他们在任何时刻都只能有一个值，被成为 **离散值**。 数组这类数据类型，能同时存储多个信息，像向量一样。

# 关联数组

```javaScript
var score = new Array()

score['Tom'] = 93;
score['Aatrox'] = 87;

console.log(score['Tom']);
```

关联数组可以像 python 中字典那样。

# 良好的编程习惯

- 应该先对函数作出定义，然后再去调用它。
- 函数在行为方面应该像一个自我包容的脚本。因此必须把它内部的变量都明确的声明为局部变量。
- 预留退路：保证即使没有 js 的情况下网页也能正常访问。搜索引擎就不会识别 js
- 谨慎使用**弹窗**，只有在绝对必要的情况下才使用弹窗。
- 循序渐进的原则，把html css js 等独立开来，用一些额外的信息去包裹原始数据，从原始数据出发，网页的内容是最重要的，而不是样式或者行为。
- 不要做太多的假设，想着我 html 中必定有相应的部分。应该在 js 中做足够的检查。
- DOM 不是用来向文档中添加重要内容的方法，如果你正在这么做，应该马上停止。**循序渐进** 的原则要求我们从最核心的内容触发，逐步添加额外的功能。
- 合理设计动画，让用户可以控制一切一切可以变化的内容。

# 宿主对象

对象是一种自我包含的数据集合。有用户自定义对象，内建对象，和宿主对象三种类型。

内建对象就是 javaScript 自己定义的，像 `Array`, `Date` 等。

宿主对象就是由 web 浏览器预想定义的对象，`document` 就是一种。

`windows` 对象也是一种宿主对象，各种下拉菜单核弹出窗口都是这个对象控制的。

# 节点和树对象

DOM 把文档作为一个**节点树** ，节点是这个树的连接点，整个文档都是由节点组成的。

节点有三种类型：元素节点，文本节点和属性节点。

元素节点就是 `<body> <p>` 等诸多标签界定的元素；

文本节点是这些标签里面具体填充的文本内容，必须依据元素节点存在，是元素节点的儿子；

属性节点是这些元素的属性，属性节点也总是在元素节点之中。

还有其他的一些节点，包括文档中的注释等等。

# 方法总结

需要注意一点，如果把 js 文件引入放在 html 的开头，那么 js 中的 dom 方法就不起作用了，因为此时 html 文档还没有开始加载。

## 获取元素节点

- `getElementById()` 返回一个有着特定 id 的元素节点对象。这样也告诉我们在使用 id 时一定要谨慎，确保一个 id 只使用一次。

- `document.getElementByTagName()` 返回一个对应标签组成的 `htmlCollection` 对象， 这个对象包含了多个元素节点对象。不能使用数组的某些方法，只能用 `for length` 来循环这个对象。

	- [ ] 有个方法可以把这个对象列表转为真正的一个由元素节点组成的数组。
	- [ ] 可以试着统计一下文档中有多少个元素节点，文本节点等。提示使用正则

- `element.childNodes` 属性，可以把任何一个元素节点的所有子元素作为一个数组返回。类似的方法还有 `firstChilde lastChild` 相当于数组的第一个，最后一个元素。

## 获取属性节点

- `object.getAttribute()` object 是相应的元素对象，输入参数是需要的属性的字符串。如果没有相应的属性，返回 `null` 空值。

- `object.setAttribute(attribute, value)` 对相应元素节点设定一个属性值。

## 事件处理函数

事件处理函数是“触发一个动作”，和监听事件有同样的作用。

- [ ] 二者差别在哪？为什么选择了后者。

格式为：`event='javaScript code'`，把这个作为元素的一个属性添加到 html 中。 

事件处理函数的工作机制：给元素添加相应的处理函数之后，一旦发生预定事件，就会执行相应的 javaScript 代码和默认行为（比如默认点击图片就会打开新标签页展示大图）。可以通过返回一个布尔值来取消掉默认行为。
```html
<a href='http://www.baidu.com' onclick='return false'>Click me</a>
```

## nodetype, 判断节点类型

- `node.nodetype` 属性，总共有12种返回结果，元素节点是1，属性节点是2， 文本节点是3.

- `node.nodeName` 属性，返回节点的名字。不可以写，只读属性。元素节点返回 tagName, 文本节点返回 `#text` 这个字符串。属性节点返回属性的名字.

- `node.nodeValue` 属性，返回节点的当前值。如果是属性节点，返回等号后面的，nodename 返回属性名字。如果是文本节点，返回文本节点内容，如果是元素节点，返回 NULl

## 文本节点的处理

- `node.nodeValue` 属性，检索和设置相应元素节点的文本节点内容。

## 动态添加DOM内容
- `document.write(str)` 快速把字符串插入到文档中。违背了 **分离JS和HTML** 的理念，所以不建议用。write 方法不支持元素节点，只能放到 body 标签中。

- `innerHTML` 属性，可以读、写给定元素节点里的 HTML 内容。这个更像一个砍柴斧，接下来的 DOM 方法更像一个精准的 手术刀。 innerHTML 不兼容 MIME 类型文档，这就是什么 `text/css` 这类告诉浏览器加载的是什么文档，媒体类型 multipurpose internet mail extension.

- `createElement()` 创建一个元素节点。

- `createTextNode()` 创建一个文本节点。

- `cloneNode()` 复制节点, 参数类型是布尔型，决定是否复制所有的子节点。 

## 删除节点
- `parent.removeChild(node)` 从一个给定元素节点中删除一个子节点。

- `parent.replaceChild(newChild, oldChild)` 把一个给定父元素的子节点替换掉，返回一个已经被替换的子节点的引用指针。如果文档树中有这个名字的节点，就会先删除它，再去替换。

## 绑定JS创建的节点到指定节点

- `parent.appendChild()` 把新建立的节点放到父节点之下。

- `parentElement.insertBefore(newElement, targetElement)` 在节点之前插入。使用时我们不必知道 父节点 是哪个，可以使用 `targetElement.parentNode` 属性值。

- `insertAfter(newElement, targetElement)` 自己编写的函数。 使用方法稍有不同，没有 Parent 节点了。

## setTimeout()

能够让某个函数经过一段时间后才执行。`setTimeout('function', interval)`
通常可以把 setTimeout 函数赋值给一个变量，方便使用 `clearTimeout()` 来取消**等待执行** 的队列中的某个函数。

# BOM 

## 弹窗
- `windows.open(url, name, features)` 第二个参数是名字，就相当于这个新窗口的变量名，可以通过这个变量名来控制这个窗口，最后一个参数就是设置一些这个窗口的表现，比如宽高等等。

## 当前页面的地址
- `windows.location.href` 属性，返回当前页面的地址。

# 协议相关内容

## javaScript 的伪协议

javaScript 伪协议可以让我们像使用一个链接一样调用一个 javaScript 函数。

```html
<a href='javascript:function()'></a>
```

在 html 中使用伪协议的做法很不好，不推荐使用。

# 函数库

## `addLoadEvent()` 多个onload 事件处理
当代码中有多个 onload 事件时，往往只会执行最后一个。编写一个函数，可以解决这个问题。函数实现：

```javaScript
function addLoadEvent(func){
    var oldOnload=window.onload;
    if (typeof window.onload != 'function'){
        window.onload=func;
    }else{
        window.onload=function(){
            oldOnload();
            func();
        }
    }
}
```

因为 windows.onload 的使用是传递给它一个函数名字，不执行这个函数本身：
```javaScript
windows.onload = func
```

因此，向 addLoadEvent 函数中传入一个函数名，然后把原来的 Onload 事件绑定的函数名字暂存在一个变量当中。判断 onload 事件是否绑定事件，如果没有，添加变量函数名 func 给 onload 事件。如果已经存在函数，则重新创建一个匿名函数，把这些需要自动执行的函数在其中执行，就是需要写 `func() oldOnload()`，而这个匿名函数不执行，因为最后没有小括号。最后把这个匿名函数名绑定在 onload 事件中。

## insertAfter()

```javaScript
function insertAfter(newElement, targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement, targetElement.nextSibling)
	}
}
```

解决思路就是利用 insertBefore 函数，使用 `nextSibling` 属性获得目标节点的下一个节点，然后在前面插入。
