<template>
    <div class='register text-center'>
        <h1 class="my-5">Register</h1>
        <div></div>
        <h3 class="my-2">I am a...</h3>
        <button class="btn btn-outline-primary mx-3" @click="registerStudentRedirect">Student</button>
        <button class="btn btn-outline-primary mx-3" @click="registerTeacherRedirect">Teacher</button>

    </div>
</template>

<script>
export default {
    name: 'RegisterForm',
    methods: {
        registerStudentRedirect() {
            this.$router.push({ name: "registerFormStudent" });
        },
        registerTeacherRedirect() {
            this.$router.push({ name: "registerFormTeacher" });
        }
    }
}
</script>

<style scoped>
.register {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
 }
</style>