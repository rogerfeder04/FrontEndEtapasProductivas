<template>
    <div style="width: 98%">
      <h5 id="tituloPrincipal">{{ title }}</h5>
      <q-table :rows="rows" :columns="columns" flat bordered>
        <!-- v-slot para contar las filas -->
        <template v-slot:body-cell-numberList="props">
          {{ props.pageIndex + 1 }}
        </template>
  
        <!-- v-slot para ver y añadir observaciones -->
        <template v-slot:body-cell-observations="props">
          <q-td :props="props" id="buttons">
            <TableButton
              :icon="['fas', 'magnifying-glass']"
              :onClick="() => onClickEdit(props.row)"
              :loading="props.row.loading"
              backgroundColor="#2f7d32"
            />
  
            <TableButton
              v-if="props.row.status === 1"
              :icon="['fas', 'circle-plus']"
              :loading="props.row.loading"
              :onClick="() => onClickToggleStatus(props.row)"
              backgroundColor="#2f7d32"
            />
          </q-td>
        </template>

        <!-- v-slot para el select de cambiar estado de seguimiento (para ADMIN)-->
        <template v-slot:body-cell-selectStatus="props">
          <q-td :props="props">
            <CustomSelect
              filled
              :label="'Seleccionar estado'"
              :v-model="modality"
              required
              :options="statusOptions"
              :optionLabel="name"
              :optionValue="_id"
              :icon="rectangleList"
              :type="text"
            ></CustomSelect>
          </q-td>
        </template>

      </q-table>
    </div>
  </template>
  
  <script setup>
  import TableButton from "@/components/buttons/TableButton.vue";
  import CustomSelect from "@/components/inputs/CustomSelect.vue"
  
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
    onClickOpenModal: {
      type: Function,
    },
  });
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
  
  #buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  #secondButton {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  </style>
  