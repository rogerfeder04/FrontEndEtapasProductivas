<template>
    <div style="width: 98%">
      <h5 id="tituloPrincipal">{{ title }}</h5>
      <q-table 
        :rows="rows" 
        :columns="columns" 
        flat 
        bordered
      >
        <template v-slot:body-cell-numberList="props">
          {{ props.pageIndex + 1 }}
        </template>
    
        <template v-slot:body-cell-status="props">
          <q-td 
            :props="props" 
            :class="{'status-active': props.row.status === 1, 'status-inactive': props.row.status === 0}">
            {{ props.row.status === 1 ? "Activo" : "Inactivo" }}
          </q-td>
        </template>
    
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" id="buttons">
            <TableButton
              :icon="['fa', 'eye']"
              :loading="props.row.loading"
              :onClick="() => onClickView(props.row)" 
              color="primary"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </template>
      
  <script setup>
  import TableButton from '@/components/buttons/TableButton.vue';
  
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
      required: true,
    },
  });
  </script>
  
  <style lang="scss">
  /* Tu CSS permanece igual */
  </style>
  