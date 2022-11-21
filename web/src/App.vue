<template>    
  <div id='app'>
    <Header></Header>
    <router-view id="body"></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default { 
  name: 'App',
  components: {
    Header
    }
  };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: white;
  min-height: 100vh;
}

.error {
  color: red;
  padding: 0px;
  margin: 0px;
}
</style>
