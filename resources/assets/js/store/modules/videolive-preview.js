import {VIDEOLIVE_PREVIEW_LOADING, VIDEOLIVE_PREVIEW_START, VIDEOLIVE_SELECTED_PREVIEW} from '../mutations'

const state = {
    data: {
        init: true,
        status: null,
        data: []
    },
    videolive_selected: {
        id: null,
        name: null,
        name_teacher: null,
        status: null,
        subject_id: null,
        subject_name: null,
        video_id: null
    }
}

const mutations = {
    [VIDEOLIVE_PREVIEW_START](state, payload) {
        state.data.init = true
        state.data = payload
    },
    [VIDEOLIVE_PREVIEW_LOADING](state) {
        state.data.init = false
        state.data.status = 'Loading'
    },
    [VIDEOLIVE_SELECTED_PREVIEW](state, payload) {
        state.videolive_selected = payload.videolive;
    },
}

export default {
    state,
    mutations
}