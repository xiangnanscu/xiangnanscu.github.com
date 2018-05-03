手贱, git stash, 然后git reset --hard 然后commit之后发现有个文件误删了. 还好git一切都保存. 简言之:
```
git reflog # 查看所有的ref变化,包括commit, reset
git reset 'HEAD@{1}' # 回到某次reset, 数字不一定是1
```
总之, 多试几次, 在某个时候用git stash,你会发现文件都回来了,下面是全过程.
```
1355  git add . && git commit -am "移动libs到本地,方便迭代开发"
 1356  git stash
 1357  git log
 1358  git reset --hard 52eb9299a83afeedbe672136a823df6aeb072dad
 1359  git add . && git commit -am "移动libs到本地,方便迭代开发"
 1360  git push origin dev
 1361  git add . && git commit -am "移动libs到本地,方便迭代开发"
 1365  git log
 1366  git add . && git commit -am "移动libs到本地,方便迭代开发"
 1367  git push origin dev
 1369  git log
 1370  git reset --hard 52eb9299a83afeedbe672136a823df6aeb072dad
 1371  git log
 1372  git reflog
 1373  git reset 'HEAD@{5}'
 1374  git reflog
 1375  git reset 'HEAD@{7}'
 1376  git reflog
 1377  git reset 'HEAD@{7}'
 1378  git status
 1379  git stash pop
 1380  git status
 1381  git stash list
 1382  git reflog
 1383  git stash
 1384  git add . && git commit -am "惊险恢复"
 1389  git add . && git commit -am "惊险恢复"
 1391  git push
```
参考链接:
- https://stackoverflow.com/questions/2510276/undoing-git-reset
- https://stackoverflow.com/questions/10827160/undo-a-git-stash
