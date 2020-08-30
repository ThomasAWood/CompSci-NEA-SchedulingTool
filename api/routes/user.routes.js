const User = require("../models/user.model.js");

module.exports = app => {
    var users = require("../controllers/user.controller.js");

    //Create a new user
    app.post('/api/users', users.create);

    // Retrieve a single user with id
    app.get("/api/users/:id", users.findOne);

    //Retrieve all users
    app.get("/api/users", users.getAll);

    //Remove a user with id
    app.delete("/api/users/:user", users.delete);
};