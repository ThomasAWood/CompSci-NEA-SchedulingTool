<template>
    <div class="text-center">
        <button class="btn btn-primary" @click="showCreateLessonForm">Create New Lesson Slot</button>
        <modal name="createLessonFormModal" :width="300" :height="640">
            <div class="text-center">
                <create-lesson></create-lesson>
                <button class="btn btn-outline-danger mt-5" @click="hideCreateLessonForm">Close</button>
            </div>
        </modal>
        <full-calendar :options='calendarOptions' ref="calendar" v-on:refreshCalendar="fetchLessons"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import CreateLesson from './CreateLessonForm';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateTime } from 'luxon';
import bootstrapPlugin from '@fullcalendar/bootstrap';

export default {
    name: 'TeacherHomepage',
    computed: {
        ...mapState(['currentUser', 'teachersLessons', 'bookings'])
    },
    data() {
        return {
            calendarOptions: {
                plugins: [ dayGridPlugin, interactionPlugin, bootstrapPlugin ],
                initialView: 'dayGridWeek',
                themeSystem: 'bootstrap',
                titleFormat: {
                  year: 'numeric',
                  month: 'long'
                },
                dayHeaderFormat: {
                  weekday: 'short',
                  day: 'numeric'
                },
                eventTimeFormat: {
                  hour: 'numeric',
                  minute: '2-digit',
                  meridiem: 'short'
                }
            }
        }
    },
    methods: {
        showCreateLessonForm() {
            this.$modal.show('createLessonFormModal');
        },
        hideCreateLessonForm() {
            this.$modal.hide('createLessonFormModal');
        },
        async fetchLessons() {
            let teacherLessonQueryInfo = {
                "userId": this.currentUser.id,
                "startDate": DateTime.local().minus({ years: 2}).toUTC().toISODate(),
                "endDate": DateTime.local().plus({ years: 2}).toUTC().toISODate()
            }
            await this.$store.dispatch("loadTeachersLessons", teacherLessonQueryInfo)
        }
    },
    components: {
        CreateLesson,
        FullCalendar
    },
    //Mounted runs when the page is loaded, loads all required data, is async so we can wait until data is loaded to run
    async mounted() {
        this.$store.dispatch("loadUsers")
        //Fetch the lessons from the fetchLessons Method
        await this.fetchLessons()
        await this.$store.dispatch("loadTeachersBookings", this.currentUser.id)
        //Open calendar api
        let calendar = this.$refs['calendar'].getApi()
        //Add the lessons as an event source to the calendar
        calendar.addEventSource(this.teachersLessons)
        calendar.addEventSource(this.bookings)
    }
    }
</script>

<style scoped>

</style>