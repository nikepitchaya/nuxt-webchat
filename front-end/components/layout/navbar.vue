<template>
    <nav class="w-full z-50 top-0 sticky">
        <div class="w-full flex justify-between items-center bg-primary px-6 py-3">
            <div class="w-1/3 cursor-pointer" @click="$router.push('/')">
                <p class="text-2xl text-quaternary font-bold">Nuxt-Web-Chat</p>
            </div>
            <div v-show="check_logined" class="flex flex-col relative inline-block">
                <div @click="toggle=!toggle" class="flex items-center space-x-2 p-2 cursor-pointer"
                    :class="{'bg-quaternary' : toggle}">
                    <p class="text-lg font-bold" :class="toggle ? 'text-primary' : 'text-quaternary'">{{me.playername}}
                    </p>
                    <base-icon icon="user" viewBox="0 0 24 24" :color="toggle ? '#698474 ': '#E5E4CC'" size="30" />
                </div>
                <div v-show="toggle"
                    class="flex flex-col pt-2 space-y-2 bg-quaternary absolute right-0 z-10 mt-10 w-full origin-top-right ">
                    <div @click="$router.push('/my-profile')"
                        class="flex space-x-2 py-1 px-2 cursor-pointer hover:bg-secondary">
                        <base-icon icon="profile" viewBox="0 0 24 24" color="#698474" size="30" />
                        <p class=" text-lg text-primary font-bold ">{{me.username}}</p>
                    </div>
                    <div @click="logout" class="flex space-x-2 py-1 px-2 cursor-pointer hover:bg-secondary">
                        <base-icon icon="logout" viewBox="0 0 24 24" color="#698474" size="30" />
                        <p class="text-lg text-primary font-bold ">Logout</p>
                    </div>
                </div>
            </div>
            <div v-show="!check_logined" class="flex items-center">
                <p @click="$router.push('/login')" class="text-lg text-quaternary font-bold cursor-pointer">Login</p>
                <p class="text-lg text-quaternary font-bold mx-2">|</p>
                <p @click="$router.push('/register')" class="text-lg text-quaternary font-bold cursor-pointer">Resgister
                </p>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    data() {
        return {
            me: {},
            toggle: false,
        }
    },
    computed: {
        check_logined() {
            let check = this.$store.getters["me/getToken"];
            return check ? true : false;
        },
    },
    async mounted() {
        if (this.check_logined) {
            this.me = await this.$store.getters['me/getUser']
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('me/logout')
            setTimeout(async () => {
                await this.$router.push('/login')
                window.location.reload()
            }, 1000);
        },
    }
}
</script>

<style>

</style>