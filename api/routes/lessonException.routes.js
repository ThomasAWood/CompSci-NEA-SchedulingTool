const lessonException = require("../models/lessonException.model.js");

module.exports = app => {
    var lessonExceptions = require("../controllers/lessonException.controller.js");

    //Create a new lesson
    app.post('/api/lessons/exception', lessonExceptions.create);

};