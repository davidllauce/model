import {
    INTERESTEDDEMOS_UPDATED,
    INTERESTEDDEMOS_ADD_PAGINATION,
} from '../mutations'

const state = {
    data: {
        data : [],
        links: {},
        meta : {}
    }
}

const mutations = {
    [INTERESTEDDEMOS_UPDATED](state, payload) {
        state.data = payload
    },
    [INTERESTEDDEMOS_ADD_PAGINATION](state, data) {
        state.data.data = state.data.data.concat(data.data)
        state.data.links = data.links
        state.data.meta = data.meta
    },
}

export default {
    state,
    mutations
}