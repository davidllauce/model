<template>
    <div class="container">
        <spinner-loading v-if='loading' />
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="form-group row">
                    <div class='col-sm-3 col-form-label'>
                        <label>Email</label>
                    </div>
                    <div class="col-md-9" >
                        <label class="w-100 border-dashed-frame">{{ authentication_user.email }}</label>
                    </div>
                </div>
                <div class="form-group row">
                    <div class='col-sm-3 col-form-label'>
                        <label>Nueva contaseña</label>
                    </div>
                    <div class="col-md-9">
                        <input 
                            v-validate="'required|min:6'"
                            data-vv-as="contraseña"
                            name='pass'
                            type='password' 
                            class='form-control input-md' 
                            v-model='password'>
                        <small v-show="errors.has('pass')" class="text-success">{{ errors.first('pass') }} </small>
                    </div>
                </div>
                <div class="form-group row">
                    <div class='col-sm-3 col-form-label'>
                        <label>Confirmar nueva contraseña</label>
                    </div>
                    <div class="col-md-9">
                        <input 
                            v-validate="'required|min:6'"
                            data-vv-as="confirmar contraseña"
                            name='pass-confirm'
                            type='password' 
                            class='form-control input-md' 
                            v-model="confirmPassword">
                        <small v-show="errors.has('pass-confirm')" class="text-success">{{ errors.first('pass-confirm') }} </small>
                    </div>
                </div>

                <div class="form-group mb-0 float-right">
                    <input type="button" id='submit' class='btn btn-orange' value='Guardar cambios' @click='send'>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import SpinnerLoading from '../base/load/SpinnerLoading.vue' 

    import {
        mapActions,
        mapGetters,
    } from 'vuex'

    export default {
        name: 'my-access-form',
        components:{
            SpinnerLoading
        },
        computed: {
            ...mapGetters([
                'authentication_user'
            ]),
        },
        data(){
            return {
                password:'',
                confirmPassword:'',
                loading:false,
            }
        },
        methods:{

            ...mapActions(['update']),

            send:function(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        if(this.validatePassword()){
                            this.loading = true
                            this.update({
                                url:'/api/users/password',
                                params:{
                                    password: this.password
                                }
                            }).then(()=>{
                                this.loading = false
                                window.toastr.success('Contraseña actualizada.')
                            }).catch((data)=>{
                                window.toastr.error('Error al intentar cambiar contraseña.')
                                this.loading = false
                            })
                        }
                    }
                })
            },
            validatePassword: function(){
                if(this.password == this.confirmPassword){
                    if(this.password.trim()=='' || this.confirmPassword.trim() ==''){
                        window.toastr.error('Ingrese su nueva contraseña.');
                        return false
                    }
                    return true
                }
                window.toastr.error('Las contraseñas no coinciden.');
                return false
            }
        }
    }
</script>