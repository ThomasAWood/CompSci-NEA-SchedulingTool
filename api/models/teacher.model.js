var sql = require('../db.js');

var Teacher = function(teacher) {
    this.username = teacher.username,
    this.email = teacher.email,
    this.password = teacher.password,
    this.instrument = teacher.instrument
};

//Create a new teacher
Teacher.create = (newTeacher, result) => {
    sql.query("INSERT INTO teachers SET ?", newTeacher, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created teacher: ", { id: res.insertId, ...newTeacher });
        result(null, {id: res.insertId, ...newTeacher});
    });
};


//Find a teacher by ID
Teacher.findById = (teacherId, result) => {
    sql.query(`SELECT * FROM teachers WHERE teacherId = ${teacherId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found teacher: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found teacher with the id
      result({ kind: "not_found" }, null);
    });
  };


//Delete a teacher
Teacher.remove = (id, result) => {
    sql.query("DELETE FROM teachers WHERE teacherId = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Teacher with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted teacher with id: ", id);
      result(null, res);
    });
  };

module.exports = Teacher;