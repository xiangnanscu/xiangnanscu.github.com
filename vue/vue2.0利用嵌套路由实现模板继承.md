# 关于模板继承
目前能想到 的是通过嵌套路由实现. 来自[这个链接](https://jsfiddle.net/yyx990803/L7hscd8h/). 你也许会说, 嵌套难道不可以直接通过父子组件来实现么? 当然可以, 但是假如此处的重点只是纯粹继承模板, 也就是html的排版, 如果使用父子组件, 那么属性的传递会很繁琐. 而通过嵌套路由, 你可以直接在router的定义代码中同时对各个层级的组件传递数据. 注意, 这是同一层级. 显然非常方便了.
# template
```
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <p>
    <router-link to="/user/foo">/user/foo</router-link>
    <router-link to="/user/foo/profile">/user/foo/profile</router-link>
    <router-link to="/user/foo/posts">/user/foo/posts</router-link>
  </p>
  <router-view></router-view>
</div>
```
# script
```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

const UserHome = { template: '<div>Home</div>' }
const UserProfile = { template: '<div>Profile</div>' }
const UserPosts = { template: '<div>Posts</div>' }

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        { path: '', component: UserHome },
				
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        { path: 'profile', component: UserProfile },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        { path: 'posts', component: UserPosts }
      ]
    }
  ]
})

const app = new Vue({ router }).$mount('#app')
```
