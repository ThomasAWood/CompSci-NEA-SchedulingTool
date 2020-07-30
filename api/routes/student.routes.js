const Student = require("../models/student.model.js");

module.exports = app => {
    var students = require("../controllers/student.controller.js");

    //Create a new student
    app.post('/students', students.create);

    // Retrieve a single student with studentId
    app.get("/students/:studentId", students.findOne);

    //Remove a student with studentId
    app.delete("/students/:studentId", students.delete);
}