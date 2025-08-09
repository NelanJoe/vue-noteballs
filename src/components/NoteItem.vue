<script setup lang="ts">
import { computed, reactive } from "vue";
import type { Note } from "../types";
import ModalDeleteNote from "./ModalDeleteNote.vue";

const props = defineProps<{ note: Note }>();

const characterLength = computed(() => {
  const length = props.note.content.length;
  const description = length > 1 ? "characters" : "character";

  return `${length} ${description}`;
});

const modals = reactive({
  deleteNote: false,
});
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
      </div>
      <div class="has-text-right has-text-grey-light">
        <small>{{ characterLength }}</small>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink
        :to="{ name: 'editNote', params: { id: note.id } }"
        class="card-footer-item"
      >
        Edit
      </RouterLink>
      <a @click="modals.deleteNote = true" class="card-footer-item">Delete</a>
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :note-id="note.id"
    />
  </div>
</template>
