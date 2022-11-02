<template>
    <div class="w-full flex flex-col items-center">
        <h1 class="text-4xl text-primary font-bold">Register</h1>
        <form @submit="createUser"
            class="w-96 h-full flex flex-col items-center justify-center p-2 mt-4 bg-primary rounded-md">
            <div class="flex flex-col mb-4 space-y-2">
                <label class="font-bold text-lg text-quaternary">Playername (for agent)</label>
                <input placeholder="Enter ur player name" type="text" v-model="playername" class="p-2 rounded-md" />
            </div>
            <div class="flex flex-col mb-4 space-y-2">
                <label class="font-bold text-lg text-quaternary">Username (for login)</label>
                <input placeholder="Enter ur username" type="text" v-model="username" class="p-2 rounded-md" />
            </div>
            <div class="flex flex-col mb-8 space-y-2">
                <label class="font-bold text-lg text-quaternary">Password</label>
                <input placeholder="Enter ur password" type="text" v-model="password" class="p-2 rounded-md" />
            </div>
            <div class="flex flex-col mb-8 space-y-2 ">
                <label class="font-bold text-lg text-quaternary">Confirm Password</label>
                <input placeholder="Enter ur password" type="text" v-model="check_password" class="p-2 rounded-md" />
            </div>
            <button type="submit" class="py-0.5 px-3 bg-quaternary text-primary font-bold rounded-md ">Confirm</button>
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
            playername: '',
            check_password: '',
        }
    },
    methods: {
        async createUser(e) {
            e.preventDefault();
            let params = {
                playername: this.playername,
                username: this.username,
                password: this.password,
            }
            console.log(params)
            await this.$api.guestCreateUser(params)
                .then((response) => {
                    console.log(response.data)
                }).catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style>

</style>