<script setup>
watch(
  () => projectInstructor.value,
  (newValue) => {
    if (!newValue) {
      projectInstructorName.value = "";
      projectInstructorEmail.value = "";
      return;
    }

    // Buscar el registro correspondiente en registerResponse
    const selectedprojectInstructor = responseInstructor.find(
      (instructor) => instructor._id === newValue.instructorId
    );

    if (selectedprojectInstructor) {
      const idInstructor = selectedprojectInstructor.idInstructor;

      const instructor = responseInstructor.find(
        (instructor) => instructor._id === idInstructor
      );

      // Asignar el nombre de la modalidad a selectedInstructor
      projectInstructorName.value = selectedprojectInstructor.name || "Sin nombre";
      projectInstructorEmail.value = selectedprojectInstructor.email || "Sin email";

      console.log("projectInstructorName: ", projectInstructorName.value);
      console.log("projectInstructorEmail: ", projectInstructorEmail.value);
    } else {
      projectInstructorName.value = "Sin nombre";
      projectInstructorEmail.value = "Sin email";

    }
  },
  { immediate: true } // Para que también se ejecute al inicializar el componente
);
</script>