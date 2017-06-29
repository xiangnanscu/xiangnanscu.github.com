var PREFIX = 'https://api.github.com/repos/xiangnanscu/lua-resty-mvc/contents'

var d = `
<div>
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">
      文章
    </h3>
  </div>
  <div class="panel-body">
    <table class="table table-hover">
      <tbody>
        <tr v-for="file in files">
          <td>
            <router-link :to="'/file/'+file.path" class="btn btn-primary" role="button">{{file.name}}</router-link>
          </td>
          <td>
            ok
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">
      类别
    </h3>
  </div>
  <div class="panel-body">
    <ul v-for="folder in folders" class="nav nav-pills nav-stacked">
      <li role="presentation">
        <router-link :to="'/folder/'+folder.path">{{folder.name}}</router-link>
      </li>
    </ul>
  </div>
</div>
</div>
`

var folderView = new Vue({
    template: d,
    props: {
        path: {type: String, default: ''}
    },
    created: function () {
      Vue.http.get(PREFIX + this.path).then(
        function(response){
          this.data = response.body
        },
        function(response){
          alert('Fail to get data')
        }
      ); 
    },
    computed: {
        files: function () {
          return this.data.filter(
            function (e) {
                return e.type == 'file'
            }
          ).map(
            function (e) {
                return e
            }
          )
        },
        folders: function () {
          return this.data.filter(
            function (e) {
                return e.type == 'dir'
            }
          ).map(
            function (e) {
                return e
            }
          )
        },    
    },
})

var fileView = new Vue({
    template: f,
    props: {
        path: {type: String, default: ''}
    },
})

var router = new VueRouter({
  linkActiveClass: "router-link-active",
  linkExactActiveClass: "router-link-exact-active",
  routes: [
    {
      path: '/', 
      redirect: '/folder',
    },
    {
      path: '/folder/:path', 
      component: folderView,
    },
    {
      path: '/file/:path', 
      component: fileView,
    },
  ],
})

new Vue({router}).$mount('#app')
