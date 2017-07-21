简言之, `watch`更通用, 可以包含异步操作, `computed`局限在同步操作. 实践中, 如果没有异步操作, 那么就用`computed`.

参考:
- https://vuejs.org/v2/guide/computed.html#Computed-vs-Watched-Property
