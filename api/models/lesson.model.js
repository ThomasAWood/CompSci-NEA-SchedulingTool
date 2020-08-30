var sql = require('../db.js');

var Lesson = function(lesson) {
    this.teacherId = lesson.teacherId,
    this.startDateTime = lesson.startDateTime,
    this.endDateTime = lesson.endDateTime,
    this.studentId = lesson.studentId
};

//Create a new lesson
Lesson.create = (newLesson, result) => {
    sql.query("INSERT INTO lessons SET ?", newLesson, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created lesson: ", { id: res.insertId, ...newLesson });
        result(null, {id: res.insertId, ...newLesson});
    });
};

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

module.exports = Lesson;