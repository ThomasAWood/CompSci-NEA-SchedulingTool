var Search = require("../models/search.model.js");
const { DateTime } = require('luxon');

exports.teachersLessons = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create search info
    const search = new Search({
      userId: req.body.userId,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    });
    

  // Get search info from the database
  Search.getLessons(search, (err, lessons) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while getting the Lessons."
        });
        } else {
            let startDate = DateTime.fromISO(search.startDate);
            let endDate = DateTime.fromISO(search.endDate);
            let lessonInstances = []
            //For each lesson check whether the date matches the recurrence rule and return it if it does
            for (let lessonIndex = 0; lessonIndex < lessons.length; lessonIndex++) {
              let lesson = lessons[lessonIndex];
              //Convert the dates and times into Luxon DateTime Objects
              let lessonStartDate = DateTime.fromJSDate(lesson.startDate)
              let lessonEndDate = DateTime.fromJSDate(lesson.endDate)
              let lessonStartTime = lesson.startTime
              let lessonEndTime = lesson.endTime
              for (let date = startDate; date < endDate; date = date.plus({ days: 1 })) {
                if ((lesson.isRecurring == 0) && (date == lessonStartDate)) {
                  startDateTime = date.plus(lessonStartTime)
                  endDateTime = date.plus()
                  lessonInstances.push({date, lessonStartTime, lessonEndTime});
                }
                if ((lesson.isRecurring == 1) && (date < lessonEndDate) && (date.diff(lessonStartDate, "days") % 7 == 0)) {
                  lessonInstances.push({date, lessonStartTime, lessonEndTime});
                } 
              }
            }
            res.send({lessonInstances});
        }
    });
  };