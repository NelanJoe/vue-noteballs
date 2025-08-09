<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { onMounted, useTemplateRef } from "vue";
import { useNotesStore } from "../stores/notes";

defineProps<{ modelValue: boolean; noteId: string }>();

const notesStore = useNotesStore();

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};

const modalCardRef = useTemplateRef("modalCardRef");
onClickOutside(modalCardRef, closeModal);

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") closeModal();
};

onMounted(() => {
  document.addEventListener("keyup", handleKeydown);

  return () => {
    document.removeEventListener("keyup", () => {});
  };
});
</script>

<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <div class="buttons">
          <button class="button" @click="closeModal">Cancel</button>
          <button
            class="button is-danger"
            @click="notesStore.deleteNote(noteId)"
          >
            Delete
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>
