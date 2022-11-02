<template>
  <div class="w-full h-full flex flex-col items-center">
    <h1 class="text-4xl text-primary font-bold">Welcome in our website</h1>
    <div v-if="check_logined" class="mt-4 text-center">
      <p class="text-xl text-primary font-bold">Hello : {{me.playername}}</p>
      <div class="flex space-x-2 mt-2">
        <button class="px-2 py-0.5 bg-primary text-quaternary rounded-md" @click="$router.push('/my-room')">My
          room</button>
        <button class="px-2 py-0.5 bg-primary text-quaternary rounded-md" @click="$router.push('/create-room')">Creat my
          room</button>
      </div>
    </div>
    <div v-else class="mt-4 text-center">
      <p class="text-xl text-primary font-bold">Hello Guest</p>
      <p class="text-base text-primary font-light">You can join other room to talk or greeting anothoer people that you
        don't known</p>
      <p class="text-base text-primary font-light">If you want to create your room you need to login if you be member
        our website</p>
      <p class="text-base text-primary font-light">But you not you can register here <span
          @click="$router.push('/register')" class="underline text-primary font-bold cursor-pointer">RIGESTER</span></p>
    </div>

    <h1 class="mt-12 text-xl text-primary font-bold">All Room</h1>
    <div class="w-1/2 flex flex-col">
      <div v-for="(item,i) in entities" :key="`entities-${i}`" @click="handleClick(item.room_password,item.room_id)"
        class="border-2 mt-2 border-black bg-white rounded-lg p-4 flex flex-col justify-between leading-normal cursor-pointer hover:bg-secondary"
        v-on:mouseout="hover = `hover-${i}`" v-on:mouseover="hover = `hover+${i}`"
        :class="hover==`hover+${i}` ?'text-quaternary' : 'text-primary'">
        <div class="mb-8">
          <div class="text-sm flex items-center font-bold space-x-2">
            <base-icon v-show="item.room_password" icon="lock" viewBox="0 0 24 24" color="#698474" size="14" />
            <base-icon v-show="!item.room_password" icon="lock-open" viewBox="0 0 24 24" color="#698474" size="16" />
            <p>Room id : {{item.room_id}}</p>
          </div>
          <div class=" font-bold text-xl mb-2">Room name : {{item.room_name}}</div>
          <p class=" text-base">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
            modi, sapiente aliquid magni harum qui molestiae, numquam hic necessitatibus explicabo aliquam
            commodi eaque, aut soluta fuga odio enim sit ut.</p>
        </div>
        <div class="flex items-center">
          <div class="text-sm">
            <p class=" leading-none font-bold">{{item.author_name}}</p>
            <p class=" font-bold">{{item.create_at}}</p>
          </div>
        </div>
      </div>
    </div>
    <roomAccess ref="alertPopup" />
  </div>
</template>

<script>
import roomAccess from '../components/dialog/room-access.vue';
export default {
  components: { roomAccess },
  data() {
    return {
      me: {},
      entities: [],
      hover: '',
    }
  },
  computed: {
    check_logined() {
      let check = this.$store.getters["me/getToken"];
      console.log(check)
      return check ? true : false;
    },
  },
  async mounted() {
    if (this.check_logined) {
      this.me = await this.$store.getters['me/getUser']
    }
    this.fetch()
  },
  methods: {
    async fetch() {
      const self = this
      self.$api.userGetAllRoom()
        .then((res) => {
          self.entities = res.data
        }).catch((err) => {
          console.log(err)
        })
    },
    handleClick(password, room_id) {
      if (password != undefined) {
        this.$refs.alertPopup.show(password, room_id)
      }
      else this.$router.push(`/chat/${room_id}`)
    }
  }
}
</script>

<style>

</style>