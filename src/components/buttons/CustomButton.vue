<template>
    <div>
        <q-btn 
            :class="[btnStyles, props.class]"            :color="color"
            :text-color="textColor"
            :disable="loading"
            @click="handleClick"
            style="font-weight: bold;"
        >
        <template v-if="!loading">
            {{ props.label }}
      </template>
      <template v-else>
        <CustomSpinner 
          :visible="loading" 
          size="20px" 
          colorSpinner="white"
        />
      </template>
        </q-btn>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import CustomSpinner from "@/components/spinners/CustomSpinner.vue";

const btnStyles = 'btnStyles';
const loading = ref(false);
const props = defineProps({
    label:{
        type:String,
        require:true,
        default:"No tengo texto"
    },
    onClickFunction:{
        type:Function,
        require:true
    }, 
    color:{
        type:String,
        default:"primary"
    },    
    textColor:{
        type: String,
        default: "white"
    },
    class:{
        type: String,
    }
})

const handleClick = async () => {
  if (typeof props.onClickFunction === 'function') {
    try {
      loading.value = true;
      await props.onClickFunction(); // Espera a que la función se complete
    } finally {
      loading.value = false;
    }
  }
};

</script>

<style scoped>
.btnStyles {
    margin: 2% !important;
    border: none; /* Sin bordes visibles */
}

.btnStyles:disabled {
  color: inherit !important; /* Mantiene el color de texto original */
  opacity: 1 !important; /* Evita que se haga transparente */
  border-color: inherit !important; /* Mantiene el borde */
  min-width: 105px !important;
}
</style>