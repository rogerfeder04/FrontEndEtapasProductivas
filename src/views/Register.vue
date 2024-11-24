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
        :onClickOpenModal="openDialog"
        :onClickToggleStatus="toggleStatus"
        :onClickEdit="editRegisterModal"
        :onClickSeeDetails="seeRegisterDetails"
        :onClickSeeHourReports="seeRegisterReports"
        :onClickSeeAssignments="seeRegisterAssignments"
        :loading="loading"
      ></Table>
    </div>

    <FormModal
        :modelValue="dialog"
        :title="modalityDialogTitle"
        @update:modelValue="dialog = $event"
        :next="nextFormModal"
        :loadingButton="loadingButton"
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

          <CustomInput
            id="startDate"
            filled
            label="Fecha de Inicio"
            v-model="startDate"
            required
            errorMessage="Fecha requerida"
            icon="calendar-days"
            type="date"
          />
          <CustomInput
            id="endDate"
            filled
            label="Fecha de Fin"
            v-model="endDate"
            required
            errorMessage="Fecha requerida"
            icon="calendar-days"
            type="date"
          />
          <CustomInput
            id="company"
            filled
            label="Nombre de la Empresa"
            v-model="company"
            required
            errorMessage="Empresa requerida"
            icon="spell-check"
            type="text"
          />
          <CustomInput
            id="phoneCompany"
            filled
            label="Teléfono de la empresa"
            v-model="phoneCompany"
            required
            errorMessage="Número de contacto requerido"
            icon="phone"
            type="text"
          />
          <CustomInput
            id="addressCompany"
            filled
            label="Dirección de la empresa"
            v-model="addressCompany"
            required
            errorMessage="Dirección requerida"
            icon="map-location-dot"
            type="text"
          />
          <CustomInput
            id="owner"
            filled
            label="Dueño de la Empresa"
            v-model="owner"
            required
            errorMessage="Dueño requerido"
            icon="user-tie"
            type="text"
          />

          <!-- Cambiar CustomInput por CustomFile cuando se arregle el backend -->
          <CustomInput
            id="docAlternative"
            filled
            label="Documento Alternativo"
            v-model="docAlternative"
            required
            errorMessage="Documento requerido"
            icon="file-invoice"
            type="text"
          />

          <!-- Cambiar CustomInput por CustomFile cuando se arregle el backend -->
          <CustomInput
            id="certificationDoc"
            filled
            label="Documento de Certificación"
            v-model="certificationDoc"
            required
            errorMessage="Documento requerido"
            icon="file-invoice"
            type="text"
          />
          <CustomInput
            id="hour"
            filled
            label="Horas"
            v-model="hour"
            required
            errorMessage="Horas requeridas"
            icon="clock"
            type="text"
          />
          <CustomInput
            id="businessProyectHour"
            filled
            label="Horas del Proyecto de Negocio"
            v-model="businessProyectHour"
            required
            errorMessage="Horas requeridas"
            icon="stopwatch"
            type="text"
          />
          <CustomInput
            id="productiveProjectHour"
            filled
            label="Horas del Proyecto Productivo"
            v-model="productiveProjectHour"
            required
            errorMessage="Horas requeridas"
            icon="stopwatch"
            type="text"
          />
          <CustomInput
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
import CustomFile from "@/components/inputs/CustomFile.vue";
import FormModal from "@/components/modals/FormModal.vue";
import CustomInput from "@/components/inputs/CustomInput.vue";
import { useRouter } from "vue-router";
import { notifyErrorRequest, notifySuccessRequest } from "@/composables/Notify.vue";

import { getData, postData, putData } from "@/services/apiClient.js";

const title = ref("REGISTRO EP");
const dialog = ref(false);
const secondModaldialog = ref(false);
const modalityDialogTitle = ref("SELECCIONE MODALIDAD");
const dialogTitle = ref("");
const drawerOpen = ref(true);
const loading = ref(false);
const loadingButton = ref(false);
const router = useRouter();
const registerId = ref("");



const modalitiesOptions = ref([]);
const apprenticeOptions = ref([]);

