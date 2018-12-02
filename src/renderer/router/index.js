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
            path: '/setting',
            name: 'setting',
            component: require('@/components/Setting').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
