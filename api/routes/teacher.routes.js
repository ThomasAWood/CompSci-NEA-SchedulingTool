const Teacher = require("../models/teacher.model.js");

module.exports = app => {
    var teachers = require("../controllers/teacher.controller.js");

    //Create new teacher info
    app.post('/api/teachers', teachers.create);

    // Retrieve teacher info with id
    app.get("/api/teachers/:id", teachers.findOne);

    //Remove teacher info with id
    app.delete("/api/teachers/:id", teachers.delete);
};