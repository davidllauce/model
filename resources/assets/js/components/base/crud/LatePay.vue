<template>
    <div class="modal fade" id="modalDebts" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" data-keyboard="false" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header pention-header">
                    <h5 class="modal-title" id="exampleModalLabel">Estimado Estudiante</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body pention-body">
                    Estimado estudiante:
                    A la fecha usted tiene la siguiente deuda:
                    <ul>
                        <li v-for="(deb,index) in this.debts" :key="index">
                            En el ciclo {{deb.cycle}}: <strong class="monto">S/ {{deb.debt}} nuevos soles.</strong>
                        </li>
                    </ul>
                    Puede cancelar su pensión en el banco BCP (Banco de Crédito) indicando su número de DNI.
                    Cuenta BCP: 305-2083682-0-99, a nombre de CORPORACIÓN UNIVERSITARIA DE LA COSTA.
                    <br><br>
                    <strong style="font-size: 14px">Si usted ya realizo el pago, omita este mensaje.</strong>
                </div>
                <div class="modal-footer">
                    <strong class="office">Oficina de pensiones</strong>
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
        name: 'late-pay',
        computed: {
            ...mapGetters([
                'authentication_user'
            ]),
        },
        data(){
            return{
                debts:[],
                total: 0
            }
        },
        mounted(){
            this.checkPay()
        },
        methods: {
            ...mapActions([
                'get'
            ]),
            checkPay: function(){
                this.get({
                    url: '/api/payregistereds/check'
                }).then((data) => {
                    this.debts = data.debts
                    this.total = data.total
                    if(data.total>0) $('#modalDebts').modal('show')     
                })
            },
        }
    }
</script>