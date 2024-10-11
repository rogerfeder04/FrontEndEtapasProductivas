<template>
    <q-btn-dropdown
      :label="selectedRoleLabel"
      color="primary"
      outline
      class="full-width role-btn"
    >
      <q-list>
        <q-item
          v-for="role in roles"
          :key="role.value"
          clickable
          @click="selectRole(role)"
        >
          <q-item-section>{{ role.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    roles: {
      type: Array,
      required: true,
      default: () => [
        { label: 'Instructor', value: 'instructor' },
        { label: 'Administrador', value: 'administrador' },
        { label: 'Aprendiz', value: 'aprendiz' }, // Nuevo rol Aprendiz
      ],
    },
    modelValue: {
      type: String,
      default: '',
    },
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const selectedRoleLabel = ref('');
  const selectedRole = ref(props.modelValue);
  
  function selectRole(role) {
    selectedRole.value = role.value;
    selectedRoleLabel.value = role.label;
    emit('update:modelValue', selectedRole.value);
  }
  
  if (props.modelValue) {
    const defaultRole = props.roles.find((role) => role.value === props.modelValue);
    if (defaultRole) {
      selectedRoleLabel.value = defaultRole.label;
    }
  } else {
    selectedRoleLabel.value = 'Seleccionar Rol';
  }
  </script>
  
  <style scoped>
  .role-btn {
    width: 100%;
  }
  
  .full-width {
    width: 100%;
  }
  </style>
  