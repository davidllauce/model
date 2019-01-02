<template>
    <div class='card'>
        <div class="card-header">
            <div class='row'>
                <div class='col mt-1 float-right'>
                    <h5 class="m-0" data-toggle="collapse" href="#info-my-access"><span class='fa fa-user'></span> Modificar contraseña</h5>
                </div>
            </div>
        </div>

        <div class="collapse show" id="info-my-access">
            <div class="card-footer">
                <span class="badge badge-success align-middle">
                    <i class="fa fa-info-circle"></i>
                </span> 
                <span>Por temas de seguridad, usted no puede recuperar su contraseña. Intenta modificarla.</span>
            </div>
        </div>
    
        <div class='card-body'>
            <my-access-form/>
        </div>


    </div>
</template>

<script>
    import MyAccessForm from './Form.vue'
    
    import {
        mapActions,
        mapGetters,
    } from 'vuex'
    
    export default {
        name: 'my-access',
        components: {
            MyAccessForm
        }
    }
</script>