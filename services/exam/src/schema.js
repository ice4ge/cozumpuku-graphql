const { gql } = require('apollo-server');
module.exports = gql`
    
    scalar JSON

    enum EXAMSET_LEVEL { Level1 Level2 Level3 Level4 Level5 }
    enum CORRECT_ANSWER { Unknown A B C D E}

    type Exam @key(fields: "_id") {
        _id: ID!
        title: String
        date: String,
    }

    type ExamAnswer @key(fields: "_id") {
        _id: ID!,
        examSetTestId: String, # exam test id
        subTopicId: String,
        questionNumber: Int,
        correctAnswer: CORRECT_ANSWER
        subtopic: Subtopic
        examTest: ExamTest
    }

    type ExamSet @key(fields: "_id") {
        _id: ID!,
        examId: String,
        categoryId: String,
        title: String,
        publisherId: String,
        publishYear: Int,
        isbn: String,
        level: EXAMSET_LEVEL,
        showToUsers: Boolean,
        image: String,
        exam: Exam
        category: Category
        publisher: Publisher
    }

    type ExamSetBookie @key(fields: "_id") {
        _id: ID!,
        examSetId: String,
        bookieTitle: String,
        examSet: ExamSet
    }

    type ExamTest @key(fields: "_id") {
        _id: ID!,
        examSetBookieId: String,
        title: String,
        sequence: Int
        questionCount: Int
        examSetBookie: ExamSetBookie
    }


    type Lesson @key(fields: "_id") {
        _id: ID!
        title: String!
    }

    type Subtopic @key(fields: "_id") {
        _id: ID!,
        topicId: String,
        title: String,
        topic: Topic
    }

    type Topic @key(fields: "_id") {
        _id: ID!
        lessonId: String
        title: String
        lesson: Lesson
    }

    extend type Category @key(fields: "_id") {
        _id: ID! @external
    }

    extend type Publisher @key(fields: "_id") {
        _id: ID! @external
    }



    type Query {
        # -----   E X A M   -----
        exam(_id: ID!, forceUpdate: String): Exam!
        exams(title: String, offset: Int, limit: Int): [Exam]!
        
        # -----   E X A M    A N S W E R   -----
        examAnswer(_id: ID!, forceUpdate: String): ExamAnswer
        examAnswers(examSetTestId: String, subTopicId: String, questionNumber: Int, correctAnswer: CORRECT_ANSWER, offset: Int, limit: Int): [ExamAnswer]!

        # -----   E X A M S E T   -----
        examSet(_id: ID!, forceUpdate: String ): ExamSet
        examSets(examId: String, categoryId: String, publisherId: String, publishYear: Int, level: EXAMSET_LEVEL, showToUsers: Boolean, offset: Int, limit: Int): [ExamSet]!

        # -----   Exam Set Bookie   -----
        examSetBookie(_id: ID!, forceUpdate: String): ExamSetBookie
        examSetBookies(examSetId: ID, bookieTitle: String, offset: Int, limit: Int): [ExamSetBookie]!

        # -----   EXAM TEST   -----
        examTest(_id: ID!, forceUpdate: String): ExamTest
        examTests(examSetBookieId: String, title: String, sequence: Int, questionCount: Int, offset: Int, limit: Int): [ExamTest]!

        # -----   L E S S O N   -----
        lesson(_id: ID!, forceUpdate: String): Lesson
        lessons(title: String, offset: Int, limit: Int): [Lesson]!

        # -----   S U B T O P I C   -----
        subtopic(_id: ID!, forceUpdate: String): Subtopic
        subtopics(topicId: ID, title: String, offset: Int, limit: Int): [Subtopic]!

        # -----   T O P I C   -----
        topic(_id: ID!, forceUpdate: String): Topic
        topics(lessonId: String, title: String, offset: Int, limit: Int):[Topic]!
    }

    type Mutation {
        # -----   E X A M   -----
        addExam(title: String!, date: String!): ExamResponse!
        updateExam(_id: ID!, title: String, date: String): ExamResponse!
        deleteExam(_id: ID!): ExamNormalResponse!
        
        # -----   E X A M    A N S W E R   -----
        addExamAnswer(examSetTestId: String!, subTopicId: String!, questionNumber: Int!, correctAnswer: CORRECT_ANSWER): ExamNormalResponse!
        updateExamAnswer(_id: ID!, examSetTestId: String, subTopicId: String, questionNumber: Int, correctAnswer: CORRECT_ANSWER): ExamNormalResponse!
        deleteExamAnswer(_id: ID!): ExamNormalResponse!

        # -----   E X A M S E T   -----
        addExamSet(examId: String!, categoryId: String!, title: String!, publisherId: String!, publishYear: Int!, isbn: String, level: EXAMSET_LEVEL, showToUsers: Boolean, image: String): ExamSetResponse!
        updateExamSet(_id: ID!, examId: String, categoryId: String, title: String, publisherId: String, publishYear: Int, isbn: String, level: EXAMSET_LEVEL, showToUsers: Boolean, image: String): ExamSetResponse!
        deleteExamSet(_id: ID!): ExamNormalResponse!

        # -----   Exam Set Bookie   -----
        addExamSetBookie(examSetId: String!, bookieTitle: String!): ExamNormalResponse!
        updateExamSetBookie(_id: ID!, examSetId: String, bookieTitle: String): ExamNormalResponse!
        deleteExamSetBookie(_id: ID!): ExamNormalResponse!

        # -----   EXAM TEST   -----
        addExamTest(examSetBookieId: String!, title: String!, sequence: Int, questionCount: Int): ExamNormalResponse!
        updateExamTest(_id: ID!, examSetBookieId: String, title: String, sequence: Int, questionCount: Int): ExamNormalResponse!
        deleteExamTest(_id: ID!): ExamNormalResponse!

        # -----   L E S S O N   -----
        addLesson(title: String!): LessonResponse!
        updateLesson(_id: ID!, title: String!): LessonResponse!
        deleteLesson(_id: ID!): ExamNormalResponse!

        # -----   S U B T O P I C   -----
        addSubtopic(topicId: String!, title: String!): SubtopicResponse!
        updateSubtopic(_id: ID!, topicId: String, title: String): SubtopicResponse!
        deleteSubtopic(_id: ID!): ExamNormalResponse!

        # -----   T O P I C   -----
        addTopic(lessonId: String!, title: String!): TopicResponse!
        updateTopic(_id: ID!, lessonId: String, title: String): TopicResponse!
        deleteTopic(_id: ID!): ExamNormalResponse!
    }

    type ExamNormalResponse { status: String!, message: String!, content: JSON! }
    type ExamResponse { status: String!, message: String!, content: Exam }
    type ExamSetResponse { status: String!, message: String!, content: ExamSet }
    type LessonResponse { status: String!, message: String!, content: Lesson }
    type TopicResponse { status: String!, message: String!, content: Topic }
    type SubtopicResponse { status: String!, message: String!, content: Subtopic }
`;