<template>
    <b-navbar toggleable='lg' variant='primary' type='dark' id='navbar' v-if="currentUser.fname && !currentUser.isTeacher">
        <b-navbar-brand>Music Lessons</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id='nav-collapse' is-nav>
            <b-navbar-nav>
                <b-nav-item @click="homepageRedirect">Home</b-nav-item>
                <b-nav-item @click="redirectBookingPage">Book Lessons</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-text><span id="name">{{ currentUser.fname }}</span></b-nav-text>
                <b-nav-item @click="logoutUser"><b-button size='sm' variant='danger'>Logout</b-button></b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <b-navbar toggleable='lg' variant='primary' type='dark' id='navbar' v-else-if="currentUser.fname && currentUser.isTeacher">
        <b-navbar-brand>Music Lessons</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id='nav-collapse' is-nav>
            <b-navbar-nav>
                <b-nav-item @click="homepageRedirect">Home</b-nav-item>
                <b-nav-item @click="studentsRedirect">Students</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-text><span id="name">{{ currentUser.fname }}</span></b-nav-text>
                <b-nav-item @click="logoutUser"><b-button size='sm' variant='danger'>Logout</b-button></b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <b-navbar toggleable='lg' variant='primary' type='dark' id='navbar' v-else>
        <b-navbar-brand>Music Lessons</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id='nav-collapse' is-nav>
            <b-navbar-nav>
                <b-nav-item @click="loginRedirect">Login</b-nav-item>
                <b-nav-item @click="registerRedirect">Register</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Header',
    computed: {
        ...mapState(['currentUser'])
    },
    methods: {
        logoutUser() {
            this.$store.dispatch("logoutUser");
            this.$router.push({ name: 'landingPage' })
        },
        loginRedirect() {
            this.$router.push({ name: "loginForm"});
        },
        registerRedirect() {
            this.$router.push({ name: "registerForm"});
        },
        homepageRedirect() {
            this.$router.push({ name: "homepage"})
        },
        studentsRedirect() {
            this.$router.push({ name: "studentSearch"})
        },
        redirectBookingPage() {
        this.$router.push({ name: 'bookingPage'})
      },
  },
}
</script>

<style scoped>
#name {
    color: white;
}
</style>