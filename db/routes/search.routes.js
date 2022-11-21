const Search = require("../models/search.model.js");

module.exports = app => {
    var search = require("../controllers/search.controller.js");

    //Create a new Search
    app.post('/api/search/teachers/lessons', search.teachersLessons);

    //app.post('/api/search/teachers/bookings', search)

};