var Teacher = require("../models/teacher.model.js");

//Add a teacher to the database
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Teacher
    const teacher = new Teacher({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      instrument: req.body.instrument
    });
  
    // Save Teacher in the database
    Teacher.create(teacher, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Teacher."
        });
      else res.send(data);
    });
  };

//Find a teacher in the database from id
exports.findOne = (req, res) => {
    Teacher.findById(req.params.teacherId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found teacher with id ${req.params.teacherId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving teacher with id " + req.params.teacherId
          });
        }
      } else res.send(data);
    });
  };

exports.delete = (req, res) => {
    Teacher.remove(req.params.teacherId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found teacher with id ${req.params.teacherId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete teacher with id " + req.params.teacherId
          });
        }
      } else res.send({ message: `Teacher was deleted successfully!` });
    });
  };