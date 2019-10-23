<template>
  <div>
    <h1>Join Server</h1>
    <b-button :to="'/'">Back to main</b-button>
    <div class="container">
      <b-form>
        <b-form-group label="IP">
          <b-form-input v-model="serverip"></b-form-input>
        </b-form-group>
        <b-form-group label="Port">
          <b-form-input v-model="serverport"></b-form-input>
        </b-form-group>
        <b-form-group label="Nickname">
          <b-form-input v-model="nickname"></b-form-input>
        </b-form-group>

        <b-button class="btn btn-success" @click="onJoin()">Join</b-button>
      </b-form>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  data() {
    return {
      serverip: '127.0.0.1',
      serverport: 54321,
      nickname: "guest"
    };
  },

  methods: {
    onJoin() {
      this.$store.dispatch("setJoinPort", this.serverport);
      this.$store.dispatch("setJoinIP", this.serverip);
      this.$store.dispatch("setJoinNickname", this.nickname);
      
      this.$router.push('client');
    }
  }
};
</script>