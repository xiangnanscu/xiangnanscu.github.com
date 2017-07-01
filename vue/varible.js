var username = window.location.host.split('.')[0] || 'xiangnanscu'
export var PREFIX = 'https://api.github.com/repos/'+username+'/'+username+'.github.com/contents'
export var COMMIT_URL = 'https://api.github.com/repos/'+username+'/'+username+'.github.com/git/commits/'
export var REQUEST_TIMEOUT = 3000 // 请求github api的最长时间
export var ERROR_DISPLAY_TIME = 3000
export var CACHE = {}
export var ACTIVE_ROOT = [{
    active: true,
    name: 'home',
    path: '/'
}]
export var ROOT = [{
    active: false,
    name: 'home',
    path: '/'
}]