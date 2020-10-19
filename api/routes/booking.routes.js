const Booking = require("../models/booking.model.js");

module.exports = app => {
    var bookings = require("../controllers/booking.controller.js");

    //Create a new Booking
    app.post('/api/bookings', bookings.create);

    app.post('/api/bookings/cancel/:id', bookings.cancel);

    app.get('/api/teachers/bookings/:id', bookings.getTeachersBookings);

    app.get('/api/students/bookings/:id', bookings.getStudentsBookings);

    app.get('/api/bookings/lessonid/:id', bookings.getBookingsByLessonId);

    app.delete('/api/bookings/:id', bookings.delete)
};