<template>
    <div class='card-body table-height p-0'>
        <div class="p-1" style="height:50px">
            <label class='btn btn-link'> 
                <span class='fa fa-floppy-o'></span>
                {{ `Registros: ${list.meta.total? list.meta.total : '0'}`}}
            </label>
            <button  v-if='list.links.next' class='btn btn-link float-right' @click='nextPagination'> 
                <span class='fa fa-refresh'></span> Más datos 
            </button>
        </div>
        <!--Table-->
        <div class="table-height-scroll">
            <table class="table table-hover">
               
                <!--thead-->
                <tr>
                    <th scope="col">#</th>
                    <template v-for="(col, index ) in propConfig.cols">
                        <th scope="col" :key='index' class="ellipsis">{{col.alias}}</th>
                    </template>
                    <th scope="col" class='text-center'>Opciones</th>
                </tr>
                <!--end head-->
                    
                <!--tbody-->
                <tr v-for="(row, index ) in list.data" :key='index' :id='`row_${index}`'>

                    <td scope="row">
                        {{index+1}}
                    </td>

                    <td v-for="(col, index ) in propConfig.cols" :key = 'index' v-html='getValue(row,col)'></td>
                
                    <td>
                        <!--Buttons-->
                        <div class="d-flex flex-row justify-content-center">
                            <!--Buttons personalizados  -->
                            <div v-if='propConfig.myButtons' class='pr-1' v-for="(button, i ) in  propConfig.myButtons" :key='i'>
                                <a  
                                    class='btn bg-orange text-white' 
                                    data-toggle="tooltip" 
                                    :title="button.tooltip" 
                                    @click='sonWindowOpen(row,index,button)' 
                                    v-html='button.text'>
                                </a>
                            </div>
                            <!--End buttons personalizados-->
                            <div class="pr-1" v-if='propConfig.buttons.update'>
                                <!--can.includes(`${propModel.name}-update`)-->
                                <button-update v-if='propConfig.buttons.update' :propRow='row' @action-pre-actualize='preActualize'/>
                            </div> 
                            
                            <div class="pr-1" v-if='propConfig.buttons.destroy'>
                                <!--can.includes(`${propModel.name}-destroy`)-->
                                <button-destroy  v-if='propConfig.buttons.destroy' :prop-alert-sms = "`¿Desea eliminar: ${propModel.alias} '${row.name?row.name:row.identify}'`" :propRow='row' @action-remove= 'remove' />
                            </div>
                            <!--End buttons default-->
                        </div>
                        <!--End buttons-->
                    </td>

                </tr>

                <tr v-show='list.data.length == 0'>
                    <td :colspan='propConfig.cols.length + 2' class='table-empty'>
                        Sin registros
                    </td>
                </tr>
                <!--end tbody-->
                
            </table>
        </div>
        <!--End Table-->
        <!--Son window-->
        <div v-if='propConfig.sonWindow' class="modal fade" id="sonWindow" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" data-keyboard="false" aria-hidden="true">
			<div class="modal-dialog" :class='sonWindow.size'  role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel" v-html='sonWindow.title' ></h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click='sonWindowClose' >
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
	
					<div class="modal-body" style='padding:0;min-height:100px'>
						<slot name='content'></slot>
					</div>
					
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal" @click='sonWindowClose'>Cerrar</button>
					</div>
				</div>
			</div>
		</div>
        <!--End son window-->
    </div>
    
</template>

<script>

    import ButtonDestroy from './ButtonDestroy.vue'
    import ButtonUpdate from './ButtonUpdate.vue'
    
    import {
        mapActions
    } from 'vuex'
    
    export default {
    
        components: {
            ButtonUpdate,
            ButtonDestroy
        },
        props: {
            propConfig:{
                required:true
            },
            propModel:{
                required:true
            },
        },
        data() {
            return {
                link     : true,
                select   : null,
                sonWindow: {
                    title: null,
                    size :'modal-lg'
                }
            }
        },
        computed: {
            list() {
                return this.$store.getters[this.pluralWord(this.propModel.name)] 
            },
            can() {
                return this.$store.getters['can']
            }
        },
        methods: {
            ...mapActions([
                'modalClear','index'
            ]),
            pluralWord: function(word){
                if(word.substr(-1) == 'y')
                    return `${word.substr(0,word.length-1)}ies`
                else
                    return `${word}s`
            },
            remove: function(idOrSlug) {
                this.$emit('action-remove', idOrSlug);
            },
            preActualize: function(idOrSlug) {
                this.$emit('action-pre-actualize', idOrSlug)
            },
            sonWindowOpen: function(row,index,button){
                if(!button.redirect){
                    this.sonWindow.size  = button.modalSize? button.modalSize: 'modal-lg'
                    this.sonWindow.title = `${button.title} ${row.name}`
                    $('#row_'+this.select).removeClass('td-select')
                    $('#row_'+index).addClass('td-select')
                    this.select = index
                    $('#sonWindow').modal('show')
                }
                this.$emit(button.component,row);
                
            },
            sonWindowClose: function(){
                this.$emit('action-sonwindow-close')
            },
            nextPagination: function(){
                this.index({
                    url: this.list.links.next,
                    mutation: `${this.pluralWord(this.propModel.name).toUpperCase()}_ADD_PAGINATION`
                }).then(()=>{
                    window.toastr.success('Carga completada.')
                })
            },
            getValue: function(row,col){
                if (col.play) {
                    if (col.play.type == 'enlace') {
                        return `<a href='${row[col.name]}' target='_blank'>${col.play.icon}</a>`
                    }else{
                        return col.play[row[col.name]]
                    }
                }else{
                    return row[col.name];
                }
            },
        }
    }
</script>