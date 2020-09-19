const Lesson = require("../models/lesson.model.js");

module.exports = app => {
    var lessons = require("../controllers/lesson.controller.js");

    //Create a new lesson
    app.post('/api/lessons', lessons.create);

};