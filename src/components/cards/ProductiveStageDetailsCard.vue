<template>
    <q-card class="myCard" elevated bordered>
      <div class="cardContent">
        <q-card-section class="q-card-section">
          <span class="titleText q-mt-sm q-mb-xs">{{ title }}</span>
        </q-card-section>
        <q-card-section class="q-card-section">
          <span class="contentText">{{ content }}</span>
        </q-card-section>
      </div>
    </q-card>
  </template>
  
  <script setup>  
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
    }
  });
  

  </script>
  
  <style scoped lang="scss">
  .myCard {
    margin-bottom: 3%;
  }

  .q-card-section {
    padding: 0% !important;

  }

  .titleText {
    font-weight: bolder;
    color: $primary;
  }

  .contentText {
    font-size: 17px;
  }

  </style>
  