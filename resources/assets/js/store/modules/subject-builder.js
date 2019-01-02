import {
    SUBJECT_BUILDER__START,
    WEEK_ADD,
    SESSION_ADD,
    SESSION_OPEN,
    SESSION_CLOSE,
    UPDATED_WEEKS_SESSIONS,
    UPDATED_WEEKS,
    SUBJECT_BUILDER__END
} from '../mutations'

const state = {
    id: null,
    identify: null,
    weeksWithSessions: [],
    sessionOpen: false,
    sessionCurrent: {
        details: {
            id: null,
            title: null,
            week_id: null,
            session_type: null,
            index: null,
            slides: []
        },

    }
}


const mutations = {
    [SUBJECT_BUILDER__START](state, payload) {
        state.id = payload.id
        state.identify = payload.identify
        state.weeksWithSessions = payload.weeks
    },
    [WEEK_ADD](state,payload){
        state.weeksWithSessions = [...state.weeksWithSessions, payload.data]
    },
    [SESSION_ADD](state,payload){
        state.sessionCurrent = {
            details: {
                id: null,
                title: null,
                week_id: null,
                session_type: null,
                slides: []
            },
        }
        state.weeksWithSessions.forEach((week, index) => {
            if (week.id == payload.data.week_id)
                state.weeksWithSessions[index].sessions.push(payload.data)
        })
    },
    [SESSION_OPEN](state,payload){
        state.sessionOpen = true,
        payload.data.slides.forEach((elem, index) => {
            payload.data.slides[index].body = JSON.parse(elem.body)
        })
        state.sessionCurrent.details = payload.data
    },
    [SESSION_CLOSE](state,payload){
        state.sessionOpen = false
        state.sessionCurrent = {
            details: {
                id: null,
                title: null,
                week_id: null,
                session_type: null,
                slides: []
            },
        }
    },
    [UPDATED_WEEKS_SESSIONS](state, payload) {
        state.weeksWithSessions = payload
    },
    [UPDATED_WEEKS](state,payload){
        state.weeksWithSessions = payload.weeks
    },
    [SUBJECT_BUILDER__END](state){
        state.id = null,
        state.identify = null,
        state.weeksWithSessions = [],
        state.sessionOpen = false,
        state.sessionCurrent = {
            details: {
                id: null,
                title: null,
                week_id: null,
                session_type: null,
                index: null,
                slides: []
            },
        }
    }
}

export default {
    state,
    mutations
}