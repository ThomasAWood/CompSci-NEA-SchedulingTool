var sql = require('../db.js');

var User = function(user) {
    this.email = user.email,
    this.password = user.password,
    this.fname = user.fname,
    this.lname = user.lname,
    this.type = user.type
};

//Create a new User
User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, {id: res.insertId, ...newUser});
    });
};


//Find a User by ID
User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
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
  sql.query('SELECT * FROM users', (err, res) => {
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
    sql.query(`SELECT * FROM users WHERE email = "${email}" AND password = "${password}"`, (err, res) => {
      //if there is an error return it
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      //if there is a response then return the user
      if (res.length) {
        console.log('Correct Login Credentials');
        result(null, res[0]);
        return
      }
      //else return no user
      result({ kind: "not_found" }, null);
      return;
    });
  };

module.exports = User;