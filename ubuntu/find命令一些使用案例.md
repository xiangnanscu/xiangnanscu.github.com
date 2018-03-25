# 查找并返回包含某些字符的文件名和对应行, 并且限制行的字数
比如你想在当前文件夹查找js文件中包含单词`routeTo`的行, 并且限制返回的字符为前后最多20个.
```shell
N=20;find . -name "*.js" | xargs grep  -roP ".{0,$N}\brouteTo\b.{0,$N}"
```
如果是想在lua文件中查找, 那么需要使用`-o`
```shell
N=20;find . -name "*.js" -o  -name "*.lua" | xargs grep  -roP ".{0,$N}\brouteTo\b.{0,$N}"
```
参考:
- https://stackoverflow.com/a/7190624/2803340
- https://www.gnu.org/software/findutils/manual/html_node/find_html/Shell-Pattern-Matching.html

# 查找并替换字符
例如想把所有lua文件里面的`mc.`字符替换为`resty.`,注意`.`需要转义`\.`
```shell
find . -name "*.lua" -type f -exec sed -i 's/mc\./resty./g' {} +
```
注意: mac os x 不适用此方法
参考:
- https://unix.stackexchange.com/questions/112023/how-can-i-replace-a-string-in-a-files?newreg=17b646d45f104f1ea58eaa3512e62ed6
- https://stackoverflow.com/questions/19456518/invalid-command-code-despite-escaping-periods-using-sed
