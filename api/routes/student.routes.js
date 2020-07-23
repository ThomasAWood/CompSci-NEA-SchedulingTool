module.exports = app => {
    var students = require("../controllers/student.controller.js");

    //Create a new customer
    app.post('/students', students.create);
}