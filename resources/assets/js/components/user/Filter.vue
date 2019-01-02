<template>
    <div class='pt-2'>
        <div class="input-group col-md-4 float-right">
            <div class="input-group-prepend ">
                <span class="input-group-text">Rol</span>
            </div>
            <select class="form-control" v-model='filter'>
                <option :value='null'>Selecciona un rol</option>
                <option :value='role.slug' v-for="(role,index) in propRoles" :key='index'>
                    {{ role.name }}
                </option>
            </select>
            <div class="input-group-prepend ">
                <span class="input-group-text">
                    <i class='fa fa-spinner' id='loading'></i>
                </span>
            </div>
            <input class="form-control" v-model='wordsearch' type="text" placeholder="Buscar por nombre">

        </div>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex'

    export default {
        name: 'user-filter',
        props:['propRoles'],
        data(){
            return{
                filter:null,
                wordsearch: '',
            }
        },
        
        watch:{
            wordsearch: function(newWord, oldWord) {
                if (newWord.length % 3 == 0)
                    this.search()
            },
            filter: function(newValue){
                if(newValue==null)
                    window.toastr.info('Selecciona un rol.')
                else
                    this.$emit('filter',newValue)
            }
        },
        methods:{
            ...mapActions(['index']),
            search: function() {
                if(this.filter!=null){
                    $('#loading').addClass('spinner-active')
                    this.index({
                        url: `/api/users/role/${this.filter}?search=${this.wordsearch}`,
                        mutation: 'USERS_UPDATED',
                    }).then(() => {
                        $('#loading').removeClass('spinner-active')
                    })
                }else{
                    window.toastr.error('Selecciona un rol, para mejorar la búsqueda.')
                }
                
            }
        }
    }
</script>