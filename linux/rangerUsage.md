# ranger
## basic usage

It is familiar with the vim, it use the `hjkl` to navigation and use `yy` functioned as copy and `pp` paste it and `dd` cuts the file. And more complex functions may be called from the command line invoked with `:`.

`ranger --copy-config=all` copy the four config files to `~/.config/ranger`.


## shortcuts

`zh` show the hidden file;

`r` choose the file open method;

`?` open the help, command, shortcut, setting document.

`t` mark the file, `" any other character` use personal character to mark the file;

`flat 1` show the 1 level sub file of the current file. 0 is disable , -1 is all;

`bulkrename` open the vim and copy the choosed file;

`gh` go home document;

`cw` rename, and can use A or I;

`m` create a bookmark;

`m` navigate the bookmark;

`um` delete the bookmark;

`o` order the file;

`pl L` copy the absolute / relative file path;

`w` task management, `dd` shutdown one task, `J K` promote/depormote the task order;

`C-f` use fzf-select find file;

`M` choose the linemode;

`:meta comment ...` add the comment to the file, it will not be added in the filename;

`h H` navigate the history;

`shift S` cd;

`yp yn y.` copy the path, name, name without expand name;


