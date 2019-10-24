<template>
  <div>
    <b-button @click="$router.push('/')">Back to main</b-button>
    <h2>Server</h2>
    <b-button @click="chats.push(1)">gogo</b-button>
    <LogView :logdata="logs"></LogView>
  </div>
</template>
<style scoped>
</style>
<script>
import LogView from "./ServerManage/LogView";

export default {
  components: {
    LogView
  },
  data() {
    return {
      logs: []
    };
  },
  methods: {
    onServerLog(e, logmsg) {
      this.logs.push(logmsg);
    }
  },
  mounted() {
    this.$electron.ipcRenderer.on("ServerLog", this.onServerLog);

    this.$electron.ipcRenderer.send("ServerCreate", {
      port: this.$store.state.server.port
    });
  }
};
</script>