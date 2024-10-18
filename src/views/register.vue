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
import CustomButton from "@/components/buttons/CustomButton.vue";

const title = ref("REGISTROS");
const rows = ref([]);
const columns = ref([
  {
    name: "startDate",
    required: true,
    label: "Fecha de Inicio",
    align: "center",
    field: "startDate",
    sortable: true,
  },
  {
    name: "endDate",
    align: "center",
    label: "Fecha Fin",
    field: "endDate",
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
    name: "phoneCompany",
    label: "Telefono de la Empresa",
    align: "center",
    field: "phoneCompany",
    sortable: true,
  },
  {
    name: "addressCompany",
    align: "center",
    label: "Dirección de la Empresa",
    field: "addressCompany",
    sortable: true,
  },
  {
    name: "owner",
    align: "center",
    label: "Dueño de la empresa",
    field: "owner",
    sortable: true,
  },
  {
    name: "docAlternative",
    label: "Documento Alternativo",
    align: "center",
    field: "docAlternative",
    sortable: true,
  },
  {
    name: "hour",
    label: "Hora",
    align: "center",
    field: "hour",
    sortable: true,
  },
  {
    name: "businessProyectHour",
    label: "Horas del Proyecto Empresarial",
    align: "center",
    field: "businessProyectHour",
    sortable: true,
  },
  {
    name: "productiveProjectHour",
    label: "Horas del Proyecto Productivo",
    align: "center",
    field: "productiveProjectHour",
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
  getRegisters()
})

async function getRegisters() {
  let response = await getData("Register/listallregister");
  console.log(response);
  rows.value = response.register;
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
