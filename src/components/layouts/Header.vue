<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleDrawer" />
      <q-toolbar-title>
        <!-- <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" alt="Logo" />
        </q-avatar> -->
        <span>{{ title }}</span>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: "REPFORA"
  },
  drawerOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['toggleDrawer']);

function toggleDrawer() {
  emit('toggleDrawer');
}
</script>

<style scoped>
</style>
