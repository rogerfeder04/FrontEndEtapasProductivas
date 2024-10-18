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

const title = ref("SEGUIMIENTOS");
const rows = ref([]);
const columns = ref([
  {
    name: "assignment",
    required: true,
    label: "Fecha de Inicio",
    align: "center",
    field: "assignment",
    sortable: true,
  },
  {
    name: "instructor",
    align: "center",
    label: "Fecha Fin",
    field: "instructor",
    sortable: true,
  },
  {
    name: "company",
    label: "Empresa",
    align: "center",
    field: "company",
    sortable: true,
  },
  {
    name: "number",
    label: "Telefono de la Empresa",
    align: "center",
    field: "number",
    sortable: true,
  },
  {
    name: "month",
    align: "center",
    label: "Dirección de la Empresa",
    field: "month",
    sortable: true,
  },
  {
    name: "document",
    align: "center",
    label: "Dueño de la empresa",
    field: "document",
    sortable: true,
  },
  {
    name: "status",
    label: "Documento Alternativo",
    align: "center",
    field: "status",
    sortable: true,
  },
  {
    name: "observations",
    label: "Hora",
    align: "center",
    field: "observations",
    sortable: true,
  },
  {
    name: "opciones",
    label: "Opciones",
    align: "center",
    sortable: true,
  },
]);

onBeforeMount(() => {
    getFollowUps()
})

async function getFollowUps() {
  let response = await getData("Followup/listallfollowup");
  console.log(response);
  rows.value = response.followup;
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
