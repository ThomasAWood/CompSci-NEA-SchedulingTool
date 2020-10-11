const { DateTime } = require('luxon');

//Shift to the same day?
let Date1Start = DateTime.local(2020, 10, 15, 13, 0)
let Date1End = DateTime.local(2020, 10, 15 ,14, 0)
let Date2Start = DateTime.local(2020, 10, 8, 14, 30)
let Date2End = DateTime.local(2020, 10, 8, 15, 30)
//console.log(Date1Start, Date2Start, Date1End, Date2End);

//console.log(Date1StartAdjusted.toString(), Date1EndAdjusted.toString(), Date2Start.toString(), Date2End.toString())
function sameDayShift(start1, end1, start2) {
    let weeksDiff = start2.diff(start1, 'weeks');
    let start1Adjusted = start1.plus(weeksDiff)
    let end1Adjusted = end1.plus(weeksDiff)
    return start1Adjusted, end1Adjusted
}

let {Date1StartAdjusted, Date1EndAdjusted} = sameDayShift(Date1Start, Date1End, Date2Start, Date2End)

//Do they overlap?
function getOverlap(start1, end1, start2, end2) {
    if (((start2 < start1) && (start1 < end2)) || ((start2 < end1) && (end1 < end2 ))) {
        return true
    } else {
        return false
    }
};

console.log(getOverlap(Date1StartAdjusted, Date1EndAdjusted, Date2Start, Date2End))