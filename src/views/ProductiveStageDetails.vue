<template>
    <q-layout view="lHh Lpr lff" class="layout">
      <q-page-container>

      <br>

      <div class="table-container">
        <h5>{{ title }}</h5>

        <div style="display:flex; align-items: center !important;">
        <q-btn  to="/register" dense unelevated round color="primary" icon="arrow_back" text-color="white" />
        <hr 
          id="hr" 
          color="primary"
        >
      </div><br>
  
      <Table
        :rows="rows"
        :columns="columns"
      ></Table>
    </div>
  </q-page-container>
  <Footer></Footer>
  </q-layout>
  </template>
  
<script setup>
import { ref, onBeforeMount } from "vue";

import Footer from "@/components/layouts/Footer.vue"
import Table from "@/components/tables/TableWithButtons.vue";
import { getData } from "@/services/apiClient.js";
  
const title = ref("DETALLES DE LA ETAPA PRODUCTIVA");
const drawerOpen = ref(true);

  const rows = ref([]);
  const columns = ref([
  {
    name: "name",
    required: true,
    label: "NOMBRE EMPRESA",
    align: "center",
    field: (row) => `${row.firstName || ""} ${row.lastName || ""}`.trim(),
    sortable: true,
  },
  {
    name: "tpDocument",
    align: "center",
    label: "TEL. EMPRESA",
    field: "tpDocument",
    sortable: true,
  },
  {
    name: "numDocument",
    align: "center",
    label: "EMAIL EMPRESA",
    field: "numDocument",
  },
  {
    name: "personalEmail",
    align: "center",
    label: "JEFE INMEDIATO",
    field: "personalEmail",
  },
  {
    name: "institutionalEmail",
    align: "center",
    label: "DOCUMENTOS ALTERNATIVOS",
    field: "institutionalEmail",
  },
  {
    name: "phone",
    align: "center",
    label: "CERTIFICACIÓN",
    field: "phone",
  },
  {
    name: "fiche",
    label: "JUICIO DEL APRENDIZ",
    align: "center",
    field: (row) => row.fiche.name,
  }
]);  
  onBeforeMount(() => {
  })
  </script>

  