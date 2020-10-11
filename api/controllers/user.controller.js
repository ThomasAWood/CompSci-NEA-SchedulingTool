var User = require("../models/user.model.js");

//Add a user to the database
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        error: "Content can not be empty!"
      });
    }
  
    // Create a User
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      fname: req.body.fname,
      lname: req.body.lname,
      isTeacher: req.body.isTeacher,
      hourly: req.body.hourly
    });
  
    // Save User in the database
    User.create(user, (err, data) => {
      if (err) {
        //Error code 1062 is for duplicate entries
        if (err.errno === 1062) {
          res.status(401).send({
            error: "User with email already exists. Please try again"
          })
        } else {
          res.status(500).send({
            error: "There was an error while registering the user. Please try again"
          })
        }} else {
          res.status(200).send(data)
        };
    });
  };

//Find a user in the database from id
exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving user with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

//Retrieve all of the users
exports.getAll = (req, res) => {
  User.retrieveAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving all of the users"
      });
    } else {
      res.send(data);
    };
  });
};

exports.delete = (req, res) => {
    User.remove(req.params.id, (err) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete user with id " + req.params.id
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
  };

exports.login = (req, res) => {
  User.loginCheck(req.body.email, req.body.password, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(401).send({
          message: "Incorrect login credentials"
        });
      } else {
        res.status(500).send({
          message: "Error when checking login credentials"
        });
      }
    } else res.send(data);
  });
};

exports.register = (req, res) => {
  User.registerCheck(req.body.email, (err, data) => {
    if (err) {
      if (err.kind === "found") {
        res.status(401).send({
          message: "User with email already exists"
        });
      } else {
        res.status(401).send({
          message: "Error when checking whether user with email exists"
        });
      }
    } else res.send(data);
  });
};

exports.searchForTeacher = (req, res) => {
  User.teacherSearch(req.body.searchInput, (err, teachers) => {
    if (err) {
      res.status(401).send({
        error: 'There was an error when searching for the teachers'
      });
    } else {
      res.send(teachers);
    }
  });
};