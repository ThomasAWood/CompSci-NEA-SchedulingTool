const Booking = require("../models/booking.model.js");

module.exports = app => {
    var bookings = require("../controllers/booking.controller.js");

    //Create a new Booking
    app.post('/api/bookings', bookings.create);

    //Cancel a booking
    app.post('/api/bookings/cancel/:id', bookings.cancel);
    
    //Get all of the booking of a teacher
    app.get('/api/teachers/bookings/:id', bookings.getTeachersBookings);
    
    //Get all of the bookings of a student
    app.get('/api/students/bookings/:id', bookings.getStudentsBookings);
    
    //Get all of the bookings asosciated with a lesson
    app.get('/api/bookings/lessonid/:id', bookings.getBookingsByLessonId);
    
    //Delete a booking
    app.delete('/api/bookings/:id', bookings.delete);
    
    //Retrieve all of the bookings for a student between two dates and their duration and whether it's cancelled or not
    app.post('/api/bookings/invoice', bookings.getStudentInvoice);
};