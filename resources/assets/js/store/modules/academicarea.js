import {
    ACADEMICAREAS_UPDATED,
    ACADEMICAREAS_ADD_PAGINATION,
} from '../mutations'

const state = {
    data: {
        data : [],
        links: {},
        meta : {}
    }
}

const mutations = {
    [ACADEMICAREAS_UPDATED](state, payload) {
        state.data = payload
    },
    [ACADEMICAREAS_ADD_PAGINATION](state, payload) {
        state.data.data  = state.data.data.concat(payload.data)
        state.data.links = payload.links
        state.data.meta  = payload.meta
    }
}

export default {
    state,
    mutations
}