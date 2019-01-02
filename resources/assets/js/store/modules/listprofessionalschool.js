import {
    LISTPROFESSIONALSCHOOLS_UPDATED,
    LISTPROFESSIONALSCHOOLS_ADD_PAGINATION,
} from '../mutations'

const state = {
    data: {
        data : [],
        links: {},
        meta : {}
    },
}

const mutations = {
    [LISTPROFESSIONALSCHOOLS_UPDATED](state, payload) {
        state.data = payload
    },
    [LISTPROFESSIONALSCHOOLS_ADD_PAGINATION](state, payload) {
        state.data.data  = state.data.data.concat(payload.data)
        state.data.links = payload.links
        state.data.meta  = payload.meta
    },
}

export default {
    state,
    mutations
}