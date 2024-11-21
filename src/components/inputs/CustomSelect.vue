<template>
  <div class="selectContainer">
    <q-select
      filled
      clearable
      use-input
      input-debounce="100"
      behavior="menu"
      :rules="[val => !!val || errorMessage || 'Este campo es obligatorio']"
      v-model="internalValue"
      :label="label"
      :options="filteredOptions"
      :option-label="optionLabel"
      :option-value="optionValue"
      :class="['select-styled', { 'input-error': hasError }]"
      @filter="filterOptions"
      @update:model-value="handleInputChange" 
    >
      <template v-slot:prepend>
        <font-awesome-icon v-if="icon" :icon="icon" />
      </template>

      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No hay resultados
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  label: {
    type: String,
  },
  icon: {
    type: String,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  rules: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Number, Object],
    default: null,
  },
  options: {
    type: Array,
    required: true,
  },
  optionLabel: {
    type: String,
    default: 'label',
  },
  optionValue: {
    type: String,
    default: 'value',
  },
});

const internalValue = ref(props.modelValue);
const filteredOptions = ref([...props.options]);
const hasError = ref(false);

const emit = defineEmits(['update:modelValue']);

// Actualiza el valor interno y emite el cambio
watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
  hasError.value = !newValue; // Marca error si está vacío
});

// Sincroniza los cambios externos en modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);

const filterOptions = (val, update) => {
  if (!val) {
    update(() => {
      filteredOptions.value = [...props.options]; // Mostrar todas las opciones si el valor está vacío
    });
    return;
  }

  const needle = val.toLowerCase(); // Convierte la entrada a minúsculas para evitar problemas con la comparación
  update(() => {
    filteredOptions.value = props.options.filter((option) => {
      const label = String(option[props.optionLabel]).toLowerCase(); // Convierte a string para evitar errores
      return label.includes(needle); // Filtra las opciones que coinciden con el texto ingresado
    });
  });
};

const handleInputChange = (selectedValue) => {
  // Emite el valor seleccionado al padre
  emit('update:modelValue', selectedValue);
};
</script>

<style scoped>
.select-styled {
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.2s;
  padding: 0px;
  margin-bottom: 20px;
}

.input-error {
  border-color: red;
}
</style>