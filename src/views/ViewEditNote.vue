<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AddEditNote from "../components/AddEditNote.vue";
import { useNotesStore } from "../stores/notes";

const route = useRoute();
const router = useRouter();

const notesStore = useNotesStore();

const noteContent = ref<string | undefined>("");
noteContent.value = notesStore.getNoteContent(String(route.params.id));

const handleSaveNote = () => {
  if (!noteContent.value) return;

  let payload = {
    noteId: String(route.params.id),
    content: noteContent.value,
  };

  notesStore.updateNote(payload);
  router.push({ name: "notes" });
};
</script>

<template>
  <div class="edit-note">
    <AddEditNote v-model="noteContent" :placeholder="'Edit a note'">
      <template #buttons>
        <button class="button is-link is-light" @click="router.back()">
          Cancel
        </button>
        <button @click="handleSaveNote" class="button is-link">
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>
