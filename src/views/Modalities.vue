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
       label="CREAR MODALIDAD" 
       :onClickFunction="openDialog" 
       :icon="['fa', 'circle-plus']">
      </CustomButton>

      <Table
        :rows="rows"
        :columns="columns"
        :onClickEdit="openDialog"
        :onClickActivate="toggleStatus"
        :loading="loading"
      ></Table>
    </div>

    <FormModal
        :modelValue="dialog"
        :title="dialogTitle"
        :onSave="saveModality"
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
            icon="spell-check"
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
import { ref, onBeforeMount, computed } from "vue";

import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import Footer from "@/components/layouts/Footer.vue"
import Table from "@/components/tables/TableWithButtons.vue";
import CustomButton from "@/components/buttons/CustomButton.vue";
import FormModal from "@/components/modals/FormModal.vue";
import InputLog from "@/components/inputs/CustomInput.vue";
import { notifyErrorRequest, notifySuccessRequest } from "@/composables/Notify.vue";

import { getData, postData } from "@/services/apiClient.js";

const title = ref("MODALIDADES");
const dialog = ref(false);
const dialogTitle = ref("CREAR MODALIDAD");
const drawerOpen = ref(true);
const loading = ref(false)


//v-models de los inputs
const name = ref("");
const hourInstructorFollow = ref("");
const hourInstructorTechnical = ref("");
const hourInstructorProject = ref("");

// Computed para modalityData
const modalityData = computed(() => {
  return {
    name: name.value,
    hourInstructorFollow: hourInstructorFollow.value,
    hourInstructorTechnical: hourInstructorTechnical.value,
    hourInstructorProject: hourInstructorProject.value,
  };
});

const rows = ref([]);
const columns = ref([
  {
    name: "name",
    required: true,
    label: "NOMBRE MODALIDAD",
    align: "center",
    field: "name",
    sortable: true,
  },
  {
    name: "hourInstructorFollow",
    align: "center",
    label: "HORAS INS. SEGUIMIENTO",
    field: "hourInstructorFollow" || "N/A",
    sortable: true,
  },
  {
    name: "hourInstructorTechnical",
    label: "HORAS INS. TÉCNICO",
    align: "center",
    field: "hourInstructorTechnical" || "N/A",
    sortable: true,
  },
  {
    name: "hourInstructorProject",
    label: "HORAS INS PROYECTO",
    align: "center",
    field: "hourInstructorProject" || "N/A",
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
    name: "options",
    label: "OPCIONES",
    align: "center",
    field: "options",
    sortable: true,
  },


]);

onBeforeMount( ()=> {
  getModalities()
})

async function getModalities() {
  try{
    loading.value = true
  let response = await getData(`Modality/listallmodality`);
  console.log(response);
  rows.value = response.modality;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false
  }
}

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const openDialog = () => {
  dialog.value = true;
};

const saveModality = async () => {
  try {
    let response = await postData(`Modality/addmodality`, modalityData.value);
    console.log('response from modalityData: ', modalityData.value);
    
    // Si la respuesta es exitosa, actualizamos la tabla y cerramos el modal
    rows.value = response;
    dialog.value = false;
    notifySuccessRequest("Asignación guardada exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al guardar la asignación");
  }
};


async function toggleStatus(row) {
  try {
    const url = row.status === 0
        ? `Modality/enablemodalitybyid/${row._id}`
        : `Modality/disablemodalitybyid/${row._id}`;
    await putData(url, {});
    await getApprentices();
    notifySuccessRequest("Estado cambiado exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al cambiar el estado del aprendiz");
  }
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
