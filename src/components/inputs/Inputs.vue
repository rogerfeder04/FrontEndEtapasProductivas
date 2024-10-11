<template>
    <div class="input-container">
      <q-input
        filled
        :id="id"
        :type="type"
        v-model="internalValue"
        :placeholder="placeholder"
        :class="['input-styled', { 'input-error': hasError }]"
      >
    <template v-slot:prepend>
      <font-awesome-icon :icon="icon"/>
    </template> 
  </q-input>
      

      <span 
        v-if="hasError" 
        class="input-error-message"
        >
        {{ errorMessage }}
      </span>
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
    placeholder: {
      type: String,
    },
    icon: {
      type: String,
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
  
  const internalValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
  </script>
  
  <style scoped>
  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }
  
  .input-styled {
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: border-color 0.2s;
  }
  
  .input-styled:focus {
    color: primary;
  }
  
  .input-error {
    border-color: negative
  }
  
  .input-error-message {
    color: #f44336;
    font-size: 12px;
    margin-top: 4px;
  }
  </style>
  