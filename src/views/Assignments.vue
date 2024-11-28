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

        <div style="display: flex; gap: 10px;">
      <CustomInput
        filled
        :label="placeholderText"
        v-model="pursuitOfAssignment"
        icon="magnifying-glass"
      />
      <RadioButton
        label="Ins. Seguimiento"
        v-model="selectedFilter"
        value="followupInstructor"
      />
      <RadioButton
        label="Ins. Técnico"
        v-model="selectedFilter"
        value="technicalInstructor"
      />
      <RadioButton
        label="Ins. de Proyecto"
        v-model="selectedFilter"
        value="projectInstructor"
      />
    </div>

        <Table
          :rows="filteredRows"
          :columns="columns"
          :onClickEdit="editAssignmentModal"
          :onClickToggleStatus="toggleStatus"
          :loading="loading"
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
            v-if="['PROYECTO EMPRESARIAL', 'PROYECTO PRODUCTIVO', 'PROYECTO PRODUCTIVO I+D', 'PROYECTO SOCIAL'].includes(selectedModality)"
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
            v-if="['PROYECTO EMPRESARIAL', 'PROYECTO PRODUCTIVO I+D'].includes(selectedModality)"
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
import { ref, onBeforeMount, watch, computed } from "vue";

import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import Footer from "@/components/layouts/Footer.vue";
import CustomButton from "@/components/buttons/CustomButton.vue";
import RadioButton from "@/components/buttons/RadioButton.vue"
import CustomInput from "@/components/inputs/CustomInput.vue";
import FormModal from "@/components/modals/FormModal.vue";
import CustomSelect from "@/components/inputs/CustomSelect.vue";
import Table from "@/components/tables/TableWithButtons.vue";
import { notifyErrorRequest, notifySuccessRequest } from "@/composables/Notify.vue";

import { getData, putData } from "@/services/apiClient.js";

const title = ref("ASIGNACIONES");
const dialog = ref(false);
const dialogTitle = ref("CREAR ASIGNACIÓN");
const drawerOpen = ref(true);
const loading = ref(false);
const pursuitOfAssignment = ref("");
const selectedFilter = ref("");

//v-models de los inputs
const apprenticeRegister = ref("");
const followupInstructor = ref("");
const projectInstructor = ref("");
const technicalInstructor = ref("");

const apprenticeOptions = ref([]);
const instructorOptions = ref([]);


let assignmentResponse = null;
let registerResponse = null;
let apprenticeResponse = null;
let modalityResponse = null;
let responseInstructor = null;

let selectedModality = ref("");

let followUpInstructorName = ref("");
let followUpInstructorEmail = ref("");

let technicalInstructorName = ref("");
let technicalInstructorEmail = ref("");

let projectInstructorName = ref("");
let projectInstructorEmail = ref("");

const filteredRows = ref([]);

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
    name: "eyeButton",
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
  loading.value = true;
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

      const assignment = registerResponse.register.find(
        register => register.assignment
      );
            
      return {
        numberList: rows.value.length + 1, // Contador para la columna N°
        apprenticeName: `${apprentice?.firstName || ""} ${apprentice?.lastName || ""}`,
        ficheNumber: apprentice?.fiche?.number || "Sin ficha",
        ficheName: apprentice?.fiche?.name || "Sin ficha",
        modalityName: modalityName,
        followupInstructor: register?.assignment[0]?.followupInstructor[0]?.name || "Sin asignar",
        technicalInstructor: register?.assignment[0]?.technicalInstructor[0]?.name || "Sin asignar",
        projectInstructor: register?.assignment[0]?.projectInstructor[0]?.name || "Sin asignar",
        status: register.status === 1 ? "Activo" : "Inactivo",
        registerId: register._id,
      };
    });
    applyFilters();
    console.log("Datos combinados para la tabla: ", rows.value);
  } catch (error) {
    console.log("Error en getInformation: ", error);
  } finally {
    loading.value = false;
  }
};

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

