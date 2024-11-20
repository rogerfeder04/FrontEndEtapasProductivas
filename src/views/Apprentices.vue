<template>
  <q-layout view="lHh Lpr lff">
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

      <div style="display: inline-flex; gap: 10px; margin-top: 1.5%">
        <CustomButton 
          label="CREAR APRENDIZ" 
          :onClickFunction="openDialog"
          :icon="['fa', 'circle-plus']"
          >
        </CustomButton>

        <CustomButton 
          label="Subir Archivo" 
          :onClickFunction="uploadFile"
          :icon="['fa', 'file-arrow-up']"
          >
        </CustomButton>
      </div>
      <br> <br>
        <Table
          :rows="rows"
          :columns="columns"
          :onClickEdit="editApprenticeModal"
          :onClickToggleStatus="toggleStatus"
        >
        </Table>
      </div>

      <FormModal
        :modelValue="dialog"
        :title="dialogTitle"
        :onSave="saveApprentice"
        @update:modelValue="dialog = $event"
      >
        <template #content>
          <div>
            <CustomSelect
              id="fiche"
              map-options
              label="Seleccionar ficha"
              v-model="fiche"
              @filter="filterFiche"
              required
              :options="fichesOptions"
              optionLabel="CustomselectName"
              optionValue="idFiche"
              errorMessage="Ficha requerida"
              icon="users-line"
              type="text"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay resultados
                  </q-item-section>
                </q-item>
              </template>
            </CustomSelect>

            <Input
              id="firstName"
              filled
              label="Nombres del Aprendiz"
              v-model="firstName"
              required
              errorMessage="Nombres requeridos"
              icon="spell-check"
              type="text"
            />

            <Input
              id="lastName"
              filled
              label="Apellidos del Aprendiz"
              v-model="lastName"
              required
              errorMessage="Nombre del Aprendiz requerido"
              icon="spell-check"
              type="text"
            />

            <CustomSelect
              id="tpDocument"
              filled
              label="Tipo de Documento"
              v-model="tpDocument"
              required
              :options="tpDocOptions"
              errorMessage="Tipo de Documento requerido"
              icon="chalkboard-user"
              type="text"
            ></CustomSelect>

            <Input
              id="numDocument"
              filled
              label="N° Documento del Aprendiz"
              v-model="numDocument"
              required
              errorMessage="Documento requerido"
              icon="address-card"
              type="text"
            />

            <Input
              id="email"
              filled
              label="Email Personal"
              v-model="personalEmail"
              required
              errorMessage="Email del Aprendiz requerido"
              icon="envelope"
              type="text"
            />

            <Input
              id="email"
              filled
              label="Email Institucional"
              v-model="institutionalEmail"
              required
              errorMessage="Email del Aprendiz requerido"
              icon="envelope"
              type="text"
            />

            <Input
              id="phone"
              filled
              label="Teléfono del Aprendiz"
              v-model="phone"
              required
              errorMessage="Teléfono del Aprendiz requerido"
              icon="phone"
              type="text"
            />

            <CustomSelect
              id="modality"
              filled
              label="Seleccionar modalidad"
              v-model="modality"
              required
              :options="modalitiesOptions"
              optionLabel="name"
              optionValue="_id"
              errorMessage="Modalidad requerida"
              icon="shapes"
              type="text"
              v-if="dialogTitle !== 'EDITAR APRENDIZ'"
            ></CustomSelect>
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
import Footer from "@/components/layouts/Footer.vue"
import Table from "@/components/tables/TableWithButtons.vue";
import CustomButton from "@/components/buttons/CustomButton.vue";
import FormModal from "@/components/modals/FormModal.vue";
import Input from "@/components/inputs/CustomInput.vue";
import CustomSelect from "@/components/inputs/CustomSelect.vue";
import { notifyErrorRequest, notifySuccessRequest} from "@/composables/notify/Notify.vue";

import { getData, postData, putData } from "@/services/apiClient.js";

const title = ref("APRENDICES");
const dialog = ref(false);
const dialogTitle = ref("CREAR APRENDIZ");
const drawerOpen = ref(true);

//v-models de los inputs
const fiche = ref("");
const tpDocOptions = ref(["CC", "TI"]);
const tpDocument = ref("");
const numDocument = ref("");
const modality = ref("");
const firstName = ref("");
const lastName = ref("");
const phone = ref("");
const institutionalEmail = ref("");
const personalEmail = ref("");


const fichesOptions = ref([]);
const modalitiesOptions = ref([]);

const idApprentice = ref("");

