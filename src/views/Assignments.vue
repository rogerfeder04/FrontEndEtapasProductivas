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
              v-model="apprenticeRegister"
              @filter="filterApprentice"
              required
              :options="apprenticeOptions"
              optionLabel="apprenticeNameForSelect"
              optionValue="registerId"
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
              optionLabel="instructorName"
              optionValue="instructorId"
              errorMessage="Instructor de seguimiento requerido"
              icon="chalkboard-user"
              type="text"
            ></CustomSelect>


            <CustomSelect
            v-if="['PROYECTO EMPRESARIAL' || 'PROYECTO PRODUCTIVO' || 'PROYECTO PRODUCTIVO  I+D' || 'PROYECTO SOCIAL'].includes(selectedModality)"
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
            v-if="['PROYECTO EMPRESARIAL' || 'PROYECTO PRODUCTIVO  I+D'].includes(selectedModality)"
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
import { ref, onBeforeMount, watch } from "vue";

import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import Footer from "@/components/layouts/Footer.vue";
import CustomButton from "@/components/buttons/CustomButton.vue";
import FormModal from "@/components/modals/FormModal.vue";
import CustomSelect from "@/components/inputs/CustomSelect.vue";
import Table from "@/components/tables/TableWithButtons.vue";
import { notifyErrorRequest, notifySuccessRequest } from "@/composables/notify/Notify.vue";

import { getData, postData } from "@/services/apiClient.js";

const title = ref("ASIGNACIONES");
const dialog = ref(false);
const dialogTitle = ref("CREAR ASIGNACIÓN");
const drawerOpen = ref(true);

//v-models de los inputs
const apprenticeRegister = ref("");
const projectInstructor = ref("");
const followupInstructor = ref("");
const technicalInstructor = ref("");

const apprenticeOptions = ref([]);
const instructorOptions = ref([]);


let assignmentResponse = null
let registerResponse = null
let apprenticeResponse = null
let modalityResponse = null

let selectedModality = ref("");

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
    field: "apprenticeName",
    sortable: true,
  },
  {
    name: "numberFiche",
    required: true,
    label: "COD. FICHA",
    align: "center",
    field: "ficheNumber",
    sortable: true,
  },
  {
    name: "nameFiche",
    label: "FICHA",
    align: "center",
    field: "ficheName",
    sortable: true,
  },
  {
    name: "idModality",
    label: "MODALIDAD",
    align: "center",
    field: "modalityName",
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
  getInformation();
  getInstructors();
});

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx TRAER DATOS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


async function getInformation() {
  try {
    assignmentResponse = await getData("Register/listallassignment");
    registerResponse = await getData("Register/listallregister");
    apprenticeResponse = await getData("Apprentice/listallapprentice");
    modalityResponse = await getData("Modality/listallmodality");

    const apprenticesInRegisters = registerResponse.register
  .map(register => ({
    apprenticeId: register.idApprentice[0],
    registerId: register._id,
  }))
  .filter(item => 
    apprenticeResponse.apprentices.some(apprentice => apprentice._id === item.apprenticeId)
  )
  .map(item => {
    const apprentice = apprenticeResponse.apprentices.find(apprentice => apprentice._id === item.apprenticeId);
    return {
      apprenticeNameForSelect: `${apprentice.firstName || ""} ${apprentice.lastName || ""} - ${apprentice.fiche?.name || "Sin ficha"}`.trim(),
      registerId: item.registerId,
    };
  });

  apprenticeOptions.value = apprenticesInRegisters;


    // Crear mapas para acceso rápido
    const modalityMap = modalityResponse.modality.reduce((map, modality) => {
      map[modality._id] = modality.name;
      return map;
    }, {});

    const apprenticeMap = apprenticeResponse.apprentices.reduce((map, apprentice) => {
      map[apprentice._id] = apprentice;
      return map;
    }, {});

    // Construir los datos de las filas
    rows.value = registerResponse.register.map(register => {
      const apprentice = apprenticeMap[register.idApprentice];
      const modalityName = modalityMap[register.idModality] || "Sin modalidad";

      const assignment = assignmentResponse.data.find(
        assignment => assignment.registerId === register._id
      );

      console.log('assignment: ', assignment);
      

      return {
        numberList: rows.value.length + 1, // Contador para la columna N°
        apprenticeName: `${apprentice?.firstName || ""} ${apprentice?.lastName || ""}`,
        ficheNumber: apprentice?.fiche?.number || "Sin ficha",
        ficheName: apprentice?.fiche?.name || "Sin ficha",
        modalityName: modalityName,
        followupInstructor: assignment?.followupInstructor || "Sin asignar",
        technicalInstructor: assignment?.technicalInstructor || "Sin asignar",
        projectInstructor: assignment?.projectInstructor || "Sin asignar",
        status: register.status === 1 ? "Activo" : "Inactivo",
        registerId: register._id,
      };
    });

    console.log("Datos combinados para la tabla: ", rows.value);
  } catch (error) {
    console.log("Error en getInformation: ", error);
  }
}

