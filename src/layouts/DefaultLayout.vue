<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
</script>

<template>
  <Navbar />
  <main class="container is-max-desktop px-2 py-5">
    <slot />
  </main>
</template>
