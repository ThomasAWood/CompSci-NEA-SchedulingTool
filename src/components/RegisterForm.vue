<template>
    <div class='container'>
        <h1 class="text-center my-4">Register</h1>
        <form action="" method=''>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="username">Username</label>
                <input type="username" class="form-control" name="username" id="username" placeholder="Username" v-model="input.username">
            </div>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" name="email" id="email" placeholder="Email" v-model="input.email">
            </div>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password" id="password" placeholder="Password" v-model="input.password">
            </div>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="passwordRepeat">Repeat Password</label>
                <input type="passwordRepeat" class="form-control" name="passwordRepeat" id="passwordRepeat" placeholder="Repeat Password" v-model="input.passwordRepeat">
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
        }/*,
        email(value){
            this.email = value;
            this.validateEmail(value);
        },
        password(value){
            this.username = value;
            this.validatePassword(value);
        },
        passwordRepeat(value){
            this.passwordRepeat = value;
            this.validateRepeatPassword(value);
        }*/
    },
    methods: {
        validateUsername(value){
            let usernameRegex = /^[a-zA-Z0-9]+$/;
            this.msg['username'] = ''
            if ((value.length < 6) || (value.length > 20)) {
                this.msg['username'] = this.msg['username'] + 'Must be between 6 and 20 characters. '
            } else if (!(value.match(usernameRegex))){
                this.msg['username'] = this.msg['username'] + 'Can only contain letters and numers'
            } else {
                this.msg['username'] = ''
            }
        }/*,
        validateEmail(value){
            if (1==1) {console.log(value)}
        },
        validatePassword(value){
            if (1==1) {console.log(value)}
        },
        validateRepeatPassword(value){
            if (1==1) {console.log('ran')}
        }*/
    }
    }
</script>

<style scoped>
</style>