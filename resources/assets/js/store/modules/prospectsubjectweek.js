import {PROSPECTSUBJECTWEEKS_ADD_PAGINATION, PROSPECTSUBJECTWEEKS_UPDATED} from '../mutations'

const state = {
    data: {
        data: [],
        links: {},
        meta: {}
    },
}

const mutations = {
    [PROSPECTSUBJECTWEEKS_UPDATED](state, payload) {
        state.data = payload
    },
    [PROSPECTSUBJECTWEEKS_ADD_PAGINATION](state, data) {
        state.data.data = state.data.data.concat(data.data)
        state.data.links = data.links
        state.data.meta = data.meta
    },

}

export default {
    state,
    mutations
}