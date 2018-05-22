```shell
cd .git/hooks
echo -e '#!/bin/bash\n/usr/local/openresty/nginx/sbin/nginx -p /path -c /path/config/prod.conf -s reload' >> post-receive
chmod a+x post-receive
cp post-receive post-merge
```
另外, 如果是想push一个远程non-bare的仓库, 还需首先在远程服务器git目录设置:
```
git config receive.denyCurrentBranch updateInstead
```
