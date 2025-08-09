<script setup lang="ts">
import { shallowRef, useTemplateRef } from "vue";
import { RouterLink } from "vue-router";
import { onClickOutside } from "@vueuse/core";

const showNavbarMenu = shallowRef(false);
const navbarMenuRef = useTemplateRef("navbarMenuRef");

onClickOutside(navbarMenuRef, () => {
  showNavbarMenu.value = false;
});
</script>

<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 has-text-primary-100">Noteballs</div>
        <a
          @click="showNavbarMenu = !showNavbarMenu"
          :class="{ 'is-active': showNavbarMenu }"
          role="button"
          class="navbar-burger has-text-primary-100"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          ref="navbarMenuRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showNavbarMenu }"
      >
        <div class="navbar-end">
          <div class="navbar-item">
            <RouterLink to="/" class="navbar-item has-text-primary-100">
              Home
            </RouterLink>
            <RouterLink to="/stats" class="navbar-item has-text-primary-100">
              Stats
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@media only screen and (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
