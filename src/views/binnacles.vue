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
  
  const title = ref("BITÁCORAS");
  const rows = ref([]);
  const columns = ref([
  {
    name: "assignment",
    align: "center",
    label: "Asignacion",
    field: "assignment",
    sortable: true,
  },
  {
    name: "instructor",
    required: true,
    label: "instructor",
    align: "center",
    field: row => row.instructor.idInstructor,
    sortable: true,
  },
  {
    name: "number",
    required: true,
    label: "Número de Bitacora",
    align: "center",
    field: "number",
    sortable: true,
  },
  {
    name: "document",
    required: true,
    label: "Documento",
    align: "center",
    field: "document",
    sortable: true,
  },
  {
    name: "observation",
    required: true,
    label: "Observaciones",
    align: "center",
    field: row => row.observation.observation,
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
    getBinnacles()
  })
  
  async function getBinnacles() {
  let response = await getData("Binnacle/listallbinnacles");
  console.log(response);
  rows.value = response;
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
  
  <style>
  .layout {
  padding: 0; 
  }
  
  .table-container {
  margin-top: 0; /* Quita el margen superior */
  padding: 0 20px; /* Añade un pequeño padding lateral si es necesario */
  }
  </style>
  