<template>
    <div class='container'>
        <h1 class="text-center my-4">Register</h1>
        <form action="" method=''>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="username">Username</label>
                <input type="username" class="form-control" name="username" id="username" placeholder="Username" v.model="input.username">
            </div>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" name="email" id="email" placeholder="Email" v.model="input.email">
            </div>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password" id="password" placeholder="Password" v.model="input.password">
            </div>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="passwordRepeat">Repeat Password</label>
                <input type="passwordRepeat" class="form-control" name="passwordRepeat" id="passwordRepeat" placeholder="Repeat Password" v.model="input.passwordRepeat">
            </div>
            <div class="form-group col-md-4 mx-auto text-center mt-4">
                <button type="submit" class="btn btn-primary">Register</button>
            </div>  
        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginForm',
    data() {
            return {
                input: {
                    username: "",
                    email: "",
                    password: "",
                    passwordRepeat: ""

                    }
                }
        }
    }
</script>

<style scoped>
</style>