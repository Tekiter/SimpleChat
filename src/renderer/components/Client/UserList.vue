<template>
  <b-list-group>
    <b-list-group-item
      v-for="(user, index) in users"
      :key="index"
      href="#"
      @click="onUserClick(user)"
    >{{ user.nickname }}</b-list-group-item>
  </b-list-group>
</template>
<style scoped>
</style>
<script>
export default {
  props: ["users"],
  methods: {
    onUserClick(user) {
      this.$emit('select', user)
    }
  }
};
</script>