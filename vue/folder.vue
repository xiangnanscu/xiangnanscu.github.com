<template>
<div>
<ol class="breadcrumb">
  <li v-for="e in navList" :class="{active:e.active}">
    <router-link v-if="e.active" :to="e.path">{{e.name}}</router-link>
    <template v-else>{{e.name}}</template>
</li>
</ol>

<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">
            文章 ({{files.length}})
        </h3>
    </div>
    <div class="panel-body">
        <ul v-for="file in files" class="nav nav-pills nav-stacked">
            <li role="presentation">
                <router-link :to="'/file/'+file.path" role="button">{{file.name.slice(0,-3)}}</router-link>
            </li>
        </ul>
    </div>
</div>
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">
            文件夹 ({{folders.length}})
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
</template>

<script>
import {PREFIX, CACHE, REQUEST_TIMEOUT, ACTIVE_ROOT, ROOT, ERROR_DISPLAY_TIME, bus} from './varible.js' 

export default {
    props: {
        path: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            tree: [],
        }
    },
    methods: {
        fetchData() {
            var url = PREFIX + this.path
            console.log('folder:', url)
            if (CACHE[url]) {
                console.log('read from cache')
                this.tree = CACHE[url]
            }
            else {
                bus.$emit('set-loading')
                Vue.http.get(url, {
                    timeout: REQUEST_TIMEOUT
                }).then(
                    response => {
                        bus.$emit('set-loading')
                            // console.log(response)
                        CACHE[url] = response.body
                        this.tree = response.body
                    },
                    response => {
                        bus.$emit('set-loading')
                        bus.$emit('set-error', response.bodyText || '加载文件夹失败, 将自动重新尝试')
                        setTimeout(() => {
                                this.fetchData()
                            }, REQUEST_TIMEOUT + 500)
                            // console.log('Fail to get tree', response)
                    }
                )
            }
        },
    },
    watch: {
        '$route': 'fetchData',
    },
    updated() {
        console.log('folder updated')
    },
    mounted: function () {
        this.fetchData()
    },
    computed: {
        files() {
            return this.tree.filter(e => e.type == 'file' && e.name.slice(-3) == '.md')
        },
        folders() {
            return this.tree.filter(e => e.type == 'dir')
        },
        navList() {
            var path = this.$route.params.path
            if (path == '') {
                return ROOT
            }
            else {
                var p = '/folder'
                var ret = path.slice(1).split('/').map(
                    name => {
                        p = p + '/' + name
                        return {
                            active: true,
                            name: name,
                            path: p
                        }
                    }
                )
                ret[ret.length - 1].active = false
                return ACTIVE_ROOT.concat(ret)
            }
        },
    },
}
</script>
