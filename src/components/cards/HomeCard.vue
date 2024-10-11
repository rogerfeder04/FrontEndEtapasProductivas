<template>
    <q-card class="myCard" flat bordered @click="goToRoute(route)">
      <div class="flexContainer">
        <q-img :src="imgSrc" class="flexImg" />
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
  
  const goToRoute = (route) => {
    router.push(route);
  };
  </script>
  
  <style scoped>
  .myCard {
    width: 100%;
    max-width: 400px;
  }
  .flexContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
  }
  .flexImg {
    max-width: 150px;
  }
  .flexContent {
    text-align: center;
  }
  </style>
  