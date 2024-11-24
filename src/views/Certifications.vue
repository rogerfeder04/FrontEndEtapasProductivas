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
import { notifyErrorRequest, notifySuccessRequest } from "@/composables/Notify.vue";

import { getData, postData } from "@/services/apiClient.js";

const title = ref("CERTIFICACIONES  ");
const drawerOpen = ref(true);
const loading = ref (false)

const rows = ref([]);
const columns = ref([
  {
    name: "name",
    required: true,
    label: "NOMBRE  DEL APRENDIZ",
    align: "center",
    field: "name",
    sortable: true,
  },
  {
    name: "hourInstructorFollow",
    align: "center",
    label: "ESTADO",
    field: "hourInstructorFollow" || "N/A",
    sortable: true,
  },
  {
    name: "hourInstructorTechnical",
    label: "DOCUMENTO DE CERTIFICACIÓN",
    align: "center",
    field: "hourInstructorTechnical" || "N/A",
    sortable: true,
  },
  {
    name: "hourInstructorProject",
    label: "DOCUMENTO DE JUICIO",
    align: "center",
    field: "hourInstructorProject" || "N/A",
    sortable: true,
  }
]);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

</script>
