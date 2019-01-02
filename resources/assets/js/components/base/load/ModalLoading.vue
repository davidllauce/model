<template>
    <div class='modal-content-load' style='z-index:1050'>
        <div class='modal-load'>
            {{sms.toUpperCase()}}
            <span class='fa fa-spinner spinner-active'></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'modal-loading',
        props: ['sms']
    }
</script>