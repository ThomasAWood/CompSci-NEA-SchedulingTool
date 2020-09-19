<template>
    <div>
        <div>
            <input type="number" placeholder="Teacher Id" v-model="lessonInfo.teacherId">
            <h2>Start Date Time</h2>
            <datepicker v-model="startDateInput"></datepicker>
            <h2>Duration</h2>
            <datepicker v-model="endDateInput"></datepicker>
            <h2>End Date Time</h2>
            <timeselector v-model="startTimeInput"></timeselector>
            <input type="checkbox" v-model="lessonInfo.isRecurring">
        </div>
        <button class="btn btn-primary"   @click="createLesson">Create Lesson</button>
    </div>
</template>

<script>
//Imports all of the functionality from the date handling package Luxon
import { DateTime } from 'luxon';

export default {
    name: "createLessonForm",
    data() {
        return {
            lessonInfo: {
                teacherId: null,
                startDateTime: null,
                duration: null,
                endDateTime: null,
                isRecurring: null
            },
            startDateTimeInput: null,
            endDateTimeInput: null,
            durationInput: null,
        }
    }, 
    methods: {
        async createLesson() {
            //Takes the input date and creates a luxon date object, then converts it to UTC and formats it for passing into MySQL
            this.lessonInfo.startDate = DateTime.fromJSDate(this.startDateInput).toUTC().toSQLDate()
            this.lessonInfo.endDate = DateTime.fromJSDate(this.endDateInput).toUTC().toSQLDate()
            this.lessonInfo.startTime = DateTime.fromJSDate(this.startTimeInput).toUTC().toFormat('HH:mm:ss')
            this.lessonInfo.endTime = DateTime.fromJSDate(this.endTimeInput).toUTC().toFormat('HH:mm:ss')
            console.log('Start Date', this.lessonInfo.startDate.toString(), "End Date", this.lessonInfo.endDate.toString())
            //Sends data to the store action which creates a lesson
            let lesson = await this.$store.dispatch('createLesson', this.lessonInfo);
            //Displays an error if there was an error returned while trying to create a lesson
            if (lesson.error) {
                alert(lesson.error);
            } else {
                console.log("lesson created!")
            }
        }
    }
}
</script>

<style>

</style>