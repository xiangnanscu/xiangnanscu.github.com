<template>
<div id="app" class="container">
    <div v-if="error" class="alert alert-danger" role="alert">{{error}}</div>
    <span v-if="loading" class="glyphicon glyphicon-refresh load"></span>
    <router-view></router-view>
</div>
</template>

<script>
import folderView from './folder.vue'
import fileView from './file.vue'

var bus = new Vue()
var username = window.location.host.split('.')[0] || 'xiangnanscu'
var PREFIX = 'https://api.github.com/repos/'+username+'/'+username+'.github.com/contents'
var COMMIT_URL = 'https://api.github.com/repos/'+username+'/'+username+'.github.com/git/commits/'
var REQUEST_TIMEOUT = 3000 // 请求github api的最长时间
var ERROR_DISPLAY_TIME = 3000
var CACHE = {}
var ACTIVE_ROOT = [{
    active: true,
    name: 'home',
    path: '/'
}]
var ROOT = [{
    active: false,
    name: 'home',
    path: '/'
}]
marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
})

var router = new VueRouter({
    linkActiveClass: "router-link-active",
    linkExactActiveClass: "router-link-exact-active",
    routes: [{
        path: '/',
        redirect: '/folder',
    }, {
        path: '/folder:path(.*)',
        component: folderView,
        props: function (route) {
            console.log('folder route.params.path', route.params.path)
            return {
                path: route.params.path
            }
        },
    }, {
        path: '/file:path(.+)',
        component: fileView,
        props: function (route) {
            console.log('file route.params.path', route.params.path)
            return {
                path: route.params.path
            }
        },
    }, ],
})

export {PREFIX, CACHE, REQUEST_TIMEOUT, ACTIVE_ROOT, ROOT, ERROR_DISPLAY_TIME}

export default {
    data() {
        return {
            loading: false,
            error: null,
        }
    },
    created() {
        bus.$on('set-loading', () => {
            this.loading = !this.loading
        })
        bus.$on('set-error', (message) => {
            this.error = message
            setTimeout(() => {
                this.error = null
            }, ERROR_DISPLAY_TIME)
        })
    },
    router: router,
}
</script>
