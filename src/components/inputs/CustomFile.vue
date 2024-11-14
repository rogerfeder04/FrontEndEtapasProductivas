<template>
    <div class="file-container">
      <q-file
        filled
        :id="id"
        :label="label"
        v-model="internalValue"
        :rules="[val => !!val || errorMessage || 'Este campo es obligatorio']"
        :error="hasError"
        class="file-styled"
        @input="handleFileChange"
        @remove="clearFile"
      >
        <template v-slot:prepend>
          <font-awesome-icon :icon="icon" />
        </template>
  
        <template v-slot:append v-if="internalValue">
          <q-icon
            name="close"
            class="cursor-pointer text-red"
            @click.stop="clearFile"
          />
        </template>
      </q-file>
  
      <span v-if="hasError" class="file-error-message">
        {{ errorMessage }}
      </span>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: File,
      default: null,
    },
    label: {
      type: String,
      default: 'Seleccionar archivo',
    },
    icon: {
      type: String,
      default: 'file-upload',
    },
    errorMessage: {
      type: String,
      default: '',
    },
  });
  
  const hasError = ref(false);
  const emit = defineEmits(['update:modelValue']);
  
  const internalValue = ref(props.modelValue);
  
  const handleFileChange = (file) => {
    emit('update:modelValue', file);
  };
  
  const clearFile = () => {
    internalValue.value = null;
    emit('update:modelValue', null);
  };
  
  watch(internalValue, (newValue) => {
    emit('update:modelValue', newValue);
  });
  </script>
  
  <style scoped>
  .file-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
  }
  
  .file-styled {
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: border-color 0.2s;
    margin-bottom: 5px;
    padding: 0px;
  }
  
  .file-error-message {
    color: #f44336;
    font-size: 12px;
    margin-top: 4px;
  }
  </style>
  