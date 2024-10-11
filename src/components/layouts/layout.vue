<template>
  <q-layout view="hHh lpR fFf" class="layout-no-margin">

    <q-header elevated class="bg-green-8 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <NavBarButton label="HOME" :onClickFunction="() => goToRoute('/home')"></NavBarButton>
      <NavBarButton label="APPRENTICES" :onClickFunction="() => goToRoute('/home/apprentices')"></NavBarButton>
      <NavBarButton label="ASSIGNMENTS" :onClickFunction="() => goToRoute('/home/assignments')"></NavBarButton>
      <NavBarButton label="BINNACLES" :onClickFunction="() => goToRoute('/home/binnacles')"></NavBarButton>
      <NavBarButton label="FICHES" :onClickFunction="() => goToRoute('/home/fiches')"></NavBarButton>
      <NavBarButton label="FOLLOWUP'S" :onClickFunction="() => goToRoute('/home/followups')"></NavBarButton>
      <NavBarButton label="MODALITY" :onClickFunction="() => goToRoute('/home/modalities')"></NavBarButton>
      <NavBarButton label="REGISTER" :onClickFunction="() => goToRoute('/home/registers')"></NavBarButton>
      <NavBarButton label="USER" :onClickFunction="() => goToRoute('/home/userep')"></NavBarButton>


    </q-drawer>

    <q-page-container class="page-no-margin">
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import NavBarButton from '@/components/buttons/NavBarButton.vue';
import goToRoute from '@/utils/goToRouteFunction.js'

const leftDrawerOpen = ref(false);
const isLoading = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
.layout-no-margin .q-page-container {
  margin-top: 0; /* Ajusta según sea necesario */
}

.q-layout--standard{

  min-height: 0px !important;
}


.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* Espacio entre las cards */
}
</style>