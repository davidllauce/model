import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * VUE: vue-router config
 */
Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'guest',
            component: () => System.import('../templates/Guest'),
            meta: {
                forVisitors: true,
            },
            children: [
                {
                    path: '/',
                    name: 'nota20',
                    component: () => System.import('../components/guest/Index'),
                    meta: {
                        forVisitors: true
                    },
                },
                {
                    path: '/login',
                    name: 'login',
                    component: () => System.import('../components/guest/Login'),
                    meta: {
                        forVisitors: true
                    }
                }
            ]
        },
        {
            path: '/app',
            name: 'app',
            component: () => System.import('../templates/App'),
            meta: {
                forAuth: true,
            },
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => System.import('../components/Home'),
                    meta: {
                        forAuth: true,
                        restricted: false
                    }
                },
                {
                    path: '/roles',
                    name: 'roles',
                    component: () => System.import('../components/role/Index'),
                    meta: {
                        forAuth: true,
                        restricted: true,
                        permission: 'roles-index'
                    }
                },
                {
                    path: '/permission-roles',
                    name: 'permissionroles',
                    component: () => System.import('../components/role/Permission'),
                    meta: {
                        forAuth: true,
                        restricted: true,
                        permission: 'roles-permission'
                    }
                },
                {
                    path: '/profiles',
                    name: 'profiles',
                    component: () => System.import('../components/my-profile/Index'),
                    meta: {
                        forAuth: true,
                        restricted: false,
                    }
                },

                {
                    path: '/access',
                    name: 'access',
                    component: () => System.import('../components/user/Index'),
                    meta: {
                        forAuth: true,
                        restricted: true,
                        permission: 'users-index'
                    }
                },
                {
                    path: '/my-access',
                    name: 'myaccess',
                    component: () => System.import('../components/my-access/Index'),
                    meta: {
                        forAuth: true,
                        restricted: false,
                    }
                },
               
                {
                    path: '/not-authorized',
                    name: 'not-authorized',
                    component: () => System.import('../components/errors/NotAuthorized'),
                    meta: {
                        forAuth: true,
                        restricted: false,
                    }
                },
                {
                    path: '/not-found',
                    name: 'not-found',
                    component: () => System.import('../components/errors/NotFound'),
                    meta: {
                        forAuth: true,
                        restricted: true,
                    }
                }
            ]
        },
        {
            path: '*',
            redirect: '/not-found',
            meta: {
                forAuth: true,
            },
        },

    ]
});
