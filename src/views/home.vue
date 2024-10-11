<template>
  <div class="q-pa-md">
    <Layout />
    <div class="card-container">
      <Card 
        v-for="(item, index) in cardData" 
        :key="index" 
        :route="item.route" 
        :imgSrc="item.imgSrc" 
        :title="item.title" 
      />
  </div>
    </div>
</template>

<script setup>
import Layout from "@/components/layouts/Layout.vue";
import Card from "@/components/cards/HomeCard.vue";
import { ref } from "vue";

// Define card data
const cardData = ref([
  { route: "/Home/Apprentices", imgSrc: "../assets/Images/Logo-Fichas.png", title: "Apprentices" },
  { route: "/Home/Ficha", imgSrc: "../assets/Images/Logo-Fichas.png", title: "Assignments" },
  { route: "/Home/Ficha", imgSrc: "../assets/Images/Logo-Fichas.png", title: "Binnacles" },
  { route: "/Home/Ficha", imgSrc: "../assets/Images/Logo-Fichas.png", title: "Fiches" },
  { route: "/Home/Ficha", imgSrc: "../assets/Images/Logo-Fichas.png", title: "Followups" },
  { route: "/Home/Ficha", imgSrc: "../assets/Images/Logo-Fichas.png", title: "Modality" },
  { route: "/Home/Ficha", imgSrc: "../assets/Images/Logo-Fichas.png", title: "Register" },
  { route: "/Home/Ficha", imgSrc: "../assets/Images/Logo-Fichas.png", title: "UserEP" },

]);
</script>

<!-- <style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  }

</style> -->