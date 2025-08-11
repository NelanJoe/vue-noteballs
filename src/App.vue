<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();

onMounted(() => {
  authStore.init();
});
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style>
@import url("bulma/css/bulma.min.css");
</style>
