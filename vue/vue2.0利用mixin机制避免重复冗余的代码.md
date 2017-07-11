假设你有100个组件, 你希望每个组件都定义两个相同的计算属性`session`和`error`, 那么应该这样做:
```js
var computedMixin = {
  computed: {
    error: {
      get () {
        return this.$store.state.error
      },
      set (val) {
        this.$store.commit('error', val)
      }
    },
    session: {
      get () {
        return this.$store.state.session
      },
      set (val) {
        this.$store.commit('session', val)
      }
    },
  },
}

var app = new Vue({
  mixins: [computedMixin]
})
// 现在app.session和app.error就可以了.
```
还有种方法是通过`Vue.mixin`定义, 但是这个会影响到所有Vue实例, 包括npm安装的第三方组件. 一不小心就会覆盖, 所以并不推荐.

参考链接:
- https://vuejs.org/v2/guide/mixins.html
- https://stackoverflow.com/a/45023798/2803340
