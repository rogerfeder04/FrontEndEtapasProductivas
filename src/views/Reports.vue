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
    <div class="table-container">
      
      <h5>{{ title }}</h5>

      <div style="display:flex; align-items: center !important;">
        <q-btn  to="/home" dense unelevated round color="primary" icon="arrow_back" text-color="white" />
        <hr 
          id="hr" 
          color="primary"
        >
      </div>

      <Table
        :rows="rows"
        :columns="columns"
        :onClickEdit="openDialog"
        :onClickActivate="toggleEstado"
      ></Table>
    </div>
  </q-page-container>
  <Footer></Footer>
</q-layout>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";

import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import Footer from "@/components/layouts/Footer.vue"
import Table from "@/components/tables/TableWithButtons.vue";
import { notifyErrorRequest, notifySuccessRequest } from "@/composables/notify/Notify.vue";

import { getData, postData } from "@/services/apiClient.js";

const title = ref("PROYECCIÓN HORAS INSTRUCTORES EP");
const dialog = ref(false);

const rows = ref([]);
const columns = ref([
{
    name: "numberList",
    required: true,
    label: "N°",
    align: "center",
    field: "numberList",
  },
  {
    name: "name",
    required: true,
    label: "NOMBRE INSTRUCTOR",
    align: "center",
    field: "name",
    sortable: true,
  },
  {
    name: "hourInstructorFollow",
    align: "center",
    label: "HORAS EJECUTADAS",
    field: "hourInstructorFollow" || "No aplica",
    sortable: true,
  },
  {
    name: "hourInstructorTechnical",
    label: "HORAS PENDIENTES",
    align: "center",
    field: "hourInstructorTechnical" || "No aplica",
    sortable: true,
  },
  {
    name: "hourInstructorProject",
    label: "HORAS PROGRAMADAS",
    align: "center",
    field: "hourInstructorProject",
    sortable: true,
  },  {
    name: "hourInstructorProject",
    label: "AÑO",
    align: "center",
    field: "hourInstructorProject",
    sortable: true,
  },  {
    name: "hourInstructorProject",
    label: "MES",
    align: "center",
    field: "hourInstructorProject",
    sortable: true,
  }
]);

onBeforeMount( ()=> {
})

const drawerOpen = ref(false);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const openDialog = () => {
  dialog.value = true;
};
</script>

<style>
.layout {
  padding: 0; 
}

.table-container {
  margin-top: 0; /* Quita el margen superior */
  padding: 0 20px; /* Añade un pequeño padding lateral si es necesario */
}
</style>
