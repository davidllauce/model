<template>
    <nav class="navbar navbar-expand-xl navbar-white bg-white fixed-top" :id="varForCss.navBar">
        <router-link :to="{'name':'nota20'}" class="navbar-brand">
            <div class="logo--inNav">
                <img src="/img/app/logo1.png" alt="nota20 logo" class="logo---inNav-img">
            </div>
        </router-link>
    
        <button class="navbar-toggler btn btn-link" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa fa-bars text-dark"></i>
        </button>

        <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto" id="navbarText">
                <li class="nav-item">
                    <router-link :to="{name:'nota20'}" class="nav-link nota20-text-secondary">INICIO</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name:'login'}" class="nav-link nota20-text-secondary">INGRESAR</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'navbar-guest',
        data() {
            return {
                varForCss: {
                    navBar: `${window.dev.appName}-navbar`
                }
            }
        }
    }
</script>

<style>
    #nota20-navbar {
        width: 70%;
        margin: 3em auto;
        padding: 1em;
        background-color: #ffffff !important;
        box-shadow: 4px 4px 15px -1px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 4px 4px 15px -1px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 4px 4px 15px -1px rgba(0, 0, 0, 0.75);
    }
    
    .logo--inNav {
        margin-bottom: -0.8em;
    }

    .logo---inNav-img {
        width: 80px;
        margin-top: -0.5em;
    }
    
</style>
