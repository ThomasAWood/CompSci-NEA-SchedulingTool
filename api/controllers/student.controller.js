var Student = require("../models/student.model.js");

//Add a student to the database
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Student
    const student = new Student({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
  
    // Save Student in the database
    Student.create(student, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Student."
        });
      else res.send(data);
    });
  };

  //Remove a student from the database
  exports.create