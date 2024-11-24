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

import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import Table from "@/components/tables/TableWithButtons.vue";
import Footer from "@/components/layouts/Footer.vue";
import { notifyErrorRequest, notifySuccessRequest } from "@/composables/Notify.vue";
import { getData, postData } from "@/services/apiClient.js";
  
const title = ref("MIS ASIGNACIONES");
const dialog = ref(false);
const drawerOpen = ref(true);
const dialogTitle = ref("SELECCIONE MODALIDAD");
const loading = ref(false)
let idInstructor =ref(null)


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
    label: "NOMBRE APRENDIZ",
    field: "assignment",
    sortable: true,
  },
  {
    name: "binnacleNumber",
    required: true,
    label: "N° DOCUMENTO",
    align: "center",
    field: "number",
    sortable: true,
  },
  {
    name: "number",
    required: true,
    label: "MODALIDAD",
    align: "center",
    field: "number",
    sortable: true,
  },
  {
    name: "observation",
    required: true,
    label: "TIPO INSTRUCTOR",
    align: "center",
    field: row => row.observation.observation,
    sortable: true,
  },
  {
    name: "document",
    required: true,
    label: "BITÁCORAS",
    align: "center",
    field: "document",
    sortable: true,
  },
  {
    name: "opciones",
    label: "SEGUIMIENTOS",
    align: "center",
    sortable: true,
  },
  ]);
  
  onBeforeMount(() => {
    getInstructorId();
  })

  async function getInstructorId() {
    try {
      loading.value = true;

      const response = await getData(`Repfora/instructors`);
      const selectInstructor = response.find(
        instructor => instructor.email === localStorage.getItem("userEmail")
      );

      if (selectInstructor) {
        idInstructor.value = selectInstructor._id;
      }
      getAssignmentsById();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  };

  const getAssignmentsById = async () => {
    try{
        const response = await getData(`Register/listassigmentbyfollowupinstructor/${idInstructor.value}`)
        console.log('response from getAssignmentsById:  ', response);
        
    } catch (error){
        console.error('error from getAssignmentsById:  ', error.response.data.message);
        notifyErrorRequest(error.response.data.message);
    }
  };

  function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
  };
  
  </script>

  