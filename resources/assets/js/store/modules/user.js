import {
    USERS_UPDATED,
    USERS_ADD_PAGINATION,
} from '../mutations'

const state = {
    data: {
        data: [],
        links: {},
        meta: {}
    },
}

const mutations = {
    [USERS_UPDATED](state, data) {
        state.data = data
    },
    [USERS_ADD_PAGINATION](state, data) {
        state.data.data = state.data.data.concat(data.data)
        state.data.links = data.links
        state.data.meta = data.meta
    },
}

export default {
    state,
    mutations
}