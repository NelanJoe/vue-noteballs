<script setup lang="ts">
import { onMounted, ref } from "vue";
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

onMounted(() => {
  notesStore.getNotes();
});
</script>

<template>
  <div class="notes">
    <AddEditNote v-model="newNote" :placeholder="'Add a new note'">
      <template #buttons>
        <button @click="addNewNote" class="button is-link">Add New Note</button>
      </template>
    </AddEditNote>

    <progress
      v-if="!notesStore.notesLoaded"
      class="progress is-small is-primary"
      max="100"
    />
    <template v-else>
      <NoteItem v-for="note in notes" :key="note.id" :note="note" />
      <div v-if="!notesStore.notes.length">
        <p
          class="has-text-centered has-text-grey-light is-family-monospace py-6"
        >
          No notes here yet ...
        </p>
      </div>
    </template>
  </div>
</template>
