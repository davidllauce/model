export default function (Vue) {
    Vue.redirect = {
        accordingStatus(status) {
            if(status == 401){
                this.destroyToken()
                window.location.href = '/#/login'
            }

            if (status == 403) {
                if(this.getToken()){
                    window.toastr.error('Acceso denegado')
                    window.location.href = '/#/not-authorized'
                }else{
                    this.destroyToken()
                    window.location.href = '/#/login'
                }
            }

            if (status == 404) {
                window.toastr.error('Página no encontrada. Verifica las indicaciones o requisitos.')
            }

            if (status == 500) {
                window.toastr.error('No he logrado procesar su petición.')
            }
        },
        getToken() {
            var token = localStorage.getItem('token')
            var expiration = localStorage.getItem('expiration')
            if (!token || !expiration)
                return null
            if (Date.now() > parseInt(expiration)) {
                this.destroyToken()
                return null
            } else
                return token
        },
        destroyToken() {
            localStorage.removeItem('token')
            localStorage.removeItem('expiration')
        }
    }

    Object.defineProperties(Vue.prototype, {
        $redirect: {
            get: () => {
                return Vue.redirect
            }
        }
    })
}