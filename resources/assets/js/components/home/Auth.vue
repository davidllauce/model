<template>
    <div id='home'>
        <div id='home-gradient'></div>
        <div id="home-auth">
            <div class="container-fluid" style="z-index:100">
                <h1>Raza Viral</h1>
                <small>Plataforma virtual</small>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'auth',
    }
</script>

<style>
    #home{
        background-image: url('/img/web/slider/6.jpg');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100%;
        height: var(--app-content-height);
        color:white;
    }
    #home-auth {
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: xx-large;
    }
    #home-gradient{
        background-image:  linear-gradient(to right, #FFBF3A 0%, rgba(255, 136, 0, 0.582) 100%);
        opacity: 0.6;
        width: 100%;
        height: var(--app-content-height);
        position: absolute;
    }
</style>
