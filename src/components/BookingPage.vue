<template>
  <div>
      <div class="input-group">
          <div class="input-group-prepend">
              <span class="input-group-text">Search Teachers</span>
          </div>
            <input type="text" v-model="searchInput.input" placeholder="Enter A Name">
            <button class="btn btn-primary" @click="searchForTeachers">Search</button>
      </div>
      <div>
        <div v-for="teacher in teachers" :key="teacher.id">
            {{teacher.fname}}
            <button type="button" class="btn btn-outline-secondary" @click="showTeacherInfo(teacher)">Info</button>
        </div>
        <modal name="teacherInfoModal" :width="500" :height="400">
            <div class="text-center">
                <div>
                    <h1>{{teacherInfo.fname}}</h1>
                    <p>Email: {{teacherInfo.email}}</p>
                    <p>Hourly Rate: £{{teacherInfo.hourly}}</p>
                </div>
                <div>
                    <button class="btn btn-success" @click="teacherBookingPageRedirect">Book A Lesson</button>
                </div>
                <button class="btn btn-outline-danger" @click="hideTeacherInfo">Close</button>
            </div>
        </modal>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'bookingPage',
    computed: {
        ...mapState(['currentUser', 'teachers'])
    },
    data() {
        return {
            searchInput: {
                searchInput: ''
            },
            teacherInfo: {}
        }
    },
    methods: {
        searchForTeachers() {
            this.$store.commit('CLEAR_TEACHERS');
            this.$store.dispatch('searchForTeachers', this.searchInput);
        },
        showTeacherInfo(teacher) {
            this.teacherInfo = teacher
            this.$modal.show('teacherInfoModal');
        },
        hideTeacherInfo() {
            this.$modal.hide('teacherInfoModal');
        },
        teacherBookingPageRedirect() {
            let teacherId = this.teacherInfo.id
            this.$router.push({ name: 'lessonBooking', params: { teacherId }})
        }
    }
}
</script>

<style>

</style>