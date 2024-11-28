<template>
  <q-radio
    v-model="isSelected"
    :label="label"
    :val="value"
    color="primary"
    :disable="disabled"
    @update:model-value="updateSelected"
  />
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  value: {
    type: String, // Valor asociado al radio button
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },

});

const emit = defineEmits(["update:modelValue"]);

const isSelected = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    isSelected.value = newValue;
  }
);

function updateSelected(value) {
  emit("update:modelValue", value);
}
</script>

<style scoped>
</style>
