const Teacher = require("../models/teacher.model.js");

module.exports = app => {
    var teachers = require("../controllers/teacher.controller.js");

    //Create a new teacher
    app.post('/teachers', teachers.create);

    // Retrieve a single student with studentId
    app.get("/teachers/:teacherId", teachers.findOne);

    //Remove a student with studentId
    app.delete("/teachers/:teacherId", teachers.delete);
}