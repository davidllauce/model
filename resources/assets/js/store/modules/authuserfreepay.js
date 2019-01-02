import {
    SAVE_AUTHUSER_FREEORPAY
} from '../mutations'

const state = {
    user: {
        id: '',
        user_id: '',
        university_id: '',
        academic_area_professional_school_id: '',
        status: '',
        score: ''
    }
}

const mutations = {
    [SAVE_AUTHUSER_FREEORPAY](state, data) {
        state.user.id  = data.id,
        state.user.user_id  = data.user_id,
        state.user.university_id = data.university_id,
        state.user.academic_area_professional_school_id  = data.academic_area_professional_school_id,
        state.user.status  = data.status,
        state.user.score  = data.score
    }
}

export default {
    state,
    mutations
}