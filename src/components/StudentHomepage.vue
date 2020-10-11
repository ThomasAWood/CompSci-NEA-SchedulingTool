<template>
  <div>
    <button class="btn btn-primary" @click="redirectBookingPage">Book Lessons</button>
    <div id="calendarDiv">
      <full-calendar :options='calendarOptions' ref="calendar"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';

export default {
    name: "StudentHomepage",
    computed: {
        ...mapState(['currentUser', 'bookings'])
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
      redirectBookingPage() {
        this.$router.push({ name: 'bookingPage'})
      }
    },
    components: {
      FullCalendar
    },
    async mounted() {
      this.$store.dispatch("loadUsers");
      console.log('This ran')
      await this.$store.dispatch("loadStudentsBookings", this.currentUser.id);
      //Open calendar api
      let calendar = this.$refs['calendar'].getApi()
      //Add the lessons as an event source to the calendar
      calendar.addEventSource(this.bookings)
    }
}
</script>

<style>
#calendarDiv {
  max-height: 100%
}

</style>