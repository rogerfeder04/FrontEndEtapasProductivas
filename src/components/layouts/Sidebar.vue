<template>
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
  </template>
  
  <script setup>
  const props = defineProps({
    drawerOpen: {
      type: Boolean,
      required: true
    }
  });
  
  const emit = defineEmits(['update:drawerOpen']);
  
  const updateDrawer = (value) => {
    emit('update:drawerOpen', value);
  };
  </script>
  