<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { onClickOutside } from "@vueuse/core";
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
    <section class="modal-content" ref="modalCardRef">
      <div class="card">
        <div class="card-content">
          <div class="is-flex is-justify-content-space-between">
            <p class="modal-card-title">Delete Note?</p>
            <button
              class="delete"
              aria-label="close"
              @click="closeModal"
            ></button>
          </div>
          <p class="py-5">Are you sure you want to delete this note?</p>
          <div class="buttons is-flex is-justify-content-flex-end">
            <button class="button is-small" @click="closeModal">Cancel</button>
            <button
              class="button is-small is-danger"
              @click="notesStore.deleteNote(noteId)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
