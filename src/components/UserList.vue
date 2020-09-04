<template>
    <div>
        <h1>Users List</h1>
        <div v-for="user in users" :key="user.id">
            {{user.fname}}
            <button type="button" class="btn" @click="loginUser(user)">Login</button>
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
        },
        methods: {
            loginUser(user) {
                this.$store.dispatch('loginUser', user)
            }
        }
    }
</script>

<style>

</style>