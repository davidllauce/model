<template>
    <nav class="navbar navbar-expand bg-white">
        
        <template v-if="authentication_user.role.slug!='student'">
            <button type="button" class="btn btn-link  text-dark d-block d-md-none mr-1" data-toggle='sidebar' @click="sidebar4B()">
                <i class="fa fa-bars"></i>
            </button>

            <button type="button" class="btn btn-link  text-dark d-none d-md-block mr-1" @click='sidebarShow()'>
                <i class="fa fa-bars"></i>
            </button>
        </template>

        <div v-else id="btn-sidebar-show-student" class="d-lg-none d-xl-none mr-2" @click="showSidebarPreview()">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </div>
        
    
        <router-link :to="{'name':'home'}" class="navbar-brand">
            <div class="text-dark">
                <img src="/img/app/logo1.png" alt="secrea logo" width='40px'> <span style="font-size:10px;">Raza viral</span>
            </div>
        </router-link>
    
        <ul class='navbar-nav ml-auto'>
            <li class='nav-item'>
                <a @click='logout' class="nav-link "><span class='fa fa-power-off'></span></a>
            </li>
        </ul>
    
    </nav>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    
    
    export default {
        name: 'navbar-auth',
        methods: {
            ...mapActions(['executeCommit']),
            logout: function() {
                alertify.confirm('¿Deseas cerrar sesión?', () => {
                    this.$auth.destroyToken()
                    this.executeCommit({
                        mutation: 'LOGOUT'
                    })
                    this.$router.push("/login")
                })
            },
            sidebarShow: function(){
                $('.app-sidebar').addClass('d-flex')
                $('.app-sidebar').removeClass('d-none')
                window.renderVarForCss()
                window.renderSliderTranslateX()
            },

            sidebar4B: function(){
                $('.app-sidebar').removeClass('d-none')
                window.renderVarForCss()
                window.renderSliderTranslateX()
            },
            showSidebarPreview: function() {
                $('#sidebar-preview-student').toggleClass('d-none show');
                window.renderVarForCss()
                window.renderSliderTranslateX()
            },
        },
        computed: {
            ...mapGetters([
                'authentication_user','can'
            ]),
        },
    }
</script>

