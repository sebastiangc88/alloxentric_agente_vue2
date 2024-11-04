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
          <v-data-table :headers="headers" :items="postulaciones" class="elevation-1">
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
export default {
  data() {
    return {
      aceptadas: 2,
      rechazadas: 1,
      enProceso: 2,
      postulaciones: [
        { posicion: 'Agente de Soporte', empresa: 'TechCorp', fecha: '2024-09-15', estado: 'Aceptada' },
        { posicion: 'Agente de Ventas', empresa: 'SalesForce', fecha: '2024-09-10', estado: 'Rechazada' },
        { posicion: 'Agente de Atención al Cliente', empresa: 'ServiceNow', fecha: '2024-09-20', estado: 'En Proceso' },
        { posicion: 'Agente de Cobranzas', empresa: 'FinanceHub', fecha: '2024-09-18', estado: 'En Proceso' },
        { posicion: 'Agente de Soporte Técnico', empresa: 'ITSolutions', fecha: '2024-09-12', estado: 'Aceptada' },
      ],
      headers: [
        { text: 'Posición', value: 'posicion' },
        { text: 'Empresa', value: 'empresa' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Estado', value: 'estado' },
      ],
    };
  },

  methods: {
    getColor(estado) {
      if (estado === 'Aceptada') return 'green';
      else if (estado === 'Rechazada') return 'red';
      return '#EDDC68';
    },
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