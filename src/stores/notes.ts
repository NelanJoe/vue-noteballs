import { defineStore } from "pinia";
import type { Note } from "../types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const notesCollectionRef = collection(db, "notes");
const notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));

export const useNotesStore = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [] as Note[],
      notesLoaded: false,
    };
  },
  actions: {
    async getNotes() {
      this.notesLoaded = false;

      onSnapshot(notesCollectionQuery, (querySnapshot) => {
        const notes: Note[] = [];

        querySnapshot.docs.map((doc) => {
          notes.push({
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          });
        });

        this.notes = notes;
        this.notesLoaded = true;
      });
    },
    async addNote(content: string) {
      const currentDate = new Date().getTime().toString();

      await addDoc(notesCollectionRef, {
        content,
        date: currentDate,
      });
    },
    async deleteNote(noteId: string) {
      await deleteDoc(doc(notesCollectionRef, noteId));
    },
    async updateNote({ noteId, content }: { noteId: string; content: string }) {
      if (!noteId) return;

      const noteRef = doc(notesCollectionRef, noteId);
      const currentDate = new Date().getTime().toString();

      if (!noteRef) return;

      await updateDoc(noteRef, {
        content,
        date: currentDate,
      });
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (noteId: string) =>
        state.notes.find((note) => note.id === noteId)?.content;
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharactersCount: (state) => {
      return state.notes.reduce((acc, note) => acc + note.content.length, 0);
    },
  },
});
