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
       label="CREAR REGISTRO" 
       :onClickFunction="openDialog"
       :icon="['fa', 'circle-plus']"
       >
      </CustomButton>

      <Table
        :rows="rows"
        :columns="columns"
        :onClickEdit="openDialog"
        :onClickActivate="toggleStatus"
      ></Table>
    </div>



    <FormModal
        :modelValue="dialog"
        :title="dialogTitle"
        @update:modelValue="dialog = $event"
        :next="nextFormModal"
      >
        <template #content>
          <div class="input-grid">
          <CustomSelect
              map-options
              label="Seleccionar modalidad"
              v-model="modalityId"
              required
              :options="modalitiesOptions"
              optionLabel="name"
              optionValue="_id"
              errorMessage="Modalidad requerida"
              icon="shapes"
              type="text"
            >
            </CustomSelect>
          
        </div>
        </template>
      </FormModal>

    <FormModal
        :modelValue="secondModaldialog"
        :title="dialogTitle"
        :onSave="saveRegister"
        @update:modelValue="secondModaldialog = $event"
      >
        <template #content>
          <div class="input-grid">
            <CustomSelect
              map-options
              label="Aprendiz"
              v-model="apprentice"
              @filter="filterApprentice"
              required
              :options="apprenticeOptions"
              optionLabel="apprenticeName"
              optionValue="apprenticeId"
              errorMessage="Aprendiz requerido"
              icon="users-line"
              type="text"
            >
            </CustomSelect>

          <Input
            id="startDate"
            filled
            label="Fecha de Inicio"
            v-model="startDate"
            required
            errorMessage="Fecha requerida"
            icon="calendar-days"
            type="date"
          />
          <Input
            id="endDate"
            filled
            label="Fecha de Fin"
            v-model="endDate"
            required
            errorMessage="Fecha requerida"
            icon="calendar-days"
            type="date"
          />
          <Input
            id="company"
            filled
            label="Nombre de la Empresa"
            v-model="company"
            required
            errorMessage="Empresa requerida"
            icon="spell-check"
            type="text"
          />
          <Input
            id="phoneCompany"
            filled
            label="Teléfono de la empresa"
            v-model="phoneCompany"
            required
            errorMessage="Número de contacto requerido"
            icon="phone"
            type="text"
          />
          <Input
            id="addressCompany"
            filled
            label="Dirección de la empresa"
            v-model="addressCompany"
            required
            errorMessage="Dirección requerida"
            icon="map-location-dot"
            type="text"
          />
          <Input
            id="owner"
            filled
            label="Dueño de la Empresa"
            v-model="owner"
            required
            errorMessage="Dueño requerido"
            icon="user-tie"
            type="text"
          />
          <Input
            id="docAlternative"
            filled
            label="Documento Alternativo"
            v-model="docAlternative"
            required
            errorMessage="Documento requerido"
            icon="file-invoice"
            type="text"
          />
          <Input
            id="hour"
            filled
            label="Horas"
            v-model="hour"
            required
            errorMessage="Horas requeridas"
            icon="clock"
            type="text"
          />
          <Input
            id="businessProyectHour"
            filled
            label="Horas del Proyecto de Negocio"
            v-model="businessProyectHour"
            required
            errorMessage="Horas requeridas"
            icon="stopwatch"
            type="text"
          />
          <Input
            id="productiveProjectHour"
            filled
            label="Horas del Proyecto Productivo"
            v-model="productiveProjectHour"
            required
            errorMessage="Horas requeridas"
            icon="stopwatch"
            type="text"
          />
          <Input
            id="mailCompany"
            filled
            label="Email de la empresa"
            v-model="mailCompany"
            required
            errorMessage="Email de la empresa requerido"
            icon="envelope"
            type="text"
          />
        </div>
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
import Footer from "@/components/layouts/Footer.vue";
import Table from "@/components/tables/TableWithButtons.vue";
import CustomButton from "@/components/buttons/CustomButton.vue";
import CustomSelect from "@/components/inputs/CustomSelect.vue";
import FormModal from "@/components/modals/FormModal.vue";
import Input from "@/components/inputs/CustomInput.vue";
import { notifyErrorRequest, notifySuccessRequest } from "@/composables/notify/Notify.vue";

import { getData, postData } from "@/services/apiClient.js";

const title = ref("REGISTRO EP");
const dialog = ref(false);
const secondModaldialog = ref(false);
const dialogTitle = ref("SELECCIONE MODALIDAD");
const drawerOpen = ref(true);

const modalitiesOptions = ref([]);
const apprenticeOptions = ref([]);

