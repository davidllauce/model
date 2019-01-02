
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

const moment = 	require('moment');
				require('moment/locale/es');

/**
 * v-viewer
 */
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

/**
 * Routes with vue-router
 */
import router from './router'

/**
 * Store with vuex
 */
import store from './store'

/**
 * Vee-validate: config
 * Configured in spanish
 */
import es from 'vee-validate/dist/locale/es';
import VeeValidate, { Validator } from 'vee-validate'
Validator.localize('es', es);

/**
 * Package for authentication with passport
 */
import Auth from './packages/auth/Auth.js'
import Redirect from './packages/redirect/Redirect.js'
import Can from './packages/can/Can.js'

/**
 * Loading-placeholder, style facebook
 */
import VueContentPlaceholders from 'vue-content-placeholders'

/**
 * YouTube video
 */
import VueYouTubeEmbed from 'vue-youtube-embed'

/**
 * VUE: Use of extensions or components external
 */
Vue.use(VeeValidate);
Vue.use(VueContentPlaceholders)
Vue.use(Auth)
Vue.use(Redirect)
Vue.use(VueYouTubeEmbed)
Vue.use(Can)
Vue.use(Viewer)
Vue.use(require('vue-moment'), {
    moment
})

/**
 * Restricting access to pages
 */
router.beforeEach((to, from, next) => {
   
    if(to.matched.some(record => record.meta.forVisitors)){
        
        if(Vue.auth.isAuthenticated()){
            next({
                path:'/app'
            })
        }else next()
    }
    
    else if(to.matched.some(record => record.meta.forAuth)) {
        if (!Vue.auth.isAuthenticated()) {
            next({
                path: '/login'
            })
        } else {
            if(Vue.can.permission(to.meta)){
                next()
            }else{
                Vue.auth.destroyToken()
                next({
                    path: '/login'
                })
                window.toastr.error('No intentes acceder a sitios restringidos para tu rol.')
            }
        }
    }

    else next()
})


Vue.directive('scroll', {
    inserted: function (el, binding) {
        let f = function (evt) {
            if (binding.value(evt, el)) {
                window.removeEventListener('scroll', f)
            }
        }
        window.addEventListener('scroll', f)
    }
})

/**
 * VUE: body
 */
new Vue({
    store,
    el: '#app',
    router, 
    template: '<Nota20/>',
    components: { 
        Nota20:()=> System.import('./Nota20.vue'),
    }
})

