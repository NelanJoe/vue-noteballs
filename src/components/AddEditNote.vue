<script setup lang="ts">
import { useTemplateRef } from "vue";
import { vAutofocus } from "../directives/vAutofocus";

const { placeholder } = defineProps<{ placeholder: string }>();

const modelValue = defineModel<string>();

const textareaRef = useTemplateRef("addEditNoteRef");

const focusTextares = () => {
  textareaRef.value?.focus();
};

defineExpose({
  focusTextares,
});
</script>

<template>
  <div class="card p-4">
    <div class="field">
      <div class="control">
        <textarea
          v-model="modelValue"
          ref="addEditNoteRef"
          class="textarea"
          :placeholder="placeholder"
          v-autofocus
          maxlength="100"
        ></textarea>
      </div>
    </div>
    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <div class="buttons">
          <slot name="buttons" />
        </div>
      </div>
    </div>
  </div>
</template>
