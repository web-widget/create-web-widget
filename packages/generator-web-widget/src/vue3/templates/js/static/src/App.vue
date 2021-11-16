<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
import { ref, inject } from "vue";

const { data, context } = inject("host");
</script>

<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div><button @click="context.unmount">unmount</button></div>
    <HelloWorld :msg="data.message" />
  </div>
</template>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
