import {SIMULACRUMADMISSIONS_ADD_PAGINATION, SIMULACRUMADMISSIONS_UPDATED} from '../mutations'

const state = {
    data: {
        data: [],
        links: {},
        meta: {}
    },
}

const mutations = {
    [SIMULACRUMADMISSIONS_UPDATED](state, payload) {
        state.data = payload
    },
    [SIMULACRUMADMISSIONS_ADD_PAGINATION](state, data) {
        state.data.data = state.data.data.concat(data.data)
        state.data.links = data.links
        state.data.meta = data.meta
    },

}

export default {
    state,
    mutations
}