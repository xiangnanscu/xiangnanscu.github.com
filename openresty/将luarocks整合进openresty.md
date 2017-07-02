# 缘由
随着功能需求的深入, openresty领域的包已经不够用了, 需要lua领域本身累积的库, 也就是luarocks.本文讲解了windows 10桌面和ubuntu server两套系统的方法
# Ubuntu Server
比较简单, 无脑敲命令即可
```shell
$ wget https://luarocks.org/releases/luarocks-2.4.1.tar.gz
$ tar zxpf luarocks-2.4.1.tar.gz
$ cd luarocks-2.4.1
$ ./configure --prefix=/usr/local/openresty/luajit \
    --with-lua=/usr/local/openresty/luajit/ \
    --lua-suffix=jit \
    --with-lua-include=/usr/local/openresty/luajit/include/luajit-2.1
$ make build && make install
```
## 安装luasql-postgres
```shell
apt-get install libpq-dev
luarocks PGSQL_INCDIR=/usr/include/postgresql/ install luasql-postgres
```

mysql同理. 安装之后
`luarocks install luasql-mysql MYSQL_INCDIR=/usr/include/mysql `

# Windows 10
这个就比较复杂了. 
## 安装MinGW
其实这个是可选项, 如果你的系统路径能找到MSVC的编译器, 那么这一步可以忽略. 
为了让以后windwos进行linux相关的作业简单点, 长痛不如短痛, 干脆就装了MinGW吧.

1. 点击此处下载:https://sourceforge.net/projects/mingw/files/latest/download?source=files
2. 双击`mingw-get-setup.exe`, 记得勾选图形界面(默认是勾选的), 这样会让你选择具体安装哪些东西时比较方便
3. 在MinGW Installer图形界面勾选`mingw32-base`, 然后开始在线安装.

