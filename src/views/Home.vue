<template>
  <q-layout view="lHh Lpr lff" class="layout">
    <q-page-container>
    <Header
      :drawerOpen="drawerOpen"
      @toggleDrawer="toggleDrawer"
    ></Header>
    <Sidebar 
      :drawerOpen="drawerOpen" 
      @update:drawerOpen="toggleDrawer"
    />
<br>
    <h5 v-if="userRole === 'ADMIN'">REGISTRO Y ASIGNACION DE SEGUIMIENTO A ETAPAS PRODUCTIVAS</h5>
    <h5 v-else>SEGUIMIENTO ETAPAS PRODUCTIVAS ASIGNADAS Y REGISTRO DE HORAS LABORADAS</h5>
<br>
    <div class="card-container">
      <Card 
        v-for="(item, index) in filteredCardData" 
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
import { ref, computed } from "vue";

import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import Card from "@/components/cards/HomeCard.vue";
import apprenticeCard from "@/assets/images/apprenticeCard.png"
import ficheCard from "@/assets/images/ficheCard.png"
import registerCard from "@/assets/images/registerCard.png"
import assignmentCard from "@/assets/images/assignmentCard.png"
import binnacleCard from "@/assets/images/binnacleCard.png"
import followupCard from "@/assets/images/followupCard.png"
import instructorAssignmentsCard from "@/assets/images/instructorAssignmentsCard.png"
import instructorBinnaclesCard from "@/assets/images/instructorBinnaclesCard.png"
import instructorFollowupsCard from "@/assets/images/instructorFollowupsCard.png"
import instructorTimeRegisterCard from "@/assets/images/instructorTimeRegisterCard.png"

import reportsCard from "@/assets/images/reportsCard.png"
import { useAuthStore } from "@/stores/useAuth.js";

const authStore = useAuthStore();
const userRole = authStore.rol;

const cardData = ref([
  //ADMINISTRADORES:
  { route: "/apprentices", imgSrc: apprenticeCard, title: "Aprendices", roles: ["ADMIN"]},
  { route: "/fiches", imgSrc: ficheCard, title: "Fichas", roles: ["ADMIN"] },
  { route: "/register", imgSrc: registerCard, title: "Registro", roles: ["ADMIN"] },
  { route: "/assignments", imgSrc: assignmentCard, title: "Asignaciones", roles: ["ADMIN"] },
  { route: "/binnacles", imgSrc: binnacleCard, title: "Bitacoras", roles: ["ADMIN"] },
  { route: "/followups", imgSrc: followupCard, title: "Seguimientos", roles: ["ADMIN"] },
  { route: "/reports", imgSrc: reportsCard, title: "Informes", roles: ["ADMIN"] },

  //INSTRUCTORES:
  { route: "/instructor/assignments", imgSrc: instructorAssignmentsCard, title: "Mis Asignaciones", roles: ["INSTRUCTOR"] },
  { route: "/instructor/binnacles", imgSrc: instructorBinnaclesCard, title: "Bitácoras", roles: ["INSTRUCTOR"] },
  { route: "/instructor/followups", imgSrc: instructorFollowupsCard, title: "Seguimientos", roles: ["INSTRUCTOR"] },
  { route: "/instructor/timeregister", imgSrc: instructorTimeRegisterCard, title: "Registro de Horas", roles: ["INSTRUCTOR"] },
  



]);

const filteredCardData = computed(() => {
  return cardData.value.filter(card => card.roles.includes(userRole));
});

const drawerOpen = ref(true);

function toggleDrawer() {
drawerOpen.value = !drawerOpen.value;
}

</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); /* Para que se ajuste al tamaño */
  gap: 20px;
  padding: 20px;
}
</style>