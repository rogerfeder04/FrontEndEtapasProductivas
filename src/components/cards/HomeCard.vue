<template>
    <q-card class="myCard" flat bordered @click="goToRoute(route)">
      <div class="flexContainer">
        <q-img :src="imgSrc" />
      </div>
      <q-card-section class="flexContent">
        <div class="text-h6 q-mt-sm q-mb-xs">{{ title }}</div>
      </q-card-section>
    </q-card>
  </template>
  
  <script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

  const props = defineProps({
    route: {
      type: String,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  });
  
  const goToRoute = () => {
  if (props.route) {
    router.push({ path: props.route }).catch(err => {
      if (err.name !== 'NavigationDuplicated') {
        throw err;
      }
    });
  }
};
  </script>
  
  <style scoped>
  .myCard {
    width: 100%;
    cursor: pointer;
  }
  .flexContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
  }
  .flexContent {
    text-align: center;
  }
  </style>
  