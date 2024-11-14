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
          label="CREAR ASIGNACIÓN" 
          :onClickFunction="openDialog"
          :icon="['fa', 'circle-plus']"
          >
        </CustomButton>

        <Table
          :rows="rows"
          :columns="columns"
          :onClickEdit="editAssignmentModal"
          :onClickToggleStatus="toggleStatus"
        ></Table>
      </div>

      <FormModal
        :modelValue="dialog"
        :title="dialogTitle"
        :onSave="saveAssignment"
        @update:modelValue="dialog = $event"
      >
        <template #content>
          <div>
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


            <CustomSelect
              filled
              label="Instructor de Seguimiento"
              v-model="followupInstructor"
              @filter="filterInstructor"
              required
              :options="instructorOptions"
              optionLabel="instructorNameForSelect"
              optionValue="instructorId"
              errorMessage="Instructor de seguimiento requerido"
              icon="chalkboard-user"
              type="text"
            ></CustomSelect>


            <CustomSelect
              filled
              label="Instructor Técnico"
              v-model="technicalInstructor"
              @filter="filterInstructor"
              required
              :options="instructorOptions"
              optionLabel="instructorName"
              optionValue="instructorId"
              errorMessage="Instructor técnico requerido"
              icon="shapes"
            ></CustomSelect>

            <CustomSelect
              id="modality"
              filled
              label="Instructor de Proyecto"
              v-model="projectInstructor"
              @filter="filterInstructor"
              required
              :options="instructorOptions"
              optionLabel="instructorName"
              optionValue="instructorId"
              errorMessage="Instructor de proyecto requerido"
              icon="shapes"
            ></CustomSelect>
          </div>
        </template>
      </FormModal>

      <Footer></Footer>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";

import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import Footer from "@/components/layouts/Footer.vue";
import CustomButton from "@/components/buttons/CustomButton.vue";
import FormModal from "@/components/modals/FormModal.vue";
import Input from "@/components/inputs/CustomInput.vue";
import CustomSelect from "@/components/inputs/CustomSelect.vue";
import Table from "@/components/tables/TableWithButtons.vue";
import { notifyErrorRequest, notifySuccessRequest } from "@/composables/notify/Notify.vue";

import { getData } from "@/services/apiClient.js";

const title = ref("ASIGNACIONES");
const dialog = ref(false);
const dialogTitle = ref("CREAR ASIGNACIÓN");
const drawerOpen = ref(true);

//v-models de los inputs
const apprentice = ref("");
const projectInstructor = ref("");
const followupInstructor = ref("");
const technicalInstructor = ref("");

const apprenticeOptions = ref([]);
const instructorOptions = ref([]);

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
    name: "apprenticeName",
    align: "center",
    label: "NOMBRE APRENDIZ",
    field: "apprenticeNameForTable",
    sortable: true,
  },
  {
    name: "numberFiche",
    required: true,
    label: "COD. FICHA",
    align: "center",
    field: "numberFiche",
    sortable: true,
  },
  {
    name: "nameFiche",
    label: "FICHA",
    align: "center",
    field: "nameFiche",
    sortable: true,
  },
  {
    name: "idModality",
    label: "MODALIDAD",
    align: "center",
    field: "idModality",
    sortable: true,
  },
  {
    name: "followupInstructor",
    label: "INS. SEGUIMIENTO",
    align: "center",
    field: "followupInstructor",
    sortable: true,
  },
  {
    name: "technicalInstructor",
    label: "INS. TÉCNICO",
    field: "technicalInstructor",
    align: "center",
    sortable: true,
  },
  {
    name: "projectInstructor",
    label: "INS. PROYECTO",
    field: "projectInstructor",
    align: "center",
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
    name: "magnifyingGlassButton",
    label: "BITÁCORAS",
    align: "center",
    sortable: true,
  },
  {
    name: "seeFollowups",
    label: "SEGUIMIENTOS",
    align: "center",
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
  getRegisters();
  getApprentices();
  getInstructors();
});

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx TRAER DATOS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
async function getRegisters() {
  try {
  let response = await getData("Register/listallregisterwithassignment");
  console.log('Response from getRegisters: ', response);
  rows.value = response.register.concat(rows.value);
} catch (error) {
  console.log(error);
} 
};

