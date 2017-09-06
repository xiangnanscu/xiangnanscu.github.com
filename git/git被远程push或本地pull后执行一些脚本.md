```shell
cd .git/hooks
echo -e '#!/bin/bash\n/usr/local/openresty/nginx/sbin/nginx -p /path -c /path/config/prod.conf -s reload' >> post-receive
chmod a+x post-receive
cp post-receive post-merge
```
