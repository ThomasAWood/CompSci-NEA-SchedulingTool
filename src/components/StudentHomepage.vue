<template>
  <div>
    <b-container id="calendarDiv" class="mt-3" fluid>
      <full-calendar :options='calendarOptions' ref="calendar"/>
    </b-container>
    <modal name="bookingInfoModal" :width="500" :height="400">
            <div class="text-center">
                <div>
                    <h1 v-if="!bookingModalInfo.cancelled">Booking</h1>
                    <h1 v-else>Cancelled Booking</h1>
                    <p>{{ bookingModalInfo.startTime }} - {{ bookingModalInfo.endTime }}</p>
                    <p>Teacher: {{ bookingModalInfo.teacherName }}</p>
                </div>
                <div v-if="!bookingModalInfo.cancelled">
                    <b-button variant="danger" @click="cancelBooking">Cancel Booking</b-button>
                </div>
                <div v-else>
                    <b-button variant="danger" @click="cancelBooking" disabled>Cancel Booking</b-button>
                </div>
                <b-button variant="outline-danger" @click="hideBookingInfo">Close</b-button>
            </div>
        </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FullCalendar from '@fullcalendar/vue';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateTime } from 'luxon';

export default {
    name: "StudentHomepage",
    computed: {
        ...mapState(['currentUser', 'bookings'])
    },
    data() {
      return {
        calendarOptions: {
                plugins: [ timeGridPlugin, interactionPlugin],
                initialView: 'timeGridWeek',
                eventClick: this.eventSelected,
                height: "100%",
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
          this.updateCalendar();
        }
      },
      eventSelected(event) {
            //console.log('Event Selected', event);
            if (!(event.event._def.extendedProps.cancelled)) {
                this.bookingModalInfo.teacherName = event.event._def.title
                this.bookingModalInfo.startTime = DateTime.fromJSDate(event.event._instance.range.start).toLocaleString(DateTime.TIME_SIMPLE)
                this.bookingModalInfo.endTime = DateTime.fromJSDate(event.event._instance.range.end).toLocaleString(DateTime.TIME_SIMPLE)
                this.bookingModalInfo.bookingId = event.event._def.publicId
                this.showBookingInfo()
            } else {
                this.bookingModalInfo.teacherName = event.event._def.title
                this.bookingModalInfo.startTime = DateTime.fromJSDate(event.event._instance.range.start).toLocaleString(DateTime.TIME_SIMPLE)
                this.bookingModalInfo.endTime = DateTime.fromJSDate(event.event._instance.range.end).toLocaleString(DateTime.TIME_SIMPLE)
                this.bookingModalInfo.cancelled = true
                this.showBookingInfo()
            }
      },
      async updateCalendar() {
            await this.$store.dispatch("loadStudentsBookings", this.currentUser.id);
            for (let index = 0; index < this.bookings.length; index++) {
            if (this.bookings[index].cancelled) {
                this.cancelledBookings.push(this.bookings[index])
                this.bookings.splice(index, 1)
              }
            }
            let calendar = this.$refs['calendar'].getApi();
            calendar.getEventSourceById('studentBookings').remove()
            calendar.getEventSourceById('studentCancelled').remove()
            calendar.addEventSource({id: "studentBookings", events: this.bookings, color: '#E74C3C', display: 'block'})
            calendar.addEventSource({id: "studentCancelled", events: this.cancelledBookings, color: 'red'})
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
      calendar.addEventSource({id: "studentBookings", events: this.bookings, color: '#E74C3C', display: 'block'})
      calendar.addEventSource({id: "studentCancelled", events: this.cancelledBookings, color: 'red'})
    }
}
</script>

<style scoped>
#calendarDiv {
  height: 85vh;
}
</style>