## 事件
**事件**是文档或浏览器窗口发生的一些特定的交互瞬间, 用户或者浏览器执行的某种动作. Javascrpt 与 Html 之间的交互是通过事件实现的.

使用**监听器**来预订事件发生时的行为.

### 事件流
**事件流** 描述的是从一个页面中接受事件的顺序. 通俗来说就是点击一个元素, 那么应该有多个元素被点击(它的父节点, document 等), 这些事件之间应该有个顺序.

- 事件冒泡. 

	事件由最具体的元素接受, 逐级向上传播, 到文档等.

- 事件捕获

	不太具体的节点最先接收, 最后是最具体的节点.

	优先使用事件冒泡, 只有特别必要的时候再用事件捕获.

- DOM 事件流
	
	捕获阶段, 事件上, 和冒泡阶段

### 事件处理程序
`click, load` 等是事件的名字, 处理事件的函数是**事件处理程序**, 一般是 `on` 开头, 对应的有 `onClick, onLoad`.

制定事件处理函数的方法:

- HTML 事件处理程序

	`<input type="button" onclick = "this.value">`

	可以在里面指定一个 javascript 代码, 可以使用一个函数.

	这个函数的可以使用 `this` 来代表事件的目标元素. 这里还封装了一个 `event` 局部变量, 来代表事件对象, 即 `event.type`.

	是不是很有 `react` 的味道, 二者之间应该有些许联系.

- DOM0 级事件处理程序
	
	```javascript
	var btn=document.getElementById('Mybtn');
	btn.onclick = function(){alert(this.id)};
	```

	this 这个元素本身. 这个事件处理程序会在事件流的冒泡阶段被处理.

- DOM2 级事件处理程序

	使用 `addEventListener()` 和 `removeEventListener()`, 所有的 `document` 都有这两个方法. 

	接受三个参数, 第一个是事件名, 第二个是事件处理函数, 第三个如果是 true, 则事件在捕获阶段处理, 如果是false, 事件在冒泡阶段处理. 不写是冒泡阶段处理.

	如果事件处理函数使用匿名函数, 则不可以移除了. 只有为 `removeEventListener()` 传入同一个函数, 这个事件处理函数才可以被移除.

	大多数情况下，都是将事件处理程序添加到**事件流的冒泡阶段**，这样可以最大限度地兼容各种浏览器。最好只在**需要在事件到达目标之前截获它的时候**将事件处理程序添加到捕获阶段。如果不是特别需要，我们不建议在事件捕获阶段注册事件处理程序


## 事件对象

触发事件时, 会产生一个事件对象 `event`. 保存着所有和事件相关的信息. 比如鼠标的位置.

这个事件对象会被传入到事件处理函数中.

可以利用这个对象来取消事件的默认行为, 它还有一系列的方法和属性. `event.preventDefault()` 取消掉默认行为. `event.stopPropagation()` 因为事件是在事件流中传播的, 有捕获和冒泡阶段, 这个可以立马阻止继续传播.

事件处理程序中的 `this` 始终是 `event.currentTarget` 这个对象, `event.target` 则是事件的实际目标. 如果事件处理函数指定给了目标元素, 那么这两个包含了一样的值, 都等于 `this`.

如果事件处理程序指定了元素的父元素, 那么这些值是不一样的. `target` 是这个按钮, `currentTarget` `this` 是它的父元素. 可以利用这个来**获取父元素的信息**.

```javascript
let btn = document.getElementById("mybtn");

// 事件处理程序在目标对象上
btn.click = () => {
	alert(event.eventPhase);
};

// 事件处理程序在捕获阶段
document.body.addEventListener("click", () => {
	alert(event.eventPhase);
});

// 事件处理程序在冒泡阶段;
document.body.onclick = () => {
	alert(event.eventPhase);
};
```

## UI 事件
UI事件是指那些不一定与用户操作有关的事件.

比如:

`load` 事件, 当页面**完全加载**后在 windos 上触发. `<img>`, `<frame>`,`<object>` 都可以用这个事件, 表示内容加载完毕.

`select` 用户选择文本框的一个或多个字符时触发.

还有很多.

## 焦点事件
焦点事件是界面元素获得或者失去焦点时触发.

有六个焦点事件:

1. `blur`, 不冒泡, 只有他自己有事件, 他的父节点没有事件, 但是可以在捕获阶段触发. 失去焦点触发;
2. `focus`, 不冒泡, 获得焦点时触发;
3. `focusin`, 会冒泡, 获得焦点触发;
4. `focusout`, 会冒泡, 失去焦点触发;
5. `DOMFocusIn`, 废弃;
6. `DOMFocusOut`, 废弃;

触发顺序: 4 -> 3 -> 1 -> 6 -> 2 -> 5;

## 鼠标事件
- `click`, 比 `onclick` 多一个可以用回车来触发;
- `dblclick`, 
- `mousedown`, 任何鼠标按键;
- `mouseenter`, 不冒泡;
- `mouseup`,
- `mouseleave`, 子元素也算 leave, 不冒泡;
- `mpuseout`, 子元素不算 leave;
- `mouseover`, 移动到另一个元素;
- `mousemove`, 内部移动;

## mousewheel event
获得鼠标位置的, 不是一个事件, 它们都是事件的属性.

可以用这个来做一个滚动窗口时的动画效果.

做事件的例子的时候再来补吧;

接下来的计划
- [ ] 错误处理和调试;
- [ ] Ajax
- [ ] JSOn
- [ ] ES6
