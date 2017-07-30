说是safe, 其实也不太safe. 我无意中以这样的形式调用:
```lua
local cjson_decode = require "cjson.safe".decode
cjson_decode('[]', 1)
```
结果报错:
```
bad argument #1 to 'cjson_decode' (expected 1 argument)
```
显然这个函数限制了参数的个数. 真不知道为什么要限制. 多传的参数静默忽略掉不更好么?
由于我把这个函数和其他函数合成, 加上lua简陋的报错信息, 这个bug让我找了一个小时. 备忘.
