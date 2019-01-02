import {
    ADMISSION_EXAM__START_SHOW,
} from '../mutations'

const state = {
    id: null,
    name: null,
    slug: null,
    subjectWithQuestions: [],
}

const mutations = {
    [ADMISSION_EXAM__START_SHOW](state, payload) {
        payload.bank_questions.forEach(element => {
            element.body = JSON.parse(element.body)
        });
        state.id = payload.id
        state.name = payload.name
        state.slug = payload.slug
        state.subjectWithQuestions = payload.bank_questions
    },
}

export default {
    state,
    mutations
}