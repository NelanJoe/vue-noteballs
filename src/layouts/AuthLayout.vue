<script setup lang="ts"></script>

<template>
  <div class="auth-layout px-4">
    <slot />
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
