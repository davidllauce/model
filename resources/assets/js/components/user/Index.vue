<template>
	<div class='card'>
		<table-head 
			:propModel='dataModel' 
			:propConfig='dataTableHead' 
			@action-pre-create='preCreate'>
		</table-head>
		
		<div class="collapse" id="info">
            <div class="card-footer">
                <p class="m-0">
					<span class="fa fa-info-circle text-success"></span> 
                	<span>Para verificar los accesos selecciona un rol.</span>
				</p>
				<p class="m-0">
					<span class="badge badge-success align-middle">E</span> 
					<span class="align-middle">MODIFICAR ESTADO: consiste en habilitar o inhabilitar el acceso a la plataforma.</span>
				</p>
				
            </div>
        </div>
		
		<user-filter :propRoles='roles' @filter='filterByRole' />
	
		<load-table v-if='loading' :propLines='10' />
	
		<table-body v-else 
			:propConfig='dataTableBody' 
			:propModel='dataModel' 
			@change-status='changeStatus'
			@action-pre-actualize='preActualize' 
			@action-remove='remove'>
		</table-body>
	
		<modal :propModel='dataModel' :propConfig="dataModal" @action-close='closeModal'>
			<template slot="form">
				<user-form v-if='dataForm.open'
					:propInfo='dataModal' 
					:propFeedback='dataForm' 
					@post='create' 
					@patch='actualize'>
				</user-form>
			</template>
        </modal>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	
	import TableHead from '../base/crud/TableHead'
	import TableBody from '../base/crud/TableBody'
	import Modal from '../base/crud/Modal'
	import LoadTable from '../base/load/Table.vue'
	import UserForm from './Form.vue'
	import UserFilter from './Filter.vue'
	
	export default {
		name: 'user',
		components: {
			TableHead,
			TableBody,
			Modal,
			UserForm,
			UserFilter,
			LoadTable
		},
		mounted() {
			this.getRoles()
		},
		computed: {
			...mapGetters([
				'users'
			]),
		},
		data() {
			return {
				loading: true,
				filter_role: null,
				roles: [],
				dataModel: {
					name: 'user',
					alias: 'usuario',
				},
				dataTableHead: {
					title: "<span class='fa fa-gavel'></span> Lista de accesos",
					buttonStore: {
						text: ' <i class="fa fa-plus"></i> Nuevo usuario'
					}
				},
				dataTableBody: {
					cols: [{
							name: 'name',
							alias: 'Nombre'
						},
						{
							name: 'email',
							alias: 'Email'
						},
						{
							name: 'status',
							alias: 'Estado',
							play: {
								'0': "<span class='badge badge-danger'>Inactivo</span>",
								'1': "<span class='badge badge-success'>Activo</span>",
							}
						},
					],
					buttons: {
						update: true,
						destroy: true,
					},
					myButtons: [{
						text: "E",
						tooltip: 'Estado',
						component: 'change-status',
						redirect: true,
						can: 'users-update'
					}],
					sonWindow: {
						component: null,
						row: null
					},
				},
				dataForm: {
					open: false,
					danger: false,
					errors: {},
					row: null
				},
				dataModal: {
					title: null,
					buttonSubmit: null,
					method: null
				},
			}
		},
		methods: {
			...mapActions([
				'get', 'index', 'show', 'store', 'destroy', 'update'
			]),
	
			getRoles: function() {
				this.get({
					url: `/api/roles/`,
				}).then((data) => {
					this.roles = data.data
					this.loading = false
				}).catch(() => {
					this.loading = false
				})
			},
	
			preCreate: function() {
				this.dataModal = {
					title: "<span class = 'fa fa-plus'></span> Nuevo usuario",
					buttonSubmit: 'Registrar usuario',
					method: 'post'
				}
				this.dataForm.open = true
				$('#componentModal').modal('show')
			},
	
			create: function(row) {
				this.store({
					url: '/api/users',
					params: row
				}).then((data) => {
					window.toastr.success(`Se ha registrado un nuevo usuario.`)
					this.filterByRole(this.filter_role)
					this.closeModal()
				}).catch((errors) => {
					this.dataForm.errors = errors
					this.dataForm.danger = true
				});
			},
	
			preActualize: function(row) {
				this.dataModal = {
					title: "<span class='fa fa-pencil-square-o'></span> Editando usuario",
					buttonSubmit: 'Actualizar usuario',
					method: 'patch'
				}
				this.dataForm.open = true
				this.dataForm.row = row
				$('#componentModal').modal('show')
			},
	
			actualize: function(row) {
				this.loading = true
				this.update({
					url: `/api/users/${row.id}`,
					params: row
				}).then(() => {
					window.toastr.success(`Usuario editado.`)
					this.filterByRole(this.filter_role)
					this.closeModal()
				}).catch((errors) => {
					this.dataForm.errors = errors
					this.dataForm.danger = true
					this.loading = false
				});
			},
	
			remove: function(row) {
				this.loading = true
				this.destroy({
					url: `/api/users/${row.id}`,
				}).then(() => {
					this.filterByRole(this.filter_role)
					window.toastr.success('Usuario eliminado.')
				}).catch(() => {
					this.loading = false
				})
			},
	
			filterByRole: function(role_slug) {
				if(role_slug!=null){
					this.loading = true
					this.filter_role = role_slug 
					this.index({
						url: `/api/users/role/${role_slug}`,
						mutation: 'USERS_UPDATED',
					}).then(() => {
						this.loading = false
					}).catch(() => {
						this.loading = false
					})
				}else{
					this.loading = false
				}
			},
	
			changeStatus: function(row) {
				this.loading = true,
					this.update({
						url: `/api/users/${row.id}/status`,
					}).then(() => {
						this.filterByRole(this.filter_role)
						window.toastr.success('Estado modificado.')
					}).catch(() => {
						this.loading = false
					})
			},
	
			sonWindowClose: function() {
				this.dataTableBody.sonWindow = {
					component: null,
					row: null
				}
			},
	
			closeModal: function() {
				$('#componentModal').modal('hide')
				this.dataForm = {
					open: false,
					errors: {},
					row: null,
					danger: false
				}
			},
	
		}
	
	}
</script>


