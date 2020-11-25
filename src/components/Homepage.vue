<template>
    <div>
        <div v-if="currentUser.isTeacher === 0">
            <student-homepage></student-homepage>
        </div>
        <div v-else>
            <teacher-homepage></teacher-homepage>
        </div>
    </div>

</template>

<script>
import TeacherHomepage from './TeacherHomepage';
import StudentHomepage from './StudentHomepage';

import { mapState } from 'vuex';
export default {
    name: 'Homepage',
    computed: {
        ...mapState(['currentUser'])
    },
    async mounted(){
        await this.$store.dispatch("loadUsers");
        console.log(this.currentUser)
        },
    components: {
        TeacherHomepage,
        StudentHomepage
    }
    }
</script>

<style scoped>

</style>