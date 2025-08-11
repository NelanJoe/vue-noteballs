<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useNotesStore } from "../stores/notes";
import { vAutofocus } from "../directives/vAutofocus";
import { useWatchCharacters } from "../composables/useWatchCharacters";
import DefaultLayout from "../layouts/DefaultLayout.vue";

const notesStore = useNotesStore();
const { totalNotesCount, totalCharactersCount } = storeToRefs(notesStore);

const lovedNoteballs = ref("");
useWatchCharacters(lovedNoteballs, 50);
</script>

<template>
  <DefaultLayout>
    <div class="stats">
      <div class="table-container">
        <table class="table is-bordered is-fullwidth">
          <thead>
            <tr>
              <th>Stat</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Number of Notes</td>
              <td>{{ totalNotesCount }}</td>
            </tr>
            <tr>
              <td>Number of Character (of all notes)</td>
              <td>{{ totalCharactersCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <input
          class="input"
          type="text"
          v-model="lovedNoteballs"
          placeholder="Do you love noteballs?"
          v-autofocus
        />
      </div>
    </div>
  </DefaultLayout>
</template>
