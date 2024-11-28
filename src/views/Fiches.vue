<template>
  <q-layout view="lHh Lpr lff" class="layout">
    <q-page-container>
      <Header :drawerOpen="drawerOpen" @toggleDrawer="toggleDrawer" />
      <Sidebar :drawerOpen="drawerOpen" @update:drawerOpen="toggleDrawer" />

      <br />

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
      <div style="display: flex; gap: 10px;">
      <CustomInput
        filled
        :label="placeholderText"
        v-model="pursuitOfFiche"
        icon="magnifying-glass"
      />
      <RadioButton
        label="Nombre de Ficha"
        v-model="selectedFilter"
        value="nameFiche"
      />
      <RadioButton
        label="Número de Ficha"
        v-model="selectedFilter"
        value="numberFiche"
      />
    </div>
        <Table
          :rows="filteredRows"
          :columns="columns"
          :loading="loading"
          :goTo="seeApprentices"
        ></Table>
      </div>
    </q-page-container>
    <Footer></Footer>
  </q-layout>
</template>

<script setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import Header from "@/components/layouts/Header.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import RadioButton from "@/components/buttons/RadioButton.vue"
import CustomInput from "@/components/inputs/CustomInput.vue";
import Footer from "@/components/layouts/Footer.vue"
import Table from "@/components/tables/TableWithButtons.vue";
import { useRouter } from "vue-router";
import { getData } from "@/services/apiClient.js";

const router = useRouter();
const title = ref("FICHAS");
const pursuitOfFiche = ref("");
const selectedFilter = ref("");
const drawerOpen = ref(true);
let loading = ref(false);

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
    name: "program",
    align: "center",
    label: "NOMBRE FICHA",
    field: (row) => row.program.name,
    sortable: true,
  },
  {
    name: "number",
    required: true,
    label: "COD. FICHA",
    align: "center",
    field: "number",
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
    name: "eyeButton",
    label: "VER APRENDICES",
    align: "center",
    sortable: true,
  },
]);


onBeforeMount(() => {
  getFiches();
});

async function getFiches() {
  try {
    loading.value = true
  let response = await getData("Repfora/fiches");
  rows.value = response;
  applyFilters();
  console.log('rows', rows.value)
  
} catch (error) {
  console.log(error);
} finally {
  loading.value = false
}
};


function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

async function seeApprentices(row) {
  router.push({
    path: "/apprentices",
    query: { ficheId: row._id },
  });
}

const placeholderText = computed(() => {
  switch (selectedFilter.value) {
    case "nameFiche":
      return "Nombre de la ficha";
    case "numberFiche":
      return "Número de ficha";
    default:
      return "Buscar por...";
  }
});


function applyFilters() {
  const searchValue = pursuitOfFiche.value.trim().toLowerCase(); // Convertir la búsqueda a minúsculas

  // Si no hay texto o filtro seleccionado, mostramos todas las filas
  if (!searchValue || !selectedFilter.value) {
    filteredRows.value = rows.value;
    return;
  }

  // Aplicar filtros basados en el filtro seleccionado
  switch (selectedFilter.value) {
    case "nameFiche":
      // Filtrar por nombre de ficha (program.name)
      filteredRows.value = rows.value.filter((row) =>
        row.program.name.toLowerCase().includes(searchValue)
      );
      break;
    case "numberFiche":
      // Filtrar por número de ficha
      filteredRows.value = rows.value.filter((row) =>
        row.number.toLowerCase().includes(searchValue)
      );
      break;
    default:
      // Si no hay filtro válido, devolver todas las filas
      filteredRows.value = rows.value;
  }
}

// Escuchar cambios en los valores de búsqueda y filtro
watch([pursuitOfFiche, selectedFilter], applyFilters);

</script>
