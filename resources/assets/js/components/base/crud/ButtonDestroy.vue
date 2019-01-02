<template>
    <a class="btn bg-orange" @click='preRemove(propAlertSms)' data-toggle="tooltip" title="Eliminar">
        <span class='fa fa-trash text-white'></span>
    </a>
</template>

<script>
    export default {
        props: ['propAlertSms', 'propRow'],
        methods: {
            preRemove: function(sms) {
                alertify.confirm(sms, () => {
                    this.$emit('action-remove', this.propRow)
                })
            }
        }
    }
</script>