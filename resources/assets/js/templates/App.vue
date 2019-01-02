<template>
    <div class="app-body">
        <load-nota20 v-if='loading'/>
        <sidebar v-if="authentication_user.role.slug!='student'"></sidebar>
        <div class='app-content'>
            <navbar></navbar>
            <router-view v-if='!loading'></router-view>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    
    import Sidebar from '../components/partials/Sidebar.vue'
    import Navbar from '../components/partials/Navbar.vue'
    import LoadNota20 from '../components/base/load/Secrea.vue'
    
    export default {
        name: 'app',
        components: {
            Sidebar,
            Navbar,
            LoadNota20
        },
        data() {
            return {
                loading: true,
            }
        },
        computed: {
            ...mapGetters([
                'authentication_user','authuser_free_pay'
            ]),
        },
        created() {
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${this.$auth.getToken()}`;
            this.preparedView()
        },
    
        methods: {
            ...mapActions([
                'checkAuth','get','identifyAuth'
            ]),
            preparedView: function() {
                this.checkAuth().then(()=>{
                    this.identifyUser()
                    window.renderVarForCss() // Los nav(guest,auth) tienen diferente height
                    setTimeout(() => {
                        this.loading = false
                    }, 500);
                }).catch(()=>{
                    this.$auth.destroyToken()
                    this.$router.push('/login')
                })
            },
            identifyUser: function(){
                if(this.authentication_user.role.slug == 'student')
                    this.identifyAuth()
            }
        },
    }
</script>