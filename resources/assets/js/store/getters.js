
export const authentication_user = ({ authentication }) => authentication.user

export const can  = ({ authentication }) => authentication.user.role.permissions

export const academiccycles     = ({ academiccycle }) => academiccycle.data

export const roles     = ({ role }) => role.data

export const permissions = ({ permission }) => permission.data

export const sessiontypes  = ({ sessiontype }) => sessiontype.data

export const interesteds = ({ interested }) => interested.data
export const interesteddemos = ({ interesteddemo }) => interesteddemo.data

export const registereds = ({ registered }) => registered.data

export const users = ({ user }) => user.data

export const subjects = ({ subject }) => subject.data

//export const liststudents = ({ liststudent }) => liststudent.data

export const paycategories = ({paycategory}) => paycategory.data

export const courses = ({ course }) => course.data

/** University (ready-danny) */
export const universities = ({ university }) => university.data
/** Admission Exam (ready-danny) */
export const admission_exams = ({ admissionExam }) => admissionExam.data
/** Admission Exam builder (ready-danny) */
export const admissionExamBuilder = ({ admissionExamBuilder }) => admissionExamBuilder
export const aeb_questionCurrent = ({ admissionExamBuilder }) => admissionExamBuilder.questionCurrent
/** Admission Exam Show (ready-danny) */
export const admissionExamShow = ({ admissionExamShow }) => admissionExamShow
/** Subject Builder (ready-danny)*/
export const subjectBuilder = ({ subjectBuilder }) => subjectBuilder
export const sb_sessionCurrent = ({ subjectBuilder }) => subjectBuilder.sessionCurrent
/** Subject Preview (ready-danny) */
export const subjectPreview = ({ subjectPreview }) => subjectPreview.data
export const sp_session = ({ subjectPreview }) => subjectPreview.session
export const sp_sessionCurrent = ({ subjectPreview }) => subjectPreview.session.current
/** Course show (ready-danny) */
export const courseShow = ({ courseShow }) => courseShow.data
export const cs_session = ({ courseShow }) => courseShow.session
export const cs_sessionCurrent = ({ courseShow }) => courseShow.session.current

export const professionals = ({ professional }) => professional.data

export const prospects = ({ prospect }) => prospect.data

export const prospectsubjects = ({ prospectsubject }) => prospectsubject.data

export const assignmentcontents = ({ assignmentcontent }) => assignmentcontent.data
export const myassignmentcontents = ({ myassignmentcontent }) => myassignmentcontent.data

export const academicareas = ({ academicarea }) => academicarea.data

export const listprofessionalschools = ({ listprofessionalschool }) => listprofessionalschool.data

export const simulacrumadmissions = ({simulacrumadmission}) => simulacrumadmission.data

export const academicprospectsubjects = ({ academicprospectsubject }) => academicprospectsubject.data

export const weeks = ({ week }) => week.data

export const mysimulacrumstudents = ({ mysimulacrumstudent }) => mysimulacrumstudent.data

export const simulacrumquestions = ({ simulacrumquestion }) => simulacrumquestion.data

export const simulacrumquestionnesxts = ({ simulacrumquestion }) => simulacrumquestion.slides

export const simulacrumquestioncounts = ({ simulacrumquestion }) => simulacrumquestion.control

export const videolives = ({ videolive }) => videolive.data

export const videoLivePreview = ({ videoLivePreview }) => videoLivePreview.data

export const videoLiveSelected = ({ videoLivePreview }) => videoLivePreview.videolive_selected

export const commentvideolives = ({ commentvideolive }) => commentvideolive.videolivecomments.list
export const commentvideolives_currents = ({ commentvideolive }) => commentvideolive.videolivecomments.current
export const comment_limit = ({ commentvideolive }) => commentvideolive.comment_limit

export const simulacrumstudentdatas = ({ simulacrumquestion }) => simulacrumquestion.student_data

export const authuser_free_pay = ({ authuserfreepay }) => authuserfreepay.user

