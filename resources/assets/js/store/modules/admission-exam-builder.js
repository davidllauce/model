import {
    ADMISSION_EXAM__START_BUILDER,
    ADD_QUESTION,
    DESTROY_QUESTION,
    OPEN_QUESTION,
    CLOSE_QUESTION,
    ADMISSION_EXAM__END_BUILDER
} from '../mutations'

const state = {
    id: null,
    name: null,
    slug:null,
    subjectWithQuestions: [],
    questionOpen: false,
    questionCurrent: {
        details: {},
        questions: []
    }
}

const mutations = {
    [ADMISSION_EXAM__START_BUILDER](state, payload) {
        state.id = payload.id
        state.name = payload.name
        state.slug = payload.slug
        state.subjectWithQuestions = payload.bank_questions
        state.questionOpen = false,
            state.questionCurrent = {
                details: {},
                questions: []
            }
    },
    [ADD_QUESTION](state,payload){
        state.subjectWithQuestions = [...state.subjectWithQuestions, payload.data]
    },
    [DESTROY_QUESTION](state,payload){
        state.subjectWithQuestions.forEach((element, index) => {
            if (element.id == payload.question_id)
                state.subjectWithQuestions.splice(index, 1);
        });
    },
    [OPEN_QUESTION](state,payload){
        state.questionOpen = true,
        state.questionCurrent.details = payload.data
        state.questionCurrent.questions[0] = JSON.parse(payload.data.body)
    },
    [CLOSE_QUESTION](state,payload){
        state.questionOpen = false
        state.questionCurrent = {
            details: {},
            questions: []
        }
    },
    [ADMISSION_EXAM__END_BUILDER](state){
        state.id =  null,
        state.name = null,
        state.slug = null,
        state.subjectWithQuestions = [],
        state.questionOpen = false,
        state.questionCurrent = {
            details: {},
            questions: []
        }
    }
}

export default {
    state,
    mutations
}