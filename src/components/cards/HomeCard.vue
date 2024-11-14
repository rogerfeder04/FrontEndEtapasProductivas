<template>
  <q-card class="myCard" elevated bordered @click="goToRoute(route)">
    <div class="cardContent">
      <q-card-section class="flexContent">
        <span class="titleText q-mt-sm q-mb-xs">{{ title }}</span>
      </q-card-section>
      <div class="flexContainer">
        <q-img class="height" :src="imgSrc" />
      </div>
      <div class="buttonContainer">
        <CustomButton
          label="Ver"
          :onClickFunction="openDialog"
          :icon="['fa', 'eye']"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { useRouter } from 'vue-router';
import CustomButton from "@/components/buttons/CustomButton.vue";

const router = useRouter();

const props = defineProps({
  route: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const goToRoute = () => {
  if (props.route) {
    router.push({ path: props.route }).catch(err => {
      if (err.name !== 'NavigationDuplicated') {
        throw err;
      }
    });
  }
};

const openDialog = () => {
  // Lógica para abrir el diálogo
  console.log("Diálogo abierto");
};
</script>

<style scoped lang="scss">
.myCard {
  width: 100% !important;
  cursor: pointer;
  text-align: center;
  border-radius: 15px;
}

.height {
  height: 200px !important;
}

.cardContent {
  flex: 1; /* Permite que el contenido ocupe el espacio disponible */
  display: flex;
  flex-direction: column;
  justify-content: space-between !important; /* Asegura que el botón esté al final */
  text-align: center;
}

.titleText {
  font-size: 28px;
  text-overflow: ellipsis; /* Muestra "..." si el texto es demasiado largo */
  color: white;
  
}

.q-card__section {
  width: auto !important;
  background-color: $primary;
  border-radius: 15px 15px 0px 0px;
}

.flexContainer {
  padding: 16px;
  padding: 40px;
}

.buttonContainer {
  padding-bottom: 10px;
}

.q-btn__content{
    white-space: nowrap !important;

}
</style>
