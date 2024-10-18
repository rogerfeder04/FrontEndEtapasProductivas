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

    <div class="table-container">
      <Table
        :rows="rows"
        :columns="columns"
        :title="title"
        :onClickEdit="openDialog"
        :onClickActivate="toggleEstado"
      ></Table>
    </div>

  </q-page-container>
</q-layout>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";

import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import Table from "@/components/tables/Table.vue";

import { getData } from "@/services/apiClient.js";

const title = ref("MODALIDADES");
const rows = ref([]);
const columns = ref([
  {
    name: "name",
    required: true,
    label: "Modalidad",
    align: "center",
    field: "name",
    sortable: true,
  },
  {
    name: "hourInstructorFollow",
    align: "center",
    label: "Horas Instructor de Seguimiento",
    field: "hourInstructorFollow" || "No aplica",
    sortable: true,
  },
  {
    name: "hourInstructorTechnical",
    label: "Horas Instructor Técnico",
    align: "center",
    field: "hourInstructorTechnical" || "No aplica",
    sortable: true,
  },
  {
    name: "hourInstructorProject",
    label: "Horas Instructor de Proyecto",
    align: "center",
    field: "hourInstructorProject",
    sortable: true,
  }
]);

onBeforeMount( ()=> {
  getModalities()
})

async function getModalities() {
  let response = await getData("Modality/listallmodality");
  console.log(response);
  rows.value = response.modality;
}

const drawerOpen = ref(false);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const openDialog = (row) => {
  selectedRow.value = row;
  alert.value = true;
  console.log(row);
};

const toggleEstado = (row) => {
  // Lógica para cambiar el estado de la fila
  row.estado = row.estado === 1 ? 0 : 1;
  console.log("Nuevo estado:", row.estado);
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
