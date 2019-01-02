import {
    PROSPECTSUBJECTS_UPDATED,
    PROSPECTSUBJECTS_ADD_PAGINATION,
} from '../mutations'

const state = {
    data: {
        data : [],
        links: {},
        meta : {}
    },
}

const mutations = {
    [PROSPECTSUBJECTS_UPDATED](state, payload) {
        state.data = payload
    },
    [PROSPECTSUBJECTS_ADD_PAGINATION](state, payload) {
        state.data.data  = state.data.data.concat(payload.data)
        state.data.links = payload.links
        state.data.meta  = payload.meta
    },
}

export default {
    state,
    mutations
}