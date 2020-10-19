<template>
    <div class="text-center">
        <button class="btn btn-primary" @click="showCreateLessonForm">Create New Lesson Slot</button>
        <modal name="createLessonFormModal" :width="300" :height="640">
            <div class="text-center">
                <create-lesson></create-lesson>
                <button class="btn btn-outline-danger mt-5" @click="hideCreateLessonForm">Close</button>
            </div>
        </modal>
        <modal name="bookingInfoModal" :width="500" :height="400">
            <div class="text-center">
                <div>
                    <h1 v-if="!bookingModalInfo.cancelled">Booking</h1>
                    <h1 v-else>Cancelled Booking</h1>
                    <p>{{ bookingModalInfo.startTime }} - {{ bookingModalInfo.endTime }}</p>
                    <p>Student: {{ bookingModalInfo.studentName }}</p>
                </div>
                <div v-if="!bookingModalInfo.cancelled">
                    <button class="btn btn-danger" @click="cancelBooking">Cancel Booking</button>
                </div>
                <div v-else>
                    <button class="btn btn-danger" @click="cancelBooking" disabled>Cancel Booking</button>
                </div>
                <button class="btn btn-danger" @click="deleteLessonSlotFromBooking">Delete Lesson Slot</button>
                <button class="btn btn-outline-danger" @click="hideBookingInfo">Close</button>
            </div>
        </modal>
        <modal name="lessonInfoModal" :width="500" :height="400">
            <div class="text-center">
                <div>
                    <h1>Lesson Slot</h1>
                    <p>{{ lessonModalInfo.startTime }} - {{ lessonModalInfo.endTime }}</p>
                </div>
                <div>
                    <button class="btn btn-danger" @click="deleteLessonSlot">Delete Lesson Slot</button>
                </div>
                <button class="btn btn-outline-danger" @click="hideLessonInfo">Close</button>
            </div>
        </modal>
        <full-calendar :options='calendarOptions' ref="calendar" v-on:refreshCalendar="fetchLessons"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import CreateLesson from './CreateLessonForm';
import FullCalendar from '@fullcalendar/vue';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateTime } from 'luxon';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import Api from '../service/api';

