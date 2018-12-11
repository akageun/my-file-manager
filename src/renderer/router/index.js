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
            path: '/file',
            name: 'file',
            component: require('@/components/File').default
        },
        {
            path: '/file/target',
            name: 'targetFileList',
            component: require('@/components/File/TargetFileList').default
        },
        {
            path: '/file/save',
            name: 'saveFileList',
            component: require('@/components/File/SaveFileList').default
        },
        {
            path: '/setting',
            name: 'setting',
            component: require('@/components/Setting').default
        },
        {
            path: '/setting/filePath',
            name: 'settingFilePath',
            component: require('@/components/Setting/FilePathManage').default
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
