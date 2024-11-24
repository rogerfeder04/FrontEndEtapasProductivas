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
      </div><br>
  
      <Table
        :rows="rows"
        :columns="columns"
        :loading="loading"
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
import { getData } from "@/services/apiClient.js";
import { Loading } from "quasar";
  
const title = ref("BITÁCORAS");
const drawerOpen = ref(true);
const loading = ref(false)

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
    name: "instructor",
    required: true,
    label: "N° BITÁCORA",
    align: "center",
    field: row => row.instructor.idInstructor,
    sortable: true,
  },
  {
    name: "instructor",
    required: true,
    label: "INSTRUCTOR",
    align: "center",
    field: row => row.instructor.idInstructor,
    sortable: true,
  },
  {
    name: "document",
    required: true,
    label: "ESTADO",
    align: "center",
    field: "document",
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
  ]);
  
  onBeforeMount(() => {
    getBinnacles()
  })
  
  async function getBinnacles() {
  loading.value = true
  try{
  let response = await getData("Binnacle/listallbinnacles");
  console.log('Response from getBinnacles:  ', response);
  rows.value = response;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
    
  function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
  }
  </script>

  