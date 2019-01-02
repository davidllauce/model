<template>
    <div :id="`${varForCss.layout}-layout-guest`" :class="varForCss.font">
        <nav-bar></nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import NavBar from '../components/guest/NavBar.vue'
    
    export default {
        name: 'guest',
        components: {
            NavBar
        },
        created(){
            this.init()
        },
        mounted(){
            window.renderVarForCss() // Los nav(guest,auth) tienen diferente height
        },
        data(){
            return {
                varForCss:{
                    layout:null,
                    font:'font-default'
                }
            }
        },
        methods:{
            init: function(){
                this.varForCss.layout = window.dev.appName
                this.varForCss.font = `${window.dev.appName}-font`
            }
        }
    }
</script>

<style>
    #nota20-layout-guest{
        min-height:100%; 
        background-color:#f8f9fb;
    }
</style>