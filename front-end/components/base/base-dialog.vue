<template>
    <base-modal v-model="isShow">
        <div class="p-8">
            <div class="text-xl mb-4" :class="{ 'text-center': type == 'remove', 'text-center': center }">
                {{ title }}
            </div>
            <div class="font-light text-gray-500 mb-4 whitespace-pre-line"
                :class="{ 'text-center': type == 'remove', 'text-center': center }">
                {{ description }}
            </div>
            <div class="mt-10 flex justify-end space-x-4" :class="{
              'justify-center': type == 'remove',
              'justify-center': center,
            }">
                <button class="uppercase h-10 w-32" color="confirm" @click="onClick">{{ confirmButton
                }}</button>
                <button class="uppercase h-10 w-32" color="cancle" @click="isShow = false">ยกเลิก
                </button>
            </div>
        </div>
    </base-modal>
</template>
  
<script>
export default {
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: 'confirm',
            validate: function (t) {
                return ['confirm', 'remove'].includes(t)
            },
        },
        center: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isShow: false,
            title: '',
            description: '',
            callback: undefined,
        }
    },
    computed: {
        confirmButton() {
            if (this.type == 'remove') return 'ลบ'
            else return 'ตกลง'
        },
        confirmButtonColor() {
            if (this.type == 'remove') return 'border-red'
            else return 'primary'
        },
    },
    mounted() { },
    methods: {
        show(title, description, callback) {
            this.title = title
            this.description = description
            this.callback = callback
            this.isShow = true
        },
        onClick() {
            this.isShow = false
            this.callback()
        },
    },
}
</script>
  