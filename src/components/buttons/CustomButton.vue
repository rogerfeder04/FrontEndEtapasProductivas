<template>
    <div class="customButtonContainer">
        <q-btn 
            :class="[btnStyles, props.class]"            
            :color="color"
            :text-color="textColor"
            :disable="loading"
            @click="handleClick"
            :type="type"
        >
        <div id="contentButton">
        <font-awesome-icon 
        :icon="icon" 
        style="font-size: 22px;"
        v-if="!loading"
        />

        <span v-if="!loading" id="customButtonLabel">
            {{ props.label }}
      </span>
      
      <template v-else>
        <CustomSpinner 
          :visible="loading" 
          size="20px" 
          colorSpinner="white"
        />
      </template>
    </div>
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
    },
    icon: {
    type: Array,
  },
  type: {
      type: String,
      default: 'button'
    },
    loading: {
    type: Boolean,
  },
})

const handleClick = async () => {
  loading.value = true;
  if (typeof props.onClickFunction === 'function') {
    try {
      await props.onClickFunction(); // Espera a que la función se complete
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }
};

</script>

<style scoped>
.btnStyles {
    margin: 2% !important;
    font-weight: bold;
}

.btnStyles:disabled {
  color: inherit !important; /* Mantiene el color de texto original */
  opacity: 1 !important; /* Evita que se haga transparente */
  border-color: inherit !important; /* Mantiene el borde */
  min-width: 105px !important;
}

#customButtonLabel {
  margin-left: 8px;
}

#contentButton {
  white-space: nowrap;
}
</style>