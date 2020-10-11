<template>
  <div id="app">
    <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">
    <div v-if="currentUser.fname">
      {{ currentUser.fname }}
      <button class="btn btn-primary" @click="logoutUser">Logout</button>
      <button class="btn btn-primary" @click="homepageRedirect">Home</button>
    </div>
    <div v-else>
      <button class="btn btn-primary" @click="loginRedirect">Login</button>
      <button class="btn btn-primary" @click="registerRedirect">Register</button>
    </div>
    <router-view id="body"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default { 
  name: 'App',
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("logoutUser");
    },
    loginRedirect() {
      this.$router.push({ name: "loginForm"});
    },
    registerRedirect() {
      this.$router.push({ name: "registerForm"});
    },
    homepageRedirect() {
      this.$router.push({ name: "homepage"})
    }
  }
   };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
  min-height: 100vh;

}

.error {
  color: red;
  padding: 0px;
  margin: 0px;
}
</style>
