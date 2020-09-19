var Lesson = require("../models/lesson.model.js");

//Add a lesson to the database
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    
    // Create a lesson
    const lesson = new Lesson({
        teacherId: req.body.teacherId,
        startDateTime: req.body.startDate, //YYYY-MM-DD HH:MM:SS
        duration: req.body.duration,
        endDateTime: req.body.endDate, //YYYY-MM-DD HH:MM:SS
        isRecurring: req.body.isRecurring
    });
  
// Save lesson in the database
    Lesson.create(lesson, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Lesson."
        });
      else res.send(data);
    });
  };

/*
//Find a lesson in the database from id
exports.findOne = (req, res) => {
    Lesson.findById(req.params.lessonId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found lesson with id ${req.params.lessonId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving lesson with id " + req.params.lessonId
          });
        }
      } else res.send(data);
    });
  };

//Remove lesson from the database
exports.delete = (req, res) => {
    Lesson.remove(req.params.lessonId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found lesson with id ${req.params.lessonId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete lesson with id " + req.params.lessonId
          });
        }
      } else res.send({ message: `Lesson was deleted successfully!` });
    });
  };
  */