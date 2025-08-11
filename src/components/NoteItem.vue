<script setup lang="ts">
import { computed, reactive } from "vue";
import { useDateFormat } from "@vueuse/core";
import ModalDeleteNote from "./ModalDeleteNote.vue";
import type { Note } from "../types";

const props = defineProps<{ note: Note }>();

const dateFormatted = computed(() => {
  const date = new Date(parseInt(props.note.date));
  const formattedDate = useDateFormat(date, "MM-DD-YYYY @ HH:mm", {
    locales: "id-ID",
  });

  return formattedDate.value;
});

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
      <div class="columns is-mobile has-text-grey-light">
        <small class="column">{{ dateFormatted }}</small>
        <small class="column has-text-right">{{ characterLength }}</small>
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
