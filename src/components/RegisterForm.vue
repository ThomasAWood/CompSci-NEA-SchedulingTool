<template>
    <div class='container'>
        <h1 class="text-center my-4">Register</h1>
        <form action="" method=''>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="username">Username</label>
                <input type="username" class="form-control" name="username" id="username" placeholder="Username" v-model="username">
                <span class="validationMsg" v-if="msg.username">{{msg.username}}</span>
            </div>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" name="email" id="email" placeholder="Email" v-model="email">
                <span class="validationMsg" v-if="msg.email">{{msg.email}}</span>
            </div>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password" id="password" placeholder="Password" v-model="password">
                <span class="validationMsg" v-if="msg.password">{{msg.password}}</span>
            </div>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="passwordRepeat">Repeat Password</label>
                <input type="password" class="form-control" name="passwordRepeat" id="passwordRepeat" placeholder="Password" v-model="passwordRepeat">
                <span class="validationMsg" v-if="msg.repeatPassword">{{msg.repeatPassword}}</span>
            </div>
            <div class="form-group col-md-4 mx-auto text-center mt-4">
                <button type="submit" class="btn btn-primary">Register</button>
            </div>  
        </form>
    </div>
</template>

<script>
export default {
    name: 'RegisterForm',
    data() {
            return {
                    username: "",
                    email: "",
                    password: "",
                    passwordRepeat: "",
                    msg: []
                    }
        },
    watch: {
        username(value){
            this.username = value;
            this.validateUsername(value);
        },
        email(value){
            this.email = value;
            this.validateEmail(value);
        },
        password(value){
            this.password = value;
            this.validatePassword(value);
            this.validateRepeatPassword();
        },
        passwordRepeat(value){
            this.passwordRepeat = value;
            this.validateRepeatPassword();
        }
    },
    methods: {
        validateUsername(value){
            let usernameRegex = /^[a-zA-Z0-9]+$/;
            this.msg['username'] = '';
            if ((value.length < 6) || (value.length > 20)) {
                this.msg['username'] = this.msg['username'] + 'Must be between 6 and 20 characters. ';
            } else if (!(value.match(usernameRegex))){
                this.msg['username'] = this.msg['username'] + 'Can only contain letters and numers';
            } else {
                this.msg['username'] = ''
            }
        },
        validateEmail(value){
            let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (value.match(emailRegex)) {
                this.msg['email'] = '';
            } else {
                this.msg['email'] = 'Invalid Email Address';
            } 
        },
        validatePassword(value){
            this.msg['password'] = '';
            let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
            if ((value.length < 8) || (value.length > 30)) {
                this.msg['password'] = this.msg['password'] + 'Must be between 8 and 30 characters';
            } else if (!(value.match(passwordRegex))) {
                this.msg['password'] = this.msg['password'] + 'Must contain: uppercase, lowercase, number and a special character';
            } else {
                this.msg['password'] = '';
            }
        },
        validateRepeatPassword(){
            if (this.password == this.passwordRepeat) {
                this.msg['repeatPassword'] = ''
            } else {
                this.msg['repeatPassword'] = 'Passwords do not match'
            }
        }
    }
    }
</script>

<style scoped>
.validationMsg {
    color: red;
}
</style>