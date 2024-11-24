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
        :loading="loading"
      ></Table>
    </div>

  <FormModal
    :modelValue="dialog"
    :title="dialogTitle"
    :onSave="saveBinnacle"
    @update:modelValue="dialog = $event"
  >
  <template #content>
    <CustomInput
      id="apprenticeName"
      filled
      label="Nombres Aprendiz"
      v-model="apprenticeName"
      required
      errorMessage="Nombres del Aprendiz requeridos"
      icon="spell-check"
      type="text"
    />

    <CustomInput
      id="binnacleNumber"
      filled
      label="N° Bitácora"
      v-model="binnacleNumber"
      required
      errorMessage="N° Bitácora requerida"
      icon="hashtag"
      type="text"
    />

    <CustomInput
      id="date"
      filled
      label="Fecha"
      v-model="date"
      required
      errorMessage="Fecha requerida"
      icon="calendar-days"
      type="date"
    />
    <CustomFile
      id="document"
      filled
      label="Documento"
      required
      errorMessage="Documento de bitacora requerido"
      icon="file-arrow-up"
      type="file"
    />
    <CustomInput
      id="status"
      filled
      label="Estado"
      v-model="status"
      disabled
      icon="list-ol"
      type="text"
    />
  </template>
</FormModal>

  </q-page-container>
  </q-layout>
  </template>
  
<script setup>
import { ref, onBeforeMount } from "vue";

import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import Table from "@/components/tables/TableWithButtons.vue";
import CustomButton from "@/components/buttons/CustomButton.vue";
import FormModal from "@/components/modals/FormModal.vue";
import CustomInput from "@/components/inputs/CustomInput.vue";
import CustomFile from "@/components/inputs/CustomFile.vue";
import { notifyErrorRequest, notifySuccessRequest } from "@/composables/Notify.vue";
import { getData, postData } from "@/services/apiClient.js";
  
const title = ref("BITÁCORAS");
const dialog = ref(false);
const dialogTitle = ref("CREAR BITÁCORA"); 
const drawerOpen = ref(true);
const loading = ref(false)
let idInstructor = ref('')

//v-models de los inputs
const apprenticeName = ref('')
const binnacleNumber = ref('')
const date = ref('')
const document = ref(null)
const status = ref('Programada')

const binnacleData = {
  apprenticeName: apprenticeName.value,
  binnacleNumber: binnacleNumber.value,
  date: date.value,
  document: document.value,
  status: status.value,
}

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
    label: "N° BITÁCORA",
    align: "center",
    field: "number",
    sortable: true,
  },
  {
    name: "number",
    required: true,
    label: "ESTADO",
    align: "center",
    field: "number",
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
    name: "document",
    required: true,
    label: "OBSERVACIONES",
    align: "center",
    field: "document",
    sortable: true,
  },
  {
    name: "opciones",
    label: "VALIDAR HORAS",
    align: "center",
    sortable: true,
  },
  ]);
  
  onBeforeMount(() => {
    getInstructorId();
  })

  async function getInstructorId() {
    loading.value = true
    try {
      const response = await getData(`Repfora/instructors`);
      const selectInstructor = response.find(
        instructor => instructor.email === localStorage.getItem("userEmail")
      );

      if (selectInstructor) {
        idInstructor.value = selectInstructor._id;
      }
      getBinnacles();
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }
  
  async function getBinnacles() {
  try {
  let response = await getData(`Binnacle/listbinnaclesbyinstructor/${idInstructor.value}`);
  console.log('response from getBinnacles:  ', response);
  rows.value = response;
  }
 catch (error) {  
  notifyErrorRequest(error.response.data.errors[0].msg);
}}


  function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
  }
  
  const openDialog = (row) => {
    dialog.value = true;
  };

  const saveBinnacle = async () => {
    try {
      let response = await postData('Binnacle/addbinnacles', binnacleData);
      rows.value = response;
      dialog.value = false;
        notifySuccessRequest('Bitacora guardada exitosamente');
    } catch (error) {
        notifyErrorRequest(error.response.data.errors[0].msg);
      }
    };
  
  const toggleEstado = (row) => {
  row.estado = row.estado === 1 ? 0 : 1;
  console.log("Nuevo estado:", row.estado);
  };
  </script>

  