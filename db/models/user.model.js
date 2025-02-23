var sql = require('../db.js');
var bcrypt = require('bcrypt');

var User = function(user) {
    this.email = user.email,
    this.password = user.password,
    this.fname = user.fname,
    this.lname = user.lname,
    this.isTeacher = user.isTeacher,
    this.hourly = user.hourly
};

//Create a new User
User.create = (newUser, result) => {
  bcrypt.hash(newUser.password, 10, function(err, hash) {
    newUser.password = hash
    sql.query(`INSERT INTO users SET ?`, newUser, (err, res) => {
      if(err) {
        console.log("Error registering user", err)
        result(err, null);
        return
      }
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, {id: res.insertId, ...newUser});
    });
  });
};

//Find a User by ID
User.findById = (id, result) => {
    sql.query(`SELECT id, email, fname, lname, isTeacher, hourly FROM users WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
  };

//Retrieve all of the users
User.retrieveAll = (result) => {
  sql.query('SELECT id, email, password, fname, lname, isTeacher, hourly FROM users', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      result(null, res);
    }
  });
};

//Delete a user
User.remove = (id, result) => {
    sql.query(`DELETE FROM users WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with id: ", id);
      result(null, res);
    });
  };

  //Check user login credentials
  User.loginCheck = (email, password, result) => {
    //Query if there is a user with email and password
      sql.query(`SELECT id, email, password, fname, lname, isTeacher, hourly FROM users WHERE email = "${email}"`, (err, res) => {
        //if there is an error return it
        if (err) {
          console.log("error: ", err);
          result(err, null);
        }
        //if there is a response then return the user
        if (res.length) {
          console.log(res[0]);
          bcrypt.compare(password, res[0].password, function(err, passwordRes) {
            if (err) {
              console.log('error:', err);
              result(err, null);
            }
            if (passwordRes) {
              console.log('Correct Login Credentials');
              result(null, res[0]);
            } else {
              console.log('Incorrect Password');
              result({ kind: 'not_found' }, null);
            }
          });
        }
        //else return no user
        else {
          result({ kind: "not_found" }, null);
        }
       
      });
  };

User.registerCheck = (email, result) => {
  //Search to see if there is a user with the submitted email
  sql.query(`SELECT id, email FROM users WHERE email = "${email}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return
    }
    //if a user is returned then trigger user already exists error
    if (res.length) {
      result({ kind: "found"}, null);
      return
    }
    //else return user
    console.log('User to register does not already exist');
    result(null, res);
  });
};

User.teacherSearch = (searchInput, result) => {
  sql.query(`SELECT id, email, fname, lname, hourly FROM users WHERE (isTeacher = 1) AND ((fname LIKE '%${searchInput}%') OR (lname LIKE '${searchInput}'));`, (err, res) => {
  if (err) {
    console.log(err);
    result(err, null);
    return
  }
  console.log('Teachers with fname or lname found:', res)
  console.log('Search', searchInput)
  result(null, res);
  });
};

User.studentSearch = (searchInput, result) => {
  sql.query(`SELECT DISTINCT users.id, users.email, users.fname, users.lname FROM users, booking, lessons WHERE (booking.lessonId = lessons.id) AND (lessons.teacherId = ${searchInput.teacherId}) AND (booking.studentId = users.id) AND ((users.fname LIKE '%${searchInput.input}%') OR (users.lname LIKE '%${searchInput.input}%'));`, (err, res) => {
  if (err) {
    console.log(err);
    result(err, null);
    return
  }
  console.log('Students with fname or lname found:', res)
  console.log('Search', searchInput)
  result(null, res);
  });
};

module.exports = User;