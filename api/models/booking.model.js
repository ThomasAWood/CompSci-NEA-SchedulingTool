var sql = require('../db.js');

var Booking = function(booking) {
    this.studentId = booking.studentId,
    this.lessonId = booking.lessonId,
    this.date = booking.date,
    this.cancelled = 0
};

//Create a new booking
Booking.create = (newBooking, result) => {
    sql.query("INSERT INTO booking SET ?", newBooking, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created booking: ", { id: res.insertId, ...newBooking });
        console.log("Booking Date", newBooking.date.toString())
        result(null, {id: res.insertId, ...newBooking});
    });
};

//Cancel a booking
Booking.cancel = (id, result) => {
    sql.query(`UPDATE booking SET cancelled = 1 WHERE id = '${id}'`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Cancelled Booking: ", res);
        result(null, {res})
    });
};

//Get teachers bookings
Booking.teachersBookings = (teacherId, result) => {
    sql.query(`SELECT nea.booking.id, nea.booking.studentId, nea.lessons.teacherId, nea.booking.lessonId, nea.booking.date, nea.booking.cancelled, nea.lessons.duration 
    FROM nea.booking, nea.lessons
    WHERE ((nea.booking.lessonId = nea.lessons.id)
    AND (nea.lessons.teacherId = ${teacherId}));`, (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }
        //console.log('Bookings:', res[0].date.toString())
        result(null, res);
    });
};

//Get students booking
Booking.studentsBookings = (studentId, result) => {
    sql.query(`SELECT nea.booking.id, nea.booking.studentId, nea.booking.lessonId, nea.booking.date, nea.booking.cancelled, nea.lessons.teacherId, nea.lessons.duration 
    FROM nea.booking, nea.lessons 
    WHERE studentId = ${studentId} 
    AND nea.booking.lessonId = nea.lessons.id `, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return
        }
        console.log(res[0]);
        result(null, res)
    });
};

Booking.lessonIdBookings = (id, result) => {
    sql.query(`SELECT * FROM nea.booking WHERE lessonId = ${id}`, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return
        }
        console.log('Reponse', res);
        result(null, res)
    });
};

Booking.delete = (id, result) => {
    sql.query(`DELETE FROM booking WHERE id=${id}`, (err, res) => {
        if (err) {
            console.log(err)
            result(err, null);
            return
        }
        console.log(res)
        result (null, res)
    });
};

module.exports = Booking;