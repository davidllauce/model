<template>
    <div class="card-header">
        <div class='row'>
            <div class='col float-left m-auto'>
                <h5 class="m-0" v-html='propConfig.title' ></h5>
            </div>
            
            <div class='col' v-if="propConfig.buttonStore">
                <!--v-if='can.includes(`${propModel.name}-store`)'-->
                <button-store class='float-right' :propConfig='propConfig.buttonStore' @action-pre-create='preCreate'></button-store>
            </div>
        </div>
        
    </div>
</template>

<script>
    import {
        mapGetters,
    } from 'vuex'

    import ButtonStore from './ButtonStore'
    
    export default {
        components: {
            ButtonStore
        },
        props: {
            propModel: {
                required: true
            },
            propConfig: {
                required: true
            },
        },
        computed:{
            ...mapGetters([
                'can'
            ]),
        },
        methods: {
            preCreate: function() {
                this.$emit('action-pre-create');
            },
        }
    }
</script>