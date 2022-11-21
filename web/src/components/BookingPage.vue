<template>
  <b-container id="teacherSearch" class="mt-5">
      <div class="input-group">
          <div class="input-group-prepend">
              <span class="input-group-text">Search Teachers</span>
          </div>
            <input type="text" v-model="searchInput.input" placeholder="Enter A Name" @input="searchForTeachers">
      </div>
      <div>
        <div v-for="teacher in teachers" :key="teacher.id" class="mt-1">
            {{teacher.fname}}
            <button type="button" class="btn btn-outline-secondary" @click="showTeacherInfo(teacher)">Info</button>
        </div>
        <modal name="teacherInfoModal" :width="500" :height="300">
            <div class="text-center">
                <div>
                    <h1 class="mt-4">{{teacherInfo.fname}}</h1>
                    <p class="mt-2">Email: {{teacherInfo.email}}</p>
                    <p class="mt-2">Hourly Rate: £{{teacherInfo.hourly}}</p>
                </div>
                <div>
                    <button class="btn btn-success mt-2" @click="teacherBookingPageRedirect">Book A Lesson</button>
                </div>
                <button class="btn btn-outline-danger mt-4" @click="hideTeacherInfo">Close</button>
            </div>
        </modal>
      </div>
  </b-container>
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
                input: ''
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
    },
    async mounted() {
        this.$store.dispatch('loadUsers');
    }
}
</script>

<style scoped>
#teacherSearch {
    text-align: center;
}
</style>