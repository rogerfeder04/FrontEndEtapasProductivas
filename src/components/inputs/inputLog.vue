<template>
    <div class="input-container">
      <label v-if="label" :for="id" class="input-label">{{ label }}</label>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="['input-styled', { 'input-error': hasError }]"
      />
      <span v-if="hasError" class="input-error-message">{{ errorMessage }}</span>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Ingresa el valor',
    },
    type: {
      type: String,
      default: 'text', // 'text', 'password', 'email', etc.
    },
    errorMessage: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
  });
  
  const hasError = computed(() => {
    return props.rules.some((rule) => !rule(props.modelValue));
  });
  </script>
  
  <style scoped>
  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }
  
  .input-label {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
  
  .input-styled {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: border-color 0.2s;
  }
  
  .input-styled:focus {
    border-color: #4CAF50; /* Verde del botón de login */
    outline: none;
  }
  
  .input-error {
    border-color: #f44336; /* Rojo para los errores */
  }
  
  .input-error-message {
    color: #f44336;
    font-size: 12px;
    margin-top: 4px;
  }
  </style>
  