<template>
        <download-excel
            class   = "btn btn-success"
            :data   = "json_data"
            :fields = "json_fields"
            name    = "filename.xls">
            Reporte Excel
        </download-excel>
</template>

<script>
    
    import {
		mapGetters,
		mapActions
	} from 'vuex'
    import JsonExcel from 'vue-json-excel'
    
    export default {
        components:{
            'downloadExcel':JsonExcel
        },
        props: {
            propReport: {
                required: true
            }
        },
        mounted(){
			this.getData()
		},
        data(){
            return {
                json_fields: {},
                json_data: [],
                json_meta: [
                    [
                        {
                            'key': 'charset',
                            'value': 'utf-8'
                        }
                    ]
                ],
            }
        },
        methods:{
            ...mapActions([
               'get'
            ]),
            
            getData: function(){
                this.get({
                    url: this.propReport.url
                }).then((data) => {

                    this.json_fields = this.propReport.cols
                    this.json_data = data.data
                });
            }
        }
    }
</script>