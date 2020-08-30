var Teacher = require("../models/teacher.model.js");

//Add teacher info to the database
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create Teacher info
    const teacher = new Teacher({
      hourly: req.body.hourly,
      instrument: req.body.instrument,
      location: req.body.location,
      about: req.body.about
    });
  
    // Save Teacher info in the database
    Teacher.create(teacher, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Teacher Info."
        });
      else res.send(data);
    });
  };

//Find teacher info in the database from id (Users table foreign)
exports.findOne = (req, res) => {
    Teacher.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Teacher Info with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Teacher Info with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

exports.delete = (req, res) => {
    Teacher.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found teacher info with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete teacher info with id " + req.params.id
          });
        }
      } else res.send({ message: `Teacher Info was deleted successfully!` });
    });
  };