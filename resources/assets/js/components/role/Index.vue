<template>	
	<div class='card height-content'>

		<load-table v-if='loading' :propLines='10'/>

		<!--Role-->
		<template v-else>
			<table-head 
				:propModel='dataModel'
				:propConfig='dataTableHead'
				@action-pre-create='preCreate'/>

			<table-body 
				:propConfig='dataTableBody'
				:propModel='dataModel'
				@action-pre-actualize='preActualize'
				@action-remove='remove' 
				@permission-role='permissionRole' 
				@action-sonwindow-close='sonWindowClose'>

				<template slot='content'>
					<component :is='dataTableBody.sonWindow.component' :propRow='dataTableBody.sonWindow.row'></component>
				</template>

			</table-body>
			
			<modal :propModel='dataModel' :propConfig="dataModal" @action-close='closeModal'>
				<template slot='form'>
					<role-form v-if='dataForm.open'
						:propInfo='dataModal'
						:propFeedback='dataForm'
						@post='create'
						@patch='actualize'/>
				</template>
			</modal>
		</template>
		<!--End role-->
	</div>
</template>

<script>

	import {
		mapActions,
		mapGetters
	} from 'vuex'

	/**
	 * Components 'binder base'
	 * *Base componentes for all models
	 */
	import LoadTable from '../base/load/Table.vue'
	import TableHead from '../base/crud/TableHead.vue'
	import TableBody from '../base/crud/TableBody.vue'
	import Modal from '../base/crud/Modal.vue'
	/**
	 * *Component form, both to edit and create
	 */
	import RoleForm from './Form.vue'
	/**
	 * *Component to show permissions by role
	 */
	import RolePermission from './Permission.vue'

	export default {
		name: 'role',
		components: {
			LoadTable,
			TableHead,
			TableBody,
			Modal,
			RoleForm,
			RolePermission
		},
		created(){
			this.preMounted()
		},
		computed:{
			...mapGetters(['can'])
		},
		mounted(){
			this.getData()
		},
		data(){
			return{
				loading  : true,
				dataModel:{
					name        : 'role',
					alias       : 'rol',
				},
				dataTableHead:{
					title: "<span class='fa fa-list'></span> Lista de roles",
					buttonStore:{
						text:' <i class="fa fa-plus"></i> Nuevo rol'
					}
				},
				dataTableBody:{
					cols:[
						{
							name:'name',
							alias:'Nombre'
						},
						{
							name:'slug',
							alias:'Slug'
						},
						{
							name:'description',
							alias:'Descripción'
						},
					],
					buttons:{
						update : true,
						destroy: true,
					},
					myButtons:[
						{
							text     : 'P',
							tooltip  : 'Ver permisos',
							component: 'permission-role',
							title	 : "<span class='fa fa-list'></span> Permisos para ",
							can      : 'roles-permission'
						}
					],
					sonWindow: {
						component: null,
						row      : null
					},		
				},
				dataForm:{
					open  : false,
					danger: false,
					errors: {},
					row   : null
				},
				dataModal:{
					title       : null,
					buttonSubmit: null,
					method      : null
				},				
			}
		},
		methods:{
			...mapActions([
                'index','show','store','destroy','update'
			]),

			preMounted: function(){
				if(!this.can.includes('roles-index')){
					this.$router.push("/app")
					window.toastr.error('Acceso denegado.')
				}
			},

			getData: function () {
				this.loading = true
                this.index({
					url     : '/api/roles',
					mutation: 'ROLES_UPDATED',
				}).then(()=>{
					this.loading = false
                })
			},
			
			remove: function (row){
				this.destroy({
					url     : `/api/roles/${row.id}`,
				}).then(()=>{
					this.getData()
				})
			},

			preCreate:function(){
				this.dataModal = {
					title       : "<span class = 'fa fa-plus'></span> Nuevo rol",
					buttonSubmit: 'Registrar rol',
					method      : 'post'
				}
				this.dataForm.open = true
				$('#componentModal').modal('show')
			},

			create: function(role){
				this.store({
					url     : '/api/roles/',
					params  : role
				}).then((role)=>{
					window.toastr.success(`Nuevo rol registrado.`)
					this.closeModal()
					this.getData()
				}).catch((errors)=>{
					this.dataForm.errors = errors
					this.dataForm.danger = true
				});
			},

			preActualize: function(row){
				this.dataModal = {
					title       : "<span class='fa fa-pencil-square-o'></span> Editando rol",
					buttonSubmit: 'Actualizar rol',
					method      : 'patch'
				}
				this.dataForm.open = true
				this.dataForm.row  = row
				$('#componentModal').modal('show')
			},

			actualize: function(role){
				this.update({
					url     : `/api/roles/${role.id}`,
					params  : role
				}).then(()=>{
					window.toastr.success(`Rol editado.`)
					this.closeModal()
					this.getData()
				}).catch((errors)=>{
					this.dataForm.errors = errors
					this.dataForm.danger = true
				});
			},	

			permissionRole: function(row){				
				this.dataTableBody.sonWindow = {
					component : 'role-permission',
					row       : row
				}
			},

			sonWindowClose: function(){
				this.dataTableBody.sonWindow = {
					component: null,
					row      : null
				}
			},

			closeModal:function(){
				$('#componentModal').modal('hide')
				this.dataForm = {
					open  : false,
					errors: {},
					row   : null,
					danger: false
				}
			},
			
		}
		
	}	

</script>


