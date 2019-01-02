<template>
     <div class='app-body'>
        <div class='app-content' id='nota20-login'>
            <div class="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <div class="card">
                    <div class="card-body text-compact">
                        <form class="form-horizontal nota20-text-secondary" v-on:submit.prevent="send()">
                            <div class="form-group">
                                <div class="col-lg-12">
                                    <h3 class="text-center">Iniciar sesión</h3>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-12">
                                    <input type="email" v-model='config.username' class="form-control" name="email" placeholder='Correo electrónico' required autofocus>
                                </div>
                            </div>
        
                            <div class="form-group">
                                <div class="col-lg-12">
                                    <input type="password" v-model='config.password' class="form-control" name="password" placeholder='Contraseña' required>
                                </div>
                            </div>
        
                            <div class="form-group">
                                <div class="col-lg-12">
                                    <button type="submit" class="btn btn-orange btn-block" id='btn-login-submit'>
                                        Ingresar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        name: 'login',
        components:{
        },
        data() {
            return {
                config: {
                    client_id: 2,
                    client_secret:'OKdZZqci5ipzQHAc8iyQJrLjeo06LCOfhh3Gltzs',//server
                    //client_secret: 'jx7S41Gtx8BHo1y2V3139YmCe62FoFOxHW2HJm3P',//local original
                    grant_type: 'password',
                    username: '',
                    password: ''
                },
            }
        },
        methods: {
            ...mapActions([
                'login','checkAuth','interesteddemo'
            ]),
    
            send: function() {
                $('#btn-login-submit').prop('disabled',true)
                $('#btn-login-submit').text('Verificando datos...')
                this.loginsend();
            },

            loginsend: function(){
                this.login(this.config).then((response) => {
                    this.$auth.setToken(response.data.access_token, response.data.expires_in + Date.now())
                    this.$router.push("/app")
                }).catch(() => {
                    $('#btn-login-submit').prop('disabled',false)  
                    $('#btn-login-submit').text('Ingresar') 
                    this.email = ''
                    this.password = ''
                    window.toastr.error('Usuario sin acceso a la plataforma.')
                })
            }

        },
    
    }
</script>

<style>
    #nota20-login {
        padding-top: calc( var(--app-nav-height) + 6em);
        height: var(--app-window-height);
        background-image: url('/img/web/slider/1.jpg');
        background-repeat: repeat;
        background-position: center;
    }
</style>



