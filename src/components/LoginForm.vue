<template>
    <div class='container'>
        <h1 class="text-center my-4">Login</h1>
        <form action="" method=''>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" name="email" id="email" placeholder="Please enter your email...">
            </div>
            <div class="form-group col-md-4 mx-auto my-3">
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password" id="password" placeholder="Please enter your password...">
            </div>
            <div class="form-group col-md-4 mx-auto text-center mt-4">
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

}
<style scoped>
</style>