var Booking = require("../models/booking.model.js");
let { DateTime, Duration } = require('luxon');

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
  if (!req.params) {
    res.status(400).send({
      message: "Must provide id of booking to be cancelled"
    });
  }

  Booking.cancel(req.params.id, (err, data) => {
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
        booking.start = DateTime.fromJSDate(booking.date);
        booking.end = booking.start.plus(Duration.fromISO(booking.duration)).toISO();
        booking.start = booking.start.toISO()
        booking.date = null
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
      bookings.forEach(booking => {
        booking.start = DateTime.fromJSDate(booking.date);
        booking.end = booking.start.plus(Duration.fromISO(booking.duration)).toISO();
        booking.start = booking.start.toISO()
        booking.date = null
        //console.log('Start Date Time:', booking.date);
      });
      res.send(bookings);
    }
  });
};

exports.getBookingsByLessonId = (req, res) => {
  Booking.lessonIdBookings(req.params.id, (err, bookings) => {
    if (err) {
      res.status(500).send({
        message: "Some error occured while retrieving the bookings"
      });
    } else {
      res.send(bookings);
    }
  });
};

exports.delete = (req, res) => {
  Booking.delete(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Some error occured while deleting the booking"
      });
    } else {
      res.send(data);
    }
  });
};