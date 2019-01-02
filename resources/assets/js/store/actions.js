import api from '../api'
import * as types from './mutations'

/****************************************************************
 * *Action for authentication with passport-laravel
 *****************************************************************/
export const login = ({ commit },config) => { 
    return new Promise((resolve, reject) => {
        api.login(config,(response) => {
                resolve(response)
            }, () => {
                reject()
            })
    });
}

/****************************************************************
 * *Action for register interested
 ****************************************************************/
export const interested = ({ commit }, inputs) => {
    return new Promise((resolve, reject) => {
        api.interested(inputs, (response) => {
                resolve(response.data)
            }, (error) => {
                if (error.status == 422)
                    reject(error.data.errors)
                else
                    reject(error)
            })
    });
};

/****************************************************************
 * *Action for register interested for open demo
 ****************************************************************/
export const interesteddemo = ({ commit }, inputs) => {
    return new Promise((resolve, reject) => {
        api.interesteddemo(inputs, (response) => {
                resolve(response.data)
            }, (error) => {
                if (error.status == 422)
                    reject(error.data.errors)
                else
                    reject(error)
            })
    });
};

/******************************************************************************
 * *Verify user authentication
 ******************************************************************************/
export const checkAuth = ({ commit }) => {
    return new Promise((resolve, reject) => {
        api.checkAuth((response) => {
                commit(types.SAVE_AUTHENTICATED_USER, response.data.data)
                localStorage.setItem('permissions', response.data.data.role.permissions)
                document.cookie = `permissions=${response.data.data.role.permissions};`
                resolve()
            },(error) => {
                reject(error)
            });
        })
}

/******************************************************************************
 * *Identify user free or pay
 ******************************************************************************/
export const identifyAuth = ({ commit }) => {
    return new Promise((resolve, reject) => {
        api.identifyAuth((response) => {
                commit(types.SAVE_AUTHUSER_FREEORPAY, response.data.data)
                resolve()
            },(error) => {
                reject(error)
            });
        })
}


/**********************************************************************
 * *Actions for crud's
 * !do not modify, actions used by all components
 **********************************************************************/
export const index = ({ commit }, request) => {
    return new Promise((resolve, reject) => {
        api.index(request, (response) => {
            if (request.mutation)
                commit(types[request.mutation], response.data)
            resolve(response.data)
        }, (error) => {
            reject(error)
        })
    });
}
export const get = ({ commit }, request) => {
    return new Promise((resolve, reject) => {
        api.show(request, (response) => {
            if (request.mutation)
                commit(types[request.mutation], response.data)
            resolve(response.data);
        }, (error) => {
            reject(error);
        })
    });
}
export const show = ({ commit }, request) => {
    return new Promise((resolve, reject) => {
        api.show(request, (response) => {
            if(request.mutation)
                commit(types[request.mutation], response.data)
            resolve(response.data);
        }, (error) => {
            reject(error);
        })
    });
}
export const store = ({ commit }, request) => {
    return new Promise((resolve, reject) => {
        api.store(request, (response) => {
            if (request.mutation)
                commit(types[request.mutation], response.data)
            resolve(response.data)
        }, (error) => {
            reject(error.data.errors)
        })
    });
}
export const destroy = ({ commit }, request) => {
    return new Promise((resolve, reject) => {
        api.destroy(request, (response) => {
            if (request.mutation)
                commit(types[request.mutation], response.data)
            resolve(response.data)
            
        }, (error) => {
            reject(error);
        })
    });
}
export const update = ({ commit }, request) => {
    return new Promise((resolve, reject) => {
        api.update(request, (response) => {
            if (request.mutation)
                commit(types[request.mutation],response.data)
            resolve(response.data);
        }, (error) => {
            reject(error.data.errors)
        })
    });
}

export const postWithFile = ({ commit }, request) => {
    return new Promise((resolve, reject) => {
        api.postWithFile(request, (response) => {
            if (request.mutation)
                commit(types[request.mutation])
            resolve(response.data);
        }, (error) => {
            reject(error.data.errors)
        })
    });
}

export const executeCommit = ({ commit }, request) => {
    if(request.payload)
        commit(types[request.mutation], request.payload)  
    else
        commit(types[request.mutation])      
}




