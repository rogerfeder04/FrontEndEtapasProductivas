<template>
    <div>
      <q-btn
       @click="handleClick" 
       :disable="loading"
       id="button"
       flat
       :style="{ backgroundColor: backgroundColor }"
       >
       <font-awesome-icon v-if="!loading"
        :icon="icon" 
        style="font-size: 
        20px; color: white;"
        />
        <CustomSpinner 
          v-else
          :visible="loading" 
          size="20px" 
          colorSpinner="white"
        />
      </q-btn>
      </div>
      </template>
      
<script setup>
import { ref } from "vue";
import CustomSpinner from "@/components/spinners/CustomSpinner.vue";

const loading = ref(false);
  const props = defineProps({
    icon: {
      type: Array,
      required: true,
    },
    onClick: {
      type: Function,
    },
    backgroundColor: {
      type: String,
      default: "var(--q-primary)",
    },
    loading: {
    type: Boolean,
    default: false,
  },
  });
  
  const handleClick = async () => {
  loading.value = true;
  if (typeof props.onClick === 'function') {
    await props.onClick();
  }
  loading.value = false;
};

  </script>
  
  <style scoped>
#button {
  color: white;
  border-radius: 25px;
  padding: 10px;
  font-weight: bold;
  transition: border 0.3s, color 0.3s;
  text-decoration: none;
}
  </style>
  