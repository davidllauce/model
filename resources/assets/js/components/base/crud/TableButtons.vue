<template>
    <div>
        <div class='p-2' :key='index' v-for="(row, index ) in propButtons">
            <a  class='btn btn-outline-success btn-sm' @click='actionClick(row.action)'>
                {{row.text}}
            </a>
        </div>

        <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" data-keyboard="false" aria-hidden="true">
			<div class="modal-dialog"  role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Permisos</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click='actionClose' >
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
	
					<div class="modal-body">
						<slot name='content'></slot>
					</div>
					
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal" @click='actionClose'>Cerrar</button>
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
        props: {
            propButtons:{
                required:true
            }
        },
        methods:{
            actionClick: function(action){
                if(this.role_show.id==null){
                    window.toastr.info("Selecciona alguna fila, dando click en <span class='fa fa-dot-circle-o'></span>")
                }else{
                    this.$emit('action-click',action)
                    $('#exampleModal2').modal('show')
                }
                
            },
            
        }
    }
</script>