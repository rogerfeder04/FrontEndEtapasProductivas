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

    <Table
      :rows="rows"
      :columns="columns"
      :title="title"
      :onClickEdit="openDialog"
      :onClickActivate="toggleEstado"
    ></Table>
</q-page-container>
</q-layout>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";

import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import Table from "@/components/tables/Table.vue";

import { getData } from "@/services/apiClient.js";

const title = ref("APRENDICES");
const rows = ref([]);
const columns = ref([
{
    name: "fiche",
    label: "Ficha",
    align: "center",
    field: row => row.fiche.name,
    sortable: true,
  },
  {
    name: "tpDocument",
    align: "center",
    label: "Tipo de Documento",
    field: "tpDocument",
    sortable: true,
  },
  {
    name: "numDocument",
    align: "center",
    label: "Documento del Aprendiz",
    field: "numDocument",
    sortable: true,
  },
  {
    name: "name",
    required: true,
    label: "Nombre del Aprendiz",
    align: "center",
    field: row => `${row.firstName || ''} ${row.lastName || ''}`.trim(),
    sortable: true,
  },
  {
    name: "phone",
    align: "center",
    label: "Teléfono del Aprendiz",
    field: "phone",
    sortable: true,
  },
  {
    name: "email",
    align: "center",
    label: "Email del Aprendiz",
    field: "email",
    sortable: true,
  },
  {
    name: "status",
    label: "Estado",
    align: "center",
    field: "status",
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
  getApprentices()
})

async function getApprentices() {
let response = await getData("Apprentice/listallapprentice");
console.log(response.apprentices);
rows.value = response.apprentices;
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
row.estado = row.estado === 1 ? 0 : 1;
console.log("Nuevo estado:", row.estado);
};
</script>
