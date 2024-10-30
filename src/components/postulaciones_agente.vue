<template>
    <v-main>
      <v-container>
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
                <v-chip :color="getColor(item.estado)" dark style="color:black; font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif">
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
        aceptadas: 2, // el número puede ser variable
        rechazadas: 1, // el número puede ser variable
        enProceso: 2, // el número puede ser variable
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
        // Método que retorna el color basado en el estado de la postulación
        if (estado === 'Aceptada') return '#d4e9dc'; //Verde mate
        else if (estado === 'Rechazada') return '#f6d6d6'; //Rojo mate
        return '#ffecb3'; //Amarillo mate
      },
    },
  };
  </script>
  
  <style scoped>
  .v-main {
    padding: 20px; /* Añadir padding para el contenido central */
  }
  
  .v-data-table {
    margin-top: 20px; /* Añadir espacio entre las secciones */
  }
  </style>