var sql = require('../db.js');

var LessonException = function(lessonException) {
    this.parentLessonId = lessonException.parentLessonId,
    this.isRescheduled = lessonException.isRescheduled,
    this.isCancelled = lessonException.isCancelled,
    this.date = lessonException.date,
    this.startTime = lessonException.startTime,
    this.endTime = lessonException.endTime
};

//Create a new lesson
LessonException.create = (newLessonException, result) => {
    sql.query("INSERT INTO lessonexception SET ?", newLessonException, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created lesson exception: ", { id: res.insertId, ...newLessonException});
        result(null, {id: res.insertId, ...newLessonException});
    });
};

module.exports = LessonException;