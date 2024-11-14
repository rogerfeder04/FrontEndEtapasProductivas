<template>
  <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="400"
        elevated
        id="SideBar"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding id="listButtons">
            <NavBarButton
             label="Inicio" 
             :icon="['fas', 'house']" 
             class="button" 
             :onClickFunction="() => goToRoute('/home')"
             ></NavBarButton>
             
            <NavBarButton
             label="Aprendices" 
             :icon="['fas', 'user-graduate']" 
             class="button" 
             :onClickFunction="() => goToRoute('/apprentices')" 
             v-if="userRole === 'ADMIN'"
             ></NavBarButton>
             
            <NavBarButton
             label="Fichas" 
             :icon="['fas', 'users-line']" 
             class="button" 
             :onClickFunction="() => goToRoute('/fiches')" 
             v-if="userRole === 'ADMIN'"
             ></NavBarButton>
             
            <NavBarButton
             label="Registros" 
             :icon="['fas', 'square-poll-horizontal']" 
             class="button" 
             :onClickFunction="() => goToRoute('/register')" 
             v-if="userRole === 'ADMIN'"
             ></NavBarButton>
             
            <NavBarButton
             label="Asignaciones" 
             :icon="['fas', 'people-arrows']" 
             class="button" 
             :onClickFunction="() => goToRoute('/assignments')" 
             v-if="userRole === 'ADMIN'"
             ></NavBarButton>
             
            <NavBarButton
             label="Bitácoras" 
             :icon="['fas', 'receipt']" 
             class="button" 
             :onClickFunction="() => goToRoute('/binnacles')" 
             v-if="userRole === 'ADMIN'"
             ></NavBarButton>
             
            <NavBarButton
             label="Seguimientos" 
             :icon="['fas', 'magnifying-glass-chart']" 
             class="button" 
             :onClickFunction="() => goToRoute('/followups')" 
             v-if="userRole === 'ADMIN'"
             ></NavBarButton>

             <NavBarButton
             label="Informes" 
             :icon="['fas', 'file-invoice']" 
             class="button" 
             :onClickFunction="() => goToRoute('/reports')"
             v-if="userRole === 'ADMIN'"
             ></NavBarButton>

             <NavBarButton
             label="Mis Asignaciones" 
             :icon="['fas', 'people-arrows']" 
             class="button" 
             :onClickFunction="() => goToRoute('/instructor/assignments')" 
             v-if="userRole === 'INSTRUCTOR'"
             ></NavBarButton>

             <NavBarButton
             label="Bitácoras" 
             :icon="['fas', 'receipt']" 
             class="button" 
             :onClickFunction="() => goToRoute('/instructor/binnacles')" 
             v-if="userRole === 'INSTRUCTOR'"
             ></NavBarButton>

             <NavBarButton
             label="Seguimientos" 
             :icon="['fas', 'magnifying-glass']" 
             class="button" 
             :onClickFunction="() => goToRoute('/instructor/followups')" 
             v-if="userRole === 'INSTRUCTOR'"
             ></NavBarButton>

             <NavBarButton
             label="Registro Horas"
             :icon="['fas', 'hourglass-half']"
             class="button" 
             :onClickFunction="() => goToRoute('/instructor/timeregister')" 
             v-if="userRole === 'INSTRUCTOR'"
             ></NavBarButton>
          </q-list>
        </q-scroll-area>

        <q-img
            class="absolute-top"
            style="height: 150px; background-color: #dfdfdf"
          >
            <div class="align-center bg-transparent">
              <q-avatar size="62px" class="q-mb-sm">
                <img src="@/assets/images/senaLogo.png" />
              </q-avatar>
              <div class="text-weight-bold roleText">{{ roleText }}</div>
              <div class="text-weight-bold">{{ userName }}</div>
              <div class="text-weight-bold">{{ userEmail }}</div>
            </div>
          </q-img>
      </q-drawer>
  </template>
  
  <script setup>
import NavBarButton from "@/components/buttons/NavBarButton.vue";
import { useRouter } from "vue-router";
import { onBeforeMount, ref, watch } from "vue";
import { useAuthStore } from "@/stores/useAuth.js";

onBeforeMount(() => {
  userRoleText()
})

const authStore = useAuthStore();
const userRole = authStore.rol;
const userEmail = localStorage.getItem("userEmail");
const userName = ""

const router = useRouter();

let roleText = ref('')

const props = defineProps({
    drawerOpen: {
      type: Boolean,
      default: false
    }
  });

const userRoleText = () => {
  if (userRole === 'ADMIN') {
    roleText = 'USUARIO EP'
  } else if (userRole === 'INSTRUCTOR') {
    roleText = 'INSTRUCTOR'
  }
}

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
  color: rgb(248, 248, 248);
}

.align-center {
  align-items: center;
  justify-content: center;  
  height: 100%;
  width: 100%;
  text-align: center;
  vertical-align: middle;
  color: black !important;
}

.roleText {
  font-size: 20px;
}

</style>
  