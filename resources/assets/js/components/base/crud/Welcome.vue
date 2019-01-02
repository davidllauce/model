<template>
    <div class="modal fade" id="componentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" 
        data-backdrop="static" data-keyboard="false" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header pention-header">
                    <h5 class="modal-title" id="exampleModalLabel">Estimado {{ authentication_user.name }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click='closepay()'>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body pention-body">
                    Les doy la más cordial bienvenida a SECREA: "Comunicación", donde podrán identificar la importancia de la comunicación en los contextos del mundo global.
                    Durante esta primera sesión (05 de octubre al 07 de octubre) realizaremos lo siguiente acciones:
                    1. Revisión general del aula virtual
                    2. Visualiza los videos
                    3. Descarga y lee la información del cronograma 
                    4. Revisión de sistema de calificación (Sílabo)
                    5. Participación en el chat del aula virtual.
                    ¡¡Estoy lista para acompañarte!!
                </div>
                <div class="modal-footer">
                    <strong class="office">Tu tutora  Anghi Díaz</strong>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    
    export default {
        name: 'welcome',
        computed: {
            ...mapGetters([
                'authentication_user', 'can'
            ]),
        },
        created() {
            $('#componentModal').modal('show')
        },
        methods: {
            closepay: function(){
                this.$emit('close');
            }  
        }
    }
</script>