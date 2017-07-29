# 前置要求
要求`luac`和`lua`命令可用. 这个很简单, 通过`apt-get install lua5.1`就搞定
# 用法
为了全局使用, 把脚本移到`mv lglob /usr/bin`.
例如, 你想检查`~/path/`文件夹下所有的lua文件的全局变量设置情况
```
lglob ~/path/*.lua 2>&1 | grep ' set '
```
但上面不是递归查找的, 如果要递归, 需要CD进那个目录:
```
cd ~/path/ && lglob . 2>&1 | grep ' set '
```
得到的类似输出:
```
root@i:~/ngx# lglob . 2>&1 | grep ' set '
lglob: apps/init.lua:2: undefined set utils
lglob: apps/init.lua:3: undefined set loger
lglob: apps/init.lua:13: undefined set get_apps
lglob: apps/init.lua:16: undefined set apps
```
上面就表示utils等是全局变量

参考:
- https://github.com/stevedonovan/lglob
- https://github.com/stevedonovan/lglob/issues/6
