<template>
    <div>
        <div v-for="user in users" :key="user.id">
            {{user.name}}
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>