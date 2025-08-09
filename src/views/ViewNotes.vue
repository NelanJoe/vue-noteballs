<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useNotesStore } from "../stores/notes";
import { useWatchCharacters } from "../composables/useWatchCharacters";
import NoteItem from "../components/NoteItem.vue";
import AddEditNote from "../components/AddEditNote.vue";

const newNote = ref("");
const newNoteRef = ref<HTMLInputElement | null>(null);

const notesStore = useNotesStore();
const { notes } = storeToRefs(notesStore);

const addNewNote = () => {
  notesStore.addNote(newNote.value);

  newNote.value = "";
  newNoteRef.value?.focus();
};

useWatchCharacters(newNote);
</script>

<template>
  <div class="notes">
    <AddEditNote v-model="newNote" :placeholder="'Add a new note'">
      <template #buttons>
        <button @click="addNewNote" class="button is-link">Add New Note</button>
      </template>
    </AddEditNote>
    <NoteItem v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>
