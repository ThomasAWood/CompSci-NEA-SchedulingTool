const Lesson = require("../models/lesson.model.js");

module.exports = app => {
    var lessons = require("../controllers/lesson.controller.js");

    //Create a new lesson
    app.post('/api/lessons', lessons.create);

    // Retrieve a single lesson with lessonId
    app.get("/api/lessons/:lessonId", lessons.findOne);

    //Remove a lesson with lessonId
    app.delete("/api/lessons/:lessonId", lessons.delete);
};