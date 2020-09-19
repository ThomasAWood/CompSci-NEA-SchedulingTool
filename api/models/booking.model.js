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
        result(null, {id: res.insertId, ...newBooking});
    });
};

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

module.exports = Booking;