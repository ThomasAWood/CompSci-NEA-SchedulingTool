<template>
    <div class="text-center" id="loginPage">
        <form class="form-signin">
            <h1 class="my-5">Login</h1>
            <input type="email" class="form-control" placeholder="Email" id="emailInput" v-model="loginInfo.email">
            <div class="input-group mt-3">
                <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Password" id="passwordInput" v-model="loginInfo.password">
                <div class="input-group-append">
                    <b-button variant='outline-primary' type="button" @click="showPassword = !showPassword" >
                        <b-icon :icon='showPassword ? "eye": "eye-slash"' ></b-icon>
                    </b-button>
                </div>
            </div>
            <button type="button" class="btn btn-primary mt-5" @click="loginUser">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginForm',
    data() {
            return {
                showPassword: false,
                loginInfo: {
                    email: "",
                    password: ""
                    }
                }
        },
    methods: {
        async loginUser() {
            let user = await this.$store.dispatch('loginUser', this.loginInfo);
            if  (user.error) {
                alert(user.error);
            } else {
                this.$router.push({ name: 'homepage'});
            }
            }
        }
    }
</script>

<style scoped>
 #loginPage {
    display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
 }
 .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
 }
</style>