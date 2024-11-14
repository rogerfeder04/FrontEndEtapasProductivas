import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const token = ref("");
    const rol = ref("");
    

    // Función para establecer el token
    function setToken(newToken) {
        if (newToken) {
            token.value = newToken;
        } else {
            console.log("No está llegando el token: ", newToken);
        }
    };

    function getToken() {
        return token.value; 
    };

    function removeToken() {
        token.value = "";
        localStorage.removeItem("auth");
    }

    // Función para establecer el rol
    function setRol(newRol) {
        if (newRol) {
            rol.value = newRol;
        } else {
            console.log("No está llegando el rol: ", newRol);
        }
    };

    function getRol() {
        return rol.value; 
    };

    function removeRol() {
        rol.value = "";
        localStorage.removeItem("auth");
    }



    return {
        setToken,
        getToken,
        removeToken,
        setRol,
        getRol,
        removeRol,
        token,
        rol
    };
},
{
    persist: {
        enabled: true,
        strategies:[
             {
            key: "auth", // El nombre bajo el cual se guardará en el almacenamiento
            storage: localStorage
        }
        ]
    }
});
