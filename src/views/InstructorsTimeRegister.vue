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

      <CustomButton 
        label="CREAR BITÁCORA"
        :onClickFunction="openDialog"
        :icon="['fa', 'circle-plus']"
      >
      </CustomButton>
  
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

import { notifyErrorRequest } from "@/composables/notify/Notify.vue";

import { getData } from "@/services/apiClient.js";

const title = ref("Informe Horas Instructores EP");
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
    label: "NOMBRE INSTRUCTOR",
    field: "assignment",
    sortable: true,
  },
  {
    name: "binnacleNumber",
    required: true,
    label: "ETAPA PRODUCTIVA",
    align: "center",
    field: "number",
    sortable: true,
  },
  {
    name: "number",
    required: true,
    label: "ROL INSTRUCTOR",
    align: "center",
    field: "number",
    sortable: true,
  },
  {
    name: "observation",
    required: true,
    label: "HORAS EJECUTADAS",
    align: "center",
    field: row => row.observation.observation,
    sortable: true,
  },
  {
    name: "document",
    required: true,
    label: "HORAS PENDIENTES",
    align: "center",
    field: "document",
    sortable: true,
  },
  {
    name: "opciones",
    label: "HORAS TOTALES",
    align: "center",
    sortable: true,
  },
  ]);

  onBeforeMount(() => {
  })
</script>