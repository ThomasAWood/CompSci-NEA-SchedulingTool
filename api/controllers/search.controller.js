var Search = require("../models/search.model.js");
const { DateTime, Duration } = require('luxon');

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
        if(err.kind === 'not_found') {
          res.status(200).send({lessonInstaces: []})
        } else {
          res.status(500).send({
            message:
              err.message || "Some error occurred while getting the Lessons."
          });
        }
        
        } else {
            //Start Date and end Date have no time so lessonStartDate has to be converted to have no time so that days are in full multiples
            let startDate = DateTime.fromISO(search.startDate);
            let endDate = DateTime.fromISO(search.endDate);
            let lessonInstances = []
            //console.log(lessons)
            //For each lesson check whether the date matches the recurrence rule and return it if it does
            for (let lessonIndex = 0; lessonIndex < lessons.length; lessonIndex++) {
              let lesson = lessons[lessonIndex];
              //Convert the dates and times into Luxon DateTime Objects
              let lessonStartDateTime = DateTime.fromSeconds(lesson.startDateTime)
              //Formats the date to remove the time
              let lessonStartDate = lessonStartDateTime.toFormat('yyyy-MM-dd')
              //Converts the end date time into a luxon date object
              let lessonEndDateTime = DateTime.fromJSDate(lesson.endDateTime)
              //Converts the duration from ISO 8601 into a luxon duration object
              let lessonDuration = Duration.fromISO(lesson.duration)
              /*console.log('Search Start Date', startDate.toString())
              console.log('Search End Date', endDate.toString())
              console.log('Lesson Start Date', lessonStartDateTime.toString())
              console.log('Lesson End Date', lessonEndDateTime.toString())
              console.log('Lesson Duration', lessonDuration.as('minutes'))*/
              for (let date = startDate; date < endDate; date = date.plus({ days: 1 })) {
                //If the lesson isn't recurring and the date is equal to the lessonDate then write it as a valid lesson occurence
                if ((lesson.isRecurring == false) && (date.toISODate() == lessonStartDateTime.toISODate())) {
                  lessonInstances.push({
                    id: lesson.id,
                    title: 'Lesson Slot',
                    start: lessonStartDateTime.toISO(),
                    end: lessonStartDateTime.plus(lessonDuration).toISO()
                  });
                }
                //If the lesson is recurring and the date is before the end of the recurrences and the difference between the start of the lesson and the date is 7 (1 week) then it's a valid lesson date
                if ((lesson.isRecurring == true) && (date < lessonEndDateTime) && ((date.diff(lessonStartDate, "days").as('days')) % 7 == 0)) {
                  //Finds the number of weeks between the lesson recurring rule start date, and the valid date. Then adds a number of weeks on so that it has the correct lesson time for this instance of the lesson
                  let weeksDiff = date.diff(lessonStartDate, 'days').as('days') / 7
                  let lessonInstanceStartDateTime = lessonStartDateTime.plus({ weeks: weeksDiff})
                  //Adds on the duration of the lesson to the start datetime of this instance of the lesson
                  let lessonInstanceEndDateTime = lessonInstanceStartDateTime.plus(lessonDuration)
                  lessonInstances.push({
                      id: lesson.id,
                      title: 'Lesson Slot',
                      start: lessonInstanceStartDateTime.toISO(),
                      end: lessonInstanceEndDateTime.toISO()
                    });
                }
              }
            }
          res.send({lessonInstances});
        }
    });
  };