//v-models de los inputs
const idApprentice = ref("");
const modalityId = ref("");
const startDate = ref("");
const endDate = ref("");
const company = ref("");
const phoneCompany = ref("");
const addressCompany = ref("");
const owner = ref("");
const docAlternative = ref("");
const hour = ref("");
const businessProyectHour = ref("");
const productiveProjectHour = ref("");
const mailCompany = ref("");

const registerData = {
  idApprentice: idApprentice.value,
  modalityId: modalityId.value,
  startDate: startDate.value,
  endDate: endDate.value,
  company: company.value,
  phoneCompany: phoneCompany.value,
  addressCompany: addressCompany.value,
  owner: owner.value,
  docAlternative: docAlternative.value,
  hour: hour.value,
  businessProyectHour: businessProyectHour.value,
  productiveProjectHour: productiveProjectHour.value,
  mailCompany: mailCompany.value,
};

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
    name: "name",
    required: true,
    label: "NOMBRE APRENDIZ",
    align: "center",
    field: "apprenticeName",
    sortable: true,
  },
  {
    name: "ficheNumber",
    required: true,
    label: "COD. FICHA",
    align: "center",
    field: "ficheNumber",
    sortable: true,
  },
  {
    name: "ficheName",
    required: true,
    label: "FICHA",
    align: "center",
    field: "ficheName",
    sortable: true,
  },
  {
    name: "modality",
    align: "center",
    label: "MODALIDAD",
    field: "modalityName",
    sortable: true,
  },
  {
    name: "magnifyingGlassButton",
    align: "center",
    label: "ASIGNACION",
    sortable: true,
  },
  {
    name: "startDate",
    required: true,
    label: "FECHA INICIO",
    align: "center",
    field: "startDate",
    sortable: true,
  },
  {
    name: "endDate",
    align: "center",
    label: "FECHA FIN",
    field: "endDate",
    sortable: true,
  },
  {
    name: "eyeButton",
    align: "center",
    label: "DETALLES",
  },
  {
    name: "secondEyeButton",
    align: "center",
    label: "REGISTRO HORAS",
  },
  {
    name: "status",
    align: "center",
    label: "ESTADO",
    field: "endDate",
    sortable: true,
  },
  {
    name: "options",
    label: "OPCIONES",
    align: "center",
    sortable: true,
  },
]);

onBeforeMount(() => {
  getDataForTable();
})

async function getDataForTable() {
  const getRegisters = await getData("Register/listallregister");
  const getApprentices = await getData("Apprentice/listallapprentice");
  const getModalities = await getData("Modality/listallmodality");

  const registersWithApprenticeAndModality = getRegisters.register.map(register => {

    const apprentice = getApprentices.apprentices.find(apprentice => apprentice._id === register.idApprentice[0]);

    console.log('apprentice: ', apprentice);
    
    const modality = getModalities.modality.find(modality => modality._id === register.idModality);

    modalitiesOptions.value = getModalities.modality.map((modality) => ({
      _id: modality._id,
      name: modality.name,
    }));

    apprenticeOptions.value = getApprentices.apprentices.map((apprentice) => ({
      apprenticeId: apprentice._id,
      apprenticeName: `${apprentice.firstName} ${apprentice.lastName} - ${apprentice.fiche.name}`.trim(),
    }));

    return {
      ...register,
      apprenticeName: apprentice ? `${apprentice.firstName} ${apprentice.lastName}` : 'No Encontrado',
      ficheNumber: apprentice ? `${apprentice.fiche.number}` : 'No Encontrada',
      ficheName: apprentice ? `${apprentice.fiche.name}` : 'No Encontrada',
      modalityName: modality ? modality.name : 'No Encontrada',
      startDate: formatDate(register.startDate),
      endDate: formatDate(register.endDate)
    };
  });

  rows.value = registersWithApprenticeAndModality;
};


function formatDate(date) {
  if (!date) return 'No Encontrado';
  const formattedDate = new Date(date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  return formattedDate;
}

function nextFormModal() {
  dialogTitle.value = "CREAR REGISTRO ETAPA PRODUCTIVA APRENDIZ";
  dialog.value = false;
  secondModaldialog.value = true;
}


function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const openDialog = () => {
  dialog.value = true;
};

const saveRegister  = async () => {
  try {
    let response = await postData("Register/addregister", registerData);

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
    const url =
      row.status === 0
        ? `Register/enableregister/${row._id}`
        : `Register/disableregister/${row._id}`;
    await putData(url, {});
    await getRegisters();
    notifySuccessRequest("Estado cambiado exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al cambiar el estado del registro");
  }
};
</script>

