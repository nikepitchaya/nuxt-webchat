<template>
    <modal :name="makeid" :adaptive="true" :height="height" :width="width" :scrollable="true"
      @closed="$emit('update', false)">
      <div class="bg-white rounded-md max-h-full overflow-y-auto" :class="{ 'overflow-y-scroll': scroll }">
        <slot />
      </div>
    </modal>
  </template>
  
  <script>
  export default {
    inheritAttrs: false,
    model: {
      event: 'update',
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      height: {
        type: String,
        default: 'auto',
      },
      width: {
        type: Number,
        default: 600,
      },
      scroll: {
        type: Boolean,
        default: false,
      },
      padding: {
        type: String,
        default: '6',
      },
    },
    watch: {
      value(v) {
        if (v) this.$modal.show(this.makeid)
        else this.$modal.hide(this.makeid)
      },
    },
    data() {
      return {}
    },
    computed: {
      makeid() {
        const length = 20
        var result = ''
        var characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var charactersLength = characters.length
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          )
        }
        return result
      },
    },
    mounted() {
    },
    methods: {},
  }
  </script>
  