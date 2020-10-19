const { DateTime } = require('luxon');

//Shift to the same day?
let Date1Start = DateTime.local(2020, 10, 1, 14, 20)
let Date1End = DateTime.local(2020, 10, 1 ,15, 10)
let Date2Start = DateTime.local(2020, 10, 8, 14, 0)
let Date2End = DateTime.local(2020, 10, 8, 15, 0)
//console.log(Date1Start, Date2Start, Date1End, Date2End);

//console.log(Date1StartAdjusted.toString(), Date1EndAdjusted.toString(), Date2Start.toString(), Date2End.toString())
function sameDayShift(start1, end1, start2) {
    let weeksDiff = Math.round(start2.diff(start1, 'weeks').as('weeks'));
    console.log(weeksDiff)
    let start1Adjusted = start1.plus({ 'weeks': weeksDiff})
    let end1Adjusted = end1.plus({ 'weeks': weeksDiff})
    return [start1Adjusted, end1Adjusted]
}

let adjustedDates = sameDayShift(Date1Start, Date1End, Date2Start)
let Date1StartAdj = adjustedDates[0]
let Date1EndAdj = adjustedDates[1]

//Do they overlap?
function getOverlap(start1, end1, start2, end2) {
    if (((start1 < end2) && (start1 > start2)) || ((end1 < end2) && (end1 > start2 ))) {
        return true
    } else {
        return false
    }
};

//console.log('Normal Overlap', getOverlap(Date1Start, Date1End, Date2Start, Date2End))
console.log('Non Adjusted', Date1Start.toString(), Date1End.toString())
console.log('Adjusted', Date1StartAdj.toString(), Date1EndAdj.toString())
//console.log('Adjusted Overlap:', getOverlap(Date1StartAdj, Date1EndAdj, Date2Start, Date2End))