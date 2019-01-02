<template>
    <div id='form-profile'>

        <content-placeholders v-if='loading' style='padding:10px' >
             <content-placeholders-heading :img="true" />  
        </content-placeholders>

        <template v-else>
            <div class='row'>		
                <div class='col'>
                    <div class='float-right'>
                        <a class='btn btn-outline-success' @click='editableMode'>
                            <i class="fa fa-pencil"></i> {{ dataEditableMode ? 'Editando':'Editar' }}
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class='p-3 col-12 col-lg-4 '>
                    <avatar :fullname="authentication_user.name" :size="150" class='col-8 offset-2'></avatar>
                </div>
                <div class='p-3 col-12 col-lg-8'>
                    <div class="form-group row">
                        <div class='col-sm-3 col-form-label'>
                            <label><span class="fa fa-id-card"></span> Dni</label>
                        </div>
                        <div class="col-md-9">
                            <input v-if='dataEditableMode' class='form-control input-md' type="number" v-model='dataForm.inputs.dni'>
                            <label v-else class='border-dashed-frame col-12' v-html="getContentLabel(dataForm.inputs.dni)"></label>
                            <div v-if="dataForm.errors.dni">
                                <template v-for="(error, index ) in dataForm.errors.dni">
                                        <small class='text-danger'  :key="index">{{error}}</small>
                                </template>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <div class='col-sm-3 col-form-label'>
                            <label><span class="fa fa-mobile" style='font-size:20px;'></span>  Celular</label>
                        </div>
                        <div class="col-md-9">
                            <input v-if='dataEditableMode' class='form-control input-md' type="number" v-model='dataForm.inputs.phone'>
                            <label v-else class='border-dashed-frame col-12' v-html="getContentLabel(dataForm.inputs.phone)"></label>
                            <div v-if="dataForm.errors.phone">
                                <template v-for="(error, index ) in dataForm.errors.phone">
                                        <small class='text-danger'  :key="index">{{error}}</small>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class='col-sm-3 col-form-label'>
                            <label><span class="fa fa-birthday-cake"></span>  Nacimiento</label>
                        </div>
                        <div class="col-md-9">
                            <input v-if='dataEditableMode' class='form-control input-md' type="date" v-model='dataForm.inputs.birth_date'>
                            <label v-else class='border-dashed-frame col-12' v-html="getContentLabel(dataForm.inputs.birth_date)"></label>
                            <div v-if="dataForm.errors.birth_date">
                                <template v-for="(error, index ) in dataForm.errors.birth_date">
                                        <small class='text-danger'  :key="index">{{error}}</small>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class='col-sm-3 col-form-label'>
                            <label><span class="fa fa-check-square"></span> Dirección</label>
                        </div>
                        <div class="col-md-9">
                            <input v-if='dataEditableMode' class='form-control input-md' type="text" v-model='dataForm.inputs.address'>
                            <label v-else class='border-dashed-frame col-12' v-html="getContentLabel(dataForm.inputs.address)"></label>
                            <div v-if="dataForm.errors.address">
                                <template v-for="(error, index ) in dataForm.errors.address">
                                        <small class='text-danger'  :key="index">{{error}}</small>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row" v-if='dataEditableMode'>
                        <div class="col-md-12">
                            <input type="button" id='submit' class='btn btn-orange  float-right' @click='actualize' value='Guardar cambios'>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'

	import Avatar from 'vue-avatar-component'

	export default {
		name: 'profile-form',
		components: {
			Avatar
		},
		mounted(){
			this.getProfile()
        },
        computed:{
            ...mapGetters(['authentication_user'])
        },
		data(){
			return{
                loading:true,
				dataEditableMode: false,
				dataForm:{
					inputs:{
                        dni       : null,
                        phone     : null,
						birth_date: null,
						address	  : null
                    },
					errors:{},
				},		
			}
		},
		methods:{

			...mapActions([
				'get','update'
			]),

			getProfile:function(){
				this.get({
					url:`/api/profiles/auth`,
				}).then((data)=>{				
                    this.dataForm.inputs = data.data
                    this.loading = false
				}).catch(()=>{
                    this.loading = false
                })
			},

			actualize:function(inputs){
				this.loading = true
				this.update({
					url     : `/api/profiles`,
					params  : this.dataForm.inputs
				}).then(()=>{
					window.toastr.success('Perfil editado.')
					this.dataForm.errors = {}
					this.dataEditableMode = false
					this.loading = false
				}).catch((errors)=>{
                    this.dataForm.errors = errors
                    this.loading = false
				});
			},

			editableMode:function() {
				this.dataEditableMode = !this.dataEditableMode
			},

			getContentLabel: function(input){
				return input == null? "<i class='text-secondary'>Sin registro</i>" : input
			},

		}
		
	}	

</script>
<style>
    .btn-outline-success {
        color: rgb(255, 145, 0) !important;
        background-color: transparent;
        background-image: none;
        border-color: rgb(255, 145, 0) !important;
    }
    .btn-outline-success:hover{
        color: #ffffff !important;
        background-color: rgb(255, 145, 0) !important;
    }
</style>

