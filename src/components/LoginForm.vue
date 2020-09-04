<template>
    <div class='container'>
        <h1 class="text-center my-4">Login</h1>
        <form action="" method=''>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" placeholder="Email" v-model="loginInfo.email">
            </div>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="password">Password</label>
                <input type="password" class="form-control" placeholder="Password" v-model="loginInfo.password">
            </div>
            <div class="form-group col-md-4 mx-auto text-center mt-4">
                <button type="submit" class="btn btn-primary" @click="loginUser">Submit</button>
            </div>  
        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginForm',
    data() {
            return {
                loginInfo: {
                    email: "",
                    password: ""
                    }
                }
        },
    methods: {
        loginUser() {
            this.$store.dispatch('loginUser', this.loginInfo);
            this.$router.push({ name: 'homepage'})
        }
    }
    }
</script>

<style scoped>
</style>