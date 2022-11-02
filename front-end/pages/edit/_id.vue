<template>
    <div class="w-full flex flex-col items-center">
        <h1 class="text-4xl font-bold">Update Room</h1>
        <form @submit.prevent="updateRoom"
            class="w-96 h-full flex flex-col items-center justify-center p-2 mt-4 bg-blue-300 rounded-md">
            <div class="flex flex-col mb-4 space-y-2">
                <label class="font-bold text-lg">Room name (for show up)</label>
                <input placeholder="Enter room name" type="text" v-model="room_name" class="p-2 rounded-md" />
            </div>
            <div class="flex flex-col mb-4 space-y-2">
                <label class="font-bold text-lg">Room id (for search)</label>
                <input placeholder="Enter room id" type="text" v-model="room_id" class="p-2 rounded-md" />
            </div>
            <button type="submit" class="py-0.5 px-3 bg-red-300 text-white font-bold rounded-md">Update room</button>
        </form>
        <p @click="$router.push('/')" class="cursor-pointer underline">กลับหน้าหลัก</p>
    </div>
</template>

<script>
export default {
    asyncData({ params }) {
        return {
            id: params.id
        }
    },
    data() {
        return {
            author_id: '',
            room_name: '',
            room_id: '',
            _id: '',
            me: {},
        }
    },
    async mounted() {
        this.me = this.$store.getters['me/getUser']
        this.fetch()
    },
    methods: {
        async fetch() {
            const self = this
            let id = this.me._id
            let params = {
                room_id: this.id
            }
            await self.$api.userGetMyRoom(id, params)
                .then((res) => {
                    console.log(res.data)
                    let entities = res.data[0]
                    self.room_name = entities.room_name
                    self.room_id = entities.room_id
                    self._id = entities._id
                    self.author_id = entities.author_id
                }
                ).catch((err) => {
                    console.log(err)
                })
        },
        async updateRoom() {
            const self = this
            let params = {
                author_id: self.author_id,
                room_name: self.room_name,
                room_id: self.room_id,
                _id: self._id
            }
            console.log(params)
            await self.$api.userUpdateRoom(params)
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