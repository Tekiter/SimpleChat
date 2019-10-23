<template>
  <div>
    <h1>Join Server</h1>
    <b-button :to="'/'">Back to main</b-button>
    <div class="container">
      <b-form>
        <b-form-group label="IP">
          <b-form-input v-model="serverip"></b-form-input>
        </b-form-group>
        <b-form-group label="port">
          <b-form-input v-model="serverport"></b-form-input>
        </b-form-group>

        <b-button class="btn btn-success" @click="onJoin()">Create</b-button>
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
      serverport: 54321
    };
  },

  methods: {
    onJoin() {
      this.$store.dispatch("setJoinPort", this.serverport);
      this.$store.dispatch("setJoinIP", this.serverport);
      // this.$store.commit('SET_PORT_SERVER', this.serverport)
      this.$router.push('client');
    }
  }
};
</script>