import {
    ADMISSION_EXAMS__UPDATED,
    ADMISSION_EXAMS_ADD_PAGINATION
} from '../mutations'

const state = {
    data: {
        data: [],
        links: {},
        meta: {}
    },
}

const mutations = {
    [ADMISSION_EXAMS__UPDATED](state, payload) {
        state.data = payload
    },
    [ADMISSION_EXAMS_ADD_PAGINATION](state, payload) {
        state.data.data = state.data.data.concat(payload.data)
        state.data.links = payload.links
        state.data.meta = payload.meta
    },
}

export default {
    state,
    mutations
}