<template>
  <q-layout view="lHh Lpr lff" class="layout">
    <q-page-container>
    <Header
      :title="'REPFORA'"
      :drawerOpen="drawerOpen"
      @toggleDrawer="toggleDrawer"
    ></Header>
    <Sidebar 
      :drawerOpen="drawerOpen" 
      @update:drawerOpen="toggleDrawer"
    />

    <div class="card-container">
      <Card 
        v-for="(item, index) in cardData" 
        :key="index" 
        :route="item.route" 
        :imgSrc="item.imgSrc"
        :title="item.title" 
        class="card"
      />
  </div>
</q-page-container>
</q-layout>
</template>

<script setup>
import { ref } from "vue";

import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import Card from "@/components/cards/HomeCard.vue";
import qDrawerImage from "@/assets/images/qDrawerImage.jpg"

const cardData = ref([
  { route: "/apprentices", imgSrc: qDrawerImage, title: "Apprentices" },
  { route: "/assignments", imgSrc: qDrawerImage, title: "Assignments" },
  { route: "/binnacles", imgSrc: qDrawerImage, title: "Binnacles" },
  { route: "/fiches", imgSrc: qDrawerImage, title: "Fiches" },
  { route: "/followups", imgSrc: qDrawerImage, title: "Followups" },
  { route: "/modalities", imgSrc: qDrawerImage, title: "Modality" },
  { route: "/registers", imgSrc: qDrawerImage, title: "Register" },
  { route: "/usersep", imgSrc: qDrawerImage, title: "UserEP" },
]);

const drawerOpen = ref(false);

function toggleDrawer() {
drawerOpen.value = !drawerOpen.value;
}

</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Para que se ajuste al tamaño */
  gap: 20px;
  padding: 20px;
}
</style>