export default {
    name: 'TeacherHomepage',
    computed: {
        ...mapState(['currentUser', 'teachersLessons', 'bookings'])
    },
    data() {
        return {
            calendarOptions: {
                plugins: [ timeGridPlugin, interactionPlugin, bootstrapPlugin ],
                initialView: 'timeGridWeek',
                height: 620 ,
                allDaySlot: false,
                nowIndicator: true,
                scrollTime: '09:00:00',
                themeSystem: 'bootstrap',
                eventClick: this.eventSelected,
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
                  meridiem: false
                },
                slotLabelFormat: {
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: 'short'
                }
            },
            bookingModalInfo: {
                studentName: null,
                startTime: null,
                endTime: null,
                bookingId: null,
                lessonId: null,
                cancelled: false
            },
            lessonModalInfo: {
                startTime: null,
                endTime: null,
                lessonId: null
            },
            cancelledBookings: []
        }
    },
    methods: {
        showCreateLessonForm() {
            this.$modal.show('createLessonFormModal');
        },
        hideCreateLessonForm() {
            this.$modal.hide('createLessonFormModal');
        },
        showBookingInfo() {
            this.$modal.show('bookingInfoModal');
        },
        hideBookingInfo() {
            this.$modal.hide('bookingInfoModal');
        },
        showLessonInfo() {
            this.$modal.show('lessonInfoModal');
        },
        hideLessonInfo() {
            this.$modal.hide('lessonInfoModal');
        },
        eventSelected(event) {
            console.log('Event Selected', event);
            if (!(event.event._def.title == 'Available Lesson') && !(event.event._def.extendedProps.cancelled)) {
                this.bookingModalInfo.studentName = event.event._def.title
                this.bookingModalInfo.startTime = DateTime.fromJSDate(event.event._instance.range.start).toLocaleString(DateTime.TIME_SIMPLE)
                this.bookingModalInfo.endTime = DateTime.fromJSDate(event.event._instance.range.end).toLocaleString(DateTime.TIME_SIMPLE)
                this.bookingModalInfo.bookingId = event.event._def.publicId
                this.bookingModalInfo.lessonId = event.event._def.extendedProps.lessonId
                this.showBookingInfo()
            } else if (!(event.event._def.title == 'Available Lesson') && event.event._def.extendedProps.cancelled) {
                this.bookingModalInfo.studentName = event.event._def.title
                this.bookingModalInfo.startTime = DateTime.fromJSDate(event.event._instance.range.start).toLocaleString(DateTime.TIME_SIMPLE)
                this.bookingModalInfo.endTime = DateTime.fromJSDate(event.event._instance.range.end).toLocaleString(DateTime.TIME_SIMPLE)
                this.bookingModalInfo.lessonId = event.event._def.extendedProps.lessonId
                this.bookingModalInfo.cancelled = true
                this.showBookingInfo()
            } else {
                this.lessonModalInfo.startTime = DateTime.fromJSDate(event.event._instance.range.start).toLocaleString(DateTime.TIME_SIMPLE)
                this.lessonModalInfo.endTime = DateTime.fromJSDate(event.event._instance.range.end).toLocaleString(DateTime.TIME_SIMPLE)
                this.lessonModalInfo.lessonId = event.event._def.publicId
                this.showLessonInfo()
            }
            
        },
        async cancelBooking() {
            let id = this.bookingModalInfo.bookingId
            let cancellation = await this.$store.dispatch("cancelBooking", id)
            if (cancellation.error) {
                alert(cancellation.error);
            } else {
                alert("Cancellation Successfully Cancelled");
                this.hideBookingInfo();
                this.$router.push({ name: 'homepage' });
            }
        },
        async deleteLessonSlotFromBooking() {
            if (confirm("This lesson slot has bookings on it. Are you sure you want to delete all occurences of this lesson?")) {
                let response = await Api().get(`/bookings/lessonid/${this.bookingModalInfo.lessonId}`)
                let bookings = response.data
                for (let i = 0; i < bookings.length; i++) {
                    await Api().delete(`/bookings/${bookings[i].id}`)
                }
                let deletion = await this.$store.dispatch('deleteLesson', this.bookingModalInfo.lessonId)
                if (deletion.error) {
                    alert(deletion.error);
                } else {
                    alert('Lesson Deleted Successfully');
                    this.$router.push({ name: 'homepage' });
                }
            }
        },
        async deleteLessonSlot() {
            let response = await Api().get(`/bookings/lessonid/${this.lessonModalInfo.lessonId}`)
            let bookings = response.data
            console.log('bookings:',bookings)
            if (bookings != undefined) {
                if(confirm('This lesson or another occurence of it has bookings on it. Are you sure you want to delete it?')) {
                    let deletion = await this.$store.dispatch('deleteLesson', this.lessonModalInfo.lessonId)
                    if (deletion.error) {
                        alert(deletion.error);
                    } else {
                        alert('Lesson Deleted Successfully');
                        this.$router.push({ name: 'homepage' });
                }
                }
            } else {
                if(confirm('Are you sure you want to delete this lesson?')) {
                    let deletion = await this.$store.dispatch('deleteLesson', this.lessonModalInfo.lessonId)
                    if (deletion.error) {
                        alert(deletion.error);
                    } else {
                        alert('Lesson Deleted Successfully');
                        this.$router.push({ name: 'homepage' });
                }
                }
            }
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
        for (let index = 0; index < this.bookings.length; index++) {
            console.log
            if (this.bookings[index].cancelled) {
                this.cancelledBookings.push(this.bookings[index])
                this.bookings.splice(index, 1)
            }
            
        }
        //Open calendar api
        let calendar = this.$refs['calendar'].getApi()
        //Add the lessons as an event source to the calendar
        calendar.addEventSource({events: this.teachersLessons, color: '#52BE80', display: 'block'})
        calendar.addEventSource({events: this.bookings, color: '#E74C3C', display: 'block'})
        calendar.addEventSource({events: this.cancelledBookings, color: 'red'})
    }
    }
</script>

<style scoped>

</style>