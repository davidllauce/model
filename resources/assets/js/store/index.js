/**
 * Import vue and vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'
/**
 * Import modules
 */
import user from './modules/user'
import role from './modules/role'
import permission from './modules/permission'
import academiccycle from './modules/academiccycle'
import sessiontype from './modules/sessiontype'
import authentication from './modules/authentication'
import interested from './modules/interested'
import registered from './modules/registered'
import subject from './modules/subject'
import course from './modules/course'
import paycategory from './modules/pay-category'
import university from './modules/university' // ready-danny
import admissionExam from './modules/admission-exam' // ready-danny
import admissionExamBuilder from './modules/admission-exam-builder' // ready-danny
import admissionExamShow from './modules/admission-exam-show' // ready-danny
import subjectBuilder from './modules/subject-builder' // ready-danny
import subjectPreview from './modules/subject-preview' // ready-danny
import courseShow from './modules/course-show' // ready-danny
import professional from './modules/professional'
import prospect from './modules/prospect'
import prospectsubject from './modules/prospectsubject'
import assignmentcontent from './modules/assignmentcontent'
import myassignmentcontent from './modules/myassignmentcontent'
import academicarea from './modules/academicarea'
import listprofessionalschool from './modules/listprofessionalschool'
import simulacrumadmission from './modules/simulacrumadmission'
import week from './modules/week'
import academicprospectsubject from './modules/academicprospectsubject'
import prospectsubjectWeek from './modules/prospectsubjectweek'
import mysimulacrumstudent from './modules/mysimulacrumstudent'
import simulacrumquestion from './modules/simulacrumquestion'
import videolive from './modules/videolive'
import videoLivePreview from './modules/videolive-preview'
import commentvideolive from './modules/comment-videolive'
import authuserfreepay from './modules/authuserfreepay'
import interesteddemo from './modules/interesteddemo'
/**
 * Import Actions and getters
 */
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        user,
        authentication,
        role,
        permission,
        academiccycle,
        sessiontype,
        interested,
        registered,
        subject,
        course,
        paycategory,
        university,
        professional,
        prospect,
        prospectsubject,
        assignmentcontent,
        myassignmentcontent,
        academicarea,
        listprofessionalschool,
        admissionExam,
        admissionExamBuilder,
        admissionExamShow,
        subjectBuilder,
        subjectPreview,
        courseShow,
        simulacrumadmission,
        week,
        prospectsubjectWeek,
        academicprospectsubject,
        mysimulacrumstudent,
        simulacrumquestion,
        videolive,
        videoLivePreview,
        commentvideolive,
        authuserfreepay,
        interesteddemo
    }
})