const rows = ref([]);
const columns = ref([
  {
    name: "index",
    required: true,
    label: "N°",
    align: "center",
    field: "index",
  },
  {
    name: "name",
    required: true,
    label: "NOMBRE APRENDIZ",
    align: "center",
    field: (row) => `${row.firstName || ""} ${row.lastName || ""}`.trim(),
    sortable: true,
  },
  {
    name: "tpDocument",
    align: "center",
    label: "TIPO DOCUMENTO",
    field: "tpDocument",
    sortable: true,
  },
  {
    name: "numDocument",
    align: "center",
    label: "N° DOCUMENTO",
    field: "numDocument",
  },
  {
    name: "personalEmail",
    align: "center",
    label: "EMAIL PERSONAL",
    field: "personalEmail",
  },
  {
    name: "institutionalEmail",
    align: "center",
    label: "EMAIL INSTITUCIONAL",
    field: "institutionalEmail",
  },
  {
    name: "phone",
    align: "center",
    label: "TEL.",
    field: "phone",
  },
  {
    name: "fiche",
    label: "FICHA",
    align: "center",
    field: (row) => row.fiche.name,
  },
  {
    name: "ficheCode",
    label: "COD. FICHA",
    align: "center",
    field: (row) => row.fiche.number,
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

onBeforeMount(() => {
  getApprentices();
  getFiches();
  getModalities();
});

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx TRAER DATOS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
async function getApprentices() {
  let response = await getData("Apprentice/listallapprentice");
  
  const dataFromApprentices = response.apprentices.map((apprentice) => ({
    idApprentice: apprentice._id,
  }));
  console.log("response from getApprentices: ", response);

  rows.value = response.apprentices.map((apprentice, index) => ({
    ...apprentice,
    index: index + 1,
  }));
}

async function getFiches() {
  try {
    const response = await getData("Repfora/fiches");
    console.log("response from getFiches:  ", response);

    const dataFromFiches = response.map((fiche) => ({
      idFiche: fiche._id,
      number: fiche.program.code,
      name: fiche.program.name,
      CustomselectName: `${fiche.program.code} - ${fiche.program.name}`,
    }));
    fichesOptions.value = dataFromFiches;
  } catch (error) {
    console.error("Error al obtener fichas:", error);
  }
}

async function getModalities() {
  try {
    let response = await getData("Modality/listallmodality");
    modalitiesOptions.value = response.modality.map((modality) => ({
      _id: modality._id,
      name: modality.name,
    }));
    // console.log("response from getModalities:  ", response);
  } catch (error) {
    console.log("getModalities Apprentices.vue:  ", error);
  }
}

async function getRegisterByApprentice(id) {
  try {
    const response = await getData(
      `Register/listRegisterByApprentice/${id}`
    );
    console.log("Registros del aprendiz: ", response);
    const idModality =
      response.data.length > 0 ? response.data[0].idModality : "";

    if (idModality) {
      // Buscar la modalidad correspondiente en la lista de opciones y asignarla a modality
      const CustomselectedModality = modalitiesOptions.value.find(
        (modality) => modality._id === idModality
      );
      if (CustomselectedModality) {
        modality.value = CustomselectedModality;
      } else {
        modality.value = "";
      }
    }
  } catch (error) {
    console.log(error);
  }
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const openDialog = () => {
  fiche.value = "";
  tpDocument.value = "";
  numDocument.value = "";
  modality.value = "";
  firstName.value = "";
  lastName.value = "";
  phone.value = "";
  personalEmail.value = "";
  institutionalEmail.value = "";


  dialogTitle.value = "CREAR APRENDIZ";

  dialog.value = true;
};

async function filterFiche(val, update) {
  if (val === "") {
    update(() => fichesOptions.value);
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    return fichesOptions.value.filter((option) =>
      option.CustomselectName.toLowerCase().includes(needle)
    );
  });
}

const saveApprentice = async () => {
  try {
    const apprenticeData = {
      fiche: fiche.value,
      CustomselectName: fiche.value,
      tpDocument: tpDocument.value,
      numDocument: numDocument.value,
      modality: modality.value._id,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
      personalEmail: personalEmail.value,
      institutionalEmail: institutionalEmail.value,

    };
    console.log("apprenticeData: ", apprenticeData);

    if (dialogTitle.value === "EDITAR APRENDIZ") {
      console.log(idApprentice);

      let response = await putData(
        `Apprentice/updateapprenticebyid/${idApprentice.value}`,
        apprenticeData
      );

      notifySuccessRequest("Aprendiz editado exitosamente");
    } else {
      let response = await postData("Apprentice/addapprentice", apprenticeData);
      notifySuccessRequest("Aprendiz guardado exitosamente");
    }
    dialog.value = false;
    await getApprentices();
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al guardar el aprendiz");
    console.log(error);
  }
};


async function toggleStatus(row) {
  try {
    const url = row.status === 0
        ? `Apprentice/enableapprentice/${row._id}`
        : `Apprentice/disableapprentice/${row._id}`;
    await putData(url, {});
    await getApprentices();
    notifySuccessRequest("Estado cambiado exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al cambiar el estado del aprendiz");
  }
};

async function editApprenticeModal(row) {
  idApprentice.value = row._id;

  const CustomselectedFiche = fichesOptions.value.find(
    (fiche) => fiche.idFiche === row.fiche.idFiche
  );
  fiche.value = CustomselectedFiche ? CustomselectedFiche.idFiche : "";

  tpDocument.value = row.tpDocument;
  numDocument.value = row.numDocument;
  firstName.value = row.firstName;
  lastName.value = row.lastName;
  phone.value = row.phone;
  institutionalEmail.value = row.institutionalEmail;
  personalEmail.value = row.personalEmail;


  console.log(row.fiche);

  await getRegisterByApprentice(row._id);

  dialogTitle.value = "EDITAR APRENDIZ";

  dialog.value = true;
};
</script>
