const Lesson = require("../models/lesson.model.js");

module.exports = app => {
    var lessons = require("../controllers/lesson.controller.js");

    //Create a new lesson
    app.post('/api/lessons', lessons.createLesson);

    app.delete('/api/lessons/:lessonId', lessons.delete)
    //app.get('/api/teachers/lessons/:teacherId', lessons.getLessonsByTeacherId);
};