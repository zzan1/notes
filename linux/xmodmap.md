# 修改按键

1. 安装 xinit-xev， 监听键盘按键的信息，得到对应案件的名字：

   比如说：Super_L 就是功能，对应的 keycode 就是 133，得到这个值

2. 新建一个 .xmodmap 文件，在里面添加：

   `keycode 133 = Escape`

   这就将 super_L 更换成了 Escape 键。
