import { defineStore } from "pinia";
import type { Note } from "../types";

export const useNotesStore = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [
        {
          id: "1",
          content:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, inventore? Nemo aut delectus est molestiae.",
        },
        {
          id: "2",
          content:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi, inventore? Nemo aut delectus est molestiae.",
        },
      ] as Note[],
    };
  },
  actions: {
    addNote(content: string) {
      const currentDate = new Date().getTime().toString();

      const newNote = {
        id: currentDate,
        content,
      };

      return this.notes.unshift(newNote);
    },
    deleteNote(noteId: string) {
      this.notes = this.notes.filter((note) => note.id !== noteId);
    },
    updateNote({ noteId, content }: { noteId: string; content: string }) {
      const noteIndex = this.notes.findIndex((note) => note.id === noteId);
      this.notes[noteIndex].content = content;
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
