<template>
    <div>
        <h1>Users List</h1>
        <div v-for="user in users" :key="user.id">
            {{user}}
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    
    export default {
        name: "UserList",
        computed: {
           ...mapState(['users'])
        },
        mounted(){
            this.$store.dispatch("loadUsers")
        }
}
</script>

<style>

</style>