async function getApprentices() {
  try {
  let response = await getData("Apprentice/listallapprentice");
  console.log('Response from getApprentices: ', response);
  const dataFromApprentices = response.apprentices.map((apprentice) => ({
    apprenticeId: apprentice._id,
    ficheId: apprentice.fiche.idFiche,
    nameFiche: apprentice.fiche.name,
    numberFiche: apprentice.fiche.number,
    apprenticeNameForSelect: `${apprentice.firstName || ""} ${apprentice.lastName || ""} - ${apprentice.fiche.name}`.trim(),
    apprenticeNameForTable: `${apprentice.firstName || ""} ${apprentice.lastName || ""}`.trim(),

  }));
  console.log("dataFromApprentices: ", dataFromApprentices);
  
  apprenticeOptions.value = dataFromApprentices;
  // rows.value = dataFromApprentices.concat(rows.value);  
  console.log("response from getApprentices: ", response);
  console.log("rows: ", rows.value);
  
} catch (error) {
  console.log(error);
}
};

async function getInstructors() {
  try {
  let response = await getData("Repfora/instructors");
  console.log('Response from getInstructors: ', response);
  const dataFromInstructors = response.map((instructor) => ({
    instructorId: instructor._id,
    instructorName: `${instructor.name} - ${instructor.thematicarea}`.trim(),
  }));
  instructorOptions.value = dataFromInstructors;
} catch (error) {
  console.log(error);
}
};
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx TRAER DATOS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

async function saveAssignment() {
  try {
    const assignmentData = {
      apprentice: apprentice.value.apprenticeId,
      projectInstructor: projectInstructor.value.instructorId,
      followupInstructor: followupInstructor.value.instructorId,
      technicalInstructor: technicalInstructor.value.instructorId,
    };
    console.log("assignmentData: ", assignmentData);

    if (dialogTitle.value === "EDITAR ASIGNACIÓN") {
      console.log(idAssignment);

      let response = await putData(
        `Register/updateassignmentbyid/${idAssignment.value}`,
        assignmentData
      );

      notifySuccessRequest("Asignación editada exitosamente");
    } else{
      let response = await postData("Register/addassignment", assignmentData);
      notifySuccessRequest("Asignación guardada exitosamente");
    }
    dialog.value = false;
    await getAssignments();
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al guardar la asignación");
    console.log(error);
  }

}


function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

async function filterApprentice(val, update) {
  if (val === "") {
    update(() => apprenticeOptions.value);
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    return apprenticeOptions.value.filter((option) =>
      option.apprenticeName.toLowerCase().includes(needle)
    );
  });
}

async function filterInstructor(val, update) {
  if (val === "") {
    update(() => instructorOptions.value);
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    return instructorOptions.value.filter((option) =>
      option.instructorName.toLowerCase().includes(needle)
    );
  });
}

const openDialog = () => {
apprentice.value = "";
projectInstructor.value = "";
followupInstructor.value = "";
technicalInstructor.value = "";

dialogTitle.value = "CREAR ASIGNACIÓN";

dialog.value = true;
};

async function toggleStatus(row) {
  try {
    const url = row.status === 0
        ? `Register/enableregister/${row._id}`
        : `Register/disableregister/${row._id}`;
    await putData(url, {});
    await getApprentices();
    notifySuccessRequest("Estado cambiado exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al cambiar el estado del aprendiz");
  }
};

async function editAssignmentModal(row) {
const selectApprenticeValue = apprenticeOptions.value.find(
  (apprentice) => apprentice.apprenticeId === row.apprentice
);
apprentice.value = selectApprenticeValue ? selectApprenticeValue.apprenticeId : "";

const selectProjectInstructorValue = instructorOptions.value.find(
  (instructor) => instructor.instructorId === row.projectInstructor
);
projectInstructor.value = selectProjectInstructorValue ? selectProjectInstructorValue.instructorId : "";

const selectFollowupInstructorValue = instructorOptions.value.find(
  (instructor) => instructor.instructorId === row.followupInstructor
);
followupInstructor.value = selectFollowupInstructorValue ? selectFollowupInstructorValue.instructorId : "";

const selectTechnicalInstructorValue = instructorOptions.value.find(
  (instructor) => instructor.instructorId === row.technicalInstructor
);
technicalInstructor.value = selectTechnicalInstructorValue ? selectTechnicalInstructorValue.instructorId : "";

console.log(row.projectInstructor);

dialogTitle.value = "EDITAR ASIGNACIÓN";


// await getRegisterByApprentice(row._id);

dialog.value = true;
};
</script>

