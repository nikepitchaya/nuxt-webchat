<template>
    <div class="w-full flex flex-col items-center">
        <h1 class="text-3xl text-primary font-bold">Welcome to the Room : {{room.room_name}}</h1>
        <p class="text-xl text-primary font-bold">this room created by : {{room.author_name}}</p>
        <div class="mt-4 w-96 p-2 h-96 flex flex-col overflow-auto bg-senary rounded-md">
            <div v-for="(item,i) in chat" :key="`chat-${i}`" class="w-full mt-1">
                <div v-if="guest">
                    <div v-if="item.name != guest" class="w-full flex justify-start">
                        <div class="bg-primary px-2 rounded-md">
                            <p class="text-quaternary font-bold">{{item.name}} : {{item.message}}</p>
                            <p class="text-quaternary">time : {{item.time}}</p>
                        </div>
                    </div>
                    <div v-else class="w-full flex justify-end">
                        <div class="bg-quaternary px-2 rounded-md">
                            <p class="text-primary font-bold">Me : {{item.message}}</p>
                            <p class="text-primary">time : {{item.time}}</p>
                        </div>
                    </div>
                </div>
                <div v-else-if="!guest">
                    <div v-if="item.name != me.playername" class="w-full flex justify-start">
                        <div class="bg-primary px-2 rounded-md">
                            <p class="text-quaternary font-bold">{{item.name}} : {{item.message}}</p>
                            <p class="text-quaternary">time : {{item.time}}</p>
                        </div>
                    </div>
                    <div v-else class="w-full flex justify-end">
                        <div class="bg-quaternary px-2 rounded-md">
                            <p class="text-primary font-bold">Me : {{item.message}}</p>
                            <p class="text-primary">time : {{item.time}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4 w-full flex justify-center space-x-1">
            <input placeholder="Message" class="pr-4 pl-2 border-2 border-primary rounded-sm" v-model="message"
                @keypress.enter="sendMessage" />
            <button @click="sendMessage" class="px-4 pt-0.5 bg-primary text-quaternary flex items-center space-x-1">
                <p>Send</p>
                <base-icon icon="paper-plane" viewBox="0 0 24 24" color="#E5E4CC" size="16" />
            </button>
        </div>
        <button @click="$router.go(-1)" class="mt-4">Back</button>
    </div>
</template>

<script>
import socket from '../../plugins/socket.io';
export default {
    asyncData({ params }) {
        return {
            id: params.id
        }
    },
    data() {
        return {
            me: {},
            room: {},
            chat: [],
            message: '',
            guest: '',
        }
    },
    async mounted() {
        this.me = await this.$store.getters['me/getUser']
        if (!this.me) await this.generateGuestName();
        await this.fetch();
        await this.joinRoom();
        this.lodingMessage(); this.receiveMessage();
    },
    methods: {
        joinRoom() {
            socket.emit('join_room', this.$route.params.id)
        },
        lodingMessage() {
            socket.on('loading_message', (res) => {
                this.chat = res
            })
        },
        generateGuestName() {
            this.guest = Math.random().toString(36).substr(2, 9);
        },
        receiveMessage() {
            socket.on('receive_message', (res) => {
                this.chat.push(res)
            })
        },
        async fetch() {
            const self = this
            let id = this.$route.params.id
            await self.$api.userGetOneRoom(id)
                .then((res) => {
                    self.room = res.data
                }).catch((err) => {
                    console.log(err)
                })
        },
        async sendMessage() {
            let name = ''
            if (this.me) name = this.me.playername
            if (this.guest !== '') name = this.guest
            if (this.message !== '') {
                let chat = {
                    message: this.message,
                    name: name,
                    room: this.$route.params.id,
                    time:
                        new Date(Date.now()).getHours() +
                        ":" +
                        new Date(Date.now()).getMinutes(),
                }
                await socket.emit('send_message', chat)
                this.message = ''
            }
        },
    }
}
</script>

<style>

</style>