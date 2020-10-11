<template>
    <div>
        <ValidationObserver v-slot="{ invalid }" id="registerPage" class="form-register text-center">
        <form class="form-register">
            <h1 class="mb-5">Student Register</h1>
            <ValidationProvider rules="required|max:50" v-slot="{ errors }">
            <div class="input-group pt-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">First Name</span>
                </div>
                <input type="text" class="form-control" placeholder="First Name" id="fnameInput" v-model="registerInfo.fname">
            </div>
            <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider rules="required|max:50" v-slot="{ errors }">
            <div class="input-group pt-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Last Name</span>
                </div>
                <input type="text" class="form-control" placeholder="Last Name" id="lnameInput" v-model="registerInfo.lname">
            </div>
            <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider rules="required|email|max:50" v-slot="{ errors }">
            <div class="input-group pt-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Email</span>
                </div>
                <input type="text" class="form-control" placeholder="Email" id="emailInput" v-model="registerInfo.email">
            </div>
            <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider rules="required|min:8|max:50|password" v-slot="{ errors }">
            <div class="input-group pt-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Password</span>
                </div>
                <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Password" id="passwordInput" v-model="registerInfo.password">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword"><i :class='showPassword ? "fas fa-eye-slash" : "fas fa-eye"'></i></button>
                </div>
            </div>
            <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <div class="mt-5">
                <button class="btn btn-primary" :disabled="invalid" @click="registerUser">Submit</button>
            </div>
        </form>
        </ValidationObserver>
    </div>
</template>

<script>
import { extend, localize, ValidationObserver, ValidationProvider } from "vee-validate";
import { required, email, min, max } from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en.json";

extend("required", required);
extend("email", email);
extend("min", min);
extend("max", max);
extend('password', password => {
    let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
    return password.match(re);
});

localize({
    en: {
        messages: en.messages,
        names: {
            fnameInput: "First Name",
            lnameInput: "Last Name",
            emailInput: "E-mail Address",
            passwordInput: "Password"
        },
        fields: {
            fnameInput: {
                required: "{_field_} is required",
                max: "{_field_} must be less than 50 characters long"
                },
            lnameInput: {
                required: "{_field_} is required",
                max: "{_field_} must be less than 50 characters long"
            },
            emailInput: {
                required: "{_field_} is required",
                email: "{_field_} is invalid",
                max: "{_field_} must be less than 50 characters long"
            },
            passwordInput: {
                required: "{_field_} is required",
                min: "{_field_} must be at least 8 characters long",
                max: "{_field_} must be less than 50 characters long",
                password: "{_field_} invalid. Must contain an upper case, lower case, number and symbol."

            }
            }
        }
    });


export default {
    name: 'RegisterFormStudent',
    data() {
            return {
                showPassword: false,
                registerInfo: {
                    fname: "",
                    lname: "",
                    email: "",
                    password: "",
                    isTeacher: 0,
                    hourly: null
                    }
                }
        },
    methods: {
        async registerUser() {
            let user = await this.$store.dispatch('registerUser', this.registerInfo);
            if (user.error) {
                alert(user.error);
            } else {
                alert("Welcome", user.fname);
                console.log("Student Registered!");
                this.$router.push({ name: 'homepage'});

            }
    }
    },
    components: {
        ValidationObserver,
        ValidationProvider
    }
}
</script>

<style scoped>
 #registerPage {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
 }

 .form-register {
    width: 100%;
    max-width: 430px;
    padding: 15px;
    margin: auto;
 }
</style>