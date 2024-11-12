<template>
  <v-main>
    <v-container>
      <!-- Título de la sección -->
      <v-row>
        <v-col cols="12">
          <v-card-title class="headline">
            <h1 class="text-h4 font-weight-bold text-primary white--text">Postulaciones</h1>
          </v-card-title>
        </v-col>
      </v-row>

      <!-- Sección de resumen de postulaciones -->
      <v-row class="mb-4">
        <v-col cols="12" md="4">
          <v-card color="green lighten-4" class="pa-5 text-center">
            <div class="display-1 font-weight-bold">{{ aceptadas }}</div>
            <div class="caption">Aceptadas</div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card color="red lighten-4" class="pa-5 text-center">
            <div class="display-1 font-weight-bold">{{ rechazadas }}</div>
            <div class="caption">Rechazadas</div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card color="yellow lighten-4" class="pa-5 text-center">
            <div class="display-1 font-weight-bold">{{ enProceso }}</div>
            <div class="caption">En Proceso</div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Sección de lista de postulaciones -->
      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headers" :items="formattedPostulaciones" class="elevation-1">
            <template v-slot:[`item.estado`]="{ item }">
              <v-chip :color="getColor(item.estado)" dark>
                {{ item.estado }}
              </v-chip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      aceptadas: 0,
      rechazadas: 0,
      enProceso: 0,
      postulaciones: [],
      headers: [
        { text: 'Posición', value: 'posicion' },
        { text: 'Empresa', value: 'empresa' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Estado', value: 'estado' },
      ],
    };
  },

  computed: {
    formattedPostulaciones() {
      return this.postulaciones.map(postulacion => ({
        ...postulacion,
        fecha: this.formatDate(postulacion.fecha),
      }));
    },
  },

  methods: {
    async fetchPostulaciones() {
      try {
        // Obtener todas las postulaciones desde el backend
        const response = await axios.get('http://localhost:5001/api/solicitudes');
        this.postulaciones = response.data;
      } catch (error) {
        console.error('Error al obtener las postulaciones:', error);
      }
    },

    async fetchTotales() {
      try {
        // Obtener los totales de cada estado desde el backend
        const response = await axios.get('http://localhost:5001/api/solicitudes/totales');
        this.aceptadas = response.data.aceptadas;
        this.rechazadas = response.data.rechazadas;
        this.enProceso = response.data.enProceso;
      } catch (error) {
        console.error('Error al obtener los totales:', error);
      }
    },

    formatDate(date) {
      const d = new Date(date);
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const year = d.getFullYear();
      return `${month}-${day}-${year}`;
    },

    getColor(estado) {
      if (estado === 'Aceptada') return 'green';
      else if (estado === 'Rechazada') return 'red';
      return '#EDDC68';
    },
  },

  async created() {
    // Llamar a las funciones para cargar los datos al montar el componente
    await this.fetchPostulaciones();
    await this.fetchTotales();
  },
};
</script>

<style scoped>
.headline {
  background-color: #008080;
}

.titulo {
  color: white;
  font-weight: bold;
  font-size: 40px;
}

.v-main {
  padding: 20px;
}

.v-data-table {
  margin-top: 20px;
}
</style>
