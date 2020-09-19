var LessonException = require("../models/lessonException.model.js");

//Add a lesson exception to the database
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    
    // Create a lesson exception
    const lesson_exception = new LessonException({
        parentLessonId: req.body.parentLessonId,
        isRescheduled: req.body.isRescheduled,
        isCancelled: req.body.isCancelled,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    });
  
// Save lesson in the database
    LessonException.create(lesson_exception, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Lesson Exception."
        });
      else res.send(data);
    });
  };
