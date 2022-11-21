<template>
  <div>
      <h1>Error 404. Page Not Found</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Error404',
    computed: {
        ...mapState(['currentUser'])
    },
    mounted(){
        this.$store.dispatch("loadUsers")
        }
}
</script>

<style>

</style>