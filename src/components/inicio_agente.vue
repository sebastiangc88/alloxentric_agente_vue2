<template>
  <v-container>
    <v-row class="mb-6">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-primary">Bienvenido, Tomas</h1>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <h2 class="text-xl font-weight-medium text-primary">Postulaciones Activas</h2>
          <div>
            <p>4</p>
            <p class="text-caption">(2 desde la última semana)</p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <h2 class="text-xl font-weight-medium text-primary">Ganancias del Mes</h2>
          <div>
            <p>$1,500</p>
            <p class="text-caption">(+5% respecto al mes anterior)</p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <h2 class="text-xl font-weight-medium text-primary">Puntos Acumulados</h2>
          <div>
            <p>5,000</p>
            <v-progress-linear
              color="primary"
              height="25"
              :value="60" 
            >
              <template v-slot:default="{ value }">
                <strong>{{ Math.ceil(value) }}% </strong>
              </template>
            </v-progress-linear>
            <p class="text-caption">(60% para el siguiente nivel)</p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <h2 class="text-xl font-weight-medium text-primary">Próximas Entrevistas</h2>
          <p class="text-caption">Sus entrevistas programadas para los próximos días</p>
          <table>
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Posición</th>
                <th>Fecha</th>
                <th>Hora</th>
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
          </table>
          <v-btn color="primary" block class="mt-4">Ver Calendario Completo</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <h2 class="text-xl font-weight-medium text-primary">Resumen de Postulaciones</h2>
          <p class="text-caption">Estado actual de sus postulaciones</p>
          <div>
            <p>Aceptadas</p>
            <v-progress-linear
              color="green"
              height="25"
              :value="40" 
            ></v-progress-linear>
            <span>2</span>
          </div>
          <div class="mt-2">
            <p>En Proceso</p>
            <v-progress-linear
              color="orange"
              height="25"
              :value="60" 
            ></v-progress-linear>
            <span>3</span>
          </div>
          <div class="mt-2">
            <p>Rechazadas</p>
            <v-progress-linear
              color="red"
              height="25"
              :value="20" 
            ></v-progress-linear>
            <span>1</span>
          </div>
          <v-btn color="primary" block class="mt-4">Ver Todas las Postulaciones</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MainInicio',
};
</script>