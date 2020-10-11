var sql = require('../db.js');

var Search = function(search) {
    this.userId = search.userId,
    this.startDate = search.startDate,
    this.endDate = search.endDate
  };
  
Search.getLessons = (search, result) => {
    sql.query(`SELECT id, teacherId, unix_timestamp(startDateTime) AS startDateTime, duration, unix_timestamp(endDateTime) AS endDateTime, isRecurring FROM lessons WHERE teacherId = ${search.userId};`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            console.log('Lesson Search Output in search.model.js: ', res)
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
  };

module.exports = Search;