import { createApp } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Quasar } from 'quasar'
import { Notify } from 'quasar'; 
import { router } from "@/routes/routes.js"
import { createPinia } from 'pinia'
import piniaPersist from "pinia-plugin-persistedstate";

// Font awesome (para iconos)
import { library } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import { faPenToSquare, faBan, faCheck, faFileInvoice, faSpellCheck, 
  faAddressCard, faPhone, faEnvelope, faUsersLine, faLock, 
  faHashtag, faUserGraduate, faCalendarDays, faFloppyDisk, faCircleXmark,
  faHouse, faPeopleArrows, faSquarePollHorizontal, faReceipt, faMagnifyingGlassChart,
  faShapes, faFile, faChalkboardUser,faPersonChalkboard, faStreetView, faImage,
  faListOl, faEnvelopeOpenText, faBuilding, faMapLocationDot, faUserTie, faStopwatch,
  faClock, faCircleCheck, faCirclePlus, faEye, faRightToBracket, faHourglassHalf,
  faMagnifyingGlass, faFileArrowUp, faCircleRight, faRectangleList, faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

// Añadir el ícono a la librería de Font Awesome
library.add(faPenToSquare, faBan, faCheck, faFileInvoice, faSpellCheck, 
  faAddressCard, faPhone, faEnvelope, faUsersLine, faLock, faHashtag, 
  faUserGraduate, faCalendarDays,faFloppyDisk, faCircleXmark, faHouse,
  faPeopleArrows, faSquarePollHorizontal, faReceipt, faMagnifyingGlassChart,
faShapes, faFile, faChalkboardUser, faPersonChalkboard, faStreetView, faImage,
faListOl, faEnvelopeOpenText, faBuilding, faMapLocationDot, faUserTie, faStopwatch,
faClock, faCircleCheck, faCirclePlus, faEye, faRightToBracket, faHourglassHalf,
faMagnifyingGlass, faFileArrowUp,faCircleRight, faRectangleList, faArrowLeft,

);
    
// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const myApp = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist);


myApp.use(pinia)
myApp.use(router)
myApp.component('font-awesome-icon', FontAwesomeIcon);
pinia.use(piniaPluginPersistedstate)
myApp.use(Quasar, {
  plugins: {
    Notify
  } // import Quasar plugins and add here
})

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
// FILE: vite.config.js

