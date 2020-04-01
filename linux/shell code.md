有 bsh 和 csh 两种类型，主要是 bsh。

linux 支持的 shell `/etc/shell`

`#!/bin/bash` 标称是 shell 脚本，不是注释

bash 当中的变量默认类型都是字符串类型，必须先指定变量类型为数值型

变量用等号连接值，等号两侧不能有空格

环境变量名建议大写，便于区分，类似于全局变量。

## `echo` print command, 输出命令

-e 支持反斜线控制的字符转换

\\ \a \b \c \e \f \b \r \t \v \0nn \xhh

`\\` 反斜杠自身

`echo -e "\e[1;31m abcd \e[0m"` 颜色输出

## 脚本执行

`bash hello.sh`

```bash
chmod 755 hello.sh
./hello.sh
```

## 辨别 win 和 linux 的回车符

```bash
cat -A hello.sh # 查看文件当中的所有隐藏字符
```

如果是`$`代表 Linux 的换行，如果是`^M$`代表 CTRL M 换行，就是 win 下的换行。

## 转换回车符

`dos2unix hello.sh`
`unix2dos hello.sh` 从 linux 到 win

## 历史命令

`history -c 情况历史命令 -w 强制的把缓存写入历史命令文件`

历史命令位置 ~/bash_history
默认会保存 1000 条，可以通过 /etc/profile 中修改

`!n` 可以执行第 n 条命令
`!!` 执行上一条
`!string` 执行最后一条以字符串开头的命令
Tab 自动补全

## 命令别名

`alias 别名='原名令'`
`alias` 查询别名
`unalias` 删除命令
ctrl A 到命令行开头 E 到末尾
ctrl U 删除或者剪贴当前光标前的命令 K 光标后的
ctrl Y 粘贴
ctrl R 搜索历史记录
ctrl D 退出当前终端

ctrl S 暂停屏幕输出 Q 退出这种模式

命令执行顺序：绝对路径和相对路径，别名，bash 内部命令，\$PATH 命令

/root/.bashrc alias 的储存文件

## 标准输入输出

/dev/stdin 标准输入 键盘 0
/dev/stdout 标准输出 显示器 1
/dev/strerr 标准错误输出 显示器 2

## 输出重定向 把输出的信息存储在文件中

`命令 > 文件` 覆盖方式将命令输出的信息输到文件中。`>>` 追加的方式
`命令 2> 文件` 将错误信息输出到文件当中，`>>` 同样追加

`命令 > 文件 2>&1` 把错误输出先保存在正确输出，然后都输入到文件中，可以同时输入错误和正确信息 `命令 >> 文件 2>&1` 追加

`命令 &> 文件` 和上面一样的功能 同样有追加

`命令 >> 文件1 2>> 文件2` 正确的输入文件 1，错误的输入文件 2

`ls &> /dev/null` 把输出信息丢到垃圾箱，不保存数据

## 输入重定向

文件的东西当作键入

`wc [选项][文件名]` -c 统计字节数 -w 统计单词数 -l 统计行数 一条统计命令

`wc < anaconda-ks.cfg` 一种输入重定向，统计这个文件中的信息

输入重定向不太用，主要输出重定向

## 多命令顺序执行

`;` 多个命令执行，没有逻辑联系
`&&` 逻辑与，第一命令正确执行，第二个才执行
`||` 逻辑或，命令一不执行，命令二才执行

`dd` 复制硬盘的命令
`date; dd if=/dev/zero of=/root/testfile bs=1k count=100000;date` 测试硬盘性能，就是将 zero 中复制一个一百兆的文件到 testfile 看多长时间

## 管道符

`|` 命令 1 的输出作为命令 2 的输入

## grep

grep [选项] “搜索内容” 文件名

-i 忽略大小写
-n 显示行号
-v 反向查找
--color=auto 会显示颜色

## 通配符和特殊符号

? 一个字符 \* 任意多个字符
[] 匹配括号中的任意一个字符
[a-z] 匹配 a-z 的任何一个，就是匹配小写字母
^ 非, [^0-9] 匹配不是数字

'' 单引号，单引号中所有的特殊符号 都变成正常符号
“” 双引号，和单引号类似，但是去掉\$ \' \\，他们三个还是有作用，表示调用变量值，引用命令和转义符
`` 反引号，括起来的内容是系统命令，bash 会优先执行它，推荐使用\$(), 和这个意思一样
\# 注释
\$ 调用变量的值

## 变量分类

用户自定义变量
环境变量
位置参数变量，主要用来向脚本当中传递参数和数据，变量名不能自定义，变量作用是固定的
预定义变量，Bash 中已经定义好的变量，不能自定义，作用固定

从上到下限制越来越严格。位置变量根本上就是预定义变量

`set` 查看所有的变量

### 环境变量

export 变量名=变量值

env 查询变量

unset 变量名 删除变量

pstree 进程树

`echo $PATH` path 路径，可执行命令的文件夹

### 位置参数变量

\$n n 为数字，用于接收用户传进来的值，从 1-9 0 表示当前命令自身(./name.sh)，大于 10 之后，n 需要用大括号括起来

$* 代表传进来的所有参数，看作一个整体
$@ 所有参数，但是区别对待
\$# 返回输入参数的个数

### 预定义变量

