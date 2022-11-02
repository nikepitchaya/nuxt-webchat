<template>
    <div class="w-full flex flex-col items-center">
        <h1 class="text-4xl text-primary font-bold">Create Room</h1>
        <div @click="privacy = !privacy" class="flex items-center mt-2 space-x-2 cursor-pointer">
            <p class="text-xl text-primary ">{{privacy ?'Privacy' : 'Public'}}</p>
            <base-icon v-show="privacy" icon="key" viewBox="0 0 24 24" color="#698474" />
            <base-icon v-show="!privacy" icon="earth" viewBox="0 0 24 24" color="#698474" />
        </div>
        <form @submit.prevent="createRoom"
            class="w-96 h-full flex flex-col items-center justify-center p-2 mt-4 bg-primary rounded-md">
            <div class="flex flex-col mb-4 space-y-2">
                <label class="text-quaternary font-bold text-lg">Room name (for show up)</label>
                <input placeholder="Enter room name" type="text" v-model="room_name" class="p-2 rounded-md" />
            </div>
            <div class="flex flex-col mb-4 space-y-2">
                <label class="text-quaternary font-bold text-lg">Room id (for search)</label>
                <input placeholder="Enter room id" type="text" v-model="room_id" class="p-2 rounded-md" />
            </div>
            <div v-if="privacy" class="flex flex-col mb-4 space-y-2">
                <label class="text-quaternary font-bold text-lg">Room Password (privacy)</label>
                <input placeholder="Enter room id" type="text" v-model="room_password" class="p-2 rounded-md" />
            </div>
            <button type="submit" class="py-0.5 px-3 bg-quaternary text-primary font-bold rounded-md">Create
                room
            </button>
        </form>
        <p @click="$router.go(-1)" class="mt-4 cursor-pointer underline text-primary">Back</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            room_name: '',
            room_id: '',
            room_password: '',
            privacy: false,
            me: {},
        }
    },
    mounted() {
        this.me = this.$store.getters['me/getUser']
        console.log(this.me)
    },
    methods: {
        async createRoom() {
            const self = this
            let params = {
                room_name: self.room_name,
                room_id: self.room_id,
                author_id: self.me._id,
                author_name: self.me.playername,
                room_password: self.room_password,
                create_at: new Date()
            }
            // console.log(params)
            await self.$api.userCreateRoom(params)
                .then((response) => {
                    console.log(response.data)
                    self.$router.push('/')
                }).catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style>

</style>