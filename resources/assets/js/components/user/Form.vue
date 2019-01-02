<template>
    <div id='user-form'>

        <load-spinner v-if='loading && !propFeedback.danger' />

        <form class="form-horizontal" v-on:submit.prevent="send()" data-vv-scope="user">       

            <div class="form-group row">
                <div class='col-sm-6 col-form-label'>
                    <label>Nombres y apellidos</label>
                </div>
                <div class="col-md-12">
                    <input 
                        v-validate="'required|min:3|max:60'"
                        data-vv-as="nombres y apellidos"
                        v-model='user.name' 
                        type='text' 
                        name='name'
                        class='form-control input-md' >
                    <span  v-show="errors.has('user.name')" class="text-success">{{ errors.first('user.name') }} </span>
                    <div v-if ="propFeedback.errors.name">
                        <template v-for="(error, index ) in propFeedback.errors.name">
                            <small class='text-danger'  :key="index">{{error}}</small>
                        </template>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class='col-sm-6 col-form-label'>
                    <label>Email</label>
                </div>
                <div class="col-md-12">
                    <input 
                        v-validate="'required|email'"
                        data-vv-as="email"
                        v-model='user.email' 
                        name='email'
                        class='form-control input-md' 
                        type="email">
                    <span  v-show="errors.has('user.email')" class="text-success">{{ errors.first('user.email') }} </span>
                    <div v-if ="propFeedback.errors.email">
                        <template v-for="(error, index ) in propFeedback.errors.email">
                            <small class='text-danger'  :key="index">{{error}}</small>
                        </template>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class='col-sm-6 col-form-label'>
                    <label>Contraseña</label>
                </div>
                <div class="col-md-12">
                    <input 
                        v-model='user.password' 
                        class='form-control input-md' 
                        type="password">

                    <div v-if ="propFeedback.errors.password">
                        <template v-for="(error, index ) in propFeedback.errors.password">
                            <small class='text-danger'  :key="index">{{error}}</small>
                        </template>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class='col-sm-6 col-form-label'>
                    <label>Confirmar Contraseña</label>
                </div>
                <div class="col-md-12">
                    <input v-model='user.password_confirmation' class='form-control input-md' type="password" >
                    <div v-if ="propFeedback.errors.password_confirmation">
                        <template v-for="(error, index ) in propFeedback.errors.password_confirmation">
                            <small class='text-danger'  :key="index">{{error}}</small>
                        </template>
                    </div>
                </div>
            </div>
            <div class="form-group row" v-if="this.propInfo.method == 'post'">
                <div class='col-sm-6 col-form-label'>
                    <label>Rol</label>
                </div>
                <div class="col-md-12">
                    <select class="form-control"  v-model="user.role_id">
                        <option :value=null>Selecciona rol...</option>
                        <option v-for='(role,index) in roles' v-bind:value='`${role.id}`' v-bind:key='index'>
                            {{ role.name }}
                        </option>
                    </select>
                    <div v-if ="propFeedback.errors.role_id">
                        <template v-for="(error, index ) in propFeedback.errors.role_id">
                            <small class='text-danger'  :key="index">{{error}}</small>
                        </template>
                    </div>
                </div>
            </div>
            <div class="form-group mb-0 float-right">
                <button type="submit" class="btn btn-success">
                    {{propInfo.buttonSubmit}}
                </button>
            </div>

        </form>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions,
    } from 'vuex'

    import LoadSpinner from '../base/load/SpinnerLoading.vue'
    
    export default {
        name: 'formUser',
        props: {
            propInfo: {
                required: true
            },
            propFeedback: {
                required: true
            }
        },
        components:{
            LoadSpinner
        },
        mounted(){
            this.getRoles(),
            this.getUser()
        },
        data () {
            return {
                loading:true,
                roles:[],
                user:{
                    id  : null,
                    name: null,
                    email:null,
                    password: null,
                    password_confirmation:null,
                    role_id : null
                },
                
            }
        },  
        
        methods: {

            ...mapActions([
                    'get','show'
                ]),
            
           getRoles: function(){
                this.get({
                    url: `/api/roles/`,
                }).then((data)=>{
                    data.data.forEach((rol,index) => {
                        if(rol.slug=='student')
                            data.data.splice(index,1)
                    });                   
                    this.roles = data.data
                    this.loading = false
                }).catch(()=>{
                    this.loading = false
                })
            },

            getUser: function(){
                if(this.propFeedback.row!=null){
                    this.show({
                        url  : `/api/users/${this.propFeedback.row.id}`,
                    }).then((data)=>{
                        this.user = data.data
                        this.loading = false
                    }).catch(()=>{
                        this.loading = false
                        window.toastr.error('Problemas al intentar mostrar un usuario')
                    })
                }else{
                    this.loading = false
                }
            },
        
            send() {
                if(this.user.password == this.user.password_confirmation){
                    this.$validator.validateAll('register').then((result) => {
                        if(result){
                            this.$emit(this.propInfo.method,this.user)  
                            this.loading = true
                            this.propFeedback.danger=false 
                        }
                    })   
                }else{
                    window.toastr.error('Contraseñas no coinciden.')
                }
                
            }
        }
    }
</script>
