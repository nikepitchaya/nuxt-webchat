<template>
    <div class="w-full flex flex-col items-center">
        <h1 class="text-4xl text-primary font-bold">Login</h1>
        <form @submit="login" class="w-96 h-96 flex flex-col items-center justify-center mt-4 bg-primary rounded-md">
            <div class="flex flex-col mb-4 space-y-2">
                <label class="font-bold text-lg text-quaternary">Username</label>
                <input placeholder="Enter ur username" type="text" v-model="username" class="p-2 rounded-md" />
            </div>
            <div class="flex flex-col space-y-2">
                <label class="font-bold text-lg text-quaternary">Password</label>
                <input placeholder="Enter ur password" type="password" v-model="password" class="p-2 rounded-md" />
            </div>
            <button type="submit" class="my-8 py-0.5 px-3 bg-quaternary text-primary font-bold rounded-md">Confirm</button>
            <div class="w-full flex justify-between px-6">
                <p @click="$router.push('/register')" class="cursor-pointer underline text-quaternary">Register</p>
                <p @click="$router.push('/forget')" class="cursor-pointer underline text-quaternary">Forget Password</p>
            </div>
        </form>

        <p @click="$router.push('/')" class="mt-4 cursor-pointer underline text-primary">Back to Home</p>
    </div>
</template>

<script>
export default {
    layout:'blank',
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        async login(e) {
            e.preventDefault();
            let params = {
                username: this.username,
                password: this.password,
            }
            console.log(params)
            let res = await this.$store.dispatch('me/userLogin', params)
            if (res instanceof Error) {
                console.log(res)
                return
            }
            else {
                this.$router.push('/')
            }
        }
    }
}
</script>

<style>

</style>