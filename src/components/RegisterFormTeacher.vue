<template>
    <div class="text-center" id="registerTeacherPage">
        <form class="form-register">
            <h1 class="mb-5">Register Teacher</h1>
            <input type="text" class="form-control" placeholder="Email" id="emailInput" v-model="loginInfo.email">
            <div class="input-group">
                <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Password" id="passwordInput" v-model="loginInfo.password">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword"><i :class='showPassword ? "fas fa-eye-slash" : "fas fa-eye"'></i></button>
                </div>
            </div>
            <button type="submit" class="btn btn-primary mt-5" @click="registerUser">Submit</button>
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
            
        },
        validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
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
    margin: auto;
 }
</style>