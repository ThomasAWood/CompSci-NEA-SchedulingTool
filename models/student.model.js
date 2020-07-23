var sql = require('../db.js');

var Student = function(student) {
    this.username = student.username,
    this.email = student.email,
    this.password = student.password
};

Student.create = (newCustomer, result) => {
    sql.query("INSERT INTO students SET ?", newCustomer, (err, res) => {
        if(err) {
            console.log("error": err);
            result(err, null);
            return;
        }

        console.log("created student: ", { id: res.insertId, ...newCustomer });
        result(null, {id: res.insertId, ...newCustomer});
    });
};

module.exports = Student;