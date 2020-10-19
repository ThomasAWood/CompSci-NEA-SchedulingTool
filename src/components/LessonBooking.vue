<template>
    <div>
        <h1>Lesson Booking</h1>
        <full-calendar :options='calendarOptions' ref="calendar" v-on:refreshCalendar="fetchLessons"/>
    </div>
</template>

<script>
import { DateTime } from 'luxon';
import { mapState } from 'vuex';
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
    name: "lessonBooking",
    props:['teacherId'],
    computed: {
        ...mapState(['currentUser', 'teachersLessons', 'bookings'])
    },
    async mounted() {
        this.$store.dispatch("loadUsers")
        //Fetch the lessons from the fetchLessons Method
        await this.fetchLessons()
        //Open calendar api
        let calendar = this.$refs['calendar'].getApi()
        //Add the lessons as an event source to the calendar
        calendar.addEventSource(this.teachersLessons)
    },
    data() {
        return {
            calendarOptions: {
                plugins: [ dayGridPlugin, interactionPlugin ],
                initialView: 'dayGridWeek',
                eventClick: this.lessonSlotClick
            },
            selectedLessonSlot: {
                startDate: null, 
                endDate: null,
                lessonId: null
            }
        }
    },
    methods: {
        async fetchLessons() {
        let teacherLessonQueryInfo = {
            "userId": this.teacherId,
            "startDate": DateTime.local().toUTC().toISODate(),
            "endDate": DateTime.local().plus({ years: 2}).toUTC().toISODate()
        }
        await this.$store.dispatch("loadTeachersLessons", teacherLessonQueryInfo)
        },
        lessonSlotClick(lessonSlot) {
            this.selectedLessonSlot.startDate = DateTime.fromJSDate(lessonSlot.event._instance.range.start).toUTC().toFormat('yyyy-MM-dd HH:mm:ss')
            this.selectedLessonSlot.lessonId = lessonSlot.event._def.publicId
            if (confirm("Are you sure you want to book this lesson?")) {
                let bookingInfo = {
                    studentId: this.currentUser.id,
                    lessonId: this.selectedLessonSlot.lessonId,
                    dateTime: this.selectedLessonSlot.startDate,
                    cancelled: 0
                }
                this.$store.dispatch('createBooking', bookingInfo);
                this.$router.push({ name: 'homepage'})
            }
        }
    },
    components: {
        FullCalendar
    }
}
</script>

<style>

</style>