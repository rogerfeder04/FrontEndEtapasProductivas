<template>
    <q-layout view="lHh Lpr lff">
      <q-page-container>

      <br>

      <div class="tableContainer">
        <h5>{{ title }}</h5>

        <div style="display:flex; align-items: center !important;">
        <q-btn  to="/register" dense unelevated round color="primary" icon="arrow_back" text-color="white" />
        <hr 
          id="hr" 
          color="primary"
        >
      </div><br>

       <div class="card-container">
      <DetailsCard 
        v-for="(item, index) in generateCardData" 
        :key="index" 
        :title="item.title" 
        :content="item.content"
      />
  </div>
  <br>

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

import Footer from "@/components/layouts/Footer.vue"
import Table from "@/components/tables/TableWithButtons.vue";
import DetailsCard from "@/components/cards/ProductiveStageDetailsCard.vue"
import { getData } from "@/services/apiClient.js";
  
const title = ref("DETALLE ETAPA PRODUCTIVA");
const content = ref("NOMBRES DEL APRENDIZ")
const loading = ref(false)

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

  const generateCardData = [
    {title: 'Nombres Aprendiz', content: 'Daniel Silva' },
    {title: 'Tipo Documento', content: 'CC' },
    {title: 'Número Documento', content: '102165154' },
    {title: 'Ficha', content: 'ANÁLISIS Y DESARROLLO DE SOFTWARE' },
    {title: 'N° Ficha', content: '2711689' },
    {title: 'Modalidad', content: 'Contrato de Aprendizaje' },
    {title: 'Fecha Inicio', content: '02/02/2025' },
    {title: 'Fecha Fin', content: '02/08/2025' },


  ]
  </script>

<style scooped>
  .card-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: center !important;
    gap: 2%;

  }
  .tableContainer {
    justify-content: center !important;
    justify-items: center !important;
    align-items: center !important;
    align-content: center !important;

  }


</style>