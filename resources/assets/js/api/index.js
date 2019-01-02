/**
 * API
 * !backend: Laravel
 */

export default {

    /**
     * *Authentication with passport
     * @param {configuration passport} config 
     */
    login(config, success, danger) {
        axios.post(`/oauth/token`, config)
            .then((response) => {  
                success(response)
            }).catch((error) => {
                danger(error)
            });
    },

    /**
     * *Verify authenticated user
     */
    checkAuth(success, danger) {
        axios.get(`/api/users/check-auth`)
            .then((response) => {
                success(response)
            }).catch((error) => {
                danger(error)
            });
    },

    /**
     * 
     */
    identifyAuth(success, danger) {
        axios.get(`/api/registereds/userfreepay`)
            .then((response) => {
                success(response)
            }).catch((error) => {
                danger(error)
            });
    },
    
    /**
     * 
     * *Register interested user
     */
    interested(inputs, success, danger) {
        axios.post(`/api/interesteds/request-for-information`, inputs)
            .then(
                res => {
                    success(res)
                },
                err => {
                    danger(err.response)
                }
            ).catch((error) => {
                console.log(`Error-register en api.js ${error}`)
            });
    },

    /**
     * 
     * *Register interestereds for open demo
     */
    interesteddemo(inputs, success, danger) {
        axios.post(`/api/interesteds/request-for-demo`, inputs)
            .then(
                res => {
                    success(res)
                },
                err => {
                    danger(err.response)
                }
            ).catch((error) => {
                console.log(`Error-register en api.js ${error}`)
            });
    },

    /**
     * 
     * *CRUD
     */
    index(request, success, danger) {
        axios.get(request.url)
            .then(
                res => {
                    success(res)
                },
                err => {
                    window.Vue.redirect.accordingStatus(err.response.status)
                    danger(err.response)
                }
            )
            .catch((error) => {
                console.log(`Error-index en api.js ${error}`)
            });
    },
    
    store(request, success, danger) {
        axios.post(request.url, request.params)
            .then(
                res => {
                    success(res)
                },
                err => {
                    window.Vue.redirect.accordingStatus(err.response.status)
                    danger(err.response)
                }
            ).catch((error) => {
                console.log(`Error-store en api.js ${error}`)
            });
    },

    show(request, success, danger) {
        axios.get(request.url)
            .then(
                res => {
                    success(res)
                },
                err => {
                    window.Vue.redirect.accordingStatus(err.response.status)
                    danger(err.response)
                }
            )
            .catch((error) => {
                console.log(`Error-show en api.js ${error}`)
            });
    },


    update(request, success, danger) {
        axios.patch(request.url, request.params)
            .then(
                res => {
                    success(res)
                },
                err => {
                    window.Vue.redirect.accordingStatus(err.response.status)
                    danger(err.response)
                }
            ).catch((error) => {
                console.log(`Error-patch en api.js ${error}`)
            });
    },

    destroy(request, success, danger) {
        axios.delete(request.url)
            .then(
                res => {
                    success(res)
                },
                err => {
                    window.Vue.redirect.accordingStatus(err.response.status)
                    danger(err.response)
                }
            ).catch((error) => {
                console.log(`Error-remove en api.js ${error}`)
            });
    },

    storeWithFile(request, success, danger) {
        let config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post(request.url, request.formData, config)
            .then(
                res => {
                    success(res)
                },
                err => {
                    window.Vue.redirect.accordingStatus(err.response.status)
                    danger(err.response)
                }
            ).catch((error) => {
                console.log(`Error-store-with-file en api.js ${error}`)
            });
    },

    postWithFile(request, success, danger) {
        let config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post(request.url, request.formData, config)
            .then(
                res => {
                    success(res)
                },
                err => {
                    window.Vue.redirect.accordingStatus(err.response.status)
                    danger(err.response)
                }
            ).catch((error) => {
                console.log(`Error-update-with-file en api.js ${error}`)
            });
    },
}