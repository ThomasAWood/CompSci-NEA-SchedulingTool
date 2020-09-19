var Booking = require("../models/booking.model.js");

//Add a booking to the database
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    
    // Create a booking
    const booking = new Booking({
        studentId: req.body.studentId,
        lessonId: req.body.lessonId,
        date: req.body.date,
    });
  
// Save booking in the database
    Booking.create(booking, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Booking."
        });
      else res.send(data);
    });
};



exports.cancel = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Must provide id of booking to be cancelled"
    });
  }

  Booking.cancel(req.body.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while cancelling the Booking."
      });
    } else {
      res.send(data);
    }
  });
};
