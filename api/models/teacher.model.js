var sql = require('../db.js');

var Teacher = function(teacher) {
    this.hourly = teacher.hourly,
    this.instrument = teacher.instrument,
    this.location = teacher.location,
    this.about = teacher.about
};

//Create new teacher info
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


//Find teacher info by ID
Teacher.findById = (id, result) => {
    sql.query(`SELECT * FROM teachers WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found teacher info: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found teacher info with the id
      result({ kind: "not_found" }, null);
    });
  };

//Delete teacher info
Teacher.remove = (id, result) => {
    sql.query("DELETE FROM teachers WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Teacher Info with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted teacher info with id: ", id);
      result(null, res);
    });
  };

module.exports = Teacher;