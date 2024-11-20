<script setup>

// ASIGNMENTS.VUE:

async function getInformation() {
  try {
    let assignmentResponse = await getData("Register/listallassignment");
    let registerResponse = await getData("Register/listallregister");
    let apprenticeResponse = await getData("Apprentice/listallapprentice");
    let modalityResponse = await getData("Modality/listallmodality");

    console.log('assignmentResponse: ', assignmentResponse);
    console.log('modalityResponse: ', modalityResponse);
    console.log('apprenticeResponse: ', apprenticeResponse);
    console.log('registerResponse: ', registerResponse);
  
    const apprenticesInRegisters = registerResponse.register
  .map(register => ({
    apprenticeId: register.idApprentice[0],
    registerId: register._id,
  }))
  .filter(item => 
    apprenticeResponse.apprentices.some(apprentice => apprentice._id === item.apprenticeId)
  )
  .map(item => {
    const apprentice = apprenticeResponse.apprentices.find(apprentice => apprentice._id === item.apprenticeId);
    return {
      apprenticeNameForSelect: `${apprentice.firstName || ""} ${apprentice.lastName || ""} - ${apprentice.fiche?.name || "Sin ficha"}`.trim(),
      registerId: item.registerId,
      ficheName: apprentice.fiche.name,
      ficheNumber: apprentice.fiche.number,
      apprenticeName:  `${apprentice.firstName || ""} ${apprentice.lastName || ""}`.trim(),
    };
  });

  const modalitiesNamesFromRegisters = registerResponse.register
  .map(register => ({
    idModality: register.idModality,
  }))
  .filter(item =>
    modalityResponse.modality.some(modality => modality._id === item.idModality)
  )
  .map(item => {
    const modality = modalityResponse.modality.find(modality => modality._id === item.idModality);
    return{
      modalityName: modality.name
    }
  })
  console.log('modalitiesNamesFromRegisters: ', modalitiesNamesFromRegisters);


  const assignmentData = assignmentResponse.data.map(assignment => ({
    projectInstructor: assignment.projectInstructor,
    followupInstructor: assignment.followupInstructor,
    technicalInstructor: assignment.technicalInstructor,
  }));
  console.log('assignmentData: ', assignmentData);

  

apprenticeOptions.value = apprenticesInRegisters;


  console.log('apprenticesInRegisters: ', apprenticesInRegisters);


  rows.value = apprenticesInRegisters;
    
    // // Mapa de aprendices para acceso rápido
    // const apprenticeMap = apprenticeResponse.apprentices.reduce((map, apprentice) => {
    //   map[apprentice._id] = apprentice;
    //   return map;
    // }, {});

    // console.log('apprenticeMap: ', apprenticeMap);

  //   // Mapa de modalidades para acceso rápido
  //   modalityMapRef.value = modalityResponse.modality.reduce((map, modality) => {
  //     map[modality._id] = modality;
  //     return map;
  //   }, {});

  //   console.log('modalityMapRef: ', modalityMapRef);

  //           // Mapear registros y combinar con los datos de aprendices y modalidades

  //   apprenticeOptions.value = registerResponse.register
  //     .filter(register => apprenticeMap[register.idApprentice]) // Filtrar registros con aprendices válidos
  //     .map(register => {
  //       const apprentice = apprenticeMap[register.idApprentice];
  //       return {
  //         apprenticeNameForSelect: `${apprentice.firstName || ""} ${apprentice.lastName || ""} - ${apprentice.fiche?.name || "Sin ficha"}`.trim(),
  //         registerId: register._id, // ID del registro como valor interno
  //       };
  //     });
  //     console.log('selectedModality en getRegisters: ', selectedModality.value);

  } catch (error) {
    console.log('Error en getInformation: ', error);
  }

  watch(apprenticeRegister, (newValue) => {
  const selectedRegister = rows.value.find(row => row.registerId === newValue);
  if (selectedRegister) {
    const modality = modalityMapRef.value[selectedRegister.idModality] || { name: "Sin modalidad" };
    selectedModality.value = modality.name;  // Asegúrate de acceder al nombre de la modalidad
    console.log("Selected Modality: ", selectedModality.value);
    
  }
}, { immediate: true }); // Esto hace que el watch se ejecute inmediatamente
}</script>