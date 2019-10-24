<template>
  <b-list-group>
    <b-list-group-item v-for="(user, index) in users" :key="index" >
        {{ user.nickname }}
    </b-list-group-item>
  </b-list-group>
</template>
<style scoped>
</style>
<script>
export default {
  props: ["users"]
};
</script>