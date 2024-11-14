<template>
  <q-layout view="lHh Lpr lff" class="layout">
    <q-page-container>
      <Header :drawerOpen="drawerOpen" @toggleDrawer="toggleDrawer" />
      <Sidebar :drawerOpen="drawerOpen" @update:drawerOpen="toggleDrawer" />

      <br />

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
          :onClickToggleStatus="toggleEstado"
          :onClickOpenModal="openDialogWithRow"
        ></Table>
      </div>

      <TableModal v-model:dialog="dialog" :row="selectedRow" >
        <template v-slot>
          <div class="table-container">
        <h5>{{ title2 }}</h5>
        <hr id="hr" color="primary" />
          <Table
          :rows="rows2"
          :columns="columns2"
          :onClickView="openDialogWithRow"
        ></Table>
      </div>
  </template>
      </TableModal>
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
import TableModal from "@/components/modals/TableModal.vue";
import { getData } from "@/services/apiClient.js";
import TableWithoutButtons from "@/components/tables/TableWithoutButtons.vue";

const title = ref("FICHAS");
const title2 = ref("INFORME DE APRENDICES POR FICHAS");

const drawerOpen = ref(true);
const dialog = ref(false);
const selectedRow = ref(null);

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
    name: "program",
    align: "center",
    label: "NOMBRE FICHA",
    field: (row) => row.program.name,
    sortable: true,
  },
  {
    name: "number",
    required: true,
    label: "COD. FICHA",
    align: "center",
    field: "number",
    sortable: true,
  },
  {
    name: "status",
    label: "ESTADO",
    align: "center",
    field: "status",
    sortable: true,
  },
  {
    name: "eyeButton",
    label: "VER APRENDICES",
    align: "center",
    sortable: true,
  },
]);

const rows2 = ref([]);
const columns2 = ref([
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
    label: "NOMBRE APRENDIZ",
    align: "center",
    field: (row) => `${row.firstName || ""} ${row.lastName || ""}`.trim(),
    sortable: true,
  },
  {
    name: "tpDocument",
    align: "center",
    label: "TIPO DOCUMENTO",
    field: "tpDocument",
    sortable: true,
  },
  {
    name: "numDocument",
    align: "center",
    label: "N° DOCUMENTO",
    field: "numDocument",
  },
  {
    name: "personalEmail",
    align: "center",
    label: "EMAIL PERSONAL",
    field: "personalEmail",
  },
  {
    name: "institutionalEmail",
    align: "center",
    label: "EMAIL INSTITUCIONAL",
    field: "institutionalEmail",
  },
  {
    name: "phone",
    align: "center",
    label: "TEL.",
    field: "phone",
  },
  {
    name: "fiche",
    label: "FICHA",
    align: "center",
    field: (row) => row.fiche.name,
  },
  {
    name: "ficheCode",
    label: "COD. FICHA",
    align: "center",
    field: (row) => row.fiche.number,
    sortable: true,
  },
  {
    name: "status",
    label: "ESTADO",
    align: "center",
    field: "status",
    sortable: true,
  },
]);

onBeforeMount(() => {
  getFiches();
});

async function getFiches() {
  let response = await getData("Repfora/fiches");
  rows.value = response;
}

async function getApprenticesByFiche(ficheId) {
  let response = await getData(`Apprentice/listapprenticebyfiche/${ficheId}`);
  console.log("response from getApprenticesByFiche: ", response);
  rows2.value = response.apprentices;
}

const openDialogWithRow = (row) => {
  selectedRow.value = row;
  dialog.value = true;
  console.log('row: ', row);
  
  getApprenticesByFiche(row._id); 
};

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

function toggleEstado(row) {
  row.estado = row.estado === 1 ? 0 : 1;
}
</script>
