<template>
    <div class="modal fade" id="componentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" data-keyboard="false" aria-hidden="true">
        <div class="modal-dialog" :class='propConfig.size'  role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" v-html='propConfig.title'></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click='close'>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!--Formulario-->
                    <slot name='form'></slot>
                    <!--End formulario-->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal"  @click='close'>Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex'
    
    export default {
        name: 'modal',
        props:['propConfig','propModel'],
        methods: {

            ...mapActions([
                'modalClear'
            ]),
            
            close: function(){
                this.$emit('action-close')
            }
            
        },
    
    }
</script>