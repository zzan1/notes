<!-- TOC GFM -->

+ [vim basic usage](#vim-basic-usage)
	* [录制宏](#录制宏)
	* [多光标操作](#多光标操作)
+ [`<Leader>` 有空格开始的快捷键](#leader-有空格开始的快捷键)
+ [markdown edit 以 `,` 开始](#markdown-edit-以--开始)
+ [分屏和标签页](#分屏和标签页)
+ [表格工具插件](#表格工具插件)
+ [nerdtree 文件浏览器](#nerdtree-文件浏览器)
+ [emmet vim](#emmet-vim)
+ [autopairs](#autopairs)
+ [prettier](#prettier)
+ [coc](#coc)
	* [`CocList extensions` 查看插件工作状态](#coclist-extensions-查看插件工作状态)
	* [`coc-emmet` 的相关问题](#coc-emmet-的相关问题)
	* [`coc-explorer`](#coc-explorer)
	* [`coc-translate`](#coc-translate)
+ [vim 绑定键位的相关指令](#vim-绑定键位的相关指令)

<!-- /TOC -->

# vim basic usage

| shortcut    | function           | commit     |
| ----------- | ------------------ | ---------- |
| Q           | 退出所有           |            |
| q           | 退出               |            |
| S           | 保存文件           |            |
| 0/\$        | 行尾，行首         |            |
| > <         | 缩进和取消缩进     |            |
| H L         |                    |            |
| W B w b e   | 按词来移动光标     |            |
| i a I A     | 调整插入位置       |            |
| o O         | 上一行，下一行编辑 |            |
| d           | 剪切操作           |            |
| c           | 改变操作           |            |
| y           | 复制操作           |            |
| Y           | 复制整行到剪贴板   |            |
| r           | 替换一个字符       |            |
| R           | 替换模式           |            |
| :s/A/b/g    | 替换               | g 代表整行 |
| #,#/s/A/b/g | 指定行替换         |            |
| %s/A/B/g    | 全文替换           |            |

## 录制宏

先按 `q` 开始录制宏，然后在二十六个字母当中任选一个作为宏名字。这就正式录制开始了。
使用宏 `@name` 用名字使用宏。可以制定多少次使用，在前面加上数字

## 多光标操作

vim 可以使用多光标，在可视化当中选择好需要多光标的部分之后。只能使用 `I A` 这两种插入模式。注意，在编辑过程中不会同步出现效果，在编辑结束后出现效果。

---

# `<Leader>` 有空格开始的快捷键

| shortcut | function           | commit       |
| -------- | ------------------ | ------------ |
| 回车     | 取消高亮结果       |              |
| dw       | 查找重复词         |              |
| o        | 折叠和取消折叠     | 按照缩进折叠 |
| sc       | 拼写检查           |              |
| q        | 关闭当前下面的分屏 |              |

---

# markdown edit 以 `,` 开始

| shortcut    | function       | commit |
| ----------- | -------------- | ------ |
| b           | 加粗           |        |
| s           | 删除线         |        |
| i           | 斜体           |        |
| d           | 行内代码       |        |
| c           | 大段代码       |        |
| m           | todo list      |        |
| p           | picture        |        |
| a           | link           |        |
| 1, 2, 3, 4, | head           |        |
| l           | split line     |        |
| f           | 快速跳转       |        |
| w           | 比上面多个回车 |        |
| 两个空格    | 快速跳转       |        |

---

# 分屏和标签页

| shortcut | function             | commit         |
| -------- | -------------------- | -------------- |
| s kjhl   | 创建分屏             |                |
| 上下左右 | 调整分屏大小         |                |
| s wd     | 调整为左右，上下分屏 | 需要当前有分屏 |

| shortcut | function       | commit |
| -------- | -------------- | ------ |
| tu       | 创建一个标签页 |        |
| ta td    | 循环标签页     |        |
| tmd tma  | 移动标签页位置 |        |

---

# 表格工具插件

| shortcut  | function     | commit |
| --------- | ------------ | ------ |
| leader tm | 开启表格模式 |        |

# nerdtree 文件浏览器

| shortcut   | function           | commit   |
| ---------- | ------------------ | -------- |
| tt         | 打开               |          |
| go         | 预览               |          |
| t          | 在标签页中打开     |          |
| i          | 分割视图中打开     |          |
| 回车       | 直接打开           |          |
| ---------- | ------------------ | -------- |
| o          | 打开文件节点       |          |
| I          | 显示隐藏文件       |          |
| C          | 选择为当前文件夹   |          |

# emmet vim

每个代码段都得使用 `Ctrl y ,` 来使用相应的快捷键

| shortcut       | function                   | commit |
| --------       | --------                   | ------ |
| html:5         | 基本结构                   |        |
| div>p#foo$*3>a | $ 自增长                   |        |
| d              | 选择包裹光标的第一个标签体 |        |
| n              | 跳转到下一个编辑点         |        |
| k              | 删除标签对                 |        |
| /              | 注释                       |        |
| []             | 属性                       |        |
| {}             | 标签内部的文本             |        |
| +              | 兄弟元素                   |        |

可以先键入多行文本，然后选中他们，在命令行中输入 `ul>li*` 就可以实现多个 li 结构，`*` 代表多个元素。

# autopairs

| shortcut | function     | commit |
| -------- | ------------ | ------ |
| alt n    | 快速跳出括号 |        |

# prettier

| shortcut  | function | commit |
| --------- | -------- | ------ |
| leader pr | 格式代码 |        |

# coc

coc 是一个代码补全插件，是从 Vscode 来的。

安装方法和默认的配置文件都在 github 的相应有的。

安装相应的 coc 的插件可以在`.config/coc/extensions/node_modules` 下使用 `yarn add extensions-name` 来安装。

使用的快捷键

| shortcut             | function                           | commit |
|----------------------|------------------------------------|--------|
| Tap                  | 在建议当中循环                     |
| shift Tab            | 向上循环建议                       |
| ctrl g u             | 撤销上一次的补充结果               |
| ctrl j k             | 在修改的地方循环，跟vscode一样     |        |
| K                    | 找相应的文档                       |        |
| []g                  | 前后错误                           |        |
| gd, gr，gi           | 定义和参考位置, 用的地方           |        |
| leader cr            | rename                             |        |
| leader cf            | format                             |        |
| leader cc            | correct auto fix                   |        |
| leader ca            | 诊断代码                           |        |
| leader ce            | extensions                         |        |
| leader cb            | commands                           |        |
| leader co            | CocList outline                    | _      |
| leader cs            | coclist -I symbol                  | _      |
| leader cj ck         | next, previous                     |        |
| leader cp            | CocList Resume                     | \*     |
| leader cma, cmb, cmc | bookmard create, annotate and list |        |
| leader cf cr         | translate                          |        |
... 还有很多快捷键，等待发现。

## `CocList extensions` 查看插件工作状态

- `*` the extensions is actived;
- `?` the extensions is invalid;
- `-` extensions is disable;
- `+` extensions is loaded, but not actived;

coc 可以像 vscode 那样为工作区进行特定的配置，通过 `CocLocalConfig` 来访问。
查看键是不是被已经使用，可以通过 `:verbose imap keys` 来看。

## `coc-emmet` 的相关问题

不用进行仔细配置，过程中会出现网络问题，通过**代理** `CocList extensions emmet fix` 来修复。

## `coc-explorer` 
| shortcut   | function                                | comment |
|------------|-----------------------------------------|---------|
| leader ct  | open exploer                            |         |
| ?          | function list                           |         |
| k, j       | move cursor                             |         |
| K,J        | selection                               |         |
| o          | expand or Collapse                      |         |
| backspace  | return parent file                      |         |
| return     | open or cd depend on the type of file   |         |
| t, s, E, e | tab, split, vsplit and open file        |         |
| y, Y, c, x | copy fielpath, filename, file, cutfile  |         |
| p          | paste file                              |         |
| d, D       | delete, delete Forever                  |         |
| a, A       | add file, add directory                 |         |
| r          | rename                                  |         |
| .          | toggle hidden                           |         |
| R          | refresh                                 |         |
| f          | find file in the current directory      |         |
| gs, gf, gb | go select, go file source, go buffer    |         |
| [[, ]]     | ranger like                             |         |
| [m, [d, [c | go to modified, diagnostic, git changed |         |

## `coc-translate` 
支持导出查词历史。

# vim 绑定键位的相关指令

Overview of which map command works in which mode. More details below.
COMMANDS MODES ~
```
:map :noremap :unmap Normal, Visual, Select, Operator-pending
:nmap :nnoremap :nunmap Normal
:vmap :vnoremap :vunmap Visual and Select
:smap :snoremap :sunmap Select
:xmap :xnoremap :xunmap Visual
:omap :onoremap :ounmap Operator-pending
:map! :noremap! :unmap! Insert and Command-line
:imap :inoremap :iunmap Insert
:lmap :lnoremap :lunmap Insert, Command-line, Lang-Arg
:cmap :cnoremap :cunmap Command-line
:tmap :tnoremap :tunmap Terminal
```
