<template>
    <div>
        <!--Loading-->
        <load-spinner v-if='loading && !propFeedback.danger' />
        <!--End loading-->
        <form class="form-horizontal" v-on:submit.prevent="send()">       

            <div class="form-group row">
                <div class='col-sm-3 col-form-label'>
                    <label>Nombre</label>
                </div>
                <div class="col-md-8">
                    <input v-model='role.name' type='text' class='form-control input-md'>
                    <div v-if ="propFeedback.errors.name">
                        <template v-for="(error, index ) in propFeedback.errors.name">
                            <small class='text-danger'  :key="index">{{error}}</small>
                        </template>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class='col-sm-3 col-form-label'>
                    <label>Slug</label>
                </div>
                <div class="col-md-8">
                    <input v-model='role.slug' type='text' class='form-control input-md'>
                    <div v-if ="propFeedback.errors.slug">
                        <template v-for="(error, index ) in propFeedback.errors.slug">
                            <small class='text-danger'  :key="index">{{error}}</small>
                        </template>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class='col-sm-3 col-form-label'>
                    <label>Descripción</label>
                </div>
                <div class="col-md-8">
                    <input v-model='role.description' type='text' class='form-control input-md'>
                    <div v-if ="propFeedback.errors.description">
                        <template v-for="(error, index ) in propFeedback.errors.description">
                            <small class='text-danger'  :key="index">{{error}}</small>
                        </template>
                    </div>
                </div>
            </div>

            <div class="form-group mb-0 float-right">
                <button type="submit" class="btn btn-orange">
                    {{propInfo.buttonSubmit}}
                </button>
            </div>


        </form>
    </div>

</template>

<script>
    import {
        mapActions,
    } from 'vuex'

    import LoadSpinner from '../base/load/SpinnerLoading.vue'
    
    export default {
        name: 'formrole',
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
        data () {
            return {
                loading:true,
                role:{
                    id         : null,
                    name       : null,
                    slug       : null,
                    description:null
                },
            }
        },  
        mounted(){
            this.getRole()
        },
        methods: {

            ...mapActions([
                    'show'
                ]),

            getRole: function(){
                if(this.propFeedback.row!=null){
                    this.show({
                        url     : `/api/roles/${this.propFeedback.row.id}`,
                    }).then((data)=>{
                        this.role = data.data
                        this.loading = false
                    }).catch(()=>{
                        window.toastr.error('Problemas al intentar mostrar un rol')
                    })
                }else{
                    this.loading = false
                }
            },
        
            send() {
                this.$emit(this.propInfo.method,this.role)  
                this.loading = true
                this.propFeedback.danger=false    
            }
        }
    }
</script>
