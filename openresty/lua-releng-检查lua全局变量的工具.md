无意中发现openresty用`lua-releng`来检查lua文件中的全局变量情况(读和写). 还不错, 顺带发现春哥的`openresty-devel-utils`库.
如果提示luac没有安装,运行
```
apt-get install lua5.1
```
该脚本只支持一个文件, 因此需要结合find使用:
```
find . -name "*.lua" -exec lua-releng {} \; | grep -E "SETG|(global)"
```
参考:
- https://github.com/openresty/openresty-devel-utils/blob/master/lua-releng
- https://segmentfault.com/a/1190000004297908
