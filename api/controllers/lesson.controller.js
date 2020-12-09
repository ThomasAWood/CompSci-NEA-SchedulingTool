var Lesson = require("../models/lesson.model.js");
var { DateTime, Duration } = require('luxon');

//Add a lesson to the database
exports.createLesson = async function (req, res) {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        error: "Content can not be empty!"
      });
    } 
    // Create a lesson
    const lesson = new Lesson({
        teacherId: req.body.teacherId,
        startDateTime: req.body.startDateTime, //YYYY-MM-DD HH:MM:SS
        duration: req.body.duration,
        endDateTime: req.body.endDateTime, //YYYY-MM-DD HH:MM:SS
        isRecurring: req.body.isRecurring
    });

// Save lesson in the database
    //Retrieves all of the lessons of the teacher who is creating the new lesson so that the new lesson can be validated
    Lesson.getLessonsByTeacherId(lesson.teacherId, (err, teachersLessonRules) => {
      if (err) {
        res.status(500).send({
          error: "1: There was an error while creating the lesson"
        });
      } else {
      //Create new object of the new lesson which is to be created, converting all the UNIX timestamps into Luxon Date Time objects
      //This will be used in validating the new lesson
      var newLesson = {
        firstOccurenceStart: DateTime.fromSeconds(lesson.startDateTime),
        firstOccurenceEnd: DateTime.fromSeconds(lesson.startDateTime).plus(Duration.fromISO(lesson.duration)),
        endDateTime: null,
        isRecurring: lesson.isRecurring
      }
      //If the end date time is not null then add it to the object
      if (! (lesson.endDateTime == null)) {
        newLesson.endDateTime = DateTime.fromSeconds(lesson.endDateTime)
      }

      //Shifts the first lesson occurence a no of weeks so that datetime1 and datetime2 are on the same day
      function sameDayShift(start1, end1, start2) {
        let weeksDiff = Math.round(start2.diff(start1, 'weeks').as('weeks'));
        console.log(weeksDiff)
        let start1Adjusted = start1.plus({ 'weeks': weeksDiff})
        let end1Adjusted = end1.plus({ 'weeks': weeksDiff})
        return [start1Adjusted, end1Adjusted]
    }

      //Checks whether two DateTimes overlap or not
      function getOverlap(start1, end1, start2, end2) {
        if (((start1 < end2) && (start1 > start2)) || ((end1 < end2) && (end1 > start2 ))) {
            return true
        } else {
            return false
        }
     };
      //This section of validation will run through and remove the lessons from the clashing lessons array
      //If the lesson does not clash with the newLesson trying to be created
      //Any lessons left in at the end, clash with the newLesson and so the newLesson can't be accepted
      let clashingLessons = []
      //Iterates through the array of returned lessons and creates a new array
      //Of lessons that occur on the same weekday
      teachersLessonRules.forEach(lesson => {
        if (newLesson.firstOccurenceStart.weekday == DateTime.fromSeconds(lesson.startDateTime).weekday) {
          if (lesson.endDateTime != null) {
            lesson.endDateTime = DateTime.fromSeconds(lesson.endDateTime)
          }
          clashingLessons.push({
            firstOccurenceStart: DateTime.fromSeconds(lesson.startDateTime),
            firstOccurenceEnd: DateTime.fromSeconds(lesson.startDateTime).plus(Duration.fromISO(lesson.duration)),
            endDateTime: lesson.endDateTime,
            isRecurring: lesson.isRecurring
          });
        }
      })
      console.log('Same weekday:', clashingLessons)
      
      //Removes lessons that are outside the range of the newLesson
      for (let index = 0; index < clashingLessons.length; index++) {
        console.log('Clashing lesson check')
        //If both lessons are non recurring, do they overlap, if so set that index of the array to null
        if ((clashingLessons[index].isRecurring == false) && (newLesson.isRecurring == false) && !(getOverlap(newLesson.firstOccurenceStart, newLesson.firstOccurenceEnd, clashingLessons[index].firstOccurenceStart, clashingLessons[index].firstOccurenceEnd))) {
          console.log(`Non Recurring + Non Recurring. Don't Overlap`)
          clashingLessons[index] = null
        //If both are recurring with an end date and they don't have overlapping start and end dates. E.g the end date of one is after the start date of another
        } else if ( (clashingLessons[index].isRecurring && !(clashingLessons[index].endDateTime == null)) && (newLesson.isRecurring) && !(newLesson.endDateTime == null)) {
          if (!getOverlap(newLesson.firstOccurenceStart, newLesson.endDateTime, clashingLessons[index].firstOccurenceStart, clashingLessons[index].endDateTime)) {
            console.log(`Recurring With End Date + Recurring with end date. Don't Overlap`);
            clashingLessons[index] = null
          }
        //If one is non recurring and one is recurring without and end date, check if the non recurring ends before the recurring one starts
        } else if ((((clashingLessons[index].isRecurring == false)&&(newLesson.isRecurring)&&(newLesson.endDateTime == null)) && !(clashingLessons[index].firstOccurenceEnd > newLesson.firstOccurenceStart))
        || (((newLesson.isRecurring == false)&&(clashingLessons[index].isRecurring)&&(clashingLessons[index].endDateTime == null)) && !(newLesson.firstOccurenceEnd > clashingLessons[index].firstOccurenceStart)) ) {
          console.log(`Non recurring and Recurring w/out end date. Don't overlap`)
          clashingLessons[index] = null
        //If one is recurring with an end date and one is recurring without an end date, and it checks that the recurring with end, ends before the recurring one
        } else if ( ((clashingLessons[index].isRecurring && !(clashingLessons[index].endDateTime == null) && newLesson.isRecurring) && (clashingLessons[index].endDateTime < newLesson.firstOccurenceStart))
        || ((newLesson.isRecurring && !(newLesson.endDateTime == null) && clashingLessons[index].isRecurring) && (newLesson.endDateTime < clashingLessons[index].firstOccurenceStart)) ) {
          console.log(`recurring with end date + recurring without end date. Don't overlap`)
          clashingLessons[index] = null
        //If there is a recurring with and end date and a non recurring lesson
        } else if ( ((!clashingLessons[index].isRecurring && newLesson.isRecurring && (newLesson.endDateTime != null)) && !(getOverlap(clashingLessons[index].firstOccurenceStart, clashingLessons[index].firstOccurenceEnd, newLesson.firstOccurenceStart, newLesson.endDateTime)))
        || ((!newLesson.isRecurring && clashingLessons[index].isRecurring && (clashingLessons[index].endDateTime != null)) && !(getOverlap(newLesson.firstOccurenceStart, newLesson.firstOccurenceEnd, clashingLessons[index].firstOccurenceStart, clashingLessons[index].endDateTime)))) {
          console.log(`recurring with end date + non recurring. Don't overlap`)
          console.log('Clashing Lesson', clashingLessons[index])
          console.log('New Lesson', newLesson)
          console.log('Clashing is non recurring overlap', getOverlap(clashingLessons[index].firstOccurenceStart, clashingLessons[index].firstOccurenceEnd, newLesson.firstOccurenceStart, newLesson.endDateTime))
          console.log('New is non recurring overlap', getOverlap(newLesson.firstOccurenceStart, newLesson.firstOccurenceEnd, clashingLessons[index].firstOccurenceStart, clashingLessons[index].endDateTime))
          clashingLessons[index] = null
        }
      }

      console.log('clashingLessons before removal 1', clashingLessons)
      clashingLessons = clashingLessons.filter(function(value){return value != null});
      console.log('ClashingLessons after removal 1', clashingLessons)
      console.log('Clashing lesson after removal 1 array length', clashingLessons.length)
      //console.log("New Lesson:", newLesson)
      
      //Check to see if overlapping dates have clashing times or not
      if (clashingLessons.length != 0) {
        for (let index = 0; index < clashingLessons.length; index++) {
          let adjDates = sameDayShift(newLesson.firstOccurenceStart, newLesson.firstOccurenceEnd, clashingLessons[index].firstOccurenceStart);
          newLesson.firstOccurenceStartAdj = adjDates[0]
          newLesson.firstOccurenceEndAdj = adjDates[1]
          console.log('adjusted new Lesson', newLesson.firstOccurenceStartAdj.toString(), newLesson.firstOccurenceEndAdj.toString())
          console.log('Clashing Lesson', clashingLessons[index])
          console.log('Clashing Lesson Chekc', clashingLessons[index].firstOccurenceStart.toString(), clashingLessons[index].firstOccurenceEnd.toString())
          if (!getOverlap(newLesson.firstOccurenceStartAdj, newLesson.firstOccurenceEndAdj, clashingLessons[index].firstOccurenceStart, clashingLessons[index].firstOccurenceEnd)) {
            clashingLessons[index] = null
          }
        }
        console.log('Clashing Lesson After Nulling 2', clashingLessons)
        clashingLessons = clashingLessons.filter(function(value){return value != null});
      }
      
      console.log('final clashingLessons', clashingLessons)
      //Change to be if the array is empty
      if (clashingLessons.length == 0) {
      Lesson.create(lesson, (err, data) => {
        if (err) {
          res.status(500).send({
            error: "2: There was an error while creating the lesson"
          });
        } else {
          res.send(data);
        }
      });} else {
        res.status(400).send({
          error: "That is not a valid lesson. It clashes with an already existing lesson!"
        })
      }
    }
    });
  };

exports.getLessonsByTeacherId = (req, res) => {
  Lesson.getLessonsByTeacherId(req.params.teacherId, (err, data) => {
    if (err) {
      res.status(500).send({
        error: "There was an error while retrieving the lessons"
      })
    } else {
      res.send(data);
    }
  });
}

//Remove lesson from the database
exports.delete = (req, res) => {
  Lesson.remove(req.params.lessonId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found lesson with id ${req.params.lessonId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete lesson with id " + req.params.lessonId
        });
      }
    } else res.send({ message: `Lesson was deleted successfully!` });
  });
};
