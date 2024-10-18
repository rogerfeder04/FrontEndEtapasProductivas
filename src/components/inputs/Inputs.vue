
<template>
    <div class="input-container">
      <q-input
        filled
        :id="id"
        :rules="[val => !!val || 'Este campo es obligatorio']"
        :type="showPassword ? 'text' : type"
        v-model="internalValue"
        :placeholder="placeholder"
        :class="['input-styled', { 'input-error': hasError }]"
      >
    <template v-slot:prepend>
      <font-awesome-icon :icon="icon"/>
    </template> 
    <template v-slot:append>
        <q-icon 
          v-if="type === 'password'"
          :name="showPassword ? 'visibility' : 'visibility_off'"
          @click="togglePasswordVisibility"
          class="cursor-pointer"
        />
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
  import { computed, ref } from 'vue';
  import { QIcon } from 'quasar';

  const hasError = ref(false);
  const showPassword = ref(false);
  const emit = defineEmits(['update:modelValue']);
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
      default: 'text',
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

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
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
    padding: 0px;
    margin-bottom: 2%;
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
  