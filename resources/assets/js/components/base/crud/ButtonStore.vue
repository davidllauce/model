<template>
    <a class='btn bg-orange btn-md text-white' @click='preCreate' v-html='propConfig.text'></a>
</template>

<script>
    
    export default {
        props: {
            propConfig: {
                required: true
            }
        },
        methods: {
            
            preCreate: function() {
                this.$emit('action-pre-create')
            },
        }
    }

</script>