import { watch } from "vue";

export const useWatchCharacters = (
  valueToWatch: any,
  maxChars: number = 100
) => {
  watch(valueToWatch, (newValue) => {
    if (newValue.length === maxChars) {
      alert(`Maximum ${maxChars} characters allowed`);
    }
  });
};
