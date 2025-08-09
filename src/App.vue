<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <main class="container is-max-desktop px-2 py-4">
    <RouterView />
  </main>
</template>

<style>
@import url("bulma/css/bulma.min.css");
</style>
