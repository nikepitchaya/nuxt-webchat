<template>
    <div>
        <Navbar class="mb-8"/>
        <nuxt-child />
    </div>
</template>

<script>
import Navbar from "../components/layout/navbar.vue"
export default {
    middleware: 'auth',
    layout: 'default',
    components: { Navbar },
}
</script>

<style>

</style>