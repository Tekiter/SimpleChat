<template>
  <div class="main-screen">
    <div class="d-flex flex-column">
      <div>
        asdf
      </div>
      <div class="flex-grow-1" style="height: 0px">
        <div>
            <b-button @click="onServer()">Server</b-button>
            <b-button @click="onClient()">Client</b-button>
        </div>
      </div>
      <div class="bg-warning">Footer</div>
    </div>
  </div>
</template>
<style scoped>
.main-screen > div {
  min-height: 100vh;
}
</style>
<script>
export default {
  name: "mainPage",
  methods: {
      onServer() {
          this.$router.push('server')
      },
      onClient() {
            this.$router.push('client')
      }
  }
};
</script>