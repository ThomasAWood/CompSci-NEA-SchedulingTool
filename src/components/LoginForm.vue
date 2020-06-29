<template>
    <div class='container'>
        <h1>Login</h1>
        <form>
            <div class="form-group">
                <label for="email">Email</label><br>
                <input type="email" class="form-control" name="email" id="email" placeholder="Please enter your email...">
            </div>
            <div class="form-group">
                <label for="password">Password</label><br>
                <input type="password" class="form-control" name="password" id="password" placeholder="Please enter your password...">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
                
                
        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginForm'
}
</script>

<style scoped>
.container {
    text-align: left;
}
</style>