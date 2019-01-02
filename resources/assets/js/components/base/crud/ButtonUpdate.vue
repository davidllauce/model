<template>
    <a class="btn bg-orange" @click='preActualize' data-toggle="tooltip" title="Editar">
        <span class='fa fa-pencil-square-o text-white'></span>
    </a>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    
    export default {
        props: ['propRow'],
        methods: {
            preActualize: function() {
                this.$emit('action-pre-actualize',this.propRow)
            }
        }
    }
</script>