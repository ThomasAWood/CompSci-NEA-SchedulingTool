var Booking = require("../models/booking.model.js");
let { DateTime } = require('luxon');

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
        date: req.body.dateTime,
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


exports.getTeachersBookings = (req, res) => {
  if (!req) {
    res.status(400).send({
      message: "Must provide a teacher id"
    });
  }
  Booking.teachersBookings(req.params.id, (err, bookings) => {
    if (err) {
      res.status(500).send({
        message: "Some error occured while retrieving the teachers bookings"
      });
    } else {
      bookings.forEach(booking => {
        //console.log('Start Date Time before converstion', booking.date)
        booking.date = DateTime.fromJSDate(booking.date).toISO();
        //console.log('Start Date Time:', booking.date);
      });
      res.send(bookings);
    }
  });
};


exports.getStudentsBookings = (req, res) => {
  Booking.studentsBookings(req.params.id, (err, bookings) => {
    if (err) {
      res.status(500).send({
        message: "Some error occured while retrieving the students bookings"
      });
    } else {
      res.send(bookings);
    }
  });
};