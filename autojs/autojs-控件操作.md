# autojs 控件部分操作

## 什么时候使用控件操作
控件操作主要使用在一些软件当中，不能使用在游戏当中。游戏要采用基于坐标的操作。

## `auto.waitfor()``
等待开启无障碍。放到代码第一行，确认无障碍开启后才运行后面的代码。

## SimpleActionAutomator
模拟控件操作。

- click(text) 点击文本。可以使用：

	```javascript
	while(!click("扫一扫"))
	```

	来确保一直点击文本，直至成功。

- click(position) 有的不是文本，是一个图片，就用这个。

	位置信息可以在 Bond 中查看。

- longClick(text)

- scrollUp() scrollDown()

- setText() 输入文本

- input() 追加输入

## 控件选择 UISelector
选择控件的方法

一个页面是多个部分组成的，这些组成部分就叫做控件。 控件的排列，叫做布局。

选择，总的原则是利用控件的独一无二的属性选择这个控件。控件的属性可以从布局分析得到。

首先是 text() 选择，选用文本属性。

没有文本属性， 选择 desc() 属性，描述属性。

继续可以使用 id() 来选择 Id 属性。 总之要找到一个独一无二的属性来选中它。

实在不行可以通过组合几个属性来确定一个组件

```javascript
className("ImageView").depth(10).findOne().click()
```

findOne() 是找到满足条件的一个组件。会一直找，所以还是建议使用 findOnce()。或者也可以为它设置一个搜索的时间，到时间还没找到就返回 null.毫秒为单位。 

实在不行可以使用生成代码来尝试选择更多的选择器代码。

## 控件的操作

第一个介绍的几个方法都可以作为控件的方法，来对控件进行操作。

click() 要求控件的 click 属性是真， scroll同样如此。也不一定，有一些自定义的控件(andriod.view.view)的控件，属性是假，但是可以点击。

还有一个 waitfor()， 可以等待这个控件出现。

- click()

- longClick()

- setText()

- scrollForward(), scrollBackward() forward 包括向下向右滑动

- exits() 判断控件是不是存在

- waitFor()

- copy() 对输入框中的选中的内容进行复制。 选中可以用 setSelection() 来实现。

- cut(), paste()

- collapse(), expand()

## 进一步筛选
基于已选择的控件，进行二次筛选。

- UISelector.text(str) 加上一个 text=str 属性的筛选

还有多个方法，可以查看

- UISelector.exists() 可以作为检测，判断屏幕上有没有这个控件。

```javascript
if(text("").exists()){
	then...
}
```

- children() 返回所有的子控件的集合

- childCount() 

- child(i)

- parent()

- bounds() 返回边界的 rect 对象。可以使用 click(b.centerX(), b.centerY()) 来点最中间的。

- boundsInParent() 

## UICollection
控件的集合，继承自数组对象。

- find(selector) 在对象集合的子孙控件中找满足条件的

## rect 对象
范围对象


