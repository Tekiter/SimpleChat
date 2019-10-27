<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "simplechat"
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* body {
  font-family: "Source Sans Pro", sans-serif;
} */

:not(input):not(textarea),
:not(input):not(textarea)::after,
:not(input):not(textarea)::before {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}
input,
button,
textarea,
:focus {
  outline: none;
}
</style>
