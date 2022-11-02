<template>
    <div class="w-full h-full flex flex-col items-center">
        <h1 class="text-4xl text-primary font-bold">My Room I was created</h1>
        <div class="w-1/2 flex flex-col">
            <div v-for="(item,i) in entities" :key="`entities-${i}`" class="w-full flex space-x-2">
                <div @click="$router.push(`/chat/${item.room_id}`)"
                    class="border-2 mt-2 border-black bg-white rounded-lg p-4 flex flex-col justify-between leading-normal cursor-pointer hover:bg-secondary"
                    v-on:mouseout="hover = `hover-${i}`" v-on:mouseover="hover = `hover+${i}`"
                    :class="hover==`hover+${i}` ?'text-quaternary' : 'text-primary'">
                    <div class="mb-8">
                        <p class="text-sm  flex items-center font-bold">
                            <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path
                                    d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                            </svg>
                            Room id : {{item.room_id}}
                        </p>
                        <div class=" font-bold text-xl mb-2">Room name : {{item.room_name}}</div>
                        <p class=" text-base">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
                            modi, sapiente aliquid magni harum qui molestiae, numquam hic necessitatibus explicabo
                            aliquam
                            commodi eaque, aut soluta fuga odio enim sit ut.</p>
                    </div>
                    <div class="flex items-center">
                        <div class="text-sm">
                            <p class=" leading-none font-bold">{{item.author_name}}</p>
                            <p class=" font-bold">{{item.create_at}}</p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col space-y-2 justify-center w-1/4">
                    <button @click="$router.push(`/edit/${item.room_id}`)" class="bg-primary text-quaternary px-2 border">Edit
                    </button>
                    <button @click="deleteRoom(item._id)" class="bg-quaternary text-primary px-2 border">Delete</button>
                </div>
            </div>
            <button @click="$router.go(-1)" class="mt-4 cursor-pointer underline text-primary">Back</button>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            entities: [],
            hover: '',
        }
    },
    methods: {
        async fetch() {
            const self = this
            let id = this.me._id
            await self.$api.userGetMyRoom(id)
                .then((res) => {
                    console.log(res.data)
                    self.entities = res.data
                }

                ).catch((err) => {
                    console.log(err)
                })
        },
        async deleteRoom(id) {
            const self = this
            await self.$api.userDeleteRoom(id)
                .then((res) => {
                    console.log(res.data)
                    self.fetch()
                }
                ).catch((err) => {
                    console.log(err)
                })
        }
    },
    async mounted() {
        this.me = await this.$store.getters['me/getUser']
        this.fetch()
    }
}
</script>

<style>

</style>