\$? 判断上一次命令的执行结果。 0 代表正确执行，非 0 代表未正确执行，数值由脚本决定

$$
& 放入后台执行，

$! 显示后台程序的pid

## 变量的叠加

```bash
aa=123
aa="$aa"456
aa=${aa}456
```

## 接受键盘输入
read [选项][变量名]
-p “提升信息”
-t 秒数 指定等待时间
-n 字符数 接受的字符个数
-s 隐藏输入的数据

## 声明变量类型
declare [+/-][选项] 变量名
‘-’ 给变量设定类型属性
‘+’ 取消变量的类型属性
-i 声明为整数型
-x 声明为环境变量
-p 显示指定变量的的被声明类型

使用expr命令
`dd=$(expr $aa + $bb)` 空格不能省略

使用双括号和中括号
`ff=$(($aa+$bb))` 双括号执行数值运算
`ff=$[$aa+$bb]` 中括号

## 变量测试与内容替换
![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304090824.png)

通过x的值，来判断y的值。

## 环境变量配置文件

/etc/profile
/etc/profile.d/*.sh
/etc/bashrc
~/.bash_profile
~/.bashrc

/etc 任何用户登录都生效

![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304092936.png)

/ect/profile.d/lang.sh 语言
$$

## 其他配置文件

~/.bash_logout 注销的时候执行的东西
~/.bash_history
/etc/issue 本地终端的登录信息
/etc/issue.net 远程登录的登录信息，转义符都没意义了
/etc/ssh/sshd_config ssh 的配置文件，决定上面是否显示
/etc/motd 本地 远程登录都有的信息，是登录完成之后的信息

## 正则和通配符

正则是用来在文件中匹配符合条件的字符串，是包含匹配，grep, awk, sed 命令的。

通配符是用来匹配文件名的，是完全匹配。ls, find, cp 这些命令不支持正则。

## 字符截取命令

### cot

cut [选项] 文件名
-f 列号 提取第几列
-d 分隔符 按照分隔符分割列

cut 命令不能识别空格作为分隔符

如果 cut 能完成，就用 cut。不能完成，就需要使用 awk 编程。

### printf

格式化输出命令

print ‘输出格式’ 输出内容
%ns n 个字符
%m.nf m 有效数字，n 小数点后面的
%ni 整数
\a 警告声音
\b 输出退格键
\f 清楚屏幕
\n 换行
\r 回车
\t tab
\v 垂直输出 tab

### awk

awk ‘条件 1{动作 1} 条件 2{动作 2}...’ 文件名

动作 ：格式化输出，流程控制

awk 是先读入第一行数据，在进行处理，因此经常有第一行不被处理，所以 BEGIN 条件很重要。

```bash
awk '{printf $2 "\t" $6"\n"}' student.txt
输出文件当中的第2，6列。格式本来用单引号括起来，但是单引号已经被用了
```

```bash
df -h | awk '{print $1 "\t" $5 "\t" $6}'
awk支持print，末尾自动有换行符
```

条件： BEGIN 所有数据读取前执行后面的动作

```bash
awk 'BEGIN{print "this is a testfile"} {print $2 "\t" $5}'
动作和条件之间没有空格
```

条件：END 所有数据执行完毕后的动作
动作：FS=”“ 指定分隔符

### sed 命令

编辑器
sed 比 vi 优先，可以处理管道当中的结果

sed [选项]['动作'] 文件名
-n 只输出修改的行
-e 允许对输入数据应用多条 sed 命令编辑，用;隔开
-i 用 sed 的修改结果直接修改读取数据的文件，而不是屏幕输出

动作
a，追加 ’2a hello‘ 在第二行后追加 hello
c，改变
i，行前插入
p，打印 ‘2p'打印第二行
d，删除 ’2，4d‘ 删除 2 到 4 行
s,替换 s/前/后/g
\ 插入多行时，出最后一行，其余的行都要加，表示数据未完结

## source 命令

source 配置文件
或者
. 配置文件

强制的让当前配置文件生效

## 字符处理命令

### 排序

sort 选项 文件名
-f 忽略大小写
-n 数值型进行排序
-r 反向排序
-t 指定分隔符，默认是制表符
-k n，m 从第 n 字段开始到 m 字段范围内排序
`sort -t ":" -k 3,3 -n /etc/passwd` 使用第三列进行排序，就跟一个表似的

### wc 统计命令

wc 选项 文件名

-l 行
-m 字符数
-w 单词数

## 条件判断

### 判断文件类型

![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304145028.png)

`test -e /root/install.log`
或者
`[ -e /root/install.log ] 括号里面的两边都需要空格

### 判断文件权限

![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304145750.png)

不会区分所有者，所有组，其他人，

### 文件之间的比较

![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304145952.png)

### 两个数的比较

![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304150236.png)

### 字符串的比较

![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304150348.png)

### 多重条件判断

![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304150833.png)

## 判断语句

单分支判断

![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304160210.png)

双分支判断
![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304161701.png)

case 语句
![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304165443.png)
两个分号，\* 也需要引号

for
![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304182304.png)

![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304183002.png)
可以把所有的 tar 写入到一个文件当中，然后循环执行
![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304182905.png)

while
![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304185309.png)
util
![](https://lalala-1252702812.cos.ap-shanghai.myqcloud.com/article/20200304191652.png)