国内网速不是很好,断断续续的, 可能要等半天. 但最终我还是安装上了.
按默认路径安装你会发现`C:\MinGW\bin\mingw32-gcc.exe`这个玩意出现, 它就是luarocks要的东西.**最后把C:\MinGW\bin加入windows环境变量**
## 下载luarocks
以2.4.2为例, windows版的下载链接:http://luarocks.github.io/luarocks/releases/luarocks-2.4.2-win32.zip
下载完解压,这里注意下, 以管理员权限打开cmd窗口再cd进luarocks-2.4.2-win32文件夹
## 配置并安装luarocks
这里, 假设windows上openresty文件夹的路径为:`%USERPROFILE%\Desktop\openresty`
## 开始安装
在cmd依次敲下面两个命令
```
set PREFIX=%USERPROFILE%\Desktop\openresty
install /P %PREFIX%\luarocks /SELFCONTAINED /INC %PREFIX%\include\luajit-2.1 /LIB %PREFIX% /BIN %PREFIX% /MW
```
/P 表示把luarocks安装在openresty的luarocks文件夹
/SELFCONTAINED 表示/TREE和/CONFIG选项的值和/P一致. 这样就所有玩意都在luarocks这个文件里,方便查找.
/INC 表示luajit的include库所在的文件夹 
/LIB 表示`lua51.dll`所在的文件夹 
/BIN表示`luajit.exe`所在的文件夹
/MW表示用`mingw32-gcc.exe`编译器.
## 完成安装
正常情况下. 在命令行看到如下输出:
```shell
C:\Users\xn\Desktop\luarocks-2.4.2-win32>install /P %PREFIX%\luarocks /SELFCONTAINED /INC %PREFIX%\include\luajit-2.1 /LIB %PREFIX% /BIN %PREFIX% /MW

C:\Users\xn\Desktop\luarocks-2.4.2-win32>rem=rem --[[
LuaRocks 2.4.x installer.


========================
== Checking system... ==
========================


Admin privileges available for installing
Looking for Lua interpreter
       Found luajit.exe, testing it...
    checking for C:\Users\xn\Desktop\openresty\lua5.1.lib
    checking for C:\Users\xn\Desktop\openresty\lua51.lib
    checking for C:\Users\xn\Desktop\openresty\lua5.1.dll
    checking for C:\Users\xn\Desktop\openresty\lua51.dll
       Found lua51.dll
    checking for C:\Users\xn\Desktop\openresty\include\luajit-2.1\lua.h
       Found lua.h
    C:\Users\xn\Desktop\openresty\luajit.exe uses MSVCRT.DLL as runtime
Runtime check completed.

==========================
== System check results ==
==========================

Will configure LuaRocks with the following paths:
LuaRocks        : C:\Users\xn\Desktop\openresty\luarocks
Config file     : C:\Users\xn\Desktop\openresty\luarocks\config-5.1.lua
Rocktree        : C:\Users\xn\Desktop\openresty\luarocks\systree

Lua interpreter : C:\Users\xn\Desktop\openresty\luajit.exe
    binaries    : C:\Users\xn\Desktop\openresty
    libraries   : C:\Users\xn\Desktop\openresty
    includes    : C:\Users\xn\Desktop\openresty\include\luajit-2.1
    architecture: x86
    binary link : lua51.dll with runtime MSVCRT.dll

Compiler        : MinGW (make sure it is in your path before using LuaRocks)

Press <ENTER> to start installing, or press <CTRL>+<C> to abort. Use install /? for installation options.


============================
== Installing LuaRocks... ==
============================


Installing LuaRocks in C:\Users\xn\Desktop\openresty\luarocks...
Created LuaRocks command: C:\Users\xn\Desktop\openresty\luarocks\luarocks.bat
Created LuaRocks command: C:\Users\xn\Desktop\openresty\luarocks\luarocks-admin.bat

Configuring LuaRocks...
Created LuaRocks site-config file: C:\Users\xn\Desktop\openresty\luarocks\lua\luarocks\site_config_5_1.lua
Created LuaRocks config file: C:\Users\xn\Desktop\openresty\luarocks\config-5.1.lua

Creating rocktrees...
Created system rocktree    : "C:\Users\xn\Desktop\openresty\luarocks\systree"
Local user rocktree exists : "C:\Users\xn\AppData\Roaming\LuaRocks"

============================
== LuaRocks is installed! ==
============================


You may want to add the following elements to your paths;
Lua interpreter;
  PATH     :   C:\Users\xn\Desktop\openresty
  PATHEXT  :   .LUA
LuaRocks;
  PATH     :   C:\Users\xn\Desktop\openresty\luarocks
  LUA_PATH :   C:\Users\xn\Desktop\openresty\luarocks\lua\?.lua;C:\Users\xn\Desktop\openresty\luarocks\lua\?\init.lua
Local user rocktree (Note: %APPDATA% is user dependent);
  PATH     :   %APPDATA%\LuaRocks\bin
  LUA_PATH :   %APPDATA%\LuaRocks\share\lua\5.1\?.lua;%APPDATA%\LuaRocks\share\lua\5.1\?\init.lua
  LUA_CPATH:   %APPDATA%\LuaRocks\lib\lua\5.1\?.dll
System rocktree
  PATH     :   C:\Users\xn\Desktop\openresty\luarocks\systree\bin
  LUA_PATH :   C:\Users\xn\Desktop\openresty\luarocks\systree\share\lua\5.1\?.lua;C:\Users\xn\Desktop\openresty\luarocks\systree\share\lua\5.1\?\init.lua
  LUA_CPATH:   C:\Users\xn\Desktop\openresty\luarocks\systree\lib\lua\5.1\?.dll

Note that the %APPDATA% element in the paths above is user specific and it MUST be replaced by its actual value.
For the current user that value is: C:\Users\xn\AppData\Roaming.
```
提示得很贴心了.把`%USERPROFILE%\Desktop\openresty\luarocks`加入系统路径, 再试试`luarocks install luafilesystem`
如果一切顺利,你会发现`%USERPROFILE%\Desktop\openresty\luarocks\systree\lib\lua\5.1`下出现了`lfs.dll`, 这就说明安装成功了.
# 配置nginx路径
包是成功安装好了, 那么怎么让nginx能找到它呢, 在配置文件里这样搞:
```
http {
    lua_package_path "C:\Users\xn\Desktop\openresty\luarocks\systree\share\lua\5.1\?.lua;C:\Users\xn\Desktop\openresty\luarocks\systree\share\lua\5.1\?\init.lua;;";  
    lua_package_cpath "C:\Users\xn\Desktop\openresty\luarocks\systree\lib\lua\5.1\?.dll;;";
}
```
# Hello world
最后lua里面`require('lfs')`, 大功告成



# 参考
- https://github.com/luarocks/luarocks/wiki/Installation-instructions-for-Windows
- http://www.tuicool.com/articles/fQZVJjQ
- https://luarocks.org/
- https://stackoverflow.com/questions/43189975/how-to-install-luasql-on-linux-ubuntu-16
