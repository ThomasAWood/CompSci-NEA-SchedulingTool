var sql = require('../db.js');

var Search = function(search) {
    this.userId = search.userId,
    this.startDate = search.startDate,
    this.endDate = search.endDate
  };
  
Search.getLessons = (search, result) => {
    sql.query(`SELECT * FROM lessons WHERE (teacherId = ${search.userId}) AND (lessons.endDate >= "${search.startDate}") AND (lessons.startDate <= "${search.endDate}")`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
  };

module.exports = Search;