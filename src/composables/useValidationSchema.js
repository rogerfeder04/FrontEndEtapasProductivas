// useValidationSchema.js
import * as yup from "yup";

export const useValidationSchema = () => {
  return yup.object({
    fiche: yup.string().required("La ficha es requerida."),
    firstName: yup.string().required("El nombre es requerido."),
    lastName: yup.string().required("El apellido es requerido."),
    tpDocument: yup.string().required("El tipo de documento es requerido."),
    numDocument: yup
      .string()
      .matches(/^\d+$/, "Solo números son permitidos.")
      .required("El número de documento es requerido."),
    personalEmail: yup
      .string()
      .email("Correo no válido.")
      .required("El correo personal es requerido."),
    institutionalEmail: yup
      .string()
      .email("Correo no válido.")
      .required("El correo institucional es requerido."),
    phone: yup
      .string()
      .matches(/^\d+$/, "Solo números son permitidos.")
      .required("El teléfono es requerido."),
    modality: yup.string().required("La modalidad es requerida."),
  });
};

