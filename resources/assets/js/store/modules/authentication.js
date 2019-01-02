import {
    SAVE_AUTHENTICATED_USER,
    LOGOUT
} from '../mutations'

const state = {
    user: {
        id: '',
        name : '',
        email: '',
        role : {
            name: '',
            slug: '',
            permissions:[]
        },
    }
}

const mutations = {
    [SAVE_AUTHENTICATED_USER](state, data) {
        state.user.id  = data.id,
        state.user.name  = data.name,
        state.user.email = data.email
        state.user.role  = data.role
    },
    [LOGOUT](state){
        state.user = {
            id: '',
            name : '',
            email: '',
            role : {
                name: '',
                slug: '',
                permissions: []
            },
        }
    }
}

export default {
    state,
    mutations
}