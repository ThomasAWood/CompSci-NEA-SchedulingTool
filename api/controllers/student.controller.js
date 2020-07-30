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

//Find a student in the database from id
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found student with id ${req.params.studentId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving student with id " + req.params.studentId
          });
        }
      } else res.send(data);
    });
  };

exports.delete = (req, res) => {
    Student.remove(req.params.studentId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found student with id ${req.params.studentId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete student with id " + req.params.studentId
          });
        }
      } else res.send({ message: `Student was deleted successfully!` });
    });
  };