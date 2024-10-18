<template>
  <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="230"
        :breakpoint="400"
        elevated
        id="SideBar"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding id="listButtons">
            <NavBarButton label="INICIO" :icon="['fas', 'house']" class="button" :onClickFunction="() => goToRoute('/home')"></NavBarButton>
            <NavBarButton label="APRENDICES" :icon="['fas', 'user-graduate']" class="button" :onClickFunction="() => goToRoute('/apprentices')"></NavBarButton>
            <NavBarButton label="ASIGNACIONES" :icon="['fas', 'people-arrows']" class="button" :onClickFunction="() => goToRoute('/assignments')"></NavBarButton>
            <NavBarButton label="BITACORAS" :icon="['fas', 'receipt']" class="button" :onClickFunction="() => goToRoute('/binnacles')"></NavBarButton>
            <NavBarButton label="FICHAS" :icon="['fas', 'users-line']" class="button" :onClickFunction="() => goToRoute('/fiches')"></NavBarButton>
            <NavBarButton label="SEGUIMIENTOS" :icon="['fas', 'magnifying-glass-chart']" class="button" :onClickFunction="() => goToRoute('/followups')"></NavBarButton>
            <NavBarButton label="MODALIDADES" :icon="['fas', 'shapes']" class="button" :onClickFunction="() => goToRoute('/modalities')"></NavBarButton>
            <NavBarButton label="REGISTROS" :icon="['fas', 'square-poll-horizontal']" class="button" :onClickFunction="() => goToRoute('/register')"></NavBarButton>
          </q-list>
        </q-scroll-area>

        <q-img
            class="absolute-top"
            src="@/assets/images/qDrawerImage.jpg"
            style="height: 150px"
          >
            <div class="absolute-bottom bg-transparent">
              <q-avatar size="56px" class="q-mb-sm">
                <img src="@/assets/images/whiteIconSena.png" />
              </q-avatar>
              <div class="text-weight-bold">{{ nombreUsuario }}</div>
              <div class="text-weight-bold">{{ emailUsuario }}</div>
            </div>
          </q-img>
      </q-drawer>
  </template>
  
  <script setup>
import NavBarButton from "@/components/buttons/NavBarButton.vue";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";

const router = useRouter();
const nombreUsuario = ref('')
const emailUsuario = ref('')
const props = defineProps({
    drawerOpen: {
      type: Boolean,
    }
  });

const leftDrawerOpen = ref(props.drawerOpen);

watch(() => props.drawerOpen, (newVal) => {
  leftDrawerOpen.value = newVal;
});

const emit = defineEmits(['update:drawerOpen']);


const goToRoute = (route) => {
  router.push(route);
  emit('update:drawerOpen', false);
};
  </script>

  <style>

.button {
  margin-bottom: 5% !important;
  width: 90% !important;
}
#listButtons {
text-align: center;
}

#SideBar {
  justify-content: center !important; 

}

</style>
  