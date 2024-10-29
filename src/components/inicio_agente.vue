<template> 
  <v-container>
    <v-row class="mb-6">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-primary mt-6">Bienvenido, Tomas</h1>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <h2 class="text-xl font-weight-bold text-primary">Postulaciones Activas</h2>
          <div>
            <p class="text-h5 font-weight-bold">4</p>
            <p class="text-caption">(+2 desde la última semana)</p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <h2 class="text-xl font-weight-bold text-primary">Ganancias del Mes</h2>
          <div>
            <p class="text-h5 font-weight-bold">$1,500</p>
            <p class="text-caption">(+5% respecto al mes anterior)</p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <h2 class="text-xl font-weight-bold text-primary">Puntos Acumulados</h2>
          <div>
            <p class="text-h5 font-weight-bold">5,000</p>
            <v-progress-linear
              color="#008080"
              height="20"
              :value="60" 
            >
            </v-progress-linear>
            <p class="text-caption mt-2">(40% para el siguiente nivel)</p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-xl font-weight-bold text-primary">Próximas Entrevistas</v-card-title>
          <v-card-subtitle class="text-caption">Sus entrevistas programadas para los próximos días</v-card-subtitle>
          <v-card-text class="pt-4">
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">Empresa</th>
                  <th class="text-left">Posición</th>
                  <th class="text-left">Fecha</th>
                  <th class="text-left">Hora</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TechCorp</td>
                  <td>Agente de Soporte</td>
                  <td>2023-10-15</td>
                  <td>10:00 AM</td>
                </tr>
                <tr>
                  <td>ServiceNow</td>
                  <td>Agente de Atención al Cliente</td>
                  <td>2023-10-18</td>
                  <td>2:00 PM</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-btn color="#008080" block class="white--text mt-4" @click="goToCalendar">Ver Calendario Completo</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <h2 class="text-xl font-weight-bold text-primary">Resumen de Postulaciones</h2>
          <p class="text-caption">Estado actual de sus postulaciones</p>
          <div>
            <p>Aceptadas</p>
            <v-progress-linear
              color="#008080"
              height="12"
              :value="40" 
            ></v-progress-linear>
            <span>2</span>
          </div>
          <div class="mt-2">
            <p>En Proceso</p>
            <v-progress-linear
              color="#008080"
              height="12"
              :value="60" 
            ></v-progress-linear>
            <span>3</span>
          </div>
          <div class="mt-2">
            <p>Rechazadas</p>
            <v-progress-linear
              color="#008080"
              height="12"
              :value="20" 
            ></v-progress-linear>
            <span>1</span>
          </div>
          <v-btn color="#008080" block class="white--text mt-4" @click="goToApplications">Ver Todas las Postulaciones</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MainInicio',
  methods: {
    goToCalendar() {
      this.$router.push({ name: 'Calendario' });
    },
    goToApplications() {
      this.$router.push({ name: 'postulaciones' });
    }
  }
};
</script>