watch(
  () => technicalInstructor.value,
  (newValue) => {
    if (!newValue) {
      technicalInstructorName.value = "";
      technicalInstructorEmail.value = "";
      return;
    }

    // Buscar el registro correspondiente en registerResponse
    const selectedtechnicalInstructor = responseInstructor.find(
      (instructor) => instructor._id === newValue.instructorId
    );

    if (selectedtechnicalInstructor) {
      const idInstructor = selectedtechnicalInstructor.idInstructor;

      const instructor = responseInstructor.find(
        (instructor) => instructor._id === idInstructor
      );

      // Asignar el nombre de la modalidad a selectedInstructor
      technicalInstructorName.value = selectedtechnicalInstructor.name || "Sin nombre";
      technicalInstructorEmail.value = selectedtechnicalInstructor.email || "Sin email";

    } else {
      technicalInstructorName.value = "Sin nombre";
      technicalInstructorEmail.value = "Sin email";

    }
  },
  { immediate: true } // Para que también se ejecute al inicializar el componente
);


watch(
  () => projectInstructor.value,
  (newValue) => {
    if (!newValue) {
      projectInstructorName.value = "";
      projectInstructorEmail.value = "";
      return;
    }

    // Buscar el registro correspondiente en registerResponse
    const selectedprojectInstructor = responseInstructor.find(
      (instructor) => instructor._id === newValue.instructorId
    );

    if (selectedprojectInstructor) {
      const idInstructor = selectedprojectInstructor.idInstructor;

      const instructor = responseInstructor.find(
        (instructor) => instructor._id === idInstructor
      );

      // Asignar el nombre de la modalidad a selectedInstructor
      projectInstructorName.value = selectedprojectInstructor.name || "Sin nombre";
      projectInstructorEmail.value = selectedprojectInstructor.email || "Sin email";

    } else {
      projectInstructorName.value = "Sin nombre";
      projectInstructorEmail.value = "Sin email";

    }
  },
  { immediate: true } // Para que también se ejecute al inicializar el componente
);



async function getInstructors() {
  try {
  responseInstructor = await getData("Repfora/instructors");
  console.log('Response from getInstructors: ', responseInstructor);
  const dataFromInstructors = responseInstructor.map((instructor) => ({
    instructorId: instructor._id,
    instructorName: `${instructor.name} - ${instructor.thematicarea}`.trim(),
  }));
  instructorOptions.value = dataFromInstructors;
} catch (error) {
  console.log(error);
}
};

watch(
  () => followupInstructor.value,
  (newValue) => {
    if (!newValue) {
      followUpInstructorName.value = "";
      followUpInstructorEmail.value = "";
      return;
    }

    // Buscar el registro correspondiente en registerResponse
    const selectedfollowUpInstructor = responseInstructor.find(
      (instructor) => instructor._id === newValue.instructorId
    );

    if (selectedfollowUpInstructor) {
      const idInstructor = selectedfollowUpInstructor.idInstructor;

      const instructor = responseInstructor.find(
        (instructor) => instructor._id === idInstructor
      );

      // Asignar el nombre de la modalidad a selectedInstructor
      followUpInstructorName.value = selectedfollowUpInstructor.name || "Sin nombre";
      followUpInstructorEmail.value = selectedfollowUpInstructor.email || "Sin email";

    } else {
      followUpInstructorName.value = "Sin nombre";
      followUpInstructorEmail.value = "Sin email";

    }
  },
  { immediate: true } // Para que también se ejecute al inicializar el componente
);