//v-models de los inputs
const apprentice = ref("")
const modalityId = ref("");
const startDate = ref("");
const endDate = ref("");
const company = ref("");
const phoneCompany = ref("");
const addressCompany = ref("");
const owner = ref("");
const docAlternative = ref("");
const certificationDoc = ref("")
const hour = ref("");
const businessProyectHour = ref("");
const productiveProjectHour = ref("");
const mailCompany = ref("");

const rows = ref([]);
const columns = ref([
{
    name: "numberList",
    required: true,
    label: "N°",
    align: "center",
    field: "numberList"
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
    name: "status",
    align: "center",
    label: "ESTADO",
    field: "endDate",
    sortable: true,
  },
  {
    name: "toggleStatus",
    label: "CAMBIAR ESTADO",
    align: "center",
    sortable: true,
  },
  {
    name: "actions",
    align: "center",
    label: "OPCIONES",
  },
]);

onBeforeMount(() => {
  getDataForTable();
})

async function getDataForTable() {
  loading.value = true;
  try {
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
} catch (error) {
  console.log('error in getDataForTable: ', error);
} finally {
  loading.value = false;
}
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

async function filterApprentice(val, update) {
  if (val === "") {
    update(() => apprenticeOptions.value);
    return;
  }
};

const openDialog = () => {
apprentice.value = ""
modalityId.value = ""
startDate.value = ""
endDate.value = ""
company.value = ""
phoneCompany.value = ""
addressCompany.value = ""
owner.value = ""
docAlternative.value = ""
hour.value = ""
businessProyectHour.value = ""
productiveProjectHour.value = ""
mailCompany.value = ""
  
  dialogTitle.value = "SELECCIONE MODALIDAD";
  dialog.value = true;
};

const saveRegister  = async () => {
  loadingButton.value = true;
    try {
    const registerData = {
    idApprentice : apprentice.value.apprenticeId,
    idModality: modalityId.value._id,
    startDate: startDate.value,
    endDate: endDate.value,
    company: company.value,
    phoneCompany: phoneCompany.value,
    addressCompany: addressCompany.value,
    owner: owner.value,
    docAlternative: docAlternative.value,
    certificationDoc: certificationDoc.value,
    hour: hour.value,
    businessProyectHour: businessProyectHour.value,
    productiveProjectHour: productiveProjectHour.value,
    mailCompany: mailCompany.value,
  };

    let response = await postData("Register/addregister", registerData);

    // rows.value = response.data;
    getDataForTable()
    secondModaldialog.value = false;
    notifySuccessRequest("Registro guardado exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al guardar la asignación");
  } finally {
    loadingButton.value = false;

  }
};

const editRegisterModal  = async (row) => {
  try {
    console.log('row in editRegisterModal: ', row);
    
apprentice.value = row.idApprentice[0];
modalityId.value = row.idModality;
startDate.value = row.startDate;
endDate.value = row.endDate;
company.value = row.company;
phoneCompany.value = row.phoneCompany;
addressCompany.value = row.addressCompany;
mailCompany.value = row.mailCompany;
owner.value = row.owner;
docAlternative.value = row.docAlternative;
certificationDoc.value = row.certificationDoc,
hour.value = row.hour;
businessProyectHour.value = row.businessProyectHour;
productiveProjectHour.value = row.productiveProjectHour;

    dialog.value = true;
    dialogTitle.value = "EDITAR REGISTRO ETAPA PRODUCTIVA APRENDIZ";

  } catch (error) {
    console.log('error in editRegister: ', error);
    
  }
};

async function toggleStatus(row) {
  try {
    console.log('row in toggleStatus: ', row);
    
    const url =
      row.status === 0
        ? `Register/enableregister/${row._id}`
        : `Register/disableregister/${row._id}`;
    await putData(url, {});
    await getDataForTable();
    notifySuccessRequest("Estado cambiado exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al cambiar el estado del registro");
    console.log('error in toggleStatus: ', error);
      }
};

async function seeRegisterDetails(row) {
    router.push({
    path: '/productivestagedetails',
    query: { registerId: row._id}
});
};

async function seeRegisterAssignments(row) {
    router.push({
    path: '/assignments',
    query: { registerId: row._id}
});
};

async function seeRegisterReports(row) {
    router.push({
    path: '/reports',
    query: { registerId: row._id}
});
};
</script>