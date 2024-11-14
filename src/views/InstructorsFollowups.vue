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
import Table from "@/components/tables/TableWithButtons.vue";
import Footer from "@/components/layouts/Footer.vue"
import { notifyErrorRequest } from "@/composables/notify/Notify.vue";

import { getData } from "@/services/apiClient.js";

const title = ref("SEGUIMIENTOS");
const dialog = ref(false);
const drawerOpen = ref(true);

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
    name: "assignment",
    align: "center",
    label: "ETAPA PRODUCTIVA ASIGNADA",
    field: "assignment",
    sortable: true,
  },
  {
    name: "binnacleNumber",
    required: true,
    label: "N° SEGUIMIENTO",
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
    name: "observation",
    required: true,
    label: "OBSERVACIONES",
    align: "center",
    field: row => row.observation.observation,
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "FECHA",
    field: "date",
    sortable: true,
  },

]);

onBeforeMount(() => {
    getFollowUps();
})

async function getFollowUps() {
  try{
  await getData("Followup/listallfollowup");
  rows.value = response.followup;
} catch (error) {
  notifyErrorRequest(error.response.data.errors[0].msg);
  console.log(error);
}
}

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const openDialog = () => {
  dialog.value = true;
};

</script>

