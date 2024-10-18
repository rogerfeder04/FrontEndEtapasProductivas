<template>
  <q-btn
   class="navBarButton" 
   @click="onClickFunction"
   flat
   >
      <font-awesome-icon :icon="icon" style="font-size: 24px; color: white;"/>

    <span class="navBarButtonLabel"
    >{{ label }}</span>
  </q-btn>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  onClickFunction: {
    type: Function,
    required: true,
  },
  icon: {
    type: Array,
    required: true,
  },

});
</script>

<style scoped>
.navBarButton {
  color: white;
  background-color: var(--q-primary);
  border-radius: 8px;
  font-weight: bold;
  transition: border 0.3s, color 0.3s;
  text-decoration: none;
  font-size: 15px;
}

.navBarButton:hover {
  text-shadow: 1px 1px 3px var(--q-primary);
  transition: border 0.3s;
}

.navBarButtonIcon {
  margin-right: 8px;
}

.navBarButtonLabel {
  margin-left: 8px;
}
</style>
