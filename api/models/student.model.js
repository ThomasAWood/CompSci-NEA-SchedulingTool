var sql = require('../db.js');

var Student = function(student) {
    this.username = student.username,
    this.email = student.email,
    this.password = student.password
};

//Create a new student
Student.create = (newStudent, result) => {
    sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created student: ", { id: res.insertId, ...newStudent });
        result(null, {id: res.insertId, ...newStudent});
    });
};

//Find a student by ID
Student.findById = (studentId, result) => {
    sql.query(`SELECT * FROM students WHERE id = ${studentId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found student: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found student with the id
      result({ kind: "not_found" }, null);
    });
  };

//Delete a student
Student.remove = (id, result) => {
    sql.query("DELETE FROM students WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Student with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted student with id: ", id);
      result(null, res);
    });
  };

module.exports = Student;