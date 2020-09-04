<template>
  <div id="app">
    <div v-if="currentUser.fname">
      {{ currentUser.fname }}
      <button class="btn btn-primary" @click="logoutUser">Logout</button>
    </div>
    <div v-else>
      <button class="btn btn-primary" @click="loginRedirect">Login</button>
      <button class="btn btn-primary" @click="registerRedirect">Register</button>
    </div>
    <router-view></router-view>
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
    }
  }
   };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
