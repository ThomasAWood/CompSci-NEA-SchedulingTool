<template>
  <b-container>
      <div class="input-group mt-5">
          <div class="input-group-prepend">
              <span class="input-group-text">Search Students</span>
          </div>
            <input type="text" v-model="searchInput.input" placeholder="Enter A Name" @input="searchForStudents">
      </div>
      <div>
        <div v-for="student in students" :key="student.id" class="mt-2">
            {{student.fname}}
            <button type="button" class="btn btn-outline-secondary" @click="showStudentInfo(student)">Info</button>
        </div>
        <modal name="studentInfoModal" :width="500" :height="400">
            <div class="text-center">
                <div>
                    <h1 class="mt-5">{{studentInfo.fname}}</h1>
                    <h1 class="mt-1">{{studentInfo.lname}}</h1>
                    <p class="mt-4">Email: {{studentInfo.email}}</p>
                </div>
                <button class="btn btn-outline-danger mt-5" @click="hideStudentInfo">Close</button>
            </div>
        </modal>
      </div>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'studentSearch',
    computed: {
        ...mapState(['currentUser', 'students'])
    },
    data() {
        return {
            searchInput: {
                input: '',
                teacherId: null
            },
            studentInfo: {}
        }
    },
    methods: {
        searchForStudents() {
            this.searchInput.teacherId = this.currentUser.id
            this.$store.commit('CLEAR_STUDENTS');
            this.$store.dispatch('searchForStudents', this.searchInput);
        },
        showStudentInfo(student) {
            this.studentInfo = student
            this.$modal.show('studentInfoModal');
        },
        hideStudentInfo() {
            this.$modal.hide('studentInfoModal');
        }
    },
    mounted() {
        this.$store.dispatch('loadUsers');
    }
}
</script>

<style scoped>

</style>