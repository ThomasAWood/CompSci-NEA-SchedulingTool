<template>
    <div>
        <div v-if='currentUser.fname'>
            <h1>Welcome to your homepage {{ currentUser.fname }}</h1>
        </div>
        <div class="container" v-else>
            <div class="text-center my-5"><h1>Music Lesson Scheduling Tool</h1></div>
            <div class="text-center my-5"><router-link to='/register'><button class="btn btn-outline-primary">Sign up</button></router-link></div>
            <div class="text-center my-5"><router-link to='/login'><button class="btn btn-outline-primary">Login</button></router-link></div>
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Homepage',
    computed: {
        ...mapState(['currentUser'])
    },
    }
</script>

<style scoped>

</style>