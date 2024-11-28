import Apprentices from "@/views/Apprentices.vue";
import Assignments from "@/views/Assignments.vue";
import Binnacles from "@/views/Binnacles.vue";
import Fiches from "@/views/Fiches.vue";
import Followups from "@/views/Followup.vue";
import Home from "@/views/Home.vue";
import Reports from "@/views/Reports.vue";
import Register from "@/views/Register.vue";
import Modalities from "@/views/Modalities.vue";
import Certifications from "@/views/Certifications.vue"
import Login from "@/views/Login.vue";
import RecoverPassword from "@/views/RecoverPassword.vue";
import InstructorsAssignments from "@/views/InstructorsAssignments.vue";
import InstructorsBinnacles from "@/views/InstructorsBinnacles.vue";
import InstructorsFollowups from "@/views/InstructorsFollowups.vue";
import InstructorsTimeRegister from "@/views/InstructorsTimeRegister.vue";
import ProductiveStageDetails from "@/views/ProductiveStageDetails.vue";
import ApprenticesInformation from "@/views/ApprenticesInformation.vue"

import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/useAuth.js";

const auth = (to, from, next) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  const rol = authStore.rol;

  if ((rol === "ADMIN" || rol === "INSTRUCTOR") && !token) {
    return next({ path: '/' });
  }

  if (to.meta.roles && !to.meta.roles.includes(rol)) {
    return next({ path: '/' }); 
  }
  next(); 
};

const routes = [
  { path: "/", component: Login },
  { path: "/home", component: Home, beforeEnter: auth, meta: { roles: ['ADMIN', 'INSTRUCTOR'] } },
  { path: "/binnacles", component: Binnacles, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/fiches", component: Fiches, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/followups", component: Followups, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/reports", component: Reports, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/register", component: Register, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/productivestagedetails", component: ProductiveStageDetails, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/apprentices", component: Apprentices, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/modalities", component: Modalities, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/assignments", component: Assignments, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/certifications", component: Certifications, beforeEnter: auth, meta: { roles: ['ADMIN'] } },
  { path: "/instructor/assignments", component: InstructorsAssignments, beforeEnter: auth, meta: { roles: ['INSTRUCTOR'] } },
  { path: "/instructor/binnacles", component: InstructorsBinnacles, beforeEnter: auth, meta: { roles: ['INSTRUCTOR'] } },
  { path: "/instructor/followups", component: InstructorsFollowups, beforeEnter: auth, meta: { roles: ['INSTRUCTOR'] } },
  { path: "/instructor/timeregister", component: InstructorsTimeRegister, beforeEnter: auth, meta: { roles: ['INSTRUCTOR'] } },
  { path: "/recoverpassword", component: RecoverPassword}
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
