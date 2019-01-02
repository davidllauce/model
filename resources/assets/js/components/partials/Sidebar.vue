<template>
    <div class='app-sidebar sidebar-slide-left'>
        <div class="container">
            <button type='button' class='btn btn-link d-block d-md-none' data-dismiss='sidebar'>
                <span class='fa fa-times text-white'></span>
            </button>
            <button type='button' class='btn btn-link d-none d-md-block' @click='sidebarHide()'>
                <span class='fa fa-eye-slash text-white'></span>
            </button>
        </div>

        <div class='avatar container mt-3'>
            <div class='row' v-if='authentication_user.name'>
                <div class='col-md-12 text-center pt-1'>
                    <avatar :fullname="authentication_user.name" :size="80"></avatar>
                </div>
                <div class='col-md-12 text-center'>
                    <b class="text-white">{{ authentication_user.name }}</b>
                </div>
                <div class='col-12 text-white text-center p-2 mt-3' style="background:#2a2d3d">
                    <span class="align-middle">
                        {{ authentication_user.role.name }}
                    </span>
                </div>
            </div>
            <content-placeholders-heading v-else style='padding:15px;' :img="true"/>
        </div>

        <div class='sidebar-nav'>

            <router-link :to="{'name':'home'}" class='sidebar-nav-link ellipsis'>
                <i class="fa fa-home"></i>Inicio
            </router-link>

            <router-link :to="{'name':'profiles'}" class='sidebar-nav-link ellipsis'>
                <i class='fa fa-user'></i> Mi perfil
            </router-link>

            <router-link :to="{'name':'myaccess'}" class='sidebar-nav-link ellipsis'>
                <i class='fa fa-gear'></i> Mi cuenta
            </router-link>

            <router-link :to="{'name':'access'}" v-if="can.includes('users-index')" class='sidebar-nav-link ellipsis'>
                <i class="fa fa-gavel"></i> Accesos
            </router-link>

            <router-link :to="{'name':'roles'}" v-if="can.includes('roles-index')" class='sidebar-nav-link ellipsis'>
                <i class='fa fa-list'></i> Roles
            </router-link>

        </div>

        <div class='sidebar-footer'>
            <a @click="logout">
                <i class='fa fa-power-off'></i>
            </a>
        </div>

    </div>
</template>

<script>
    import {mapActions, mapGetters,} from 'vuex'

    import Avatar from 'vue-avatar-component'

    export default {
        name: 'sidebar',
        components: {
            Avatar
        },
        computed: {
            ...mapGetters([
                'authentication_user', 'can'
            ]),
        },
        methods: {
            ...mapActions(['executeCommit']),
            logout: function () {
                this.$auth.destroyToken()
                this.executeCommit({
                    mutation: 'LOGOUT'
                })
                this.$router.push("/login")
            },
            sidebarHide: function () {
                $('.app-sidebar').addClass('d-none')
                $('.app-sidebar').removeClass('d-flex')
                window.renderVarForCss()
                window.renderSliderTranslateX()
            }
        }
    }
</script>