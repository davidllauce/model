import {
    PROFESSIONALS_UPDATED,
    PROFESSIONALS_ADD_PAGINATION,
} from '../mutations'

const state = {
    data: {
        data: [],
        links: {},
        meta: {}
    },
}

const mutations = {
    [PROFESSIONALS_UPDATED](state, payload) {
        state.data = payload
    },
    [PROFESSIONALS_ADD_PAGINATION](state, data) {
        state.data.data = state.data.data.concat(data.data)
        state.data.links = data.links
        state.data.meta = data.meta
    },

}

export default {
    state,
    mutations
}