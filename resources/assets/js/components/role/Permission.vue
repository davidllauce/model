<template>
	<div>
		<load-spinner v-if='loading' />
		<template>
			<div class='container m-2'>
				<template v-if='!assignPermission'>
					<button class='btn btn-link' style="cursor:pointer;"  @click='getPermissions'  >
						<span class='fa fa-plus'></span> ¿Deseas asignar permisos?
					</button>
				</template>
				<template v-else>
					<div class="input-group pr-3 pl-3">
						<select class="custom-select" id="inputGroupSelect03" v-model='select.permission'>
							<option :value='null' disabled>Selecciona un permiso...</option>
							<option v-for='(permission, index) in relationship.permissions' :key='index' :value='permission.id' >
								{{ permission.name }}
							</option>
						</select>
						<div class="input-group-append">
							<button class="btn btn-orange" @click='addPermission' type="button">Asignar</button>
						</div>
					</div>
				</template>
			</div>
			<div class="table-responsive pr-2 pl-2 table-modal-height">
				<table class="table table-hover">
					<tr>
						<th>#</th>
						<th>Permiso</th>
						<th>Descripción</th>
						<th>Opción</th>
					</tr>
					<tr v-for="(permission,index) in role.permissions" :key='index'>
						<td>{{index+1}}</td>
						<td>{{permission.name}}</td>
						<td>{{permission.description}}</td>
						<td>
							<a class="btn btn-orange" @click='remove(permission)' data-toggle="tooltip" title="Eliminar">
								<span class='fa fa-trash text-white'></span>
							</a>
						</td>
					</tr>
					<tr v-if='role.permissions && role.permissions.length == 0'>
                        <td colspan='4' class='table-empty'>
                            <i>Rol sin permisos</i>
                        </td>
                    </tr>
				</table>
			</div>
		</template>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'

	import LoadSpinner from '../base/load/SpinnerLoading.vue'
	
	export default {
		name: 'permissionrole',
		props:['propRow'],
		components: {
			LoadSpinner
		},
		mounted(){
			this.getData();
		},
		data(){
			return{
				loading:true,
				relationship:{
					permissions:[]
				},
				select:{
					permission: null
				},
				assignPermission:false,
				role:{}
			}
		},
		methods:{
			...mapActions([
				'index','get','destroy','store',
			]),
			
			getData(){
				this.index({
					url:`/api/roles/${this.propRow.id}/permission`,
					mutation:'PERMISSIONS_UPDATED'
				}).then((data)=>{
					this.role = data.data
					this.loading=false
				})
			},
			
			getPermissions:function(){
				this.loading = true
				this.get({
					url:`/api/permissions/not/role/${this.propRow.id}`,
				}).then((data)=>{
					this.relationship.permissions = data.data
					this.assignPermission         = true
					this.loading                  = false
				})
			},

			remove: function (row){
				alertify.confirm('¿Deseas remover un permiso?', () => {
					this.loading=true
					this.destroy({
						url     : `/api/roles/${this.propRow.id}/removePermission?permission_id=${row.id}`,
					}).then(()=>{
						window.toastr.success('Permiso removido.')
						this.getData()
						this.loading=false
					})
				})
			},
			
			addPermission: function(){
				if(this.select.permission!=null){
					this.loading=true
					this.store({
						url     : `/api/roles/${this.propRow.id}/addPermission`,
						params  : {
							'permission_id': this.select.permission
						} 
					}).then(()=>{
						window.toastr.success('Nuevo permiso asignado.')
						this.getData()
						this.select.permission = null
						this.loading=false
					})
				}else{	
					window.toastr.error('Selecciona un permiso')
				}
			}
		}
		
	}	

</script>