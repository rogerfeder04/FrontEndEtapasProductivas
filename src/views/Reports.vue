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

    <div class="table-container">
      
      <h5>{{ title }}</h5>

      <div style="display:flex; align-items: center !important;">
        <q-btn  to="/home" dense unelevated round color="primary" icon="arrow_back" text-color="white" />
        <hr 
          id="hr" 
          color="primary"
        >
      </div>

      <CustomButton label="CREAR MODALIDAD" :onClickFunction="openDialog">
      </CustomButton>

      <Table
        :rows="rows"
        :columns="columns"
        :title="title"
        :onClickEdit="openDialog"
        :onClickActivate="toggleEstado"
      ></Table>
    </div>

    <FormModal
        :modelValue="dialog"
        :title="dialogTitle"
        :onSave="saveAssignment"
        @update:modelValue="dialog = $event"
      >
        <template #content>
          <InputLog
            id="name"
            filled
            label="Nombre de la modalidad"
            v-model="name"
            required
            errorMessage="Nombre de la modalidad requerido"
            icon="file"
            type="text"
          />

          <InputLog
            id="hourInstructorFollow"
            filled
            label="Horas del Instructor de Seguimiento"
            v-model="hourInstructorFollow"
            required
            errorMessage="Horas requeridas"
            icon="chalkboard-user"
            type="text"
          />
          <InputLog
            id="hourInstructorTechnical"
            filled
            label="Horas del Instructor Técnico"
            v-model="hourInstructorTechnical"
            required
            errorMessage="Horas requeridas"
            icon="street-view"
            type="text"
          />
          <InputLog
            id="hourInstructorProject"
            filled
            label="Horas de Instructor de Proyecto"
            v-model="hourInstructorProject"
            required
            errorMessage="Horas requeridas"
            icon="person-chalkboard"
            type="text"
          />
        </template>
      </FormModal>
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
import CustomButton from "@/components/buttons/CustomButton.vue";
import FormModal from "@/components/modals/FormModal.vue";
import InputLog from "@/components/inputs/CustomInput.vue";
import { notifyErrorRequest, notifySuccessRequest } from "@/composables/notify/Notify.vue";

import { getData, postData } from "@/services/apiClient.js";

const title = ref("MODALIDADES");
const dialog = ref(false);
const dialogTitle = ref("CREAR MODALIDAD");

//v-models de los inputs
const name = ref("");
const hourInstructorFollow = ref("");
const hourInstructorTechnical = ref("");
const hourInstructorProject = ref("");


const modalityData = {
  name: name.value,
  hourInstructorFollow: hourInstructorFollow.value,
  hourInstructorTechnical: hourInstructorTechnical.value,
  hourInstructorProject: hourInstructorProject.value,

};
const rows = ref([]);
const columns = ref([
  {
    name: "name",
    required: true,
    label: "Modalidad",
    align: "center",
    field: "name",
    sortable: true,
  },
  {
    name: "hourInstructorFollow",
    align: "center",
    label: "Horas Instructor de Seguimiento",
    field: "hourInstructorFollow" || "No aplica",
    sortable: true,
  },
  {
    name: "hourInstructorTechnical",
    label: "Horas Instructor Técnico",
    align: "center",
    field: "hourInstructorTechnical" || "No aplica",
    sortable: true,
  },
  {
    name: "hourInstructorProject",
    label: "Horas Instructor de Proyecto",
    align: "center",
    field: "hourInstructorProject",
    sortable: true,
  }
]);

onBeforeMount( ()=> {
  getModalities()
})

async function getModalities() {
  let response = await getData("Modality/listallmodality");
  console.log(response);
  rows.value = response.modality;
}

const drawerOpen = ref(false);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const openDialog = () => {
  dialog.value = true;
};

const saveModality = async () => {
  try {
    let response = await postData("Modality/addmodality", modalityData);

    // Si la respuesta es exitosa, actualizamos la tabla y cerramos el modal
    rows.value = response;
    dialog.value = false;
    notifySuccessRequest("Asignación guardada exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al guardar la asignación");
  }
};

const toggleEstado = (row) => {
  // Lógica para cambiar el estado de la fila
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
