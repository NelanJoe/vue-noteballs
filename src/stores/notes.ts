import { computed, ref } from "vue";
import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  type CollectionReference,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  type Query,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Note } from "../types";
import { useAuthStore } from "./auth";

export const useNotesStore = defineStore("notes", () => {
  let notesCollectionRef: CollectionReference;
  let notesCollectionQuery: Query;

  const notes = ref<Note[]>([]);
  const notesLoaded = ref(false);

  const authStore = useAuthStore();

  let getNotesSnapshot: (() => void) | null = null;

  const totalNotesCount = computed(() => notes.value.length);

  const totalCharactersCount = computed(() =>
    notes.value.reduce((acc, note) => acc + note.content.length, 0)
  );

  const getNoteContent = computed(
    () => (noteId: string) =>
      notes.value.find((note) => note.id === noteId)?.content
  );

  const init = () => {
    if (authStore.user !== null) {
      notesCollectionRef = collection(db, "users", authStore.user.id, "notes");
      notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
      getNotes();
    }
  };

  const getNotes = async () => {
    notesLoaded.value = false;

    getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
      let notesData = [] as Note[];

      querySnapshot.docs.map((doc) => {
        notesData.push({
          id: doc.id,
          content: doc.data().content,
          date: doc.data().date,
        });
      });

      notes.value = notesData;
      notesLoaded.value = true;
    });
  };

  const clearNotes = () => {
    notes.value = [];
    if (getNotesSnapshot) {
      getNotesSnapshot(); // unsubscribes from any active listeners
    }
  };

  const addNote = async (content: string) => {
    const currentDate = new Date().getTime().toString();

    await addDoc(notesCollectionRef, {
      content,
      date: currentDate,
    });
  };

  const deleteNote = async (noteId: string) => {
    await deleteDoc(doc(notesCollectionRef, noteId));
  };

  const updateNote = async ({
    noteId,
    content,
  }: {
    noteId: string;
    content: string;
  }) => {
    const date = new Date().getTime().toString();

    await updateDoc(doc(notesCollectionRef, noteId), {
      content,
      date,
    });
  };

  return {
    notes,
    notesLoaded,
    getNoteContent,
    totalNotesCount,
    totalCharactersCount,
    init,
    getNotes,
    clearNotes,
    addNote,
    deleteNote,
    updateNote,
  };
});
