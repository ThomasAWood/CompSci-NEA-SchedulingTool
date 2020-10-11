var sql = require('../db.js');

var Lesson = function(lesson) {
    this.teacherId = lesson.teacherId,
    this.startDateTime = lesson.startDateTime,
    this.duration = lesson.duration,
    this.endDateTime = lesson.endDateTime,
    this.isRecurring = lesson.isRecurring
};

//Create a new lesson
Lesson.create = (newLesson, result) => {
    //console.log('New Lesson:', newLesson)
    sql.query(`INSERT INTO lessons SET teacherId = ${newLesson.teacherId}, startDateTime=from_unixtime(${newLesson.startDateTime}), duration="${newLesson.duration}", endDateTime=from_unixtime(${newLesson.endDateTime}), isRecurring=${newLesson.isRecurring};`, newLesson, (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
            return;
        }

        //console.log("created lesson: ", { id: res.insertId, ...newLesson });
        //console.log("Lesson Date", newLesson.date)
        result(null, {id: res.insertId, ...newLesson});
    });
};


Lesson.getLessonsByTeacherId = (teacherId, result) => {
  sql.query(`SELECT * FROM lessons WHERE teacherId = ${teacherId}`, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null)
    }
    //console.log('Retrieved Lessons:', res)
    result(null, res)
  })
};
/*
//Find a lesson by ID
Lesson.findById = (lessonId, result) => {
    sql.query(`SELECT * FROM lessons WHERE lessonId = ${lessonId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found lesson: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found lesson with the id
      result({ kind: "not_found" }, null);
    });
  };


//Delete a lesson
Lesson.remove = (id, result) => {
    sql.query("DELETE FROM lessons WHERE lessonId = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found lesson with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted lesson with id: ", id);
      result(null, res);
    });
  };
*/
module.exports = Lesson;