无意中发现openresty用`lua-releng`来检查lua文件中的全局变量情况(读和写). 还不错, 顺带发现春哥的`openresty-devel-utils`库.
如果提示luac没有安装,运行
```
apt-get install lua5.1
```
该脚本只支持一个文件, 因此需要结合find使用:
```
find . -name "*.lua" -exec perl lua-releng {} \; 2>&1 | grep -E "SETG|(global)"
```
`2>&1` 意思是把标准错误输出重定向到标准输出。以便grep统一过滤和处理.

参考:
- https://github.com/openresty/openresty-devel-utils/blob/master/lua-releng
- https://segmentfault.com/a/1190000004297908
