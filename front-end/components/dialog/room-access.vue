<template>
    <base-modal v-model="isShow">
        <div class="p-4 flex flex-col justify-center items-center">
            <div class="text-2xl text-primary font-medium">
                Pleas enter room password
            </div>
            <div class="font-light text-gray-500 my-4 whitespace-pre-line">
                <input type="password" placeholder="Enter room passwod"
                    class="px-2 py-1 rounded-md border-2 border-primary" v-model="password" />
                <p v-if="error" class="text-sm text-red-600 font-medium">*{{error}}</p>
            </div>
            <div class="flex space-x-4">
                <button class="uppercase h-8 w-32 bg-primary text-quaternary rounded-md"
                    @click="roomAccess">Confirm</button>
                <button class="uppercase h-8 w-32 bg-primary text-quaternary rounded-md"
                    @click="cancelAccess">Cancel</button>
            </div>
        </div>
    </base-modal>
</template>
  
<script>
export default {
    inheritAttrs: false,
    props: {
        center: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isShow: false,
            password: '',
            room_id: '',
            error: '',
            check_password: '',
        }
    },
    mounted() { },
    methods: {
        show(password, room_id) {
            this.check_password = password
            this.room_id = room_id
            this.isShow = true
        },
        roomAccess() {
            if (!this.password) {
                this.error = 'Pleas enter room password'
                return
            }
            else if (this.password != this.check_password) {
                this.error = 'Password not correct'
                return
            }
            else {
                this.isShow = false;
                this.$router.push(`/chat/${this.room_id}`)
            }
        },
        cancelAccess() {
            this.password = ''
            this.error = ''
            this.isShow = false
        }
    },
}
</script>
  