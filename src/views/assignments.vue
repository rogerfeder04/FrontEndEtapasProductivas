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
  <CustomButton 
    label="Crear Asignación"
    onClickFunction=""
  >
  </CustomButton>

  <CustomModal></CustomModal>
</q-page-container>
</q-layout>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";

import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import Table from "@/components/tables/Table.vue";
import CustomButton from "@/components/buttons/CustomButton.vue"
import CustomModal from "@/components/modals/CustomModal.vue"

import { getData } from "@/services/apiClient.js";

const title = ref("ASIGNACIONES");
const rows = ref([]);
const columns = ref([
{
  name: "register",
  align: "center",
  label: "Registro",
  field: "register",
  sortable: true,
},
{
  name: "followUpInstructor",
  required: true,
  label: "Instructor de Seguimiento",
  align: "center",
  field: "followUpInstructor",
  sortable: true,
},
{
  name: "technicalInstructor",
  required: true,
  label: "Instructor Técnico",
  align: "center",
  field: "technicalInstructor",
  sortable: true,
},
{
  name: "projectInstructor",
  required: true,
  label: "Instructor de Proyecto",
  align: "center",
  field: "projectInstructor",
  sortable: true,
},
{
  name: "certificationDoc",
  required: true,
  label: "Documento de certificación",
  align: "center",
  field: "certificationDoc",
  sortable: true,
},
{
  name: "judymentPhoto",
  label: "Foto del Juicio",
  align: "center",
  field: "judymentPhoto",
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
  getAssignments()
})

async function getAssignments() {
let response = await getData("Assignment/listallassignment");
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
