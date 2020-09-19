<template>
    <div>
        <div v-if='currentUser.fname'>
            <div v-if="currentUser.isTeacher === 0">
                <h1>Welcome student {{ currentUser.fname }}</h1>
                <teacher-homepage></teacher-homepage>
            </div>
            <div v-else>
                <h1>Welcome teacher {{ currentUser.fname}}</h1>
            </div>
        </div>
        <div class="container" v-else>
            <div class="text-center my-5"><h1>Music Lesson Scheduling Tool</h1></div>
            <div class="text-center my-5"><router-link to='/register'><button class="btn btn-outline-primary">Sign up</button></router-link></div>
            <div class="text-center my-5"><router-link to='/login'><button class="btn btn-outline-primary">Login</button></router-link></div>
        </div>
    </div>

</template>

<script>
import TeacherHomepage from './TeacherHomepage';

import { mapState } from 'vuex';
export default {
    name: 'Homepage',
    computed: {
        ...mapState(['currentUser'])
    },
    mounted(){
        this.$store.dispatch("loadUsers")
        },
    components: {
        TeacherHomepage
    }
    }
</script>

<style scoped>

</style>