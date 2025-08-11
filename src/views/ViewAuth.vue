<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import { useAuthStore } from "../stores/auth";

const register = ref(false);

const formTitle = computed(() => (register.value ? "Register" : "Login"));

const creadentials = reactive({
  email: "",
  password: "",
});

const authStore = useAuthStore();

const onSubmit = () => {
  if (!creadentials.email || !creadentials.password) {
    alert("Please fill all fields");
    return;
  }

  if (register.value) {
    authStore.registerUser(creadentials);
  } else {
    authStore.loginUser(creadentials);
  }
};
</script>

<template>
  <AuthLayout>
    <div class="auth">
      <div class="tabs is-toggle is-toggle-rounded">
        <ul>
          <li
            :class="{ 'is-active': !register }"
            @click.prevent="register = false"
          >
            <a>Login</a>
          </li>
          <li
            :class="{ 'is-active': register }"
            @click.prevent="register = true"
          >
            <a>Register</a>
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="title">{{ formTitle }}</div>
          <div class="content">
            <form @submit.prevent="onSubmit">
              <div class="field">
                <div class="control">
                  <label for="email">Email</label>
                  <input
                    id="email"
                    class="input"
                    type="email"
                    placeholder="e.g. alexsmith@gmail.com"
                    v-model="creadentials.email"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label for="password">Password</label>
                  <input
                    id="password"
                    class="input"
                    type="password"
                    placeholder="Enter a password"
                    v-model="creadentials.password"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button class="button is-link is-fullwidth">
                    {{ formTitle }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<style scoped>
.auth {
  width: 100%;
  max-width: 800px;
}

@media only screen and (max-width: 768px) {
  .auth {
    width: 100%;
  }
}
</style>
