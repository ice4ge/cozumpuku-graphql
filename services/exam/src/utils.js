const Exam = require('./models/exam.model');
const ExamAnswer = require('./models/examAnswer.model');
const ExamSet = require('./models/examSet.model');
const ExamSetBookie = require('./models/examSetBookie.model');
const ExamTest = require('./models/examTest.model');
const Lesson = require('./models/lesson.model');
const Subtopic = require('./models/subtopic.model');
const Topic = require('./models/topic.model');

// -----   E X A M   -----

const factorExam = exam => {
    return !!exam ? {_id: exam._id, title: exam.title || "", date: exam.date} : null;
}

const factorExams = exams => {
    return (!!exams && exams.length > 0) ? (exams.map(exam => factorExam(exam))) :  [];
}

const checkExamDup = async where => {
    const exam = await Exam.findOne(where);
    return !!exam;
}

// -----   E X A M   -----
const factorExamAnswer = ea => {
    return !!ea ? {_id: ea._id, examSetTestId: ea.examSetTestId, questionNumber: ea.questionNumber, correctAnswer: ea.correctAnswer, subTopicId: ea.subTopicId} : null;
}
const factorExamAnswers = eas => {
    return !!eas && eas.length > 0 ? (eas.map(ea => factorExamAnswer(ea))) : [];
}
const checkExamAnswerDuplicated = async where => {
    const ea = await ExamAnswer.findOne(where);
    return !!ea;
}


// -----   E X A M    S E T   -----
const factorExamSet = examSet=> {
    return !!examSet ? { _id: examSet._id, examId: examSet.examId, categoryId: examSet.categoryId, title: examSet.title, publisherId: examSet.publisherId, publishYear: examSet.publishYear, isbn: examSet.isbn, level: examSet.level, showToUsers: examSet.showToUsers, image: examSet.image } : null;
}

const factorExamSets = ess => {
    return (!!ess && ess.length > 0) ? (ess.map(es => factorExamSet(es))) : [];
}

const checkExamSetDup = async where => {
    const examSet = await ExamSet.findOne(where);
    return !!examSet;
}

// -----   EXAM SET BOOKIE   -----
const factorESBookie = esb => {
    return !!esb ? {_id: esb._id, examSetId: esb.examSetId || "", bookieTitle: esb.bookieTitle} : null;
}
const factorESBookies = esbs => {
    return !!esbs && esbs.length > 0 ? (esbs.map(esb=>factorESBookie(esb))) : [];
}
const checkESBDuplicated = async where => {
    const esb = await ExamSetBookie.findOne(where);
    return !!esb;
}

// -----   EXAM TEST   -----
const factorExamTest = et => {
    return !!et ? {_id: et._id, examSetBookieId: et.examSetBookieId, title: et.title, sequence: et.sequence, questionCount: et.questionCount} : null;
}
const factorExamTests = ets => {
    return !!ets && ets.length > 0 ? (ets.map(et => factorExamTest(et))) : [];
}
const checkExamTestDuplicate = async where => {
    const et = await ExamTest.findOne(where);
    return !!et;
}


// -----   L E S S O N   -----
const factorLesson = ls => {
    return !!ls ? {_id: ls._id, title: ls.title} : null;
}

const factorLessons = lss => {
    return !!lss && lss.length > 0 ? (lss.map(ls => factorLesson(ls))) : [];
}

const checkLessonDuplicate = async where => {
    const lesson = await Lesson.findOne(where);
    return !!lesson;
}

// -----   T O P I C   -----
const factorTopic = tp => {
    return !!tp ? {_id: tp._id, lessonId: tp.lessonId, title: tp.title} : null;
}

const factorTopics = tps => {
    return !!tps && tps.length > 0 ? (tps.map(tp => factorTopic(tp))) : [];
}

const checkTopicDuplicated = async where => {
    const topic = await Topic.findOne(where);
    return !!topic;
}

// -----   S U B T O P I C   -----
const factorSubtopic = st => {
    return !!st ? {_id: st._id, topicId: st.topicId, title: st.title} : null;
}
const factorSubtopics = sts => {
    return !!sts && sts.length > 0 ? (sts.map(st=>factorSubtopic(st))) : [];
}
const checkSubtopicDuplicated = async where => {
    const subtopic = await Subtopic.findOne(where);
    return !!subtopic;
}



module.exports = {
    exam: {
        factor: {
            unit: factorExam,
            array: factorExams,
        },
        checkDuplicate: checkExamDup,
    },
    examAnswer: {
        factor: {
            unit: factorExamAnswer,
            array: factorExamAnswers,
        },
        checkDuplicated: checkExamAnswerDuplicated
    },
    examSet: {
        factor: {
            unit: factorExamSet,
            array: factorExamSets,
        },
        checkDuplicate: checkExamSetDup,
    },
    examSetBookie: {
        factor: {
            unit: factorESBookie,
            array: factorESBookies,
        },
        checkDuplicated: checkESBDuplicated,
    },
    examTest: {
        factor: {
            unit: factorExamTest,
            array: factorExamTests,
        },
        checkDuplicated: checkExamTestDuplicate,
    },
    lesson: {
        factor: {
            unit: factorLesson,
            array: factorLessons,
        },
        checkDuplicate: checkLessonDuplicate,
    },
    subtopic: {
        factor: {
            unit: factorSubtopic,
            array: factorSubtopics,
        },
        checkDuplicate: checkSubtopicDuplicated,
    },
    topic: {
        factor: {
            unit: factorTopic,
            array: factorTopics,
        },
        checkDuplicate: checkTopicDuplicated
    }
}