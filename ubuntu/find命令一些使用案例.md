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
