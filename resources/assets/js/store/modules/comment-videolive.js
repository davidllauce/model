import {VIDEOLIVECOMMENTS_CURRENTS, VIDEOLIVECOMMENTS_UPDATED} from '../mutations'

const state = {
    videolivecomments: {
        current: [],
        list: [],
    },
    comment_limit: {
        init_limit: 0,
        limit: 18,
    }
}

const mutations = {
    [VIDEOLIVECOMMENTS_UPDATED](state, data) {
        state.videolivecomments.list = data.data
    },
    [VIDEOLIVECOMMENTS_CURRENTS](state, data) {
        state.videolivecomments.current = data.data
    }
}


export default {
    state,
    mutations
}