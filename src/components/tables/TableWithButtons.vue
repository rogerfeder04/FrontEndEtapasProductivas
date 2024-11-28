<template>
  <div style="width: 98%">
    <h5 id="tituloPrincipal">{{ title }}</h5>
    <q-table :rows="rows" :columns="columns" flat bordered :loading="loading">
      <!-- v-slot para contar las filas -->
      <template v-slot:body-cell-numberList="props">
        {{ props.pageIndex + 1 }}
      </template>

      <!-- v-slot para el boton de acciones desplegables de Registro EP -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-pa-sm">
          <q-fab
            direction="left"
            color="primary"
            size="xs"
            class="custom-fab"
            >
            <q-fab-action
              label="Editar"
              color="primary"
              class="custom-fab-action"
              @click="() => onClickEdit(props.row)"
            >
              <font-awesome-icon :icon="['fas', 'pen-to-square']" />


            </q-fab-action>
            <q-fab-action
              label="Ver Detalles"
              color="primary"
              class="custom-fab-action"
              @click="() => onClickSeeDetails(props.row)"
            >
              <font-awesome-icon :icon="['fas', 'bars']" />


            </q-fab-action>
            <q-fab-action
              label="Registro Horas"
              color="primary"
              class="custom-fab-action"
              @click="() => onClickSeeHourReports(props.row)"
            >
              <font-awesome-icon :icon="['fas', 'hourglass-half']" />


            </q-fab-action>
            <q-fab-action
              label="Asignaciones"
              color="primary"
              class="custom-fab-action"
              @click="() => onClickSeeAssignments(props.row)"
            >
              <font-awesome-icon :icon="['fas', 'people-arrows']" />
            </q-fab-action>
          </q-fab>
        </q-td>
      </template>

      <!-- v-slot para el texto del estado -->
      <template v-slot:body-cell-status="props">
        <q-td
          :props="props"
          :class="{
            'status-active': props.row.status === 1,
            'status-inactive': props.row.status === 0,
          }"
        >
          {{ props.row.status === 1 ? "Activo" : "Inactivo" }}
        </q-td>
      </template>

      <!-- v-slot para el boton de "ver" (el boton con el icono del ojo) -->
      <template v-slot:body-cell-eyeButton="props">
        <q-td :props="props" id="eyeButtonContainer">
          <TableButton
            class="buttonWhitEyeIcon"
            :icon="['fa', 'eye']"
            :loading="props.row.loading"
            :onClick="() => onClickOpenModal(props.row)"
          />
        </q-td>
      </template>

      <!-- v-slot para cambiar el estado y editar -->
      <template v-slot:body-cell-options="props">
        <q-td :props="props" id="buttonsToggleAndEditStatusContainer">
          <TableButton
            :icon="['fas', 'pen-to-square']"
            :onClick="() => onClickEdit(props.row)"
            :loading="props.row.loading"
            backgroundColor="#2f7d32"
          />

          <TableButton
            v-if="props.row.status === 1"
            :icon="['fas', 'circle-check']"
            :loading="props.row.loading"
            :onClick="() => onClickToggleStatus(props.row)"
            backgroundColor="#2f7d32"
          />

          <TableButton
            v-if="props.row.status === 0"
            :icon="['fas', 'circle-xmark']"
            :loading="props.row.loading"
            :onClick="() => onClickToggleStatus(props.row)"
            backgroundColor="#C10015"
          />
        </q-td>
      </template>

            <!-- v-slot para cambiar el estado -->
            <template v-slot:body-cell-toggleStatus="props">
        <q-td :props="props" id="buttonsToggleStatusContainer">

          <TableButton
            class="buttonStatus"
            v-if="props.row.status === 1"
            :icon="['fas', 'circle-check']"
            :loading="props.row.loading"
            :onClick="() => onClickToggleStatus(props.row)"
            backgroundColor="#2f7d32"
          />

          <TableButton
            class="buttonStatus"
            v-if="props.row.status === 0"
            :icon="['fas', 'circle-xmark']"
            :loading="props.row.loading"
            :onClick="() => onClickToggleStatus(props.row)"
            backgroundColor="#C10015"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import TableButton from "@/components/buttons/TableButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
  },
  onClickEdit: {
    type: Function,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  onClickToggleStatus: {
    type: Function,
  },
  onClickOpenModal: {
    type: Function,
  },
  getActions: {
    type: Function,
  },
  onClickSeeDetails: {
    type: Function,
  },
  onClickSeeHourReports: {
    type: Function,
  },
  onClickSeeAssignments: {
    type: Function,
  },
});

const goToRoute = (route) => {
  router.push(route);
}



</script>

<style lang="scss">
#tituloPrincipal {
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
}

h5 {
  margin: 0px;
  text-align: center !important;
  font-weight: bold !important;
}

#hr {
  width: 90%;
  height: 5px !important;
  border: 0px;
}

.status-active {
  color: $primary !important;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: bold;
}

.status-inactive {
  color: $negative !important;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: bold;
}

.q-table__container div {
  display: flex;
}

.q-table__container > div:first-child {
  border-bottom: 4px solid $primary;
  padding: 2%;
}

.q-table--horizontal-separator thead th {
  border-bottom-width: 3px !important;
}

.q-table__top {
  padding: 5px !important;
}

th.text-center {
  font-size: 15px !important;
  font-weight: bold !important;
  color: $primary !important;
}

.q-linear-progress {
  background-color: white !important;
  height: 3px !important;
}

.q-linear-progress__track {
  background-color: white !important;

}

td {
  padding: 1% !important;
}

.layout {
  padding: 0;
}

.table-container {
  margin-top: 0;
  padding: 0 20px;
}

#buttonsToggleAndEditStatusContainer {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-content: center;
  gap: 10px;
  margin-top: 5%;
  padding-bottom: 3%;
}

#buttonsToggleStatusContainer {
  width: 100%;
  grid-template-columns: 1fr 3fr;
  justify-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  gap: 10px;
  padding-bottom: 3%;
}

.buttonStatus{
  justify-content: center !important;
}

#eyeButtonContainer {
  gap: 10px;
  padding-block: 0px !important;
}

#secondEyeButtonContainer {
  width: 100%;
  gap: 10px;
  padding: 0px !important;

}

#magnifyingGlassButtonContainer {
  width: 80%;
  padding: 0px !important;
}

.buttonWhitEyeIcon{
  justify-content: center !important;
}

#buttonWhitMagnifyingGlassIcon{
  justify-content: center !important;

}



</style>
