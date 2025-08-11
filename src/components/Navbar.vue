<script setup lang="ts">
import { shallowRef, useTemplateRef } from "vue";
import { RouterLink } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import { useAuthStore } from "../stores/auth";

const showNavbarMenu = shallowRef(false);
const navbarMenuRef = useTemplateRef("navbarMenuRef");

onClickOutside(navbarMenuRef, () => {
  showNavbarMenu.value = false;
});

const authStore = useAuthStore();
</script>

<template>
  <nav
    class="navbar is-link is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-5">Noteballs</div>
        <a
          @click="showNavbarMenu = !showNavbarMenu"
          class="navbar-burger has-text-white"
          :class="{ 'is-active': showNavbarMenu }"
          role="button"
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
        <div class="navbar-start">
          <RouterLink to="/" class="navbar-item is-size-6"> Notes </RouterLink>
          <RouterLink to="/stats" class="navbar-item is-size-6">
            Stats
          </RouterLink>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <button
              v-if="authStore.user?.id"
              class="button is-small is-danger has-text-white"
              @click="authStore.logoutUser"
            >
              Logout {{ authStore.user.email }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