async function saveAssignment() {
  try {
    // Inicializamos assignmentData con la estructura correcta
    const assignmentData = {
      assignment: [
        {
          followupInstructor: [],
          technicalInstructor: [],
          projectInstructor: [],
        },
      ],
    };

    // Validamos y añadimos cada instructor dependiendo de si fue seleccionado
    if (followupInstructor.value) {
      assignmentData.assignment[0].followupInstructor.push({
        idInstructor: followupInstructor.value.instructorId,
        name: followUpInstructorName.value,
        email: followUpInstructorEmail.value,
      });
    }

    if (technicalInstructor.value) {
      assignmentData.assignment[0].technicalInstructor.push({
        idInstructor: technicalInstructor.value.instructorId,
        name: technicalInstructorName.value,
        email: technicalInstructorEmail.value,
      });
    }

    if (projectInstructor.value) {
      assignmentData.assignment[0].projectInstructor.push({
        idInstructor: projectInstructor.value.instructorId,
        name: projectInstructorName.value,
        email: projectInstructorEmail.value,
      });
    }

    // Eliminar propiedades con arrays vacíos del objeto assignment[0]
    for (const key in assignmentData.assignment[0]) {
      if (
        Array.isArray(assignmentData.assignment[0][key]) &&
        assignmentData.assignment[0][key].length === 0
      ) {
        delete assignmentData.assignment[0][key];
      }
    }

    // Log para verificar qué datos se están enviando
    console.log("Datos preparados para guardar:", assignmentData);

    // Validación mínima para asegurarte de que al menos un instructor esté seleccionado
    const hasInstructors = Object.keys(assignmentData.assignment[0]).length > 0;

    if (!hasInstructors) {
      notifyErrorRequest("Debes seleccionar al menos un instructor");
      return;
    }

    // Logs adicionales para depurar
    console.log("assignmentData: ", assignmentData);
    console.log("apprenticeRegister: ", apprenticeRegister);

    // Determinar si es una edición o una nueva asignación
    if (dialogTitle.value === "EDITAR ASIGNACIÓN") {
      console.log(idAssignment);

      await putData(
        `Register/updateassignmentbyid/${apprenticeRegister.value.registerId}`,
        assignmentData
      );

      notifySuccessRequest("Asignación editada exitosamente");
    } else {
      await putData(
        `Register/addassignment/${apprenticeRegister.value.registerId}`,
        assignmentData
      );

      notifySuccessRequest("Asignación guardada exitosamente");
    }

    // Cerrar el diálogo y actualizar la información
    dialog.value = false;
    await getInformation();
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al guardar la asignación");
    console.error(error);
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

console.log('row in editAssignmentModal: ', row);

  // Rellenar los datos del formulario de edición
  dialogTitle.value = "EDITAR ASIGNACIÓN";
  apprenticeRegister.value = row.registerId;
  followupInstructor.value = row.followupInstructorId;
  projectInstructor.value = row.projectInstructorId;
  technicalInstructor.value = row.technicalInstructorId;

  // Actualiza los campos de los instructores
  followUpInstructorName.value = row.followupInstructorName || "";
  technicalInstructorName.value = row.technicalInstructorName || "";
  projectInstructorName.value = row.projectInstructorName || "";

  dialog.value = true;

};

const placeholderText = computed(() => {
  switch (selectedFilter.value) {
    case "followupInstructor":
      return "Nombre del instructor";
    case "technicalInstructor":
    return "Nombre del instructor";
    case "projectInstructor":
    return "Nombre del instructor";
    default:
      return "Buscar por...";
  }
});


function applyFilters() {
  const searchValue = pursuitOfAssignment.value.trim().toLowerCase(); // Convertir la búsqueda a minúsculas

  // Si no hay texto o filtro seleccionado, mostramos todas las filas
  if (!searchValue || !selectedFilter.value) {
    filteredRows.value = rows.value;
    return;
  }

  // Aplicar filtros basados en el filtro seleccionado
  switch (selectedFilter.value) {
    case "followupInstructor":
      filteredRows.value = rows.value.filter((row) =>
        row.followupInstructor.toLowerCase().includes(searchValue)
      );
      break;
    case "technicalInstructor":
      filteredRows.value = rows.value.filter((row) =>
        row.technicalInstructor.toLowerCase().includes(searchValue)
      );
      break;
      case "projectInstructor":
      filteredRows.value = rows.value.filter((row) =>
        row.projectInstructor.toLowerCase().includes(searchValue)
      );
      break;
    default:
      // Si no hay filtro válido, devolver todas las filas
      filteredRows.value = rows.value;
  }
}

// Escuchar cambios en los valores de búsqueda y filtro
watch([pursuitOfAssignment, selectedFilter], applyFilters);

</script>