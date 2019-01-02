import {
    SIMULACRUMQUESTIONS_UPDATED,
    SIMULACRUMQUESTIONS_ADD_PAGINATION,
    SIMULACRUMQUESTIONNEXT_UPDATED,
    SIMULACRUMQUESTIONCOUNT_UPDATED,
    SIMULACRUMSTUDENTDATA_UPDATED,
    SIMULACRUMQUESTIONEND_UPDATED
} from '../mutations'

const state = {
    data: {
        data: [],
        links: {},
        meta: {}
    },
    slides: {
        index: 0,
        next: false
    },
    control:{
        count: 0
    },
    student_data: {
        simulacrum_student_id: null
    }
}

const mutations = {
    [SIMULACRUMQUESTIONS_UPDATED](state, payload) {
        state.data = payload
    },
    [SIMULACRUMQUESTIONS_ADD_PAGINATION](state, data) {
        state.data.data = state.data.data.concat(data.data)
        state.data.links = data.links
        state.data.meta = data.meta
    },
    [SIMULACRUMQUESTIONNEXT_UPDATED](state) {
        state.slides.index++
        state.slides.next = false
    },
    [SIMULACRUMQUESTIONCOUNT_UPDATED](state, payload) {
        state.control.count = payload
    },
    [SIMULACRUMSTUDENTDATA_UPDATED](state, payload) {
        state.student_data.simulacrum_student_id = payload.id
    },
    [SIMULACRUMQUESTIONEND_UPDATED](state) {
        state.slides.index = 0
    },
    
}

export default {
    state,
    mutations
}