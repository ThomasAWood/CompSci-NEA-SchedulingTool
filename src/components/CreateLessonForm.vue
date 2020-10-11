<template>
    <div class="text-center">
        <div>
            <h3 class="my-3">Create New Lesson Slot</h3>
            <div class="my-4">
                <span class="mb-2">Date and Time</span>
                <Datepicker :bootstrap-styling=true :inline=false placeholder='Date' v-model="startDateInput"></Datepicker>
                <Timepicker v-model="startTimeInput" name="StartTimePicker"></Timepicker>
            </div>
            <div class="mt-4">
                <label for="DurationPicker" class="mx-2">Lesson Duration</label>
                <Timepicker v-model="durationInput" name="StartTimePicker" format="mm" :hour-range="[]" hide-disabled-hours></Timepicker>
            </div>
            <div class="mt-4">
                <label for="Repeat" class="mx-2">Repeat Weekly?</label>
                <input type="checkbox" name="Repeat" class="mx-2" v-model="lessonInfo.isRecurring">
            </div>
            <div v-if="lessonInfo.isRecurring">
                <Datepicker name='repeatUntilDate' :bootstrap-styling=true :inline=false placeholder='Repeat Weekly Until...' v-model="endDateInput"></Datepicker>
                <span class="userNotice">(Leave blank for repeat forever)</span>
            </div>
            <button class="btn btn-outline-success my-3" @click="createLesson">Create Lesson</button>
        </div>
    </div>
</template>

<script>
//Imports all of the functionality from the date handling package Luxon
import { DateTime } from 'luxon';
import { mapState } from 'vuex';

export default {
    name: "createLessonForm",
    computed: {
        ...mapState(['currentUser'])
    },
    data() {
        return {
            lessonInfo: {
                teacherId: null,
                startDateTime: null,
                duration: null,
                endDateTime: null,
                isRecurring: false
            },
            startDateInput: null,
            startTimeInput: null,
            endDateInput: null,
            durationInput: null
        }
    }, 
    methods: {
        async createLesson() {
            this.lessonInfo.teacherId = this.currentUser.id
            //Takes the inputted start date and start time and combines them into one date string with format YYYY-MM-DD HH:MM:SS
            this.lessonInfo.startDateTime = DateTime.fromJSDate(this.startDateInput).toISODate() + " " +this.startTimeInput.HH + ":" + this.startTimeInput.mm + ":00"
            //Takes the new inputted datetime and creates a luxon date object, then converts it to UNIX Time
            this.lessonInfo.startDateTime = DateTime.fromSQL(this.lessonInfo.startDateTime).toSeconds()
            //Takes the inputted duration and formats it into an ISO8601 Duration
            this.lessonInfo.duration = 'PT' + this.durationInput.mm.toString() + 'M'
            //If there is an end date selected (can be null) then it is converted to UNIX Time
            if (this.endDateInput!= null) {
                this.lessonInfo.endDateTime = DateTime.fromJSDate(this.endDateInput).toSeconds()
            }
            console.log('Create Lesson Form Output:', this.lessonInfo)
            //Sends data to the store action which creates a lesson
            let lesson = await this.$store.dispatch('createLesson', this.lessonInfo);
            //Displays an error if there was an error returned while trying to create a lesson
            if (lesson.error) {
                alert(lesson.error);
            } else {
                alert("Lesson Created Successfully!")
                //this.$root.fetchLessons()
                //this.$root.hideCreateLessonForm()
            }
        }
    },
    mounted(){
        this.$store.dispatch("loadUsers")
        }
}
</script>

<style>
.userNotice {
    color: lightslategray;
}

</style>