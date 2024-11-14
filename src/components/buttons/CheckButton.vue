<template>
    <q-checkbox
      v-model="isChecked"
      :label="label"
      color="primary"
      :disable="disabled"
      @update:model-value="updateChecked"
    />
  </template>
  
  <script setup>
  import { ref, watch, defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
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
  
  const isChecked = ref(props.modelValue);
  
  watch(
    () => props.modelValue,
    (newValue) => {
      isChecked.value = newValue;
    }
  );
  
  function updateChecked(value) {
    emit("update:modelValue", value);
  }
  </script>
  
  <style scoped>
  </style>
  