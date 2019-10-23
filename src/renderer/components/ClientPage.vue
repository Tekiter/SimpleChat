<template>
  <div>
    <b-button :to="'/'">Back to main</b-button>
    <div v-for="(chat, idx) of lists" :key="idx">
      <div>{{chat}}</div>
    </div>

    <input v-model="m" autocomplete="off" />
    <button @click="sending()">Send</button>
  </div>
</template>
<style scoped>
</style>
<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: null,
      m: "",
      lists: []
    };
  },
  mounted() {
    // let addr = this.$store.state.client.ip + ":" + this.$store.state.client.port;
    // console.log(addr)
    this.socket = io("127.0.0.1:54321");
    this.socket.emit("join", { nickname: "hi" });
    this.socket.on("chat", msg => {
      this.lists.push({ chat: msg, idx: 1 });
    });
  },
  methods: {
    sending() {
      this.socket.emit("chat", this.m);
      this.m = "";
      this.recieve();
    },
    recieve() {}
  }
};
</script>