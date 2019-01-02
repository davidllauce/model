import {
    PERMISSIONS_UPDATED,
} from '../mutations'

const state = {
    data: {
        data: [],
    },
}

const mutations = {
    [PERMISSIONS_UPDATED](state, payload) {
        state.data.data = payload.data.permissions
    },
}

export default {
    state,
    mutations
}