import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import type { User } from "../types";
import { useNotesStore } from "./notes";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  const user = ref<User | null>(null);

  const notesStore = useNotesStore();

  const init = async () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        user.value = {
          id: currentUser.uid,
          email: currentUser.email,
        };
        notesStore.init();
        router.push({ name: "notes" });
      } else {
        user.value = null;
        notesStore.clearNotes();
        router.push({ name: "auth", replace: true });
      }
    });
  };

  const registerUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
    } catch (error) {
      console.error(error);
    }
  };

  const loginUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
    } catch (error) {
      console.error(error);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    init,
    registerUser,
    loginUser,
    logoutUser,
  };
});
