import {

    COURSE_SHOW__START,

    COURSE_SHOW__SESSION_LOADING,
    COURSE_SHOW__SESSION_COMPLETED_LOADING,
    COURSE_SHOW__SESSION_PREPARED,
    COURSE_SHOW__SESSION,
    COURSE_SHOW__SESSION_FINISH,
    COURSE_SHOW__SESSION_FAIL,

    COURSE_SHOW__SLIDE_NEXT,
    COURSE_SHOW__SLIDE_BEHIND,
    COURSE_SHOW__CHANGE_SLIDE,

    COURSE_SHOW__ADVANCE_STORE,

    COURSE_SHOW__REACT,

    COURSE_SHOW__GUIDE_ADD_RESPONSE

} from '../mutations'

const state = {
    data: {
        id: null,
        name: null,
        showSessionCompleted: false
    },
    session: {
        status: null,
        current: {
            id: null,
            title: null,
            week_id: null,
            session_type: null,
            slides: [],
        },
        slideIndex: 0,

    },
    advance: [],
    slide: {
        next: true,
    },

}

const mutations = {

    [COURSE_SHOW__START](state, payload) {

        state.data = payload
        state.session = {
            status: null,
            current: {
                id: null,
                title: null,
                week_id: null,
                session_type: null,
                slides: [],
            },
            slideIndex: 0,

        }
        state.advance = []
        state.slide = {
            next: true,
        }
    },

    [COURSE_SHOW__SESSION_LOADING](state) {
        state.session.status = 'Loading'
    },

    [COURSE_SHOW__SESSION_COMPLETED_LOADING](state) {
        state.data.showSessionCompleted = true
        state.session.status = 'Loading'
    },

    [COURSE_SHOW__SESSION](state, payload) {
        state.advance = payload.data.advance
        payload.data.content.slides.forEach((slide, slide_index) => {
            payload.data.content.slides[slide_index].body = JSON.parse(slide.body)
            /*payload.data.advance.forEach((advance,advance_index) =>{
                if (advance.slide_id == slide.id) payload.data.content.slides[slide_index].body = JSON.parse(advance.question)
            })*/
        })
        state.session.current = {
            id: payload.data.content.id,
            title: payload.data.content.title,
            week_id: payload.data.content.week_id,
            session_type: payload.data.content.session_type,
            slides: payload.data.content.slides,
        }
    },

    [COURSE_SHOW__SESSION_PREPARED](state) {
        state.session.status = 'Prepared'
        if (state.session.current.session_type != 1)
            state.slide.next = false
    },

    [COURSE_SHOW__SESSION_FINISH](state) {
        state.session.status = 'Finish'
        state.data.weeksWithSessions.forEach(week => {
            if (week.id == state.session.current.week_id) {
                week.sessions[state.session.current.index].completed = true
            }
        });
        state.session.slideIndex = 0
    },

    [COURSE_SHOW__SESSION_FAIL](state) {
        state.session.status = 'Fail'
    },

    [COURSE_SHOW__SLIDE_NEXT](state) {
        state.session.slideIndex++
        if (state.session.current.session_type != 1)
            state.slide.next = false
    },

    [COURSE_SHOW__SLIDE_BEHIND](state) {
        state.session.slideIndex--
        state.slide.next = true
    },

    [COURSE_SHOW__CHANGE_SLIDE](state, payload) {
        state.session.slideIndex = payload.index
    },

    [COURSE_SHOW__ADVANCE_STORE](state) {
        state.session.current.slides.forEach((slide, index) => {
            if (index == state.session.slideIndex) {
                slide.completed = true
            }
        });
    },

    [COURSE_SHOW__REACT](state, payload) {
        state.session.current.slides.forEach((slide, index) => {
            if (index == state.session.slideIndex) {
                slide.react = payload.react
            } else {
                slide.react = null
            }
        });
    },

    [COURSE_SHOW__GUIDE_ADD_RESPONSE](state, payload) {
        state.session.current.slides.forEach((slide, index) => {
            if (index == state.session.slideIndex) {
                slide.completed = true
            }
        });
    }

}

export default {
    state,
    mutations
}