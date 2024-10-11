<template>
  <q-card class="my-card">
    <q-card-section 
        class="flex-content bg-primary text-white">
      <h1 
        class="text-h4 q-mt-sm q-mb-xs"><b>REPFORA</b></h1>
    </q-card-section>

    <q-card-section class="imgSenaLogoContent">
        <q-img class="senaLogo" src="@\assets\images\senaLogo.png"></q-img>
    </q-card-section>

    <h1 
    class="text-h5 q-mt-sm q-mb-xs" align="center"><b>LOG IN</b></h1>

    <q-separator />

    <q-card-section>
      <InputLog
        id="email"
        label="Correo Electrónico"
        placeholder="Ingresa tu correo"
        v-model="email"
        :rules="[requiredRule, emailRule]"
        type="email"
        errorMessage="Correo inválido"
      />

      <InputLog
        id="password"
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        v-model="password"
        :rules="[requiredRule]"
        type="password"
        errorMessage="Contraseña requerida"
      />

      <q-btn 
        color="primary" 
        label="INICIAR SESIÓN" 
        @click="handleLogin" 
     />
    </q-card-section>
  </q-card>
</template>
  
  <script setup>
import { ref } from "vue";
import InputLog from "@/components/inputs/Inputs.vue"; // Asegúrate de que Input esté en la ruta correcta

const email = ref("");
const password = ref("");

// Reglas de validación
const requiredRule = (value) => !!value || "Campo requerido";
const emailRule = (value) => /.+@.+\..+/.test(value) || "Correo inválido";

const handleLogin = () => {
  if (!email.value || !password.value) {
    console.log("Faltan campos por llenar");
    return;
  }
  // Aquí puedes agregar la lógica para autenticación
  console.log("Iniciando sesión", {
    email: email.value,
    password: password.value,
  });
};
</script>
  
  <style scoped>
.my-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 0px;
}

.flex-content {
  text-align: center;
}

.senaLogo {
    width: 30%;
    height: 30%;
}
.imgSenaLogoContent {
    display: flex;
    justify-content: center;
}
</style>
  