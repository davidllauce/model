<template>
    <div class="app-body">
        <div class='app-content'>
        </div>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex'
    
    export default {
        name: 'nota20',
        components: {
        },
        data() {
            return {
                loading: 0
            }
        },

        mounted(){
            setTimeout(() => {
                this.loading = 1
            }, 1000);
        }
    }
</script>