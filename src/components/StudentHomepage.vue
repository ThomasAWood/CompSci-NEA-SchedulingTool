<template>
  <div>
    <button class="btn btn-primary" @click="redirectBookingPage">Book Lessons</button>
    <div id="calendarDiv">
      <full-calendar :options='calendarOptions' ref="calendar"/>
    </div>
    <modal name="bookingInfoModal" :width="500" :height="400">
            <div class="text-center">
                <div>
                    <h1 v-if="!bookingModalInfo.cancelled">Booking</h1>
                    <h1 v-else>Cancelled Booking</h1>
                    <p>{{ bookingModalInfo.startTime }} - {{ bookingModalInfo.endTime }}</p>
                    <p>Student: {{ bookingModalInfo.teacherName }}</p>
                </div>
                <div v-if="!bookingModalInfo.cancelled">
                    <button class="btn btn-danger" @click="cancelBooking">Cancel Booking</button>
                </div>
                <div v-else>
                    <button class="btn btn-danger" @click="cancelBooking" disabled>Cancel Booking</button>
                </div>
                <button class="btn btn-outline-danger" @click="hideBookingInfo">Close</button>
            </div>
        </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FullCalendar from '@fullcalendar/vue';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { DateTime } from 'luxon';

export default {
    name: "StudentHomepage",
    computed: {
        ...mapState(['currentUser', 'bookings'])
    },
    data() {
      return {
        calendarOptions: {
                plugins: [ timeGridPlugin, interactionPlugin, bootstrapPlugin ],
                initialView: 'timeGridWeek',
                themeSystem: 'bootstrap',
                eventClick: this.eventSelected,
                height: 620,
                allDaySlot: false,
                nowIndicator: true,
                scrollTime: '09:00:00',
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
                teacherName: null,
                startTime: null,
                endTime: null,
                bookingId: null,
                cancelled: false
            },
            cancelledBookings: []
      }
    },
    methods: {
      redirectBookingPage() {
        this.$router.push({ name: 'bookingPage'})
      },
      showBookingInfo() {
        this.$modal.show('bookingInfoModal');
      },
      hideBookingInfo() {
        this.$modal.hide('bookingInfoModal');
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
      eventSelected(event) {
            //console.log('Event Selected', event);
            if (!(event.event._def.extendedProps.cancelled)) {
                this.bookingModalInfo.studentName = event.event._def.title
                this.bookingModalInfo.startTime = DateTime.fromJSDate(event.event._instance.range.start).toLocaleString(DateTime.TIME_SIMPLE)
                this.bookingModalInfo.endTime = DateTime.fromJSDate(event.event._instance.range.end).toLocaleString(DateTime.TIME_SIMPLE)
                this.bookingModalInfo.bookingId = event.event._def.publicId
                this.showBookingInfo()
            } else {
                this.bookingModalInfo.studentName = event.event._def.title
                this.bookingModalInfo.startTime = DateTime.fromJSDate(event.event._instance.range.start).toLocaleString(DateTime.TIME_SIMPLE)
                this.bookingModalInfo.endTime = DateTime.fromJSDate(event.event._instance.range.end).toLocaleString(DateTime.TIME_SIMPLE)
                this.bookingModalInfo.cancelled = true
                this.showBookingInfo()
            }
      }
    },
    components: {
      FullCalendar
    },
    async mounted() {
      this.$store.dispatch("loadUsers");
      await this.$store.dispatch("loadStudentsBookings", this.currentUser.id);
      for (let index = 0; index < this.bookings.length; index++) {
          if (this.bookings[index].cancelled) {
              this.cancelledBookings.push(this.bookings[index])
              this.bookings.splice(index, 1)
          }
      }
      //Open calendar api
      let calendar = this.$refs['calendar'].getApi()
      //Add the lessons as an event source to the calendar
      calendar.addEventSource({events: this.bookings, color: '#E74C3C', display: 'block'})
      calendar.addEventSource({events: this.cancelledBookings, color: 'red'})
    }
}
</script>

<style>
#calendarDiv {
  max-height: 100%
}

</style>