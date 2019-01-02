import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Welcome',
            component: require('@/components/Welcome').default
        },
        {
            path: '/file/target',
            name: 'TargetPath',
            component: require('@/components/File/TargetPath').default
        },
        {
            path: '/file/save',
            name: 'saveFileList',
            component: require('@/components/File/SaveFileList').default
        },
        {
            path: '/setting/file/save/path',
            name: 'settingSavePath',
            component: require('@/components/Setting/File/SavePath').default
        },
        {
            path: '/setting/file/target/path',
            name: 'settingTargetPath',
            component: require('@/components/Setting/File/TargetPath').default
        },
        {
            path: '/setting/tags',
            name: 'settingTags',
            component: require('@/components/Setting/Tags').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
