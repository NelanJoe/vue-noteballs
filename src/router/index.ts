import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import ViewNotes from "../views/ViewNotes.vue";
import ViewEditNote from "../views/ViewEditNote.vue";
import ViewStats from "../views/ViewStats.vue";
import ViewAuth from "../views/ViewAuth.vue";

const routes = [
  {
    path: "/",
    name: "notes",
    component: ViewNotes,
    meta: { requiresAuth: true },
  },
  {
    path: "/editNote/:id",
    name: "editNote",
    component: ViewEditNote,
    meta: { requiresAuth: true },
  },
  {
    path: "/stats",
    name: "stats",
    component: ViewStats,
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    name: "auth",
    component: ViewAuth,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.user) {
    next({ name: "auth" });
  } else {
    next();
  }
});

export default router;
