<template>
<div>
  <ol class="breadcrumb">
    <li v-for="e in navList" :class="{active:e.active}">
      <router-link v-if="e.active" :to="e.path">{{e.name}}</router-link>
      <template v-else>{{e.name}}</template>
</li>
</ol>
<h1 class="title">{{title}}</h1>
<div class="markdown-body" v-html="content"></div>
<hr>
<p>
    <a class="btn btn-default" :href="html_url">github</a>
    <a class="btn btn-default" :href="download_url">raw</a>
    <a class="btn btn-default" :href="edit_url">edit</a>
</p>
</div>
</template>

<script>
export default {
    props: {
        path: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
            content: '',
            title: '',
            download_url: '',
            html_url: '',
            commit_time: '',
        }
    },
    methods: {
        fetchData() {
            var url = PREFIX + this.path
            if (CACHE[url]) {
                console.log('read from cache')
                this.content = CACHE[url].content
                this.title = CACHE[url].title
                this.download_url = CACHE[url].download_url
                this.html_url = CACHE[url].html_url
                    // this.commit_time = CACHE[url].commit_time
            }
            else {
                bus.$emit('set-loading')
                Vue.http.get(url, {
                    timeout: REQUEST_TIMEOUT
                }).then(
                    response => {
                        bus.$emit('set-loading')
                        var b = response.body
                        this.content = marked(decodeURIComponent(escape(atob(b.content))))
                        this.title = b.name.slice(0, -3)
                        this.download_url = b.download_url
                        this.html_url = b.html_url
                        CACHE[url] = {
                                content: this.content,
                                title: this.title,
                                download_url: this.download_url,
                                html_url: this.html_url,
                            }
                            // Vue.http.get(COMMIT_URL+b.sha).then(
                            //   response => {
                            //     this.commit_time = '2010' //response.obdy
                            //   },
                            //   response => {},
                            // )
                    },
                    response => {
                        bus.$emit('set-loading')
                        bus.$emit('set-error', response.bodyText || '加载文章失败, 将自动重新尝试')
                        setTimeout(() => {
                            this.fetchData()
                        }, REQUEST_TIMEOUT + 500)
                    }
                )
            }
        },
    },
    watch: {
        '$route': 'fetchData',
    },
    updated() {
        console.log('file updated')
    },
    mounted: function () {
        this.fetchData()
    },
    computed: {
        edit_url() {
            return this.html_url.replace('/blob/', '/edit/')
        },
        navList() {
            var p = '/folder'
            var ret = this.$route.params.path.slice(1).split('/').slice(0, -1)
                .filter(name => name != "").map(
                    name => {
                        p = p + '/' + name
                        return {
                            active: true,
                            name: name,
                            path: p
                        }
                    }
                )
            return ACTIVE_ROOT.concat(ret)
        },
    },
}
</script>
