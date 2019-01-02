import {
    PROSPECTSUBJECTLISTS_UPDATED,
    PROSPECTSUBJECTLISTS_ADD_PAGINATION,
} from '../mutations'

const state = {
    data: {
        data : [],
        links: {},
        meta : {}
    }
}

const mutations = {
    [PROSPECTSUBJECTLISTS_UPDATED](state, payload) {
        state.data = payload
    },
    [PROSPECTSUBJECTLISTS_ADD_PAGINATION](state, payload) {
        state.data.data  = state.data.data.concat(payload.data)
        state.data.links = payload.links
        state.data.meta  = payload.meta
    }
}

export default {
    state,
    mutations
}