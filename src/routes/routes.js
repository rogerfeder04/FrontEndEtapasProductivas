import Apprentices from "@/views/Apprentices.vue";
import Assignments from "@/views/Assignments.vue";
import Binnacles from "@/views/Binnacles.vue";
import Fiches from "@/views/Fiches.vue";
import Followups from "@/views/Followup.vue";
import Home from "@/views/Home.vue";
import Modality from "@/views/Modality.vue";
import Register from "@/views/Register.vue";
import UserEPLogin from "@/views/UserEPlogin.vue";
import RecoverPassword from "@/views/RecoverPassword.vue";

import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/useAuth.js";

const auth = (to, from, next) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  const rol = authStore.rol;

  console.log("Token:", token);
  console.log("Rol:", rol);

  if ((rol === "ADMIN" || rol === "Instructor") && !token) {
    return next({ path: '/' });
  }

  if (to.meta.roles && !to.meta.roles.includes(rol)) {
    return next({ path: '/' }); // Redirigir a Login si el rol no está permitido
  }
  next(); // Permitir acceso a la ruta
};

const routes = [
  { path: "/", component: UserEPLogin },
  { path: "/home", component: Home, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/binnacles", component: Binnacles, beforeEnter: auth, meta: { roles: ['ADMIN', 'Apprentice'] } },
  { path: "/fiches", component: Fiches, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/followups", component: Followups, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/modalities", component: Modality, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/register", component: Register, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/apprentices", component: Apprentices, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/assignments", component: Assignments, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/recoverpassword", component: RecoverPassword}
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
