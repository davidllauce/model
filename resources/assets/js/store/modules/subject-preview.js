import {
    SUBJECT_PREVIEW__START,
    SUBJECT_PREVIEW_SESSION_LOADING,
    SUBJECT_PREVIEW_SESSION,
    SUBJECT_PREVIEW_SESSION_PREPARED,
    SUBJECT_PREVIEW_SESSION_FINISH,
    SUBJECT_PREVIEW_SESSION_FAIL,
    SUBJECT_PREVIEW_SLIDE_NEXT,
    SUBJECT_PREVIEW_SLIDE_BEHIND,
    SUBJECT_PREVIEW_CHANGE_SLIDE
} from '../mutations'

const state = {
    data: {
        init: true,
        id: null,
        identify: null,
        grade: null,
        weeksWithSessions: [],
    },
    session: {
        status: null,
        current: {
            id: null,
            title: null,
            week_id: null,
            type: null,
            slides: [],
        },
        slideIndex: 0
    }
}


const mutations = {

    [SUBJECT_PREVIEW__START](state, payload) {
        state.data = {
            init: true,
            id: payload.id,
            identify: payload.identify,
            weeksWithSessions: payload.weeks,
        }
        state.session = {
            status: null,
            current: {
                id: null,
                title: null,
                week_id: null,
                type: null,
                slides: [],
            },
            slideIndex: 0
        }
    },
    [SUBJECT_PREVIEW_SESSION_LOADING](state) {
        state.data.init = false
        state.session.status = 'Loading'
    },

    [SUBJECT_PREVIEW_SESSION](state, payload) {
        payload.data.slides.forEach((elem, index) => {
            elem.body = JSON.parse(elem.body)
        })
        state.session.current = {
            id: payload.data.id,
            title: payload.data.title,
            week_id: payload.data.week_id,
            session_type: payload.data.session_type,
            slides: payload.data.slides,
        }
    },

    [SUBJECT_PREVIEW_SESSION_PREPARED](state) {
        state.session.status = 'Prepared'
    },

    [SUBJECT_PREVIEW_SESSION_FINISH](state) {
        state.session.status = 'Finish'
    },

    [SUBJECT_PREVIEW_SESSION_FAIL](state) {
        state.session.status = 'Fail'
    },
    [SUBJECT_PREVIEW_SLIDE_NEXT](state) {
        state.session.slideIndex++
    },

    [SUBJECT_PREVIEW_SLIDE_BEHIND](state) {
        state.session.slideIndex--
    },

    [SUBJECT_PREVIEW_CHANGE_SLIDE](state, payload) {
        state.session.slideIndex = payload.index
    }
}

export default {
    state,
    mutations
}