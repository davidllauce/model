import {VIDEOLIVES_ADD_PAGINATION, VIDEOLIVES_UPDATED} from '../mutations'

const state = {
    data: {
        data: [],
        links: {},
        meta: {}
    },
}

const mutations = {
    [VIDEOLIVES_UPDATED](state, payload) {
        state.data = payload
    },
    [VIDEOLIVES_ADD_PAGINATION](state, data) {
        state.data.data = state.data.data.concat(data.data)
        state.data.links = data.links
        state.data.meta = data.meta
    },

}

export default {
    state,
    mutations
}