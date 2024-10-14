<template>
  <v-app>
    <v-main>
      <DetalleOferta /> 
    </v-main>
  </v-app>
</template>

<script>
import DetalleOferta from './components/detalle_oferta.vue'; // Ajusta la ruta si es necesario

export default {
  components: {
    DetalleOferta
  }
};
</script>