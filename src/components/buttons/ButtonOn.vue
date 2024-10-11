<template>
    <div>
      <button @click="handleClick" class="btn-ingresar">{{ label }}</button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    label: {
      type: String,
      required: true,
      default: "Ingresar",
    },
    onClickFunction: {
      type: Function,
      required: true,
    },
  });
  
  function handleClick() {
    props.onClickFunction();
  }
  </script>
  
  <style scoped>
  .btn-ingresar {
    background-color: #4CAF50; /* Verde similar al del ejemplo anterior */
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .btn-ingresar:hover {
    background-color: #45a049;
  }
  </style>
  