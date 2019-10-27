<template>
  <div class="main-screen">
    <div class="d-flex flex-column">
      <div>
        <b-button :to="'/'">Back to main</b-button>
      </div>
      <div class="flex-grow-1" style="height: 0px">
        <div class="d-flex flex-row">
          <div class="sidebar">
            <user-list :users="users"></user-list>
          </div>
          <div class="flex-grow-1 p-3">
            <div v-for="(chatdata, idx) of lists" :key="idx">
              <div>
                <p>{{ chatdata.chat.nickname }} : {{ chatdata.chat.data }} </p>
              </div>
            </div>
            <div class="input-group ">

              <input v-model="m" autocomplete="off" class="form-control"/>
              <div class="input-group-append">
                <button @click="sending()" class="btn  btn-outline-secondary">Send</button>
              </div>
              
            </div>
          </div>
        </div>

        

      </div>
      <div></div>
    </div>
  </div>
</template>
<style scoped>
.main-screen > div {
  min-height: 100vh;
}

.sidebar {
  width: 18em;
}
</style>
<script>
import io from "socket.io-client";
import UserList from "./Client/UserList.vue";

export default {
  components: {
    UserList
  },
  data() {
    return {
      socket: null,
      m: "",
      lists: [],
      users: []
    };
  },
  mounted() {
    let addr =
      this.$store.state.client.ip + ":" + this.$store.state.client.port;
    console.log(addr);
    // this.socket = io("127.0.0.1:54321");
    this.socket = io(addr);

    this.socket.on("connect_error", err => {
      this.lists.push("COULD NOT CONNECT");
    });

    this.socket.on("chat", msg => {
      this.lists.push({ chat: msg, idx: 1 });
    });
    this.socket.on("userlist", users => {
      this.users = users;
    });
    this.socket.on("joined", user => {
      this.users.push(user);
    });

    this.socket.emit("join", { nickname: this.$store.state.client.nickname });
    this.socket.emit("userlist", {});
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