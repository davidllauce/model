import {
    ASSIGNMENTCONTENTS_UPDATED,
    ASSIGNMENTCONTENTS_ADD_PAGINATION
} from '../mutations'

const state = {
    data: {
        data: [],
        links: {},
        meta: {}
    }
}

const mutations = {
    [ASSIGNMENTCONTENTS_UPDATED](state, data) {
        state.data = data
    },
    [ASSIGNMENTCONTENTS_ADD_PAGINATION](state, data) {
        state.data.data = state.data.data.concat(data.data)
        state.data.links = data.links
        state.data.meta = data.meta
    }
}

export default {
    state,
    mutations
}