<template>
    <content-placeholders style='padding:20px'>
        <content-placeholders-heading />
        <hr>
        <content-placeholders-text :lines="propLines" />
    </content-placeholders>
</template>

<script>
    export default {
        name: 'load-table',
        props: ['propLines']
    }
</script>