// Observador de apprenticeRegister
watch(
  () => apprenticeRegister.value, // Observamos el valor completo de apprenticeRegister
  (newValue) => {
    if (!newValue) {
      selectedModality.value = "";
      return;
    }

    // Buscar el registro correspondiente en registerResponse
    const selectedRegister = registerResponse.register.find(
      (register) => register._id === newValue.registerId // Asegúrate de que 'registerId' es la propiedad correcta
    );

    if (selectedRegister) {
      const idModality = selectedRegister.idModality;

      const modality = modalityResponse.modality.find(
        (modality) => modality._id === idModality
      );

      // Asignar el nombre de la modalidad a selectedModality
      selectedModality.value = modality ? modality.name : "Sin modalidad";
      console.log("selectedModality: ", selectedModality.value);
    } else {
      selectedModality.value = "Sin modalidad"; // Si no se encuentra el registro
    }
  },
  { immediate: true } // Para que también se ejecute al inicializar el componente
);




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
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx





async function saveAssignment() {
  try {
    const assignmentData = {
      projectInstructor: projectInstructor.value.instructorId,
      followupInstructor: followupInstructor.value.instructorId,
      technicalInstructor: technicalInstructor.value.instructorId
    };
    console.log("assignmentData: ", assignmentData);

    console.log("apprenticeRegister: ", apprenticeRegister);
    

    if (dialogTitle.value === "EDITAR ASIGNACIÓN") {
      console.log(idAssignment);

      let response = await putData(
        `Register/updateassignmentbyid/${apprenticeRegister.value.registerId}`,
        assignmentData
      );

      notifySuccessRequest("Asignación editada exitosamente");
    } else{
      let response = await postData(`Register/addassignment/${apprenticeRegister.value.registerId}`, assignmentData);
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
apprenticeRegister.value = "";
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
// const selectApprenticeValue = apprenticeOptions.value.find(
//   (apprentice) => apprentice.apprenticeId === row.apprentice
// );
// apprentice.value = selectApprenticeValue ? selectApprenticeValue.apprenticeId : "";

// const selectProjectInstructorValue = instructorOptions.value.find(
//   (instructor) => instructor.instructorId === row.projectInstructor
// );
// projectInstructor.value = selectProjectInstructorValue ? selectProjectInstructorValue.instructorId : "";

// const selectFollowupInstructorValue = instructorOptions.value.find(
//   (instructor) => instructor.instructorId === row.followupInstructor
// );
// followupInstructor.value = selectFollowupInstructorValue ? selectFollowupInstructorValue.instructorId : "";

// const selectTechnicalInstructorValue = instructorOptions.value.find(
//   (instructor) => instructor.instructorId === row.technicalInstructor
// );
// technicalInstructor.value = selectTechnicalInstructorValue ? selectTechnicalInstructorValue.instructorId : "";

// console.log(row.projectInstructor);

// dialogTitle.value = "EDITAR ASIGNACIÓN";


// // await getRegisterByApprentice(row._id);

// dialog.value = true;
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  // Rellenar los datos del formulario de edición
  apprenticeRegister.value = row.registerId;
  projectInstructor.value = row.projectInstructor;
  followupInstructor.value = row.followupInstructor;
  technicalInstructor.value = row.technicalInstructor;

  // Obtener la modalidad del registro
  const modality = modalityMapRef.value[row.idModality] || { name: "Sin modalidad" };
  selectedModality.value = modality.name;

  dialogTitle.value = "EDITAR ASIGNACIÓN";
  dialog.value = true;

};
</script>

