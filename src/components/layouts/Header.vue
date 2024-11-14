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
      <q-btn dense flat round icon="logout" @click="logout()" />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    default: "ETAPAS PRÁCTICAS"
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

const logout = () => {
  router.push('/');
  

}
</script>

<style scoped>
</style>
