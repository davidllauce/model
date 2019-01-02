<template>
	<div class='card'>
		<!--Header-->
		<div class="card-header">
			<div class='row'>
				<div class='col mt-1 float-left'>
					<h5 class="m-0" data-toggle="collapse" href="#info-my-profile"><span class='fa fa-user'></span> Perfil</h5>
				</div>
			</div>
		</div>
		<!--End header-->
		 <div class="collapse show" id="info-my-profile">
            <div class="card-footer">
                <span class="badge badge-success align-middle">
					<i class="fa fa-info-circle"></i>
				</span> 
                <span>Tus datos nos ayudarán a mejorar nuestro servicio.</span>
            </div>
        </div>
		<!---Body-->
		<div class='card-body'>
			<profile-form/>
		</div>
		<!--End body-->
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	
	import ProfileForm from './Form.vue'
	
	export default {
		name: 'profile',
		components: {
			ProfileForm
		},
		computed: {
			...mapGetters([
				'can'
			]),
		},	
	}
</script>