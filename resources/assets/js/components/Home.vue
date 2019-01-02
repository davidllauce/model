<template>
	<div class='container-fluid p-0' id='home-container'>
		<vue-auth />
	</div>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	
	import VueAuth from './home/Auth.vue'
	
	export default {
		name: 'Home',
		components: {
			VueAuth,
		},
		computed: {
			...mapGetters([
				'authentication_user'
			]),
		},
